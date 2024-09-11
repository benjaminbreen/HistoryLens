import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import './PrescribePopup.css';

function PrescribePopup({ gameState = {}, updateInventory, addCompoundToInventory, isOpen, onClose, currentPatient, addJournalEntry, conversationHistory, setHistoryOutput, setConversationHistory, setTurnNumber }) {
  const { inventory = [] } = gameState;
  const [selectedItem, setSelectedItem] = useState(null);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Sync selected item with inventory
  useEffect(() => {
    if (selectedItem) {
      const updatedItem = inventory.find(i => i.id === selectedItem.id);
      setSelectedItem(updatedItem || null);
    }
  }, [inventory, selectedItem]);

  // Drop target for inventory items
  const [{ isOver }, drop] = useDrop({
    accept: ['inventoryItem', 'compoundItem'], // Accept both types
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
        The transaction occurred at ${time} on ${date}, in ${location}.
        Using your extensive knowledge of early modern medicine and human biology, consider the dosage, toxicity, the health of the NPC, and potential effects of the medicine prescribed. Is the dose safe or dangerous? 
        The patient's or NPC's reaction should be based on the appropriateness of the prescription for their condition and potential effects of the medicine (which should be mentioned by name only once or twice).
        Summarize the sensory characteristics of the prescribed medicine, describe its effects (which may range from miraculous to positive, neutral, disgusting/vomit-provoking, toxic, or deadly), and the NPC's reaction in 2-3 paragraphs. Typically, one drachms of most medicines is fine, but some may have adverse effects, and a few, like quicksilver, mercury or other chemicals, might kill at this dose. 
        Remember that a very high dose of a toxic medicine, like 3 drachms of quicksilver or three drachms of laudanum, can actually kill an NPC. If you think the dose is fatal, show the NPC dying. This usually does not happen, but adverse effects are common and provoke angry patient reactions.
        End by summarizing the transaction and adjusting Maria's wealth: "Maria has sold [drug name] for [price] silver coins. She now has [updated total] coins." 
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
          model: 'gpt-4o-mini',
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
      setConversationHistory(prev => [...prev, { role: 'user', content: prescriptionPrompt }, { role: 'assistant', content: simulatedOutput }]);
      setTurnNumber(prev => prev + 1);

      // Handle inventory updates and journal entry
      if (simulatedOutput.toLowerCase().includes("accepts")) {
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
      setSelectedItem(null);
      setAmount(1);
      setPrice(0);
    }
  };

  if (!isOpen) return null;

  return (
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
            <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} min="1" />
          </label>
          <label>
            Price (silver reales): 
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} min="0" />
          </label>
        </div>
        <div className="prescription-buttons">
          <button onClick={handlePrescribeClick} disabled={!selectedItem}>Prescribe</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default PrescribePopup;
