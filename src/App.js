import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Header';
import Colophon from './Colophon'; // Import the new Colophon component
import InputBox from './InputBox';
import TipBox from './TipBox';
import CritiqueAgent from './CritiqueAgent';
import Journal from './Journal';
import LoadingIndicator from './LoadingIndicator';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SimulationHistory from './SimulationHistory';
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
import WealthTracker from './WealthTracker';
import Symptoms from './Symptoms';
import PrescribePopup from './PrescribePopup';
import { assessPrescription, assessGameplay } from './AssessmentAgent';
import About from './About';  
import imageMap from './imageMap';
import CounterNarrative from './CounterNarrative'; 
import NavMobile from './NavMobile';
import Diagnose from './Diagnose'; 
import Map from './Map';
import Quest, { quests } from './Quest';
import { initialInventoryData, potentialInventoryItems } from './initialInventory';
import './App.css';
import './Inventory.css';
import './Popup.css';


function App() {
  const { gameState, updateInventory, addCompoundToInventory, generateNewItemDetails, startQuest, advanceQuestStage, completeQuest } = useGameState();

  const [isPrescribeOpen, setIsPrescribeOpen] = useState(false);
  const [showEndGamePopup, setShowEndGamePopup] = useState(false);
  const [showIncorporatePopup, setShowIncorporatePopup] = useState(false);
  const [gameAssessment, setGameAssessment] = useState('');
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
  const [incorporatedContent, setIncorporatedContent] = useState('');
  const [isAboutOpen, setIsAboutOpen] = useState(false); 
  const [showColophon, setShowColophon] = useState(false);
  const [llmResponse, setLlmResponse] = useState('');
  const [mariaStatus, setMariaStatus] = useState('rested'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Hamburger menu state
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
    const [isDiagnoseOpen, setIsDiagnoseOpen] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
  const handleStatusChange = (newStatus) => {
    setMariaStatus(newStatus);
  };
  const [userActions, setUserActions] = useState([]);
  const [activeQuest, setActiveQuest] = useState(null);



// Toggle functions


const handleIncorporate = (content) => {
    setIncorporatedContent(content);
    setShowIncorporatePopup(true);
    setTimeout(() => setShowIncorporatePopup(false), 2000); // Hide after 2 seconds
};


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

  const toggleColophon = () => {
        setShowColophon(prev => !prev);
    };

    const toggleAbout = () => setIsAboutOpen(!isAboutOpen);

    const toggleMenu = () => {
  setIsMenuOpen(prev => !prev);
};

const toggleDiagnose = useCallback(() => {
    setIsDiagnoseOpen((prev) => !prev);
  }, []);
const toggleMap = useCallback(() => {
  setIsMapOpen((prev) => !prev);
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


// Initial description of Maria and NPC image
useEffect(() => {
  const initialDescription = `
    You are Maria de Lima, apothecary. You awaken to the first rays of dawn filtering through the window of your quarters above your shop on Calle de la Amargura in Mexico City.  
    &nbsp;   
    Descending a rough-hewn ladder, you light a tallow candle. Shelves line the walls of your shop, laden with jars of dried herbs and vials of tinctures. As always, you begin your day by grinding cacao, cornmeal, and cinnamon in a *molcajete*, making a drink to prepare you for the day ahead. Your mind wanders to your mounting debts, which now top 120 *reales*, and your urgent need for new business.    
    &nbsp;  
    Next, you feed some scraps of fish to a friendly street cat—an orange fluff ball, little more than a kitten, who you've named João.  
    &nbsp;  
    Meanwhile, the street outside comes to life. Servants hurry past with baskets of fresh produce, while a group of Dominican friars makes their way towards the nearby church. A water-carrier with his earthen jug trudges by, followed by a group of boisterous students. A patrol of soldiers carrying pikes is a reminder of troubling rumors – whispers of unrest in the northern provinces.  
    &nbsp;  
    **Just as you begin to sort through your supply of aloe leaves, a sharp *knock* at the door announces the day's first visitor. Will you see who is there, or ignore them?**
  `;
  setHistoryOutput(initialDescription.trim());
  setConversationHistory([{ role: 'system', content: initialDescription.trim() }]);
}, []);

// effects

useEffect(() => {
  console.log('NPC Image updated:', npcImage);
}, [npcImage]);

useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

// command detection
const handleCommandClick = (command) => {
  const npcName = npcCaption.split(',')[0]; // Assuming the NPC name is in the caption

  switch (command) {
    case '#symptoms':
      if (npcName) {
        setSelectedNpcName(npcName);
        setShowSymptomsPopup(true);
      } else {
        setHistoryOutput('No NPC is currently selected.');
      }
      break;

    case '#prescribe':
    case '#diagnose':
      const patient = EntityList.find(entity => 
        entity.type === 'patient' && entity.name.toLowerCase().includes(npcName.toLowerCase())
      );
      if (patient) {
        setCurrentPatient(patient);
        if (command === '#prescribe') {
          setIsPrescribing(true);
          setIsInventoryOpen(true);
          setIsPrescribePopupOpen(true);
        } else {
          setIsDiagnoseOpen(true);
        }
      } else {
        setHistoryOutput(`No valid patient selected for ${command === '#prescribe' ? 'prescription' : 'diagnosis'}.`);
      }
      break;

    default:
      setUserInput(command);
      handleSubmit({ preventDefault: () => {} }); // Automatically submit the command
  }
};

const [commandsDetected, setCommandsDetected] = useState({
  prescribe: false,
  symptoms: false,
  diagnose: false,
  map: false,
  buy: false,
  // Add more commands as needed
});

useEffect(() => {
  const newCommandsDetected = {
    prescribe: historyOutput.includes('#prescribe'),
    symptoms: historyOutput.includes('#symptoms'),
    diagnose: historyOutput.includes('#diagnose'),
    map: historyOutput.includes('#map'),
    buy: historyOutput.includes('#buy'),
    // Add more commands as needed
  };
  setCommandsDetected(newCommandsDetected);
}, [historyOutput]);

// quest start check 

useEffect(() => {
    const checkForQuestStart = (currentTime) => {
      const availableQuests = quests.filter(quest => !quest.completed);
      const questToStart = availableQuests.find(quest => quest.trigger(turnNumber, userActions, location, currentTime));
      if (questToStart) {
        startQuest(questToStart);
      }
    };

    checkForQuestStart(time);
  }, [turnNumber, userActions, location, startQuest, time]);



// Entity Selection

const selectEntity = useCallback(() => {
  // Check if the current turn is one of the specified turns
  const specialTurns = [7, 11, 14, 19];
  const isSpecialTurn = specialTurns.includes(turnNumber);

  if (turnNumber === 1) {
    // On the first turn, choose a random patient to visit.
    const patients = EntityList.filter(entity => entity.type === 'patient');
    return patients[Math.floor(Math.random() * patients.length)];
  } else if (isSpecialTurn && Math.random() < 0.4) {
    // On special turns, there's a 40% chance to summon the Inquisitor
    const inquisitor = EntityList.find(entity => entity.name === 'Assistant Inquisitor Fernando de Toledo');
    return inquisitor;
  } else if (turnNumber > 1 && Math.random() < 0.15) {
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

// handle quest progression
const activeQuest = gameState.quests.find(quest => quest.currentStage !== undefined && !quest.completed);
if (activeQuest) {
  // Check if the quest should progress based on some condition
  // This could be a property of the quest, or based on player actions
  if (shouldAdvanceQuest(activeQuest, userActions)) {
    advanceQuestStage(activeQuest.id);
  }
  
  // Check if the quest is completed after advancing
  if (activeQuest.currentStage >= activeQuest.stages.length - 1) {
    completeQuest(activeQuest.id);
  }
}

setLocation(summaryData.location || location);
setDate(summaryData.date || date);
setTime(summaryData.time || time);
}, [location, date, time, gameState.quests, advanceQuestStage, completeQuest, userActions]);

// Helper function to determine if a quest should advance
const shouldAdvanceQuest = (quest, actions) => {
  // This is a placeholder implementation
  // You should replace this with your own logic based on your game's requirements
  return actions.some(action => action.includes(`advanceQuest${quest.id}`));
};

// Handling Submission
const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  let narrativeText = userInput.trim().toLowerCase(); // Convert to lowercase for easier matching

  // Step 1: Prepare the inventory summary for the history agent
  const inventorySummary = gameState.inventory.map(item => 
    `${item.name} (Quantity: ${item.quantity}, Price: ${item.price} silver coins)`
  ).join('\n');
  
  // Check for quest start commands
 if (narrativeText.startsWith('quest')) {
  const questNumber = parseInt(narrativeText.replace('quest', ''));
  if (!isNaN(questNumber)) {
    const questToStart = quests.find(quest => quest.id === questNumber);
    if (questToStart) {
      startQuest(questToStart);
      setActiveQuest(questToStart);
      setHistoryOutput(prev => `${prev}\n\nStarting Quest: ${questToStart.name}`);
      setUserActions(prevActions => [...prevActions, `#startQuest${questNumber}`]); // Add this line
      setUserInput('');
      setIsLoading(false);
      return;
    }
  }
}
  

  // Add this line to track user actions
  setUserActions(prevActions => [...prevActions, narrativeText]);

  // Normalize the command by removing the hashtag if present
  const command = narrativeText.startsWith('#') ? narrativeText.substring(1) : narrativeText;

  if (command === 'diagnose' || command === 'buy' || command === 'map') {
    // These commands should trigger the LLM for response
    // No need to set the output manually here
  }

  // Detect symptoms command
  if (command.startsWith('symptoms')) {
    const npcName = command.split(' ')[1] || npcCaption.split(',')[0];
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

  // Detect prescribe command
  if (command.startsWith('prescribe')) {
    const npcName = command.split(' ')[1] || npcCaption.split(',')[0];
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




const contextSummary = `
    Current Location: ${location}
    Current Date: ${date}
    Current Time: ${time}
    Turn Number: ${turnNumber}
    ${incorporatedContent ? `\nIncorporated Critique:\n${incorporatedContent}` : ''}
    Inventory:
    ${inventorySummary}  // Add the inventory summary here
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
              Remember, the simulation must remain true to the context of the 17th century: avoid anachronistic language and concepts, and ensure that all actions, objects, and references are historically plausible.

              **Gameplay Guidelines:**
              - The human user's inputs should never lead you to move outside the historical frame of Mexico in 1680. For instance, if they input "give the patient a vaccine," you would respond by saying "That is historically inaccurate. Please enter a new command that reflects the setting." Otherwise, player inputs have a wide latitude and should be accepted.
              - Your responses should be concise, rarely exceeding three paragraphs, and always grounded in the vivid, sensory historical realities of 1680s life. Use appropriate period-specific language and avoid modern concepts.
              - Patients sometimes complain about the foreignness or noxiousness of a medicine Maria prescribes. They are often in a bad mood. Maria/the player needs to converse with them to draw out relevent details. 

              **Commands:**
              - Certain key words are commands: #symptoms, #prescribe, #diagnose, and #buy. In addition to suggesting a plausible course of action, like "perhaps you could ask her more about her illness" or "the herbs you need might be at the market" you might suggest up to three specific commands whenever contextually appropriate (when NPCs seek medical care, suggest #symptoms,  #diagnose, and #prescribe - however if Maria wants to poison someone, #prescribe may be suggested too). #buy is suggested whenever items for sale may be nearby.
              - if a player asks a patient about their #symptoms in their input, the player will see a popup displaying them. You can go into more detail if prompted but need not. 
              - #buy: herbs are available at the market. ALWAYS provide a markdown list, with name, brief description, and price in silver coins, of all herbs, medicines, or drugs for sale nearby. Approved items that Maria can buy are: "Peyote", "Peyotl", "Hongos Malos", "Ayahuasca", "Epazote", "Cochineal", "Tobacco", "Arnica", "Violets", 
    "Nutmeg", "Thyme", "Pennyroyal", "Sage", "Guaiacum", "Cinchona", "Ginger", "Angelica", "Lavender", 
    "Wormwood", "Burdock", "Celandine", "Cardamom", "Coriander", "Myrrh", "Cloves", "Cinnamon", "Fennel", 
    "Rhubarb", "Licorice Root", "Mugwort", "Oregano", "Passionflower", "Rhubarb", "St. John's Wort", 
    "Yarrow", "Valerian", "Calendula", "Mullein", "Echinacea", "Anise", "Chamiso", "Sassafras", 
    "Marshmallow Root", "Mandrake", "Blackberry Root", "Lemon Balm", "Spearmint", "Willow Bark", "Comfrey", 
    "Hyssop", "Wine", "Ginger", "Chili", "Aloe Vera", "Peppermint", "Nightshade"

              **Contextual Awareness:**
              - Avoid overly optimistic or rosy depictions of the past - Maria de Lima is in debt and has a strong incentive to make money from her patients; likewise, patients are sick and often annoyed. Maria is in a desperate personal and financial state.
              - Reference real places and events of 1680 Mexico City.
              - Allow FULL latitude for player choice. If Maria wants to ignore her patients to go on an adventure, let her! Encourage experimentation. 

              **Character and Narrative Control:**
              - The simulation should reflect Maria's struggles with limited resources, societal pressures, and the challenges of maintaining her business.
              - The user has the option to click an "Incorporate counter-narrative" button which adds a critique of the previous turn output by an expert historian to your context for preparing the next turn. Integrate this knowledge subtly but actively to enhance realism.
              - Occasionally reference rumors of brujas and curanderos in the villages outside the city, using an unfamiliar drug called *hongos malos.* And other intriguing things of that nature.
              - At the market, there is a quest available if you visit the corner of the market ("market corner") where a Nahuatl man named Tlacaelel approaches you and initiates Quest 3, the Nahuatl Codex. This quest is implemented when the user types: Tlacaelel, as in "speak to Tlacaelel," so he should introduce himself by name.
              - On some turns, such as Turn 1, you will introduce patients and other NPCs from a list of "entities" (NPCs, patients, places, and events) which is in the underlying source code. The NPC/patient should DIRECTLY appear - not a family member. Always introduce their full name, age, and background. 
              - Maria starts with 11 silver coins. If there are any changes to Maria's wealth OR her status (she awakens feeling rested, but might feel tired, amused, exhilarated, curious, desperate, terribly frightened, etc in later turns - i.e. if she encounters an Inquisitor, she will be frightened or anxious) then note it at the END of your response. Update status every turn or two. If Maria sold a drug for 2 coins, write "Maria has sold [drug name] for [#] coins."
               Remember that when Maria sells a drug, the coins she makes ADD to her existing wealth. When she buys a drug, they DETRACT. Your final line should always be in this exact format:

              **Maria has [integer] silver coins. She is feeling [status].**

              On any turn when Maria buys an herb, drug, or simple, you must ALWAYS end your response by noting the item purchased, preceded with a hashtag#:  **Maria has [integer] silver coins. She is feeling [status]. She bought #[itemname].** The item purchased must ALWAYS come at the end of your response and ALWAYS be preceded by a hashtag symbol: #.

              ` 
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

// Detect new item purchase
const purchaseMatch = simulatedHistoryOutput.match(/(?:She bought|Maria has purchased|Maria bought|She purchased|Maria has bought)\s+(#?[A-Z][a-zA-Z\s]*)/i);


if (purchaseMatch) {
  const purchasedItemName = purchaseMatch[1].trim(); 
  generateNewItemDetails(purchasedItemName);
}

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
  npcCaption,
  incorporatedContent,
  setUserActions
]);




// Prescribe popup logic

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
    The patient's reaction should be based on their background and the appropriateness of the prescription for their condition. 1-20 silver coins is fair for most remedies. Up to 50 for complex compounds.
    Based on context, determine if the patient accepts the prescription (often) or balks and walks away (somewhat frequent). Describe the sensory characteristics of the prescribed medicine and patient reaction in 2-3 paragraphs. A bad bedside manner, noxious drug suggestion, or high price will prompt angry walkouts. 
    ALWAYS end by summarizing the transaction and ADDING the amount made to her current wealth. If Maria had 11 coins in previous turn and sold a drug for 2 coins, write "Maria has sold [drug name] for 2 silver coins. She now has 13 coins.""
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

    // Update these lines
    setHistoryOutput(simulatedOutput);
    setConversationHistory(prevHistory => [...prevHistory, 
      { role: 'user', content: prescriptionPrompt },
      { role: 'assistant', content: simulatedOutput }
    ]);

    // Only update inventory if the prescription is accepted
    if (simulatedOutput.toLowerCase().includes("accepts")) {
      updateInventory({ name: item.name, quantity: -amount });
    }

    addJournalEntry(`Maria prescribed ${amount} drachms of ${item.name} for ${price} silver coins to ${currentPatient.name}.`);

    // Increment turn number
    setTurnNumber(prevTurn => prevTurn + 1);

  } catch (error) {
    console.error("Error fetching data:", error);
    setHistoryOutput(`An error occurred: ${error.message}`);
  } finally {
    setCurrentPatient(null);
    setIsLoading(false);
  }
}, [currentPatient, conversationHistory, updateInventory, addJournalEntry]);


 // JSX 

     return (
  <DndProvider backend={HTML5Backend}>
    <div className="container">
    
              <NavMobile setIsDarkMode={setIsDarkMode} setIsAboutOpen={setIsAboutOpen} />

        <Header />

        <PortraitSection 
        npcImage={npcImage}
        npcCaption={npcCaption}
        npcInfo={npcInfo}
        pcCaption="Playing as Maria de Lima"
        status={mariaStatus}  
      />

        <div className="main-content">
          <div className="history-agent">
           <div className="counter-and-map">
  <div className="counter">
    <p>
      {location.toUpperCase()} | {time.toUpperCase()}, {date.toUpperCase()} | TURN {turnNumber}
    </p>
  </div>
  <button
    className="command-button map-button"
    onClick={toggleMap}
  >
    MAP
  </button>
</div>

           <div className={`output-box ${isLoading ? 'loading' : ''}`}>
               {isLoading ? (
                   <LoadingIndicator />
               ) : (
                   <ReactMarkdown remarkPlugins={[remarkGfm]}>{historyOutput}</ReactMarkdown>
               )}
           </div>



            {/* Incorporate Popup */}
          {showIncorporatePopup && (
            <div className="incorporate-popup">
                Counter-narrative content incorporated!
            </div>
          )}

  {/* Command buttons*/}
  <div className="bottom-buttons">
    <button onClick={toggleHistory}>Simulation History</button>

    {/* Command buttons - now placed here */}
    <div className="command-buttons">
 
      {commandsDetected.prescribe && (
        <button
          className="command-button prescribe-button"
          onClick={() => handleCommandClick('#prescribe')}
        >
          PRESCRIBE
        </button>
      )}
      {commandsDetected.symptoms && (
        <button
          className="command-button symptoms-button"
          onClick={() => handleCommandClick('#symptoms')}
        >
          SYMPTOMS
        </button>
      )}
      {commandsDetected.diagnose && (
              <button
                className="command-button diagnose-button"
                onClick={toggleDiagnose} // Toggle diagnose popup
              >
                DIAGNOSE
              </button>
            )}

       {commandsDetected.map && (
        <button
          className="command-button map-button"
          onClick={() => handleCommandClick('#map')}
        >
          MAP
        </button>
      )}
 {commandsDetected.buy && (
        <button
          className="command-button buy-button"
          onClick={() => handleCommandClick('#buy')}
        >
          BUY
        </button>
      )}
    </div>

    <button
      className="view-counter-button"
      onClick={toggleCounterNarrative}
    >
      {showCounterNarrative ? 'Hide' : 'View'} Counter-Narrative
    </button>
  </div>

  {/* Diagnose Popup */}
<Diagnose 
  isOpen={isDiagnoseOpen} 
  onClose={() => setIsDiagnoseOpen(false)} 
  previousOutput={historyOutput} 
  npcCaption={npcCaption} 
/>

<Map 
  isOpen={isMapOpen} 
  onClose={toggleMap} 
  previousOutput={historyOutput} 
  apiKey={process.env.REACT_APP_OPENAI_API_KEY} 
/>

</div>

          <div className="interaction-section">
          {/* Pass llmResponse to WealthTracker and handle status change */}
          <WealthTracker llmResponse={historyOutput} onStatusChange={handleStatusChange} />

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

          <button 
    onClick={toggleAbout} 
    className="about-button"
  >
    About
  </button>

          </div>

      <Quest
          currentTurn={turnNumber}
          userActions={userActions}
          location={location}
          activeQuest={activeQuest}
          setActiveQuest={setActiveQuest}
          time={time} 
          startQuest={startQuest}
        />
        </div>

        <footer className="footer">
                <p style={{ fontSize: '13px', color: 'gray', textAlign: 'center', marginTop: '20px' }}>
                     Made in Santa Cruz by <a 
            href="https://benjaminpbreen.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'gray', textDecoration: 'underline' }}>
            Benjamin Breen
        </a>, © 2024. &nbsp;   
                    <span 
                        onClick={toggleColophon} 
                        style={{ color: 'gray', textDecoration: 'underline', cursor: 'pointer' }}>
                        See the Colophon for more info.
                    </span>
                </p>
            </footer>
            
            {showColophon && (
                <Colophon isOpen={showColophon} toggleColophon={toggleColophon} />
            )}

        
           {showCounterNarrative && (
   <CounterNarrative historyOutput={historyOutput} handleIncorporate={handleIncorporate} />
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
  gameState={gameState} 
  updateInventory={updateInventory} 
  addCompoundToInventory={addCompoundToInventory} 
  isOpen={isPrescribePopupOpen} 
  onClose={handleClosePrescribePopup} 
  onPrescribe={handlePrescribe}  
/>

{isAboutOpen && <About isOpen={isAboutOpen} toggleAbout={toggleAbout} />}

  

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

