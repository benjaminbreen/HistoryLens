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
  const [simulatedOutput, setSimulatedOutput] = useState('');
  const [prescriptionPrompt, setPrescriptionPrompt] = useState('');

  useEffect(() => {
    if (selectedItem) {
      const updatedItem = inventory.find(i => i.id === selectedItem.id);
      setSelectedItem(updatedItem || null);
    }
  }, [inventory, selectedItem]);

  useEffect(() => {
    if (isOpen && toggleInventory) {
      toggleInventory(true);
    }
  }, [isOpen, toggleInventory]);

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
    const { location, time, date } = gameState;
    let prescriptionPrompt = '';

    if (currentPatient.type === 'patient') {
      prescriptionPrompt = `
        Maria has prescribed ${amount} drachms of ${item.name} for ${price} silver coins to ${npcName}.
        The transaction occurred at ${time} on ${date}, in ${location}. (This is provided as context to inform your simulation of the resulting effects, and should not be restated for the player.)
        Using your extensive knowledge of early modern medicine and human biology, consider the dosage, toxicity, the health of the NPC, and potential effects of the medicine prescribed. Is the dose safe or dangerous? 
        Always BEGIN with a customized, opinionated "headline" assessment of the prescription. Typically this wil be in h3 markdown font, like "Maria attempted an unconventional treatment which was somewhat ineffective*" or "The prescription led to minor complications" or "An excellent choice..." or whatever else is appropriate (make sure that you only call it dangerous if it is - any dose of a standard herb or spice is fine, just ineffective - the only really fatal things are opiates like laudanum or chemicals/minerals like quicksilver. The patient's or NPC's reaction should be based on the appropriateness of the prescription for their condition and potential effects of the medicine (which should be mentioned by name only once or twice).
        h3 markdown font for special headlines: If a patient suffers a fatal response (dies) or near-fatal (serious medical consequences) or if they have a highly negative reaction then ALWAYS use h5 tags for your "headline" inead of h3 - this will show it in red to the user. If they die, begin with "The patient has died!"
        Summarize the sensory characteristics of the prescribed medicine, show the patient experiencing its perceived effects (which may range from miraculous to positive, neutral, disgusting/vomit-provoking, toxic, or deadly), and elaborate on the NPC's reaction in 2-3 paragraphs. Typically, one drachm of most medicines is fine, but some may have adverse effects, and a few, like quicksilver, mercury or other chemicals, might kill at this dose. 
        Remember that a very high dose of a toxic medicine, like 2 drachms of quicksilver or three drachms of laudanum, can actually kill an NPC. If you think the dose is fatal, show the NPC dying. This usually does not happen, but adverse effects are common and provoke angry patient reactions.
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
    } else {
      prescriptionPrompt = `
        Maria has prescribed ${amount} drachms of ${item.name} to an unknown patient (fallback context from the previous turn).
        Summarize the effects based on the general context from the previous turn and end with a transaction summary.
      `;
    }

    setPrescriptionPrompt(prescriptionPrompt);

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
      setSimulatedOutput(simulatedOutput);

      // Handle inventory updates and journal entry
      updateInventory(item.name, -amount);
      const lowerCaseOutput = simulatedOutput.toLowerCase();

      // Define arrays of synonyms for different scenarios
      const deathKeywords = ['died', 'had died', 'perished', 'passed away', 'expired'];
      const injuryKeywords = ['injury', 'injured', 'collapse', 'collapsed', 'grave', 'serious condition', 'worsened', 'critical', 'harm', 'near-death', 'suffers', 'debilitating'];
      const cureKeywords = ['perfect cure', 'miraculous', 'fully recovered', 'healed', 'recovered', 'excellent', 'complete recovery'];

      // Helper function to check for keyword presence
      const includesAny = (text, keywords) => {
        return keywords.some(keyword => text.includes(keyword));
      };

      // Check for death, injury, or cure and handle journal entry
      if (includesAny(lowerCaseOutput, deathKeywords)) {
        addJournalEntry(`💀 Maria's prescription of ${amount} drachms of ${item.name} resulted in the death of ${npcName}.`, 'death');
      } else if (includesAny(lowerCaseOutput, injuryKeywords)) {
        addJournalEntry(`🩸 ${npcName} has suffered a serious injury from ${amount} drachms of ${item.name}.`, 'injury');
      } else if (includesAny(lowerCaseOutput, cureKeywords)) {
        addJournalEntry(`✨ Maria's prescription of ${amount} drachms of ${item.name} resulted in a miraculous recovery for ${npcName}.`, 'cure');
      } else {
        addJournalEntry(`Maria prescribed ${amount} drachms of ${item.name} for ${price} silver coins to ${npcName}.`);
      }

    } catch (error) {
      console.error("Error during prescription:", error);
      console.error("Error details:", error.response ? await error.response.text() : error.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPatient, conversationHistory, gameState, updateInventory, addJournalEntry]);

  const handlePrescribeClick = async () => {
    if (selectedItem) {
      setIsLoading(true);
      await handlePrescribe(selectedItem, amount, price);
      setIsLoading(false);
      onClose();
      setIsSummaryOpen(true);
    }
  };

  const handleSummaryContinue = () => {
    setIsSummaryOpen(false);
    setHistoryOutput(simulatedOutput);
    setConversationHistory(prev => [
      ...prev,
      { role: 'user', content: prescriptionPrompt },
      { role: 'assistant', content: simulatedOutput }
    ]);
    setTurnNumber(prev => prev + 1);
    toggleInventory(false);
    setSelectedItem(null);
    setAmount(1);
    setPrice(0);
  };

  if (!isOpen && !isSummaryOpen) return null;

  return (
    <>
      {isOpen && !isSummaryOpen && (
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
              <button onClick={handlePrescribeClick} disabled={!selectedItem || isLoading}>
                {isLoading ? 'Prescribing...' : 'Prescribe'}
              </button>
              <button onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}

     {isSummaryOpen && (
  <div className="popup-overlay">
    <div className="popup-content summary-popup" onClick={(e) => e.stopPropagation()}>
      <h2 className="summary-title">Prescription Summary</h2>
      <p>
        Maria prescribed {amount} drachms of {selectedItem?.name} for {price} reales.
        She waits expectantly to see what effect it will have...
      </p>

      {/* Item header with separate lines for the name */}
      <h1 className="medieval-header">
        <span>{selectedItem?.name}</span>
        <br />
        <span className="spanish-name">({selectedItem?.spanishName})</span>
      </h1>

      {/* Display the image beneath the header */}
      {selectedItem?.image && (
        <img 
          src={selectedItem.image} 
          alt={selectedItem.name} 
          className="item-image"
        />
      )}

      {/* Larger italicized Latin name */}
      <p style={{ fontSize: '1.4rem', fontStyle: 'italic', textAlign: 'center', marginBottom: '15px' }}>
        {selectedItem?.latinName}
      </p>

      {/* Other item details */}
      <p><strong>Humoral Qualities:</strong> {selectedItem?.humoralQualities}</p>
      <p><strong>Medicinal Effects:</strong> {selectedItem?.medicinalEffects}</p>
      <p>{selectedItem?.description}</p>

      <button onClick={handleSummaryContinue}>Continue</button>
    </div>
  </div>
      )}
    </>
  );
}

export default PrescribePopup;