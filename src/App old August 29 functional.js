import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import InputBox from './InputBox';
import TipBox from './TipBox';
import CritiqueAgent from './CritiqueAgent';
import Journal from './Journal';
import LoadingIndicator from './LoadingIndicator';
import ReactMarkdown from 'react-markdown';
import SimulationHistory from './SimulationHistory';
import { inventoryData } from './Inventory';
import { generateJournalEntry } from './journalAgent';
import PortraitSection from './PortraitSection';
import Mixing from './Mixing';
import { InventoryPane } from './InventoryPane';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useGameState } from './gameState';
import EntityList from './EntityList';
import ContentGuide from './ContentGuide';
import CommonplaceBook from './CommonplaceBook';
import Symptoms from './Symptoms';
import PrescribePopup from './PrescribePopup';
import { assessPrescription, assessGameplay } from './AssessmentAgent';
import imageMap from './imageMap';
import CounterNarrative from './CounterNarrative'; // Import your new component
import './App.css';
import './Inventory.css';
import './Popup.css';

function App() {
const { gameState, updateInventory, addCompoundToInventory } = useGameState(inventoryData, 15);

  const [isPrescribeOpen, setIsPrescribeOpen] = useState(false);
  const [showEndGamePopup, setShowEndGamePopup] = useState(false);
  const [gameAssessment, setGameAssessment] = useState('');
  const [simples, setSimples] = useState(inventoryData);
  const [npcImage, setNpcImage] = useState(imageMap.shopmorning);
  const [npcCaption, setNpcCaption] = useState("Maria's apothecary shop");
  const [currentPatient, setCurrentPatient] = useState(null);
  const [npcInfo, setNpcInfo] = useState("Maria's apothecary shop is located on the bustling Calle de la Amargura in Mexico City, serving a wide range of clientele from all walks of life.");
  const [historyOutput, setHistoryOutput] = useState('');
  const [userInput, setUserInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [showCounterNarrative, setShowCounterNarrative] = useState(false);
  const [journal, setJournal] = useState([]);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [turnNumber, setTurnNumber] = useState(1);
  const [location, setLocation] = useState('Mexico City');
  const [date, setDate] = useState('August 22, 1680');
  const [time, setTime] = useState('Morning');
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [showJournalEntryBox, setShowJournalEntryBox] = useState(false);
  const [customJournalEntry, setCustomJournalEntry] = useState('');
  const [compounds, setCompounds] = useState([]);
  const [showMixingPopup, setShowMixingPopup] = useState(false);
  const [isCommonplaceBookOpen, setIsCommonplaceBookOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [showSymptomsPopup, setShowSymptomsPopup] = useState(false);
  const [selectedNpcName, setSelectedNpcName] = useState('');
  const [isPrescribing, setIsPrescribing] = useState(false);
  const [isPrescribePopupOpen, setIsPrescribePopupOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [showContentGuide, setShowContentGuide] = useState(false);

// Toggle functions


  const handleClosePrescribePopup = () => {
  setIsPrescribing(false);
  setIsPrescribePopupOpen(false);
};
   const toggleCounterNarrative = useCallback(() => {
        setShowCounterNarrative((prev) => !prev);
    }, []);

  const toggleContentGuide = useCallback(() => {
    setShowContentGuide((prev) => !prev);
  }, []);

  const toggleMixingPopup = useCallback(() => {
    setShowMixingPopup((prev) => !prev);
  }, []);

  const toggleInventory = useCallback(() => {
    setIsInventoryOpen((prev) => !prev);
  }, []);

const closeSymptomsPopup = useCallback(() => {
  setShowSymptomsPopup(false);
  setSelectedNpcName('');
}, []);

  const toggleCommonplaceBook = () => {
    setIsCommonplaceBookOpen((prev) => !prev);
  };

  const toggleJournal = useCallback(() => {
    setIsJournalOpen((prev) => !prev);
  }, []);

  const toggleHistory = useCallback(() => {
    setIsHistoryOpen((prev) => !prev);
  }, []);

  const toggleJournalEntryBox = useCallback(() => {
    setShowJournalEntryBox((prev) => !prev);
  }, []);

  const handleJournalEntrySubmit = useCallback(() => {
    if (customJournalEntry.trim()) {
      setJournal((prevJournal) => [...prevJournal, { content: customJournalEntry.trim(), type: 'human' }]);
      setCustomJournalEntry('');
      setShowJournalEntryBox(false);
    }
  }, [customJournalEntry]);

  const addJournalEntry = useCallback((entry) => {
    setJournal((prevJournal) => [...prevJournal, { content: entry, type: 'auto' }]);
  }, []);

  // End game handling

  const handleEndGame = useCallback(async () => {
  setIsLoading(true);

  try {
    const assessment = await assessGameplay(turnNumber, gameState.inventory[0].quantity, gameState.inventory, journal);
    setGameAssessment(assessment);
    setShowEndGamePopup(true);
  } catch (error) {
    console.error('Error generating game assessment:', error);
    setGameAssessment('An error occurred during the assessment.');
    setShowEndGamePopup(true);
  } finally {
    setIsLoading(false);
  }
}, [turnNumber, gameState.inventory, journal]);


// Initial Descriptions and Effects
useEffect(() => {
  const initialDescription = `
    You are Maria de Lima, apothecary. You awaken to the first rays of dawn filtering through the window of your quarters above your shop on Calle de la Amargura in Mexico City.  
    &nbsp;   
    Descending a rough-hewn ladder, you light a tallow candle which casts flickering shadows across your shop. Shelves line the walls, laden with jars of dried herbs, vials of tinctures, and small boxes of precious powders. As always, you begin your day by grinding cacao, cornmeal, and cinnamon in a well-worn *molcajete*, preparing a stimulating drink to clear your mind for the day ahead. your mind wanders to your mounting debts and your urgent need for new business.    
    &nbsp;  
    Next, you feed some scraps of dried fish to a friendly street cat—an orange fluff ball, little more than a kitten, who you've named João. [*João purrs contentedly.*]  
    &nbsp;  
    Meanwhile, the street outside comes to life. Servants hurry past with baskets of fresh produce, while a group of Dominican friars makes their way towards the nearby church, their white habits a stark contrast to the dusty street. A water-carrier with his earthen jug trudges by, followed by a group of boisterous students. A patrol of soldiers carrying pikes is a reminder of troubling rumors – whispers of the Inquisition's renewed fervor in the city and unsettling news of unrest in the northern provinces.  
    &nbsp;  
    **Just as you begin to sort through your supply of aloe leaves, a sharp *knock* at the door announces the day's first patient. Will you see who is there, or ignore them?**
  `;
  setHistoryOutput(initialDescription.trim());
  setConversationHistory([{ role: 'system', content: initialDescription.trim() }]);
}, []);

useEffect(() => {
  console.log('NPC Image updated:', npcImage);
}, [npcImage]);

// Entity Selection
const selectEntity = useCallback(() => {
  if (turnNumber === 1) {
    // On the first turn, choose a random patient to visit.
    const patients = EntityList.filter(entity => entity.type === 'patient');
    return patients[Math.floor(Math.random() * patients.length)];
  } else if (turnNumber > 1 && Math.random() < 0.2) { // Adjust the probability as needed
    // On subsequent turns, choose a random entity from the entire EntityList.
    return EntityList[Math.floor(Math.random() * EntityList.length)];
  }
  return null;
}, [turnNumber]);



// Handling Turn End
const handleTurnEnd = useCallback(async (narrativeText) => {
  const { summary, summaryData, npcImageName, inventoryChanges } = await generateJournalEntry(narrativeText, process.env.REACT_APP_OPENAI_API_KEY);

  console.log('Journal Agent Output:', summary);
  console.log('NPC Image Name from Journal Agent:', npcImageName);

  // find selected entity based on npc image name

  let selectedEntity = EntityList.find(entity => entity.image && entity.image.toLowerCase() === npcImageName.toLowerCase());

  // Update NPC image, caption, and info based on the selected entity or summary data
  if (selectedEntity) {
      setNpcImage(imageMap[selectedEntity.image]);
      setNpcCaption(selectedEntity.caption);
      setNpcInfo(selectedEntity.description);
  } else {
      if (imageMap[npcImageName]) {
          setNpcImage(imageMap[npcImageName]);
          setNpcCaption(`Image of ${npcImageName}`);
          setNpcInfo(`No specific information available for ${npcImageName}.`);
      } else {
          setNpcImage(imageMap.default);
          setNpcCaption(`Scene in ${summaryData.location || location}`);
          setNpcInfo("No specific information available for this scene.");
      }
  }

  setJournal(prevJournal => [...prevJournal, { content: summary, type: 'auto' }]);

  setLocation(summaryData.location || location);
  setDate(summaryData.date || date);
  setTime(summaryData.time || time);
}, [location, date, time]);

// Handling Submission
const handleSubmit = useCallback(async (e) => {
  e.preventDefault();

  setIsLoading(true);
  let narrativeText = userInput.trim().toLowerCase(); // Convert to lowercase for easier matching

  

  // Detect #symptoms command
  if (narrativeText.startsWith('#symptoms')) {
    const npcName = narrativeText.split(' ')[1] || npcCaption.split(',')[0];
    if (npcName) {
      setSelectedNpcName(npcName);
      setShowSymptomsPopup(true);
      setUserInput('');
      setIsLoading(false);
      return;
    } else {
      setHistoryOutput('No NPC is currently selected.');
      setUserInput('');
      setIsLoading(false);
      return;
    }
  }

  // Detect #prescribe command
  if (narrativeText.startsWith('#prescribe')) {
    const npcName = narrativeText.split(' ')[1] || npcCaption.split(',')[0];
    const patient = EntityList.find(entity => 
      entity.type === 'patient' && entity.name.toLowerCase().includes(npcName.toLowerCase())
    );

    if (patient) {
      setCurrentPatient(patient);
      setIsPrescribing(true);
      setIsInventoryOpen(true);
      setIsPrescribePopupOpen(true);
      setUserInput('');
      setIsLoading(false);
      return;
    } else {
      setHistoryOutput('No valid patient selected for prescription.');
      setUserInput('');
      setIsLoading(false);
      return;
    } 
  }

  const selectedEntity = selectEntity();
  if (selectedEntity) {
    narrativeText += `\n\nA new character has entered the scene: ${selectedEntity.name}, ${selectedEntity.age} years old, ${selectedEntity.occupation}. ${selectedEntity.description}`;
  }

  const inventorySummary = gameState.inventory
    .filter((item) => item.quantity > 0)
    .map((item) => `• ${item.name}: ${item.quantity}`)
    .join('\n');

  const contextSummary = `
    Current Location: ${location}
    Current Date: ${date}
    Current Time: ${time}
    Turn Number: ${turnNumber}
    Inventory: 
    ${inventorySummary}
  `;

  const newMessage = { role: 'user', content: narrativeText };
  const newHistory = [...conversationHistory, newMessage];

  const historyAgentPrompt = `
    Context: 
    ${contextSummary}

    Conversation History:
    ${newHistory
      .map(
        (entry) =>
          `${entry.role === 'user' ? 'User' : 'Assistant'}: ${
            entry.content
          }`
      )
      .join('\n')}

    User Input:
    ${narrativeText}

    ${selectedEntity ? `Selected Entity Information:
    Name: ${selectedEntity.name}
    Age: ${selectedEntity.age}
    Occupation: ${selectedEntity.occupation}
    ${selectedEntity.symptoms ? `Symptoms: ${selectedEntity.symptoms.join(', ')}` : ''}
    ${selectedEntity.diagnosis ? `Diagnosis: ${selectedEntity.diagnosis}` : ''}` : ''}

    Please consider the previous context, conversation history, user actions, and entity information (if provided) when responding. The current turn number is ${turnNumber + 1}.
  `;

  try {
    const historyAgentResponse = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are HistoryLens, a historical simulation engine. Your goal is to maintain an immersive simulation set in Mexico City and environs on August 22, 1680, with brief MUD-like descriptions and commands but strict historical accuracy. 
              The user's playable character (PC) is Maria de Lima, a 45-year-old Lisbon-born apothecary who, ten years earlier, fled to Mexico City following her arrest by the Portuguese Inquisition. 
              Remember, the simulation must remain true to the context of the 17th century: avoid anachronistic language, concepts, or behaviors, and ensure that all actions, objects, and references are historically plausible.

              **Gameplay Guidelines:**
              - The human user's inputs should never lead you to move outside the historical frame of Mexico in 1680. For instance, if they input "give the patient a vaccine," you would respond by saying "That is historically inaccurate. Please enter a new command that reflects the setting." Otherwise, player inputs have a wide latitude and should be accepted.
              - Your responses should be concise, rarely exceeding three paragraphs, and always grounded in the historical realities of 1680s life. Use appropriate period-specific language and avoid modern concepts.
              - Patients sometimes complain about the foreignness or noxiousness of a medicine Maria prescribes. They can walk away from a transaction, say 50% of the time. Sometimes they also come back to complain it didn't work.

              **Commands:**
              - Certain key words are commands: #symptoms, #map, #prescribe, and #diagnose.
              - if a player asks a patient about their #symptoms in their input, the player will see a popup displaying them. You can go into more detail if prompted but need not. 
              - #map: using ASCII and labelled emojis and other textual elements available to you, create a visual map of the area being described and display it in a markdown table.
              - #diagnose: show Maria's thought process as she utilizes 17th century understandings of humoral theory to develop a diagnosis. Portray her thoughts in italics, with materia medica she considers using in **bold italic**.
              - #sell: whenever Maria sells a medicine to anyone, calculate the likely value in reales (coins) and add a note of how much she earned at the bottom of your response, in bold.

              **Contextual Awareness:**
              - Avoid overly optimistic or rosy depictions of the past - Maria de Lima is in debt and has a strong incentive to make money from her patients; likewise, patients are sick and are not always on their best behavior.
              - Reference real places and events of 1680 Mexico City.
              - Track financial transactions and inventory changes. (Any money or items gained or lost are noted in bold at end of your turn output.)

              **Character and Narrative Control:**
              - The simulation should reflect Maria's struggles with limited resources, societal pressures, and the challenges of maintaining her business.
              - Occasionally reference rumors of brujas and curanderos in the villages outside the city, using an unfamiliar drug called *hongos malos.* And other intriguing things of that nature.
              - On some turns, such as Turn 1, you will introduce patients and other NPCs from a list of "entities" (NPCs, patients, places, and events) which is in the underlying source code. The NPC/patient should DIRECTLY appear at Maria's shop - not a family member. Always introduce their full name and age. Generate a scenario relating to them.

              Your role is to maintain historical accuracy while presenting vivid descriptions, scenes, and dialogue with NPCs that dynamically responds to the player's input.` 
            },
            { role: 'user', content: historyAgentPrompt },
          ],
        }),
      }
    );

    if (!historyAgentResponse.ok) {
      throw new Error(`API Error: ${historyAgentResponse.statusText}`);
    }

    const historyAgentData = await historyAgentResponse.json();
    const simulatedHistoryOutput = historyAgentData.choices[0].message.content;

    await handleTurnEnd(simulatedHistoryOutput);

    setHistoryOutput(simulatedHistoryOutput);
    setConversationHistory([...newHistory, { role: 'assistant', content: simulatedHistoryOutput }]);
    setTurnNumber(turnNumber + 1);

  } catch (error) {
    console.error("Error fetching data:", error);
    setHistoryOutput(`An error occurred: ${error.message}`);
  } finally {
    setIsLoading(false);
  }

  setUserInput('');
}, [
  conversationHistory, 
  date, 
  location, 
  time, 
  turnNumber, 
  userInput,
  handleTurnEnd,
  selectEntity,
  npcCaption
]);


  const handlePrescribe = useCallback(async (item, amount, price) => {
    setIsLoading(true);
    setIsPrescribing(false);
    setIsInventoryOpen(false);
    setIsPrescribePopupOpen(false);

    if (!currentPatient) {
      console.error("No patient selected for prescription");
      setHistoryOutput("Error: No patient selected for prescription.");
      setIsLoading(false);
      return;
    }

    const prescriptionPrompt = `
      Maria has prescribed ${amount} drachms of ${item.name} for ${price} silver coins to ${currentPatient.name}.
      The patient's reaction should be based on their background and the appropriateness of the prescription for their condition. 2-3 silver coins is fair for most remedies. Up to 50 for complex compounds.
      Based on context, determine if the patient accepts the prescription with reservations (often), wants to bargain (infrequent), or balks and walks away (somewhat frequent). Describe their reaction and any following dialogue or actions. A bad cure or high price will prompt angry walkouts.
    `;

    try {
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

      setHistoryOutput(prevOutput => prevOutput + "\n\n" + simulatedOutput);
      setConversationHistory(prevHistory => [...prevHistory, 
        { role: 'user', content: prescriptionPrompt },
        { role: 'assistant', content: simulatedOutput }
      ]);

      // Only update inventory if the prescription is accepted
      if (simulatedOutput.toLowerCase().includes("accepts")) {
        updateInventory({ name: item.name, quantity: -amount });
      }

      addJournalEntry(`Maria prescribed ${amount} drachms of ${item.name} for ${price} silver coins to ${currentPatient.name}.`);

    } catch (error) {
      console.error("Error fetching data:", error);
      setHistoryOutput(`An error occurred: ${error.message}`);
    } finally {
      setCurrentPatient(null);
      setIsLoading(false);
    }
  }, [currentPatient, conversationHistory, updateInventory, addJournalEntry]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <Header />
        <PortraitSection 
          npcImage={npcImage}
          npcCaption={npcCaption}
          npcInfo={npcInfo}
          pcCaption="Playing as Maria de Lima" 
          pcInfo={(
              <div>
                <strong>Name:</strong> Maria de Lima: the Playable Character<br/>
                <strong>Age:</strong> 45<br/>
                <strong>Birthplace:</strong> Coimbra, Portugal<br/><br/>
                <strong>Biography:</strong> Maria, a skilled apothecary, has been living in Mexico City for the past 10 years after she was charged with heresy and deported from Portugal by the Inquisition. Born into a <i>converso</i> family, she is well-versed in the hybrid of alchemical and Galenic medicine practiced in mid-seventeenth-century Iberia.<br/><br/>
                Maria is based on the real-life historical figure of Maria Coelho, who had a similar background and life history but who disappears from the historical record following her deportation from Portugal by the Inquisition in 1669. She was last recorded as bound for Brazil. You can read more about the real-life Maria <a href="https://recipes.hypotheses.org/4710" target="_blank" rel="noopener noreferrer">here</a>.
                <br/><br/>
                <img src={require('./assets/mariacoelho.jpeg')} alt="Maria Coelho" style={{ maxWidth: '100%', height: 'auto' }} />
              </div>
            )}
        />
        <div className="main-content">
          <div className="history-agent">
            <div className="counter">
              <p>
                {location.toUpperCase()} | {time.toUpperCase()}, {date.toUpperCase()} | TURN {turnNumber}
              </p>
            </div>

            <div className={`output-box ${isLoading ? 'loading' : ''}`}>
              {isLoading ? <LoadingIndicator /> : <ReactMarkdown>{historyOutput}</ReactMarkdown>}
            </div>
            <button onClick={toggleHistory}>Simulation History</button>
            <button 
              className="view-counter-button"
              onClick={toggleCounterNarrative}
            >
              {showCounterNarrative ? 'Hide' : 'View'} Counter-Narrative
            </button>
          </div>

          <div className="interaction-section">
            <InputBox
              userInput={userInput}
              setUserInput={setUserInput}
              handleSubmit={handleSubmit}
            />
            <TipBox />
            <button 
              onClick={toggleJournal} 
              className="view-journal-button"
            >
              View Journal
            </button>
            <button 
              onClick={toggleJournalEntryBox} 
              className="add-entry-button"
            >
              Custom Journal Entry
            </button>
            <button 
              onClick={toggleInventory} 
              className="view-inventory-button"
            >
              View Inventory
            </button>
            
            <button 
              onClick={toggleContentGuide} 
              className="content-guide-button"
            >
              Content Guide
            </button>
            
            <button 
              className="commonplace-book-button"
              onClick={toggleCommonplaceBook}
            >
              Commonplace Book
            </button>
            <button 
              className="mix-drugs-button"
              onClick={toggleMixingPopup}
            >
              Mix Drugs
            </button>
              <button 
            className="end-game-button"
            onClick={handleEndGame}
          >
            End Game
          </button>

          </div>
        </div>
        
           {showCounterNarrative && (
          <CounterNarrative historyOutput={historyOutput} />
        )}

        {showSymptomsPopup && (
          <Symptoms npcName={selectedNpcName} onClose={closeSymptomsPopup} />
        )}

        {showJournalEntryBox && (
          <div className="journal-entry-box">
            <textarea
              value={customJournalEntry}
              onChange={(e) => setCustomJournalEntry(e.target.value)}
              placeholder="Write your journal entry here..."
              className="journal-entry-input"
            />
            <button onClick={handleJournalEntrySubmit}>Submit Entry</button>
          </div>
        )}

        {showMixingPopup && (
          <div className="mixing-popup">
            <div className="mixing-popup-content">
              <Mixing 
                simples={gameState.inventory} 
                addCompoundToInventory={addCompoundToInventory} 
                updateInventory={updateInventory}
                apiKey={process.env.REACT_APP_OPENAI_API_KEY} 
                addJournalEntry={addJournalEntry}
              />
              <button className="close-mixing-button" onClick={toggleMixingPopup}>Close</button>
            </div>
          </div>
        )}

        <InventoryPane 
            inventory={gameState.inventory}
            isOpen={isInventoryOpen}
            toggleInventory={toggleInventory}
            isPrescribing={isPrescribing}
        />
        
     <PrescribePopup 
  isOpen={isPrescribePopupOpen}
  onClose={handleClosePrescribePopup} // Use the new function here
  onPrescribe={handlePrescribe}
  inventory={gameState.inventory}
/>

        
  

        {showContentGuide && (
          <ContentGuide isOpen={showContentGuide} toggleContentGuide={toggleContentGuide} />
        )}

        {isCommonplaceBookOpen && (
          <CommonplaceBook 
            isOpen={isCommonplaceBookOpen} 
            toggleCommonplaceBook={toggleCommonplaceBook}  
          />
        )}

        {isJournalOpen && (
          <Journal journal={journal} isOpen={isJournalOpen} toggleJournal={toggleJournal} />
        )}

        {isHistoryOpen && (
          <SimulationHistory history={conversationHistory} isOpen={isHistoryOpen} toggleHistory={toggleHistory} />
        )}
      </div>
    </DndProvider>
  );
}

export default App;

