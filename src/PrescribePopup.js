// PrescribePopup.js
import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import './PrescribePopup.css';

import oralImage from './assets/oral.jpg';
import inhaledImage from './assets/inhaled.jpg';
import topicalImage from './assets/topical.jpg';
import enemaImage from './assets/enema.jpg';

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
   const [selectedRoute, setSelectedRoute] = useState('');
   const [basePrice, setBasePrice] = useState(0); 

   const handleRouteSelect = (route) => {
    setSelectedRoute(route);
  };

  
  const routeImages = {
    Oral: oralImage,
    Inhaled: inhaledImage,
    Topical: topicalImage,
    Enema: enemaImage
  };


  // Update selectedItem when an item is dropped in
  useEffect(() => {
    if (selectedItem) {
      const updatedItem = inventory.find(
        i => i.name.toLowerCase() === selectedItem.name.toLowerCase()
      );
      if (updatedItem) {
        setSelectedItem(updatedItem); // Ensuring the updated item is set properly
        setBasePrice(updatedItem.price || 0); // Set the base price per drachm
        setPrice(updatedItem.price || 0); 
      }
    }
  }, [inventory, selectedItem]);

  // Automatically open inventory when the popup opens
  useEffect(() => {
    if (isOpen && toggleInventory) {
      toggleInventory(true);
    }
  }, [isOpen, toggleInventory]);

    // Automatically update the price when the amount changes
  useEffect(() => {
    setPrice(basePrice * amount);
  }, [amount, basePrice]);

  // Handle drop of item into prescription area
const [{ isOver }, drop] = useDrop({
  accept: ['inventoryItem', 'compoundItem'],
  drop: (item) => {
    const updatedItem = inventory.find(i => i.name.toLowerCase() === item.name.toLowerCase());
    if (updatedItem) {
      setSelectedItem(updatedItem);
      setBasePrice(updatedItem.price || 0); 
      setPrice(updatedItem.price || 0);  // Auto-populate the price based on the dropped item's price
    } else {
      console.warn('Dropped item not found in inventory:', item);
    }
  },
  collect: (monitor) => ({
    isOver: !!monitor.isOver(),
  }),
});

  // Function to handle prescription
 const handlePrescribe = useCallback(async (item, amount, price, route) => {
    if (!currentPatient) {
      console.error("No patient or NPC selected for prescription");
      setHistoryOutput("Error: No patient or NPC selected for prescription.");
      return;
    }

    if (!route) {
      console.error("No route of administration selected");
      setHistoryOutput("Error: Please select a route of administration.");
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
      Maria has administered ${amount} drachms of ${item.name} to Inquisitor Santiago Valdez via the ${route} route, attempting to treat his illness (syphilis). He has threatened violence if she fails or reveals his secret.
      This is a medical treatment rather than poison. Consider the appropriate dosage and the likely effects of the medicine.
      Using your extensive knowledge of early modern treatments and their effects, assess if the treatment will relieve his symptoms or cause dangerous side effects.
      Begin with a customized "headline" in h5 markdown font, either "Maria's treatment was successful. The condition of the Inquisitor improved." or "Maria's treatment failed. The condition of the Inquisitor worsened."
      Describe the sensory characteristics of the treatment, the Inquisitor's reaction, and the aftermath in 2-3 paragraphs. If the treatment is successful, the Inquisitor thanks Maria effusively and sends her on her way. If it failed, he arrests her for brujeria and jails her. Ensure historical accuracy regarding the type and effects of the treatment.
      Remember that this treatment is taking place in the personal residence of Valdez, not Maria's shop, and under extremely tense circumstances as the revelation of his syphilis would be catastrophic for him. There is notable tension and Maria wonders when the other shoe will drop - is her life at risk?
    `;
  } else if (prescriptionType === 'poison') {
    // Special poison prompt for the Inquisitor
    prescriptionPrompt = `
      Maria has administered ${amount} drachms of ${item.name} to Inquisitor Santiago Valdez via the ${route} route, treating his secret illness (syphilis). He has brought her to his residence under threat of violence if she fails or reveals his secret.
      This is an attempt to poison him rather than cure his illness. Consider the dosage and potential lethality of the poison.
      Using your extensive knowledge of early modern poisons and their effects, determine if the dose is sufficient to kill without causing suspicion.
      Begin with a customized "headline" in h5 markdown font, either "Maria's poison was successful. The Inquisitor has died." or "Maria's poison failed. The Inquisitor survived."
      Describe the sensory characteristics of the poison, the Inquisitor's reaction, and the aftermath in 2-3 paragraphs. If the poison is successful, Maria slips away by darting into a servant's door and making her way to the street. If the poison fails, she is imprisoned by the Inquisitor, who is enraged. Ensure historical accuracy regarding the type and effects of the poison.
    `;
  }
} else if (prescriptionType === 'treatment' || currentPatient.type === 'patient') {
  // General treatment prompt for other NPCs
  prescriptionPrompt = `
    Maria has administered ${amount} drachms of ${item.name} via the ${route} route for ${price} silver coins to ${npcName}.
    The transaction occurred at ${time} on ${date}, in ${location}. (This is context and should not be restated to the player.)
    Maria's current wealth is ${currentWealth} silver coins.

    Using your knowledge of early modern medicine and human biology, assess the safety and effectiveness of this prescription. Focus on the dosage, toxicity, and health condition of the NPC. Some prescriptions can cause an NPC to die or suffer disabling complications. 
    Be unsparing, detailed, and blunt in your descriptions of effects. If a drug causes diarrhea, go into detail! If it causes vomiting, likewise. Or if it does nothing, show disappointment (a patient might say something like "I should go to a real physician and be bled - that will fix it" or "I should have stayed in bed" or "That was... well, it didn't kill me, at least."). Or if it's a miracle cure, show an exuberant reaction of joy. 
    This is an educational game about history of medicine so pull no punches if a prescription is truly toxic. However, also be realistic: oral delivery of chamomile, or topical application of sugar, will never cause real complications, it simply won't work. Others like saffron or wine might be pleasant but mostly ineffective. 
    Same with relatively benign but odd things like crab's eyes. It's really in the realm of things like mercury (and other minerals) or opiates (and other narcotics or poisonous plants) that it becomes dangerous. Think carefully and draw on your knowledge before assessing the outcome. Some pontial reactions would be things along the lines of:
    "The cinchona powder burns as I drink it, but my headache fades soon after." "The poultice smells like earth, and the infection seems to be drawn out by it."  "The draught tastes foul, but I feel a bit better." ""The wine mixed with ground unicorn horn is bitter and expensive. I feel no result." "The bittersweet treacle sticks to my throat, and I fear it is worsening my humoral imbalance." "The smoke from this dried tobacco leaf is rather unpleasant, but I can breathe easier."

    Always begin your output with a clear and concise **headline** that summarizes your assessment of the prescription. For significant results, add a SINGLE emoji to symbolize the main message at the end. Use appropriate markdown formatting as follows:

    - **h3 markdown**: Use h3 markdown tags (###) for headlines where the effects are neutral, positive, or only slightly negative. For example, you might write: 
      ### Maria attempted an unconventional treatment that was somewhat effective ⚖
      or
      ### The prescription was revolting and led to minor complications 🤢
      or 
         ### The prescription was unpleasant but highly effective
      or ### The patient balked at the high price and walked out without paying 💸
      or ### The patient had a miraculous recovery! 🍀
      or ### The patient felt neutral effects ⚖️
      or ### The patient feels better - the treatment worked well.
      Or many others of your choice. 

    - **h5 markdown**: Use h5 markdown tags (#####) for headlines where the patient has suffered **serious harm** or a **fatal reaction**. When using h5:
      - If the patient **died**, always start with: ##### 💀 The patient has died! 💀
      - For more minor injuries, use something like:
        ##### The prescription seems to have failed... 
      - Remember that if a patient is likely to die in a turn, go with "The patient has died" as the headline. Be realistic and don't hold back.

    **Important:**
    - The headline must always appear as the first line of the output.
    - Ensure the markdown tags (### or #####) are correctly used at the start of the headline.
    - Do not restate the markdown tags or explain the headline in your output—just present the headline with the appropriate markdown tag.

    ### Patient Reactions:
    After the headline, describe the patient's experience over a period of three hours in 3 highly detailed paragraphs which emphasize vivid, historically authentic characterization and finely observed details:
    - Focus on the **sensory characteristics** of the medicine (e.g., taste, smell, texture). Always mention the route of administration and give specifics about how it was applied.
    - Show how the patient reacts to the prescribed dose, including the price. This might range from a miraculous cure to mild discomfort to violent reactions like vomiting or even death.
    - Describe the **perceived effects** of the medicine on the patient's health.
    - If the dose is toxic or fatal, be explicit about the timeline of how the patient worsens or dies.
    - If the price is particularly high (over 10 coins, say - though some patients may be able to afford more than this, it depends on the specific NPC) they may walk out without paying or taking the prescription at all. If so, describe this and remember that Maria does not receive any new coins in such a situation.

    ### Dosage & Effects:
    - One drachm of most medicines is usually safe, but two or more drachms of highly toxic substances (like quicksilver or laudanum) could lead to fatal outcomes. If the dose is fatal, show the NPC dying.
    - Angry reactions are common if the medicine is ineffective or causes discomfort, so show the patient's response accordingly.
    - Consider the patient's presumed weight and health AND the route of administration in assessing whether a dose is fatal or highly toxic. For instance, even a single drachm of inhaled quicksilver (mercury) is instantly fatal, as is quicksilver as an enema. However, topical quicksilver is fine. Many drugs are more potent in enema or inhaled form; even one drachm of inhaled opium might be fatal in a weak or small patient, or two drachms of oral. However, in any other situation patients are extremely enthusiastic about opium or opiates, declare themselves cured, and ask for more. Likewise with alcoholic spirits, which are almost always well received by patients but may not actually be a cure. Likewise with many alchemical compounds. 
    - Topical prescriptions are almost always successful (if applied to wounds or related ailments) and are never rejected or disliked by patients. 
    - If a patient dies, Maria has to figure out what to do with the body, sending her storyline into a much darker direction. 
    - Usually a cure will be ineffective or mildly effective. Benign things like wine, rose water, treacles, other sugared medicines, and aguas/distilled waters, plus camphor or herbs, are typically mildly effective. 

    Following the description, in italic markdown tags *like this*, give a short pithy historically authentic quote or proverb from the 17th century which relates to the prescription, if its a non-English original give the original language then translation in brackets. For instance: "The soul and body are like a house divided against itself." — Thomas Browne, "Religio Medici" (1643); "Mentre c'è vita, c'è speranza" -Italian proverb [Where there is life, there is hope]; "Omnia venena sunt, nec sine veneno quicquam existit" - Quintilian; "Hambre y frío curan cada desvarío."
Translation: Hunger and cold cure every madness.
Translation: All things are poison, and nothing is without poison.
Translation: While there is life, there is hope.
    Then rate the player's prescription with a score out of 10 (10=best possible prescription choice, 1=worst possible). At the end of the response, provide a summary of Maria's wealth, status, reputation, and the time (remember that at least three hours and possibly more have passed) in **this exact format** using markdown *italic* tags:

    **Now Maria has ${currentWealth + price} silver coins. She is feeling [single word status]. Her reputation is [emoji]. The time is # AM (or PM), xx [month] [year].**

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
    After documenting the effects, provide a final line tracking Maria's updated wealth, status, reputation, and the date and time at the VERY END of your response, displayed in bold, as explained below. ALWAYS PROGRESS TIME BY AT LEAST THREE TO FOUR HOURS.

    *Now Maria has [integer] silver coins (${currentWealth} + ${price} = ${currentWealth + price}). She is feeling [single word status]. Her reputation is [emoji]. The time is now # AM (or PM), xx [month] [year].*
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
          temperature: .8,
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
      Please summarize the following text with an overall summary of "Result: [emoji] [single word summing it up." Then add one sentence with a succinct, basic summary of what happened, but with vivid details for instance it should say exactly what the complications or impact was. 
      Emoji guidance: use one of the following emojis as appropriate to represent the result (💀 for death, 🩸 for injury, ✨ for miraculous cure, 😡 for a patient walking out due to price, 🤢 for marked nauseau or disgust or minor toxicity, 😐 if ineffective, 💸 for an extremely valuable prescription, 🚪 for when a patient leaves unhappy.). Also include the score out of 10. The summary should reflect the patient's response:
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
      addJournalEntry(`℞ Maria prescribed ${amount} drachms of **${item.name}** for **${price} reales** to **${npcName}** via the ${route} route. ${journalSummary}`);
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
    if (selectedItem && selectedRoute) {
      setIsLoading(true);
      await handlePrescribe(selectedItem, amount, price, selectedRoute);
      setIsLoading(false);
      onClose();
      setIsSummaryOpen(true);
    } else if (!selectedRoute) {
      alert("Please select a route of administration.");
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
  <>
    {/* Add the darkened overlay */}
    <div className="popup-overlay" />

    <div className={`prescribe-popup ${isLoading ? 'loading' : ''}`}>
      <div className="prescribe-content">
        <h2>🧪 Prescribe a Medicine</h2>
        <div ref={drop} className={`prescription-area ${isOver ? 'drag-over' : ''}`}>
          {selectedItem ? (
            <div className="selected-item">
              <span className="emoji">{selectedItem.emoji || '❓'}</span>
              <span>{selectedItem.name}</span>
              {selectedRoute && (
                <p className="selected-route"><i>{selectedRoute}</i></p>
              )}
            </div>
          ) : (
            <p>Drag an item here from the inventory to prescribe. And don't forget to set a price and select a route of administration!</p>
          )}
        </div>
        <div className="prescription-controls">
          <label>
            Amount (drachms):
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                const newAmount = Number(e.target.value);
                // Ensure the amount is never less than 1
                setAmount(newAmount < 1 ? 1 : newAmount);
              }}
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
        <div className="route-selection">
          <label>Select a route of administration:</label>
          <div className="route-buttons">
            {Object.entries(routeImages).map(([route, image]) => (
              <button
                key={route}
                className={`route-button ${selectedRoute === route ? 'selected' : ''}`}
                onClick={() => setSelectedRoute(route)}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <span>{route}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="prescription-buttons">
          <button onClick={handlePrescribeClick} disabled={!selectedItem || isLoading}>
            {isLoading ? 'Prescribing...' : 'Prescribe'}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  </>
)}


      {isSummaryOpen && (
         <div className="popup-overlay">
    <div className="popup-content summary-popup" onClick={(e) => e.stopPropagation()}>
      <h2 className="summary-title">Prescription Summary</h2>
      <p>
        Maria administered {amount} drachms of {selectedItem?.name} via the {selectedRoute} route for {price} reales.
        She waits expectantly to see what effect her treatment will have...

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
