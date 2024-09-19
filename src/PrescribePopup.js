// PrescribePopup.js
import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import './PrescribePopup.css';

function PrescribePopup({
  gameState = {},
  updateInventory,
  isOpen,
  onClose,
  currentPatient,
  addJournalEntry,
  conversationHistory = [],
  setHistoryOutput,
  setConversationHistory,
  setTurnNumber,
  toggleInventory,
  currentWealth,
  prescriptionType, 
  handlePrescriptionOutcome, 
  onPrescriptionComplete
}) {
  const { inventory = [] } = gameState;
  const [selectedItem, setSelectedItem] = useState(null);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  const [simulatedOutput, setSimulatedOutput] = useState('');
  const [prescriptionPrompt, setPrescriptionPrompt] = useState('');

  // Update selectedItem when an item is dropped in
  useEffect(() => {
    if (selectedItem) {
      const updatedItem = inventory.find(
        i => i.name.toLowerCase() === selectedItem.name.toLowerCase()
      );
      if (updatedItem) {
        setSelectedItem(updatedItem); // Ensuring the updated item is set properly
      }
    }
  }, [inventory, selectedItem]);

  // Automatically open inventory when the popup opens
  useEffect(() => {
    if (isOpen && toggleInventory) {
      toggleInventory(true);
    }
  }, [isOpen, toggleInventory]);

  // Handle drop of item into prescription area
  const [{ isOver }, drop] = useDrop({
    accept: ['inventoryItem', 'compoundItem'],
    drop: (item) => {
      const updatedItem = inventory.find(i => i.name.toLowerCase() === item.name.toLowerCase());
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

  // Function to handle prescription
const handlePrescribe = useCallback(async (item, amount, price) => {
  if (!currentPatient) {
    console.error("No patient or NPC selected for prescription");
    setHistoryOutput("Error: No patient or NPC selected for prescription.");
    return;
  }

  const npcName = currentPatient.name;
  const { location, time, date } = gameState;
  let prescriptionPrompt = '';

  // patient picking logic 
  if (npcName === 'Inquisitor Santiago Valdez') {
  if (prescriptionType === 'treatment') {
    // Special treatment prompt for the Inquisitor
    prescriptionPrompt = `
      Maria has administered ${amount} drachms of ${item.name} to Inquisitor Santiago Valdez, attempting to treat his illness (syphilis). He has threatened violence if she fails or reveals his secret.
      This is a medical treatment rather than poison. Consider the appropriate dosage and the likely effects of the medicine.
      Using your extensive knowledge of early modern treatments and their effects, assess if the treatment will relieve his symptoms or cause dangerous side effects.
      Begin with a customized "headline" in h5 markdown font, either "Maria's treatment was successful. The Inquisitor's condition improved." or "Maria's treatment failed. The Inquisitor's condition worsened."
      Describe the sensory characteristics of the treatment, the Inquisitor's reaction, and the aftermath in 2-3 paragraphs. If the treatment is successful, the Inquisitor thanks Maria effusively and sends her on her way. If it failed, he arrests her for brujeria and jails her. Ensure historical accuracy regarding the type and effects of the treatment.
      Remember that this treatment is taking place in the personal residence of Valdez, not Maria's shop, and under extremely tense circumstances as the revelation of his syphilis would be catastrophic for him. There is notable tension and Maria wonders when the other shoe will drop - is her life at risk?
    `;
  } else if (prescriptionType === 'poison') {
    // Special poison prompt for the Inquisitor
    prescriptionPrompt = `
      Maria has administered ${amount} drachms of ${item.name} to Inquisitor Santiago Valdez, treating his secret illness (syphilis). He has brought her to his residence under threat of violence if she fails or reveals his secret.
      This is an attempt to poison him rather than cure his illness. Consider the dosage and potential lethality of the poison.
      Using your extensive knowledge of early modern poisons and their effects, determine if the dose is sufficient to kill without causing suspicion.
      Begin with a customized "headline" in h5 markdown font, either "Maria's poison was successful. The Inquisitor has died." or "Maria's poison failed. The Inquisitor survived."
      Describe the sensory characteristics of the poison, the Inquisitor's reaction, and the aftermath in 2-3 paragraphs. If the poison is successful, Maria slips away by darting into a servant's door and making her way to the street. If the poison fails, she is imprisoned by the Inquisitor, who is enraged. Ensure historical accuracy regarding the type and effects of the poison.
    `;
  }
} else if (prescriptionType === 'treatment' || currentPatient.type === 'patient') {
  // General treatment prompt for other NPCs
  prescriptionPrompt = `
    Maria has prescribed ${amount} drachms of ${item.name} for ${price} silver coins to ${npcName}.
    The transaction occurred at ${time} on ${date}, in ${location}. (This is context and should not be restated to the player.)
    Maria's current wealth is ${currentWealth} silver coins.

    Using your knowledge of early modern medicine and human biology, assess the safety and effectiveness of this prescription. Focus on the dosage, toxicity, and health condition of the NPC.

    Always begin your output with a clear and concise **headline** that summarizes your assessment of the prescription. Use appropriate markdown formatting as follows:

    - **h3 markdown**: Use h3 markdown tags (###) for headlines where the effects are neutral, positive, or only slightly negative. For example, you might write: 
      ### Maria attempted an unconventional treatment that was somewhat ineffective.
      or
      ### The prescription led to minor complications.
      or ### The patient balked at the high price and walked out without paying.

    - **h5 markdown**: Use h5 markdown tags (#####) for headlines where the patient has suffered **serious harm** or a **fatal reaction**. When using h5:
      - If the patient **died**, always start with: ##### The patient has died!
      - For **severe complications** that are non-fatal, use something like:
        ##### The prescription resulted in severe complications.

    **Important:**
    - The headline must always appear as the first line of the output.
    - Ensure the markdown tags (### or #####) are correctly used at the start of the headline.
    - Do not restate the markdown tags or explain the headline in your output—just present the headline with the appropriate markdown tag.

    ### Patient Reactions:
    After the headline, describe the patient's experience in 3 highly detailed paragraphs which emphasize vivid, historically authentic characterization and finely observed details:
    - Focus on the **sensory characteristics** of the medicine (e.g., taste, smell, texture).
    - Show how the patient reacts to the prescribed dose, including the price. This might range from a miraculous cure to mild discomfort to violent reactions like vomiting or even death.
    - Describe the **perceived effects** of the medicine on the patient's health.
    - If the dose is toxic or fatal, be explicit about the timeline of how the patient worsens or dies.
    - If the price is particularly high (over 10 coins, say - though some patients may be able to afford more than this, it depends on the specific NPC) they may walk out without paying or taking the prescription at all. If so, describe this and remember that Maria does not receive any new coins in such a situation.

    ### Dosage & Effects:
    - One drachm of most medicines is usually safe, but two or more drachms of highly toxic substances (like quicksilver or laudanum) could lead to fatal outcomes. If the dose is fatal, show the NPC dying.
    - Angry reactions are common if the medicine is ineffective or causes discomfort, so show the patient's response accordingly.

    At the end of the response, provide a summary of Maria's wealth, status, reputation, and the time in **this exact format** using markdown **bold** tags:

    **Now Maria has ${currentWealth + price} silver coins (${currentWealth} + ${price} = ${currentWealth + price}). She is feeling [single word status]. Her reputation is [emoji]. The time is # AM (or PM), xx [month] [year].**

    **Reputation Emoji Guide:**
    - 😡 (1) : Extremely bad (e.g., patient dies)
    - 😠 (2) : Very bad (e.g., severe complications)
    - 😐 (3) : Neutral (e.g., treatment is ineffective but not harmful)
    - 🙂 (5) : Positive (e.g., minor positive effects)
    - 😇 (9) : Excellent (e.g., miraculous cure)
    - 👑 (10) : Outstanding (e.g., near-mythical healing)
  `;
} else if (prescriptionType === 'poison') {
  // General poison prompt for other NPCs
  prescriptionPrompt = `
    Maria has secretly administered ${amount} drachms of ${item.name} to ${npcName}.
    This is an attempt to poison them rather than cure any illness. Consider the dosage and potential lethality of the poison.
    Using your extensive knowledge of early modern poisons and their effects, determine if the dose is sufficient to kill without causing suspicion.
    Begin with a customized "headline" in h3 markdown font, such as "Maria successfully poisoned ${npcName}" or "The poison had unintended effects." If the poison kills the NPC, use h5 tags with "${npcName} has died!".
    Describe the sensory characteristics of the poison, the NPC's reaction, and the aftermath in 2-3 paragraphs. Ensure historical accuracy regarding the type and effects of the poison.
    After documenting the effects, provide a final line tracking Maria's updated wealth, status, reputation, and the date and time at the VERY END of your response, displayed in bold, as explained below.

    *Now Maria has [integer] silver coins (${currentWealth} + ${price} = ${currentWealth + price}). She is feeling [single word status]. Her reputation is [emoji]. The time is # AM (or PM), xx [month] [year].*
  `;
} else {
  // Fallback prompt
  prescriptionPrompt = `
    Maria has administered ${amount} drachms of ${item.name} to ${npcName}.
    Describe the effects based on the type of prescription.
  `;
}

// Set the generated prescription prompt
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
          model: 'gpt-4o-mini',
          temperature: .2,
          messages: [
             ...(conversationHistory || []), 
            { role: 'user', content: prescriptionPrompt }
          ],
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

    // Now make a second API call to generate a summary with distinctive flavor
    const summaryPrompt = `
      Please summarize the following text with an overall summary of "Result: [emoji] [single word summing it up." Then add one sentence with a succinct, basic summary of what happened, but with vivid details for instance it should say exactly what the complications or impact was. Then a final short pithy sentence with a sardonic, biting wit and wisdom characteristic of Samuel Johnson or Mark Twain - but not too over the top. It should be 
      Emoji guidance: use one of the following emojis as appropriate to represent the result (💀 for death, 🩸 for injury, ✨ for miraculous cure, 😡 for a patient walking out due to price, 🤢 for marked nauseau or disgust or minor toxicity, 😐 if ineffective, 💸 for an extremely valuable prescription, 🚪 for when a patient leaves unhappy.). The summary should reflect the patient's response:
      ${simulatedOutput}
    `;

    const summaryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.4,
        messages: [
          { role: 'user', content: summaryPrompt }
        ],
      }),
    });

    if (!summaryResponse.ok) {
      throw new Error(`API Error: ${summaryResponse.statusText}`);
    }

    const summaryData = await summaryResponse.json();
    const journalSummary = summaryData.choices[0].message.content.trim();

 // Safeguard before adding journal entry
    if (typeof addJournalEntry === 'function') {
      addJournalEntry(`℞ Maria prescribed ${amount} drachms of **${item.name}** for **${price} reales** to **${npcName}**. ${journalSummary}`);
    } else {
      console.warn('addJournalEntry is not a function. Skipping journal entry.');
    }

  } catch (error) {
    console.error("Error during prescription:", error);

  } finally {
    setIsLoading(false);
  }
}, [currentPatient, conversationHistory, gameState, updateInventory, addJournalEntry, currentWealth, prescriptionType, handlePrescriptionOutcome]);

  const handlePrescribeClick = async () => {
    if (selectedItem) {
      setIsLoading(true);
      await handlePrescribe(selectedItem, amount, price);
      setIsLoading(false);
      onClose();
      setIsSummaryOpen(true);
    }
  };

  // Modify the function that handles the outcome after PrescribePopup
const handleSummaryContinue = () => {
  setIsSummaryOpen(false);
  setHistoryOutput(simulatedOutput);
  
  // Notify the parent component that the prescription is complete
  if (typeof onPrescriptionComplete === 'function') {
    onPrescriptionComplete(simulatedOutput);
  }

  setConversationHistory(prev => [
    ...prev,
    { role: 'user', content: prescriptionPrompt },
    { role: 'assistant', content: simulatedOutput },
  ]);

  setTurnNumber(prev => prev + 1);
  toggleInventory(false);
  setSelectedItem(null);
  setAmount(1);
  setPrice(0);
};


  return (
    <>
      {isOpen && !isSummaryOpen && (
        <div className="prescribe-popup">
          <div className="prescribe-content">
            <h2>🧪 Prescribe a Medicine</h2>
            <div ref={drop} className={`prescription-area ${isOver ? 'drag-over' : ''}`}>
              {selectedItem ? (
                <div className="selected-item">
                  <span className="emoji">{selectedItem.emoji || '❓'}</span>
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

            <h1 className="medieval-header">
              <span>{selectedItem?.name || 'Unknown Item'}</span>
              <br />
              <span className="spanish-name">({selectedItem?.spanishName || 'No Spanish name'})</span>
            </h1>

            <div className="item-emoji" style={{ fontSize: '4rem', textAlign: 'center' }}>
              {selectedItem?.emoji || '🍵'}
            </div>

            <p style={{ fontSize: '1.4rem', fontStyle: 'italic', textAlign: 'center', marginBottom: '15px' }}>
              {selectedItem?.latinName || 'No Latin name available'}
            </p>

            <p><strong>Humoral Qualities:</strong> {selectedItem?.humoralQualities || 'Unknown'}</p>
            <p><strong>Medicinal Effects:</strong> {selectedItem?.medicinalEffects || 'No known effects'}</p>
            <p>{selectedItem?.description || 'No description available'}</p>

            <button onClick={handleSummaryContinue}>Continue</button>
          </div>
        </div>
      )}
    </>
  );
}

export default PrescribePopup;
