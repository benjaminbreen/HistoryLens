import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import './PrescribePopup.css';

function PrescribePopup({
  gameState = {},
  updateInventory,
  addCompoundToInventory,
  isOpen,
  onClose,
  currentPatient,
  addJournalEntry,
  conversationHistory,
  setHistoryOutput,
  setConversationHistory,
  setTurnNumber,
  toggleInventory,

}) {
  const { inventory = [] } = gameState;
  const [selectedItem, setSelectedItem] = useState(null);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Sync selected item with inventory
  useEffect(() => {
    if (selectedItem) {
      const updatedItem = inventory.find(i => i.id === selectedItem.id);
      setSelectedItem(updatedItem || null);
    }
  }, [inventory, selectedItem]);

 useEffect(() => {
    if (isOpen && toggleInventory) {
      toggleInventory(true);  // Open inventory when the popup opens
    }
  }, [isOpen, toggleInventory]);

  // Drop target for inventory items
  const [{ isOver }, drop] = useDrop({
    accept: ['inventoryItem', 'compoundItem'], 
    drop: (item) => {
      const updatedItem = inventory.find(i => i.id === item.id);
      if (updatedItem) {
        setSelectedItem(updatedItem);
      } else {
        console.warn('Dropped item not found in inventory:', item);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const handlePrescribe = useCallback(async (item, amount, price) => {
    if (!currentPatient) {
      console.error("No patient or NPC selected for prescription");
      setHistoryOutput("Error: No patient or NPC selected for prescription.");
      return;
    }



   const npcName = currentPatient.name;
  const { location, time, date } = gameState; // Extract location, time, and date from gameState
  let prescriptionPrompt = '';

    // Define prescription based on type
    if (currentPatient.type === 'patient') {
      prescriptionPrompt = `
        Maria has prescribed ${amount} drachms of ${item.name} for ${price} silver coins to ${npcName}.
        The transaction occurred at ${time} on ${date}, in ${location}. (This is provided as context to inform the accuracy and vividness of your simulation of the resulting effects, and should not be restated for the player.)
        Using your extensive knowledge of early modern medicine and human biology, consider the dosage, toxicity, the health of the NPC, and potential effects of the medicine prescribed. Is the dose safe or dangerous? 
        Always BEGIN with a customized, opinionated "headline" assessment of the prescription in h3 markdown font, like "Maria attempted an unconventional treatment which was somewhat ineffective*" or "Maria prescribed something rather dangerous..." or "An excellent choice..." or whatever else is appropriate (make sure that you only call it dangerous if it is - any dose of a standard herb or spice is fine, just ineffective - the only really dangerous things are opiates like laudanum and chemicals/minerals like quicksilver or mercury. The patient's or NPC's reaction should be based on the appropriateness of the prescription for their condition and potential effects of the medicine (which should be mentioned by name only once or twice).
        If a patient suffers a fatal response (dies) or near-fatal (serious medical consequences) then ALWAYS instead begin your opening "headline" with h5 tags in all caps. Be sarcastic here.
        Summarize the sensory characteristics of the prescribed medicine, show the patient experiencing its perceived effects (which may range from miraculous to positive, neutral, disgusting/vomit-provoking, toxic, or deadly), and elaborate on the NPC's reaction in 2-3 paragraphs. Typically, one drachm of most medicines is fine, but some may have adverse effects, and a few, like quicksilver, mercury or other chemicals, might kill at this dose. 
        Remember that a very high dose of a toxic medicine, like 3 drachms of quicksilver or three drachms of laudanum, can actually kill an NPC. If you think the dose is fatal, show the NPC dying. This usually does not happen, but adverse effects are common and provoke angry patient reactions.
        This turn may take up several hours or even a day as the patient's reaction may take time to manifest. Pay attention to accurately deciding on the passage of time and the effects. 
        After documenting the effects, you will provide a final line tracking Maria's updated wealth, status, reputation, and the date and time at the VERY END of your response, displayed in bold, as explained below (Reputation is displayed via a choice of ONE of these emojis [if a patient dies, Maria's reputation goes to 1; if she has a miraculous cure, it goes to 8, 9, or 10]: 😡 (1) ; 😠 (2) ; 😐 (3) ; 😶 (4) ; 🙂 (5) ; 😌 (6) ; 😏 (7) ; 😃 (8) ; 😇 (9) ; 👑 (10) ).

        This final line should ALWAYS be in this exact format, in markdown bold [**] tags:

              **Maria now has [integer] silver coins. She is feeling [single word status]. Her reputation is [emoji]. The time is # AM (or PM), xx [month] [year].**
      `;
    } else if (currentPatient.type === 'npc') {
      if (price === 0) {
        prescriptionPrompt = `
          Maria has secretly given ${amount} drachms of ${item.name} to ${npcName}.
          This may be an attempt to dose or poison the NPC. Consider the dosage and potential effects.
          Summarize the NPC's response and the potential consequences in vivid detail, with special attention to documenting what you believe to be the most historically authentic and realistic reactions - how would real humans actually act in this context? 
          If the NPC dies, show the event as a critical turning point for Maria. If they do not die, Maria will presumably be in very, very deep trouble and will be forced to flee.
        `;
      } else {
        prescriptionPrompt = `
          Maria has prescribed ${amount} drachms of ${item.name} for ${price} silver coins to ${npcName}.
          Summarize the NPC's reaction to the medicine (note that NPC can be a wide range of entities, from a human to an animal to natural features - the reaction is up to you and should be explored creatively and in an open-ended fashion). End by summarizing the transaction: "Maria has sold [drug name] for [price] silver coins."
        `;
      }
    } else if (currentPatient.type === 'healer') {
      prescriptionPrompt = `
        Maria has sold ${amount} drachms of ${item.name} for ${price} silver coins to ${npcName}, who is a fellow healer (either licensed or unlicensed).
        The drug is not for personal use but for their practice. There may be bargaining or complaints about purity or counterfeiting. Summarize any discussion about the drug's potency or properties.
        End by summarizing the transaction: "Maria has sold [drug name] for [price] silver coins. She now has [updated total] coins."
      `;
        } else if (currentPatient.type === 'fallback') {
    prescriptionPrompt = `
      Maria has prescribed ${amount} drachms of ${item.name} to an unknown patient (fallback context from the previous turn).
      Summarize the effects based on the general context from the previous turn and end with a transaction summary.
    `;

    }

    // Perform API call
    try {
      setIsLoading(true);
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-2024-08-06',
          messages: [
            ...conversationHistory,
            { role: 'user', content: prescriptionPrompt }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const simulatedOutput = data.choices[0].message.content;

      // Update conversation history and journal
           setHistoryOutput(simulatedOutput);
           setConversationHistory(prev => [
             ...prev,
             { role: 'user', content: prescriptionPrompt },
             { role: 'assistant', content: simulatedOutput }
           ]);
           setTurnNumber(prev => prev + 1);

      // Handle inventory updates and journal entry
       updateInventory({ name: item.name, quantity: -amount });
 const lowerCaseOutput = simulatedOutput.toLowerCase();

 // Define arrays of synonyms for different scenarios
 const deathKeywords = ['dies', 'death', 'perishes', 'passes away', 'expires', 'succumbs', 'fatal'];
 const injuryKeywords = ['injury', 'collapse', 'grave', 'serious condition', 'worsens', 'critical', 'harm', 'suffers', 'debilitating'];
 const cureKeywords = ['perfect cure', 'miraculous', 'fully recovered', 'healed', 'recovered', 'excellent', 'complete recovery'];

 // Helper function to check for keyword presence
 const includesAny = (text, keywords) => {
   return keywords.some(keyword => text.includes(keyword));
 };

 // Update conversation history and journal
 setHistoryOutput(simulatedOutput);
 setConversationHistory(prev => [
   ...prev,
   { role: 'user', content: prescriptionPrompt },
   { role: 'assistant', content: simulatedOutput }
 ]);
 setTurnNumber(prev => prev + 1);

 // Check for death, injury, or cure and handle inventory updates and journal entry
 if (includesAny(lowerCaseOutput, deathKeywords)) {
   // If patient dies, update inventory and add special journal entry
   updateInventory({ name: item.name, quantity: -amount });
   addJournalEntry(`💀 Maria's prescription of ${amount} drachms of ${item.name} resulted in the death of ${npcName}. The consequences will be dire...`, 'death');  // Using 'death' as an entry type for potential styling
 } else if (includesAny(lowerCaseOutput, injuryKeywords)) {
   // If patient is injured, update inventory and add journal entry in red
   updateInventory({ name: item.name, quantity: -amount });
   addJournalEntry(`🩸 ${npcName} has suffered a serious injury from ${amount} drachms of ${item.name}.`, 'injury');  // 'injury' type for potential styling in red
 } else if (includesAny(lowerCaseOutput, cureKeywords)) {
   // If perfect cure, add journal entry
   updateInventory({ name: item.name, quantity: -amount });
   addJournalEntry(`✨ Maria's prescription of ${amount} drachms of ${item.name} resulted in a miraculous recovery for ${npcName}. All is well.`, 'cure');  // 'cure' type for potential positive styling
 } else {
   // Default case for a normal transaction
   updateInventory({ name: item.name, quantity: -amount });
   addJournalEntry(`Maria prescribed ${amount} drachms of ${item.name} for ${price} silver coins to ${npcName}.`);
 }


    } catch (error) {
      console.error("Error during prescription:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPatient, conversationHistory, updateInventory, addJournalEntry, setHistoryOutput, setConversationHistory, setTurnNumber]);

  const handlePrescribeClick = () => {
  if (selectedItem) {
    handlePrescribe(selectedItem, amount, price);

    // Clear the selection and reset the amount/price
    setSelectedItem(null);
    setAmount(1);
    setPrice(0);

    // Automatically close both the inventory pane and the prescribe popup after prescribing
    setIsSummaryOpen(true);
    onClose();  // Close the prescribe popup
  }
};

// Automatically close the summary popup when the prescription finishes loading
  useEffect(() => {
    if (!isLoading && isSummaryOpen) {
      setIsSummaryOpen(false); // Close the summary popup when isLoading is false
    }
  }, [isLoading, isSummaryOpen]);

  if (!isOpen) return null;

return (
    <>
      {/* Prescribe Popup */}
      <div className="prescribe-popup">
        <div className="prescribe-content">
          <h2>🧪 Prescribe a Medicine</h2>
          <div ref={drop} className={`prescription-area ${isOver ? 'drag-over' : ''}`}>
            {selectedItem ? (
              <div className="selected-item">
                <span className="emoji">{selectedItem.emoji}</span>
                <span>{selectedItem.name}</span>
              </div>
            ) : (
              <p>Drag an item here from the inventory to prescribe. And don't forget to set a price!</p>
            )}
          </div>
          <div className="prescription-controls">
            <label>
              Amount (drachms):
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
              />
            </label>
            <label>
              Price (silver reales):
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min="0"
              />
            </label>
          </div>
          <div className="prescription-buttons">
            <button onClick={handlePrescribeClick} disabled={!selectedItem}>Prescribe</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>

      {/* Summary Popup */}
      {isSummaryOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Prescription Summary</h2>
            <p>
              Maria prescribed {amount} drachms of {selectedItem?.name} for {price} reales.
              She waits expectantly to see what effect it will have...
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default PrescribePopup;

