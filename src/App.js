import React, { useState, useEffect, useCallback, useRef, Suspense, lazy} from 'react';
import { debounce } from 'lodash'; 
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
import { EndGamePopup, assessGameplay } from './EndGameAssessment';
import About from './About';  
import imageMap from './imageMap';
import CounterNarrative from './CounterNarrative'; 
import NavMobile from './NavMobile';
import Diagnose from './Diagnose'; 
import Map from './Map';
import Quest, { quests } from './Quest';
import { initialInventoryData, potentialInventoryItems } from './initialInventory';
import HistoryOutput from './HistoryOutput';
import NotificationPopup from './NotificationPopup';
import QuestTester from './QuestTester';
import Sleep from './Sleep';
import './App.css';
import './Inventory.css';
import './Popup.css';
import Helper from './Helper.js';
import gameoverimage from './assets/gameover.jpg';
import generateImageAndCaption from './ImageAndCaptionSelector';
import shopmorning from './assets/shopmorning.jpeg';
import opensea from './assets/opensea.jpg'; // Import your image here
import emergency from './assets/emergency.jpg';
import background from './assets/background.jpg';
import desert from './assets/desert.jpg';
import success from './assets/success.jpg';
import balked from './assets/balked.jpg';
import revolting from './assets/revolting.jpg';
import countryside from './assets/countryside.jpg';
import neutral from './assets/neutral.jpg';
import forage from './assets/forage.jpg';
import europeancitybackground from './assets/europeancitybackground.jpg';
import purchase from './assets/purchase.jpg';
import river from './assets/river.jpg';
import shop from './assets/shop.jpg';
import judgement from './assets/judgement.jpg';
import panic from './assets/panic.jpg';
import rainy from './assets/rainy.jpg';
import background2 from './assets/background2.jpg';


const PDFPopup = lazy(() => import('./PDFPopup'));





function App() {
  const { gameState, updateInventory, updateLocation, addCompoundToInventory, generateNewItemDetails, startQuest, advanceQuestStage, completeQuest, advanceTime, refreshInventory } = useGameState();


  const [showEndGamePopup, setShowEndGamePopup] = useState(false);
  const [gameOver, setGameOver] = useState(false); 
  const [showIncorporatePopup, setShowIncorporatePopup] = useState(false);
  const [gameAssessment, setGameAssessment] = useState('');
  const [npcImage, setNpcImage] = useState(shopmorning);
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
  const [currentPrescriptionType, setCurrentPrescriptionType] = useState(null);

  const closePrescribePopup = () => { setIsPrescribePopupOpen(false); setCurrentPrescriptionType(null);};
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
  const [isEmoji, setIsEmoji] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [showPdfButtons, setShowPdfButtons] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState('');
  const [currentWealth, setCurrentWealth] = useState(11);
   const [isSleepOpen, setIsSleepOpen] = useState(false);

  // new part, quests and notification popup
const [activeQuest, setActiveQuest] = useState(null);
  const [userActions, setUserActions] = useState([]);
  const [startedQuests, setStartedQuests] = useState(new Set());
  const [notificationPopup, setNotificationPopup] = useState(null);
  const [pendingEndGame, setPendingEndGame] = useState(false);

  // Function to trigger the notification popup
  const triggerNotificationPopup = (popupData) => {
    setNotificationPopup(popupData);
  };

  // Function to mark a quest as started
  const markQuestAsStarted = (questId) => {
    setStartedQuests(prev => new Set(prev).add(questId)); // Create a new Set to ensure state immutability
  };

// Toggle functions



const handleWealthChange = (newWealth) => {
  setCurrentWealth(newWealth);
};

  const closeNotificationPopup = () => {
    setNotificationPopup(null);
  };

 // Helper function for fuzzy search (partial match)
const fuzzyMatch = (input, target) => {
  if (!input || !target) return false;
  return target.toLowerCase().includes(input.toLowerCase());
};

const handleIncorporate = (content) => {
    setIncorporatedContent(content);
    setShowIncorporatePopup(true);
    setTimeout(() => setShowIncorporatePopup(false), 2000); // Hide after 2 seconds
};

const togglePdfButtons = () => {
    setShowPdfButtons(prev => !prev);
  };

 const handlePDFClick = (pdfPath, citation) => {
    console.log("PDF Clicked:", pdfPath);
    setSelectedPDF(pdfPath); 
    setSelectedCitation(citation); 
    setIsPdfOpen(true);       
  };

const closePdfPopup = () => {
    setIsPdfOpen(false);
    setSelectedPDF(null);
    setSelectedCitation(null);
  };

  // Logic to open the prescribe popup and set the current patient
const openPrescribePopup = (prescriptionType, patient) => {
  setCurrentPrescriptionType(prescriptionType || 'treatment'); // Fallback to 'treatment' if undefined

  // Check if this patient is part of a quest 
  if (patient && patient.isQuestNpc) {
    setCurrentPatient(patient); 
    
    // special handling for Santiago Valdez in Quest 2:
    if (patient.questId === 2) {
      console.log("Special handling for Santiago Valdez in Quest 2.");
      // add more quest patient logic here tk
    }
  } else {
    setCurrentPatient(patient); // Set the patient (non-quest NPC)
  }

  setIsPrescribePopupOpen(true); // Open the popup
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

  const toggleInventory = useCallback((forceOpen) => {
  if (typeof forceOpen === 'boolean') {
    setIsInventoryOpen(forceOpen);
  } else {
    setIsInventoryOpen((prev) => !prev);
  }
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
    }
  }, [customJournalEntry, setJournal, setCustomJournalEntry]);

const addJournalEntry = useCallback((entry, type = 'auto') => {
    setJournal((prevJournal) => [...prevJournal, { content: entry, type }]);
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
    triggerNotificationPopup({
      image: gameoverimage, // Replace with the correct image path
      text: '**Game Over: Maria has died. Her last thought is of the Atlantic ocean.**',
      type: 'gameOver',
    });

    try {
      const assessment = await assessGameplay(turnNumber, currentWealth, gameState.inventory, journal);
      setGameAssessment(assessment);
      setShowEndGamePopup(true);
    } catch (error) {
      console.error('Error generating game assessment:', error);
      setGameAssessment('An error occurred during the assessment.');
      setShowEndGamePopup(true);
    } finally {
      setIsLoading(false);
    }
  }, [turnNumber, currentWealth, gameState.inventory, journal, triggerNotificationPopup, assessGameplay]);

useEffect(() => {
  const handleKeyDown = (event) => {
    const activeElement = document.activeElement;

    // Check if the active element is not an input or textarea
    if (activeElement.tagName.toLowerCase() !== 'input' && activeElement.tagName.toLowerCase() !== 'textarea') {
      switch (event.key.toLowerCase()) {
        case 'i':
          toggleInventory(); // Toggle inventory when 'i' is pressed
          break;
        case 'm':
          toggleMixingPopup(); // Toggle mixing panel when 'm' is pressed
          break;
        case 'j':
          toggleJournal(); // Toggle journal when 'j' is pressed
          break;
        case 'c':
          toggleContentGuide(); // Toggle content guide when 'c' is pressed
          break;
        default:
          break;
      }
    }
  };

  // Attach the event listener when the component mounts
  window.addEventListener('keydown', handleKeyDown);

  // Clean up the event listener when the component unmounts
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [toggleInventory, toggleMixingPopup, toggleJournal, toggleContentGuide]);

window.addEventListener('resize', () => {
  const bgContainer = document.querySelector('.background-container');
  bgContainer.style.height = `${document.body.scrollHeight}px`;
});

// Trigger this on page load to adjust the height dynamically
document.addEventListener('DOMContentLoaded', () => {
  const bgContainer = document.querySelector('.background-container');
  bgContainer.style.height = `${document.body.scrollHeight}px`;
});


// Initial description of Maria and NPC image
useEffect(() => {
  const initialDescription = `
    __You are Maria de Lima, an apothecary of limited means but considerable talent.__ Dawn light bathes your shop on the Calle de la Amargura in Mexico City. The year is 1680.    
    &nbsp;  
    Typically, the shelves lining your walls carry neat rows of medicines in jars. But not today — thanks to the thugs hired by Don Luis, the moneylender, who have destroyed all your most valuable cures. As you grind cacao in a *molcajete* to make hot chocolate, you ponder what to do about your debts, which now top 100 *reales*. For now, your next move is to feed some scraps of dried fish to a friendly street kitten who you've named João.  
    &nbsp;  
    Meanwhile, the street outside comes to life. Servants hurry past with baskets of fresh produce. A group of Dominican friars makes their way towards the nearby church, casting disapproving glances at a boisterous group of students. A patrol of soldiers carrying pikes is a reminder of troubling rumors – whispers of unrest in the northern provinces.  
    &nbsp;  
    __Just as you begin to sort through your supply of aloe leaves, a sharp *knock* at the door announces the day's first visitor. Will you see who is there, or ignore them?__
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

  useEffect(() => {
  // Detect keyword in the output or a specific turn number
  if (turnNumber === 2) {
    console.log('Turn 2 detected, showing emoji background.');
  }
  if (historyOutput.includes('sea')) {
    console.log('Keyword "sea" detected, showing waves background.');
  }
  if (historyOutput.includes('complication')) {
    console.log('Complication detected, changing background to red.');
  }
}, [historyOutput, turnNumber]);


// command handling logic
const handleCommandClick = (command) => {
   const commandParts = command.split(' ');
   const commandType = commandParts[0].toLowerCase();
   const targetName = commandParts.slice(1).join(' ');
   let npcName;

   if (commandType !== '#sleep' && npcCaption) {
     npcName = npcCaption.split(',')[0].trim();
   }

   // Try fuzzy matching for NPC name in the caption and description (fallback)
  const getMatchedNPC = (name) => {
  console.log('Attempting to match NPC with name:', name); // Add this log for debugging
  let matchedNPC = EntityList.find(entity => fuzzyMatch(name, entity.name));
  
  if (!matchedNPC && npcInfo) {
    matchedNPC = EntityList.find(entity => fuzzyMatch(entity.name, npcInfo));
  }

  // Log the result of the match
  console.log('Matched NPC:', matchedNPC);
  
  return matchedNPC;
};


  switch (commandType) {
    case '#symptoms':
      let matchedNPC = getMatchedNPC(npcName);
      if (matchedNPC) {
        setSelectedNpcName(matchedNPC.name);
        setShowSymptomsPopup(true);
      } else {
        setHistoryOutput('No NPC is currently selected.');
      }
      break;

    case '#prescribe':
      let targetNPC = getMatchedNPC(targetName || npcName);
      if (targetNPC) {
        setCurrentPatient(targetNPC);
        setIsPrescribing(true);
        setIsInventoryOpen(true);
        setIsPrescribePopupOpen(true);
      } else {
        setHistoryOutput('No valid NPC found for prescription. Make sure an NPC is present in the current scene or specify a valid NPC name.');
      }
      break;

   case '#diagnose':
  let patientForDiagnosis = getMatchedNPC(npcName); 

  console.log('Patient for diagnosis:', patientForDiagnosis);

  if (patientForDiagnosis) {
    // Set the current patient for diagnosis and open the diagnosis popup
    setCurrentPatient(patientForDiagnosis);
    setIsDiagnoseOpen(true); // Open the Diagnose popup
  } else {
    // If no patient was found, output an error message
    setHistoryOutput('No valid patient found for diagnosis. Make sure a patient is present in the current scene.');
  }
  break;

    case '#map':
      toggleMap();
      break;

    case '#sleep':
      handleSleepCommand(); // Directly call the sleep command, no NPC dependency
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
  sleep: false,
  // Add more commands as needed
});

useEffect(() => {
  const newCommandsDetected = {
    prescribe: historyOutput.includes('prescribe'),
    symptoms: historyOutput.includes('symptoms'),
    diagnose: historyOutput.includes('diagnose'),
    buy: historyOutput.includes('#buy'),
    forage: historyOutput.includes('#forage'),
    sleep: historyOutput.includes('#sleep'),
  };
  setCommandsDetected(newCommandsDetected);
}, [historyOutput]);

// Define handleSleepCommand function
  const handleSleepCommand = () => {
    setIsSleepOpen(true); 
  };


// Entity Selection

const selectEntity = useCallback(() => {
  const specialTurns = [19, 29]; // your existing logic for special turns
  const isSpecialTurn = specialTurns.includes(turnNumber);

  // Check for August 23, 1680 in the evening
  const isEveningOnAugust23 = gameState.date === 'August 23, 1680' && gameState.time.includes('PM');

  // Find Don Luis in the EntityList
  const donLuis = EntityList.find(entity => entity.name === 'Don Luis (Moneylender)');

  if (isEveningOnAugust23) {
    // Don Luis will visit in the evening on August 23, 1680
    return donLuis;
  }

  if (turnNumber === 13) {
    // Don Luis will always visit on turn 13
    return donLuis;
  }

  // Filter to only include allowed types
  const validEntityTypes = ['npc', 'state', 'antagonist', 'patient'];
  const filteredEntities = EntityList.filter(entity => validEntityTypes.includes(entity.type));

  if (turnNumber === 1) {
    // On the first turn, choose a random patient to visit from the filtered entities.
    const patients = filteredEntities.filter(entity => entity.type === 'patient');
    return patients[Math.floor(Math.random() * patients.length)];
  } else if (turnNumber === 5) {
    // Turn 5 logic: 80% chance patient visit, 20% chance rival visit
    const patients = filteredEntities.filter(entity => entity.type === 'patient');
    const rivals = filteredEntities.filter(entity => entity.type === 'rival');
    const combinedList = Math.random() < 0.8 ? patients : rivals;
    return combinedList[Math.floor(Math.random() * combinedList.length)];
  } else if (isSpecialTurn && Math.random() < 0.4) {
    // On special turns, there's a 40% chance to summon the Inquisitor.
    const inquisitor = filteredEntities.find(entity => entity.name === 'Assistant Inquisitor Fernando de Toledo');
    return inquisitor;
  } else if (turnNumber > 1 && Math.random() < 0.15) {
    // On subsequent turns, choose a random entity from the filtered entities.
    return filteredEntities[Math.floor(Math.random() * filteredEntities.length)];
  }

  return null;
}, [turnNumber, gameState.date, gameState.time, EntityList]);




useEffect(() => {
  if (
    historyOutput.includes("The Inquisitor's condition worsened") ||
    historyOutput.includes("The Inquisitor's condition improved")
  ) {
    console.log('End game condition met. Scheduling game over for next turn...');
    setPendingEndGame(true);
  }
}, [historyOutput]);

useEffect(() => {
  if (pendingEndGame) {
    console.log('Triggering game over on new turn...');
    handleEndGame();  // Call the endgame function
    setPendingEndGame(false);  // Reset the flag
  }
}, [turnNumber, pendingEndGame, handleEndGame]);

const handleTurnEnd = useCallback(async (narrativeText) => {
  try {
    // Generate the image and caption based on the narrative text
    const { npcImage, caption, description } = await generateImageAndCaption(narrativeText, process.env.REACT_APP_OPENAI_API_KEY);

    // Check if the result is an emoji
    const isEmoji = /^\p{Emoji}$/u.test(npcImage);
    if (isEmoji) {
      setNpcImage(npcImage);
      setIsEmoji(true);
    } else {
      // npcImage is now the key for imageMap
      setNpcImage(imageMap[npcImage]?.src || imageMap['default'].src);
      setIsEmoji(false);
    }
    setNpcCaption(caption);
    setNpcInfo(description);

    // Generate journal entry
    const { summary, summaryData, inventoryChanges } = await generateJournalEntry(narrativeText);

    // Log journal entry with the generated summary
    setJournal(prevJournal => [...prevJournal, { content: summary, type: 'auto' }]);

    // Update game state with time, date, and location from summaryData
    if (summaryData.time && summaryData.date) {
      advanceTime(summaryData);
    }
    if (summaryData.location) {
      updateLocation(summaryData.location);
    }

    // Handle inventory changes
    if (inventoryChanges && inventoryChanges.length > 0) {
      inventoryChanges.forEach(change => {
        updateInventory(change.item, change.quantity, change.action);
      });
    }

  } catch (error) {
    console.error("Error in handleTurnEnd:", error);
    // Fallback to a default image and caption
    setNpcImage(imageMap['default'].src);
    setNpcCaption("An unexpected event occurred.");
    setIsEmoji(false);
  }
}, [
  setIsEmoji,
  setNpcImage,
  setNpcCaption,
  setNpcInfo,
  setJournal,
  advanceTime,
  updateLocation,
  updateInventory,
  imageMap
]);


// Handling Submission
const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  let narrativeText = userInput.trim().toLowerCase(); // Convert to lowercase for easier matching

    // handling #prescribe command
  if (narrativeText === '#prescribe') {
    handleCommandClick('#prescribe');
    setUserInput('');
    setIsLoading(false);
    return;
  }


  if (narrativeText === '#sleep') { // Handle #sleep command
    handleCommandClick('#sleep');
    setUserInput('');
    setIsLoading(false);
    return;
  }

  // Prepare the inventory summary for the history agent
  const inventorySummary = gameState.inventory.map(item => 
    `${item.name} (Quantity: ${item.quantity}, Price: ${item.price} silver coins)`
  ).join('\n');

   const result = await generateJournalEntry(narrativeText, journal); // Pass the journal entries here
  
  // Helper function to determine if a quest should advance
const shouldAdvanceQuest = (quest, actions) => {
  // This is a placeholder implementation
  // tk come back to this to finalize quest functionality
  return actions.some(action => action.includes(`advanceQuest${quest.id}`));
};

  
  // track user actions
  setUserActions(prevActions => [...prevActions, narrativeText]);

  // Normalize the command by removing the hashtag if present
  const command = narrativeText.startsWith('#') ? narrativeText.substring(1) : narrativeText;

  // Detect symptoms command
  if (command.startsWith('#symptoms')) {
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


// core gameplay logic (HistoryAgent)
  const selectedEntity = selectEntity();
  if (selectedEntity) {
    narrativeText += `\n\nA new character is available for you to deploy as part of the narrative, if it is contextually appropriate: ${selectedEntity.name}, ${selectedEntity.age} years old, ${selectedEntity.occupation}. ${selectedEntity.description}`;
  }


const contextSummary = `
    Current Location: ${gameState.location}
    Current Date: ${gameState.date}
    Current Time: ${gameState.time}
    Turn Number: ${turnNumber}
    ${incorporatedContent ? `\nIncorporated Critique:\n${incorporatedContent}` : ''}
    ${additionalQuestions ? `\nPlayer's additional questions:\n${additionalQuestions}` : ''}
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

    Please consider the previous context, conversation history, user actions, and entity information (if provided) when responding, although you should always remain narratively flexible and allow for dynamic player decision making. The current turn number is ${turnNumber + 1}.
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
          temperature: .7,
          messages: [
            {
  role: 'system',
  content: `
    You are HistoryLens, an advanced historical simulation engine. You maintain an immersive simulation starting in Mexico City and its environs on **August 22, 1680**. The simulation is based on brief MUD-like descriptions and commands, and maintains vivid historical verisimilitude in order to educate, inform, and engage.

    ### Setting:
    - The user's playable character (PC) is **Maria de Lima**, a 45-year-old Coimbra-born converso apothecary. Maria fled to Mexico City ten years earlier after her arrest by the Portuguese Inquisition.
    - **Your responses must remain true to the context of the 17th century.** Avoid anachronistic language and concepts. Ensure all actions, objects, and references are historically plausible. For instance, Maria would not diagnose cirrhosis of the liver due to alcoholism because these are 19th century terms/diagnosis. She might instead speak of "imbalanced humours owing to immoderate use of spirits which have enlarged the spleen and liver."

    ### Gameplay Guidelines:
    1. **Historical Frame**: Never allow the simulation to move outside the historical frame of the 1680s. For example, if the user inputs something like "give the patient a vaccine," respond with: "That is historically inaccurate. Please enter a new command that reflects the setting."
    2. **Concise Responses**: Your responses should be **concise**—rarely exceeding three to four paragraphs, and sometimes as few as one. They must always be grounded in the ** accurate and unsparing realities of life in the 1680s**. Use vivid, period-specific language.
    3. **Avoid Modern Concepts**: For instance, Maria would not reference vitamins, which are unknown. Instead, she might mention humoral characteristics or magical-medical beliefs (e.g., those discussed by Keith Thomas in 17th-century alchemical medicine).
    4. **Be Highly Specific**: Maria doesn't just wander in "the countryside." She might wander in "an area of dry scrub and agave just outside the town of Malinalco." If she joins an expedition to the northern frontier, she doesn't just go to "a small settlement" she goes to "a small pueblo in Sonora near Huépac." And she doesn't just "cook food for dinner" while camping - she "fashions a hand-made trap and, after a long wait, catches a small Mexican gray squirrel in it. In every description and every occasion, be as highly specific and authentic to the setting as possible. 
    5. NPC introductions. Periodically, a NPC from entitylist may be interested into your context with the phrase "A new character is available for you to deploy as part of the narrative, if it is contextually appropriate..." The key thing here is the IF IT IS CONTEXTUALLY APPROPRIATE. If Maria is in Paris, or Texas, or a pueblo on the frontier, then she will not encounter an NPC based in Mexico City. Likewise if it's 11 pm, the inquisitor toledo will not appear. Remember to think through the implications and be realistic before introducing one of these NPCs, and simply ignore this introduction of an NPC if it doesn't make sense. You don't have to use these "walk-on" characters and often you will decide not to, if they don't make narrative sense in the moment.

    ### Patient Interaction:
    - Patients are often **in bad moods**, suffering from discomfort or foreignness of the prescribed medicine. Maria must engage in dialogue to draw out relevant details. 
    - If a patient or NPC appears, they SOMETIMES become the **main subject of the turn** BUT this depends on context and it is up to you - if an NPC is entered into your context but the setting does not make sense (e.g., Maria is in a den of thieves, and Fray Patricio is introduced) then it is ok to ignore him and continue with the plot.
    Also, ensure that an NPC's appearance in the plot (if you do decide to incorporate them) is tailored to the setting. For instance, if Maria sails to England, she might still encounter patients like Fray Patricio, but they will explain that they, like her, have sailed there from Mexico. Their presence must always be woven into the larger context of time and place. For example, a patient knocking at Maria's door at night would be desperate, while during the day, they might be less urgent.
    - NPCs like inquisitors or thugs should **obey the natural expectations** of the setting (i.e., an inquisitor wouldn't appear in a rural setting at night). Again, it is up to you whether and how to introduce an NPC which has been "summoned" in this way. 
    ### Command System:
    - Key commands are: **#symptoms, #prescribe, #diagnose, #sleep, #forage,** and **#buy**. 
    For commands,instance ensure the following:
    - Any suggestions for player commands (such as #prescribe, #symptoms, #diagnose, etc.) **must only appear in bullet points at the end of the response.** 
    - **Do not** include these commands within the main narrative text.
    - Always format the player commands as **markdown bullet points**. 
    - Commands must never appear as part of the main narrative. They must be listed after the narrative.

    Commands should appear like this:

    - • You might explore #symptoms to gather more details.
    - • Try the #prescribe command if you're confident about the diagnosis.
    - • Perhaps you can #buy the herbs you need.* 
    - • It looks like there may be some materia medica to #forage here.
    - • it's getting late, would you like to #sleep?

    Please do not add any other suggestions outside of this list format.
    - Default to suggesting 2–3 appropriate commands each turn.
    - When initially treating a patient, suggest the#symptoms**, #diagnose, and #prescribe commands.  
    -  #prescribe triggers the prescribe popup which allows the user to decide on the correct medicine to prescribe to a patient.
    - #symptoms also triggers a popup allowing the user to question the patient about specific symptoms.
    - **#buy**: If the player types **#buy**, present a markdown list of items for sale. These may include a wide and exotic range of **materia medica**. Some potential items might be "Epazote", "Cochineal", "Tobacco", "Arnica", "Violets", 
    "Nutmeg", "Thyme", "Crickets", Pennyroyal", "Sage", "Guaiacum", "Cinchona", "Ginger", "Angelica", "Lavender", 
    "Wormwood", "Burdock", "Celandine", "Cardamom", "Coriander", "Myrrh", "Cloves", "Cinnamon", "Fennel", 
    "Rhubarb", "Licorice Root", "Mugwort", "Oregano", "Passionflower", "Rhubarb", "Unicorn horn", "Tobacco,"
    "Yarrow", "Valerian", "Red Coral", "Scorpions", "Vinegar", "Calendula", "Mullein", "Echinacea", "Anise", "Sassafras", "a Small Cat," "Skull of a Man," "Bird Feathers," 
    "Marshmallow Root", "Mandrake", "Blackberry Root", "Lemon Balm", "Spearmint", "Willow Bark", "Comfrey", 
    "Hyssop", "Wine", "Ginger", "Chili", "Aloe Vera", "Peppermint", "Nightshade", "Deer Antlers", "Vanilla", "Bezoar" (very expensive) or, very rarely, "Peyote" or "Hongos Malos". Items must have brief descriptions and prices in **silver coins**. 
    If Maria buys something, **always record the transaction at the end of the response** with the exact format: "**Maria has [integer] silver coins. She bought [item name].**"
    3. **#forage**: If the user writes #forage, provide a bullet point markdown list with headings in bold of all the items available for Maria to add to her inventory in the environment around her. The user can then type #forage [item name] to allow Maria to forage for *specific named items* which are in the ambient environment (for instance, she can even forage for some of the remnants of materia medica from the jars). However forage works for *All* items in the area, not just herbs or materia medica. It can even be a theft/stealing command. I.e. in a library, Maria can use "forage" to see a list of books she might be able to pocket, then the user could write #forage [book name] and it will be entered into her inventory. The same is true of other items, ranging from merchant's wares to the contents of desk drawers or even refuse on the street. 
    Foraging is not always successful. Imagine rolling a dice and randomizing her chances, with the difficulty dependent on the situation. Foraging in the woods almost always yields something, but foraging in a crowded place (like a library) might result in failure and Maria getting in trouble for theft - if so, let these events play out, including leading to bad outcomes for Maria. Once successful, end the response by noting what was foraged: "**Maria foraged [item name]. She has [integer] silver coins.**"
    4. **#sleep** should be suggested after 7 PM or when Maria is tired. When it's late or Maria is fatigued, always suggest she sleeps by offering the **#sleep** command.
    
    ### Contextual Awareness:
    - Avoid overly optimistic depictions of the past. Maria is in a **financially desperate situation**. She has 11 silver coins (reales) in wealth and owes 100 reales to **Don Luis** and 20 reales to **Marta the herb woman**.
    - Reference **real places and events** from 1680 Mexico City and beyond. It is possible for Maria to travel long distances, but trans-Atlantic voyages are rarer.
    - Keep in mind Maria is practicing **illegally**, prescribing without a physician’s license. Patients often visit her out of necessity or secrecy. For instance, they may tell her that traditional remedies like bleeding have failed.
    - Allow **full player choice**. If Maria wants to ignore her patients, pursue an adventure, or escape debt, let her! Encourage the player to experiment, for instance, by visiting places such as:
      - The **Portal de Mercaderes** (market stalls)
      - The **Alameda** (park)
      - Or nearby villages (where she might encounter brujas or curanderos)

    ### Character and Narrative Control:
    - The narrative should reflect Maria's **personal struggles** with societal pressures, her past, and the challenges of maintaining her business. In particular, **Don Luis** (the moneylender) demands repayment of 100 reales by **August 23**. If Maria stays in Mexico City, ensure his thugs periodically reappear. Give Maria the option to flee if necessary.
    - Emphasize SPECIFICITY in all ways. I want granular, highly detailed and historically authentic simulations - rather than Maria going to "a busy street, Mexico City" where she meets "a merchant", Maria might go to the "north side of the Calle de Tacuba." Mention the particular smells in the air, from freshly ground spices to the occasional waft of sewage from a nearby canal. 
      Identify the merchant by name, origin, appearance, and dialect—perhaps he's Don Esteban de Zúñiga, a middle-aged merchant with a slightly hunched back, dressed in a worn leather jerkin, his Castilian accent betraying his recent arrival from Seville. 
      Likewise if she leaves Mexico, which is entirely possible, especially if Maria befriends the Sir Robert Southwell NPC who offers her passage to London - she wouldn't just sail to London, she would be on a specific vessel with a specific, named captain and crew, and when she gets there, she wouldn't just meet "the Royal Society" but would encounter specific real people like Robert Hooke. When Maria enters a building, specify its architectural style, whether it's a modest adobe structure or a grand colonial mansion with Moorish tiles and wooden beams. Etc.
    - Patients and other NPCs should observe the social norms of the 17th century, including the rampant misogyny and sexism of the era and the rigid class distinctions. As a woman who owns her own shop, Maria is fairly high status economically, but socially she is rather low status as a converso Portuguese immigrant to New Spain from humble origins. She is usually addressed as Señora de Lima rather than Maria and so forth. 
    - Patients usually don't know her personally, though some might (use your judgement.) They will ALWAYS initially explain why they are seeking her out on first encountering her, but these explanations will not always (and indede usually are not always) the full truth. Remember that high status patients would typically see a licensed physician rather than an apothecary, so there needs to be a reason why they are seeking treatment from her - and there may be a subtext or rationale beneath the stated reason, too.
    - Maria has an almost Sherlock Holmes-like talent for perceptive observations - note one or two tiny but telling details in each turn, as appropriate. Be creative. 
    - Incorporate **counter-narratives** when they are made available; these are critiques from an expert historian which should inform how you construct the narrative. This knowledge should be subtly integrated into future turns for added realism.
    - Incorporate real time, dynamic weather events. It may begin to rain, or be swelteringly hot, or (rarely) an earthquake might occur. Interject this into the narrative to mix things up. 
    ### NPC and Entity Management:
    - NPCs like **Don Luis, Marta the herb woman. Likewise Sir Robert Southwell may invite Maria to travel back to London with him, and may show her his microscope, a new invention. Be specific in how these interactions play out.
    - For **generic NPCs** like soldiers or sailors, give them individualized names and descriptions. For example, a soldier could be "Eduardo, a tired infantryman," or a noblewoman might become "Doña Maria de Valparaiso."
    - Use a wide variety of names and be mindful of 17th century practice of using last name rather than first name. Rather than every woman being Isabela or Rosa, how about Catalina Mendoza, Eulalia Muñoz, or Beatriz de la Concepción. For men, instead of Diego and Francisco, how bout Joaquin Alarcón or other similarly specfic names.
    ### Important Narrative Events:
    1. Start a new day using **h3** markdown, with a headline appropriate to the context. But do this ONLY when the date moves to the following morning. If it is after 10 pm but before 4 am, say "the hour grows late" and suggest the #sleep command.
    2. Signal a **crisis** using **h4** markdown, such as "Maria has been arrested!" or "The Inquisitor has arrived..."
    3. If a patient dies, Maria may face **serious consequences**. In such cases, prompt the start of Quest 6 by outputting the string **StartQuest6**.
    4. Remember that if Maria does something time consuming in a turn, like "travel to Veracruz to book passage on a ship" or "flee into the hills", you need to estimate a reasonable passage of time - several days to several weeks - and progress the date forward.
    
    ### Final Turn Formatting:
    At the **end of each turn**, **ALWAYS track Maria's updated**:
    - **Wealth**: How many silver coins she has
    - **Status**: SINGLE WORD description of her current state (e.g., tired, exhilarated, frightened)
    - **Reputation**: Indicated by an emoji from the following scale:
      😡 (1) ; 😠 (2) ; 😐 (3) ; 😶 (4) ; 🙂 (5) ; 😌 (6) ; 😏 (7) ; 😃 (8) ; 😇 (9) ; 👑 (10)
    - **Time of day**: record the exact time of day, such as 5:15 PM or 6:15 AM, and the date, such as August 24, 1680.

    This final line must ALWAYS be in this **exact format** (using bold markdown tags) EXCEPT on turns when Maria buys or forages (on which see below):

    **Maria has [integer] silver coins. She is feeling [single word status]. Her reputation: [emoji]. Location: [country or city]. Time: #:## AM/PM, [month] [day], [year].**

    **Purchases & Foraging**: IMPORTANT: On turns in which Maria buys or forages an item, ALWAYS use this format AT THE END OF THE OUTPUT:
    - "*Maria has [integer] silver coins. Maria bought [itemname].*"
    - "*Maria has [integer] silver coins. Maria foraged [itemname].*"
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

setHistoryOutput(simulatedHistoryOutput);
setConversationHistory([...newHistory, { role: 'assistant', content: simulatedHistoryOutput }]);
setTurnNumber(turnNumber + 1);

// Detect new item purchase
const purchaseMatch = simulatedHistoryOutput.match(/(?:She bought|Maria has purchased|now owns|and bought|and purchased|Maria bought|She purchased|Maria has bought)\s+(#?[A-Z][a-zA-Z\s]*)/i);


if (purchaseMatch) {
  const purchasedItemName = purchaseMatch[1].trim(); 
  generateNewItemDetails(purchasedItemName);
}

// Detect foraging
const forageMatch = simulatedHistoryOutput.match(/(?:She foraged|Maria has foraged|foraged for|Maria picked|Maria has picked|Maria foraged)\s+(#?[A-Z][a-zA-Z\s]*)/i);

if (forageMatch) {
  const foragedItemName = forageMatch[1].trim();
  generateNewItemDetails(foragedItemName);
}

// turn handling
await handleTurnEnd(simulatedHistoryOutput);


} catch (error) {
  console.error("Error fetching data:", error);
  setHistoryOutput(`An error occurred: ${error.message}`);
} finally {
  setIsLoading(false);
}

setUserInput('');

}, [
  conversationHistory, 
  gameState.date, 
  gameState.location, 
  gameState.time, 
  turnNumber, 
  userInput,
  handleTurnEnd,
  selectEntity,
  npcCaption,
  incorporatedContent,
  setUserActions,
  additionalQuestions, 
]);

useEffect(() => {
  const timeString = gameState.time.toLowerCase(); // assuming gameState.time holds the current in-game time
  const [time, modifier] = timeString.split(' '); // Split "8:00 PM" into "8:00" and "PM"
  const [hours, minutes] = time.split(':').map(Number); // Split "8:00" into 8 and 00

  let hour24 = hours;

  // Convert 12-hour time to 24-hour format
  if (modifier === 'pm' && hour24 !== 12) {
    hour24 += 12;
  } else if (modifier === 'am' && hour24 === 12) {
    hour24 = 0; // Midnight edge case
  }

  // Enable dark mode between 8 PM and 6 AM
  if (hour24 >= 19 || hour24 < 6) {
    setIsDarkMode(true);
  } else {
    setIsDarkMode(false);
  }
}, [gameState.time]);

useEffect(() => {
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}, [isDarkMode]);


  //  useEffect to start quests based on triggers
  useEffect(() => {
    console.log('Checking for quests to start...');

    // Find any available quests that should start, based on triggers and whether they have already started
    const questToStart = quests.find(quest => 
      !startedQuests.has(quest.id) && 
      quest.trigger(turnNumber, userActions, gameState.location, gameState.time)
    );
    
    if (questToStart) {
      console.log(`${questToStart.name} quest found, starting...`);
      startQuest(questToStart);
      setActiveQuest(questToStart);
      markQuestAsStarted(questToStart.id); // Mark this quest as started
    }
  }, [turnNumber, userActions, gameState.location, gameState.time, quests, startedQuests, startQuest, setActiveQuest]);

 // JSX 
     return (
  <DndProvider backend={HTML5Backend}>
<div
  className={`background-container ${
    historyOutput.match(/scrubland|scrub land|desert|deserted area|sand dunes|arid landscape/i) ? 'desert-active' : ''
  } ${(historyOutput.includes('complications') || historyOutput.includes('patient has died')) ? 'complication' : ''}
  ${historyOutput.match(/at sea|the waves|the ocean|the sea/i) ? 'waves-active' : ''}
  ${(turnNumber === 1 || turnNumber === 2 || historyOutput.includes('Mexico')) && !historyOutput.match(/Mexico|Cuba|Brazil|Zocalo/i) ? 'background2-active' : ''}
  ${historyOutput.match(/success|cure|miraculous recovery|patient is improving/i) ? 'success-active' : ''}
  ${historyOutput.match(/balked|balked at the price|walked out|refused to pay/i) ? 'balked-active' : ''}
  ${historyOutput.match(/revolting|disgusting|vomit|disgust|nauseous|prescription was revolting/i) ? 'revolting-active' : ''}
  ${historyOutput.match(/farmlands|agricultural land|countryside|rural area|fields|pasture/i) ? 'countryside-active' : ''}
  ${historyOutput.match(/neutral result|partial cure|neutral effects|was somewhat successful/i) ? 'neutral-active' : ''}
  ${historyOutput.match(/purchased|transaction|bought/i) ? 'purchase-active' : ''}
  ${historyOutput.match(/tradesman|store|storehouse|warehouse/i) ? 'shop-active' : ''}
  ${historyOutput.match(/London|Paris|Madrid|Seville|Europe|Oxford|Boston|Philadelphia|Rome/i) ? 'europeancitybackground-active' : ''}
  ${historyOutput.match(/river|Xochimilco|waterway/i) ? 'river-active' : ''}
  ${historyOutput.match(/foraging|gathering herbs|collected plants|foraged|found herbs|looked for herbs/i) ? 'forage-active' : ''}
  ${historyOutput.match(/judgement|difficult decision|decide/i) ? 'judgement-active' : ''}
    ${historyOutput.match(/panic|desperation|flee/i) ? 'panic-active' : ''}
        ${historyOutput.match(/rainy day|pouring rain|torrents of rain/i) ? 'rainy-active' : ''}
  `}
  style={
    historyOutput.match(/at sea|the waves|the ocean|the sea/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${opensea})` }
      : historyOutput.match(/scrubland|scrub land|desert|deserted area|sand dunes|arid landscape/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${desert})` }
            : historyOutput.match(/revolting|disgusting|vomit|disgust|nauseous|prescription was revolting/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${revolting})` }
      : (historyOutput.includes('complications') || historyOutput.includes('patient has died'))
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${emergency})` }
      : historyOutput.match(/prescription was a success|a miraculous cure|prescription was effective|miraculous recovery|patient is improving/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${success})` }
      : historyOutput.match(/balked|balked at the price|walked out|refused to pay/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${balked})` }
      : historyOutput.match(/farmlands|agricultural land|countryside|rural area|fields|pasture/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${countryside})` }
      : historyOutput.match(/neutral result|partial cure|neutral effects|was somewhat successful/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${neutral})` }
      : historyOutput.match(/purchase|transaction|exchange money/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${purchase})` }
      : historyOutput.match(/tradesman|store|storehouse|warehouse/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${shop})` }
      : historyOutput.match(/London|Paris|Madrid|Seville|Europe|Oxford|Boston|Philadelphia|Rome/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${europeancitybackground})` }
      : historyOutput.match(/river|canals|waterway/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${river})` }
      : historyOutput.match(/foraging|gathering herbs|collecting plants|searching for food/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${forage})` }
      : (turnNumber === 1 || turnNumber === 2 || historyOutput.includes('Mexico'))
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${background2})` }
      : historyOutput.match(/judgement|difficult decision|decide/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${judgement})` }
      : historyOutput.match(/panic|desperation|flee/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${panic})` }
      : historyOutput.match(/pouring rain|rainy day|torrents of rain/i)
      ? { background: `linear-gradient(to top, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1)), url(${rainy})` }
      : {}
  }
/>





    <div className="container">
              <NavMobile setIsDarkMode={setIsDarkMode} setIsAboutOpen={setIsAboutOpen} />
        <Header />
        
        <PortraitSection 
        npcImage={npcImage}
        npcCaption={npcCaption}
        npcInfo={npcInfo}
        pcCaption="Playing as Maria de Lima"
        isEmoji={isEmoji}  
        status={mariaStatus}  
        npcData={{ description: npcInfo }}
      />
        <div className="main-content">
          <div className="history-agent">

           <div className="counter-and-map">

           <button className="simulation-history-button" onClick={toggleHistory}>
  LOG
</button>
  <div className="counter">
     <p>
    {gameState.location.toUpperCase()} | {gameState.time.toUpperCase()}, {gameState.date.toUpperCase()} | TURN {turnNumber}
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
    <HistoryOutput historyOutput={historyOutput} isLoading={isLoading} />
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

  <button
    className="command-button primary-sources-button"
    onClick={togglePdfButtons}
  >
    {showPdfButtons ? '📄 Hide sources' : '📄 Show all sources'}
  </button>
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

         {commandsDetected.forage && (
        <button
          className="command-button buy-button"
          onClick={() => handleCommandClick('#forage')}
        >
          FORAGE
        </button>
        )}

         {commandsDetected.sleep && (
        <button
          className="command-button sleep-button"
          onClick={handleSleepCommand}
        >
          SLEEP
        </button>
      )}

    </div>


        {/* Sleep Popup */}
        <Sleep
        isOpen={isSleepOpen}
        onClose={() => setIsSleepOpen(false)}
        gameState={gameState}
        conversationHistory={conversationHistory}
        handleTurnEnd={handleTurnEnd}
        addJournalEntry={addJournalEntry}
        setHistoryOutput={setHistoryOutput}  
        setConversationHistory={setConversationHistory}
        setTurnNumber={setTurnNumber}
      />



    <button
      className="view-counter-button"
      onClick={toggleCounterNarrative}
    >
      {showCounterNarrative ? 'Hide' : 'View'} Counter-Narrative
    </button>
  </div>

   <div className="pdf-section">
  {/* Existing button to toggle PDF buttons */}


  {/* PDF links with slide effect */}
 <div className={`pdf-links ${showPdfButtons ? 'show' : ''}`}>
          <h2>Available Documents:</h2>
          {EntityList.filter(entity => entity.pdf).map(entity => (
            <button
              key={entity.name}
              onClick={() => handlePDFClick(`/pdfs/${entity.pdf}`, entity.citation)}
              className="pdf-link-button"
            >
              {entity.name} 📄
            </button>
          ))}
          {initialInventoryData.filter(item => item.pdf).map(item => (
            <button
              key={item.name}
              onClick={() => handlePDFClick(`/pdfs/${item.pdf}`, item.citation)}
              className="pdf-link-button"
            >
              {item.name} 📄
            </button>
          ))}
        </div>
</div>
  {/* Diagnose Popup */}
<Diagnose 
  isOpen={isDiagnoseOpen} 
  onClose={() => setIsDiagnoseOpen(false)} 
  previousOutput={historyOutput} 
  npcCaption={npcCaption} 
  setHistoryOutput={setHistoryOutput}
  setConversationHistory={setConversationHistory}
  currentPatient={currentPatient} 
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
        <WealthTracker 
  llmResponse={historyOutput} 
  onStatusChange={handleStatusChange}
  onWealthChange={handleWealthChange}
/>
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
  <span className="emoji">📕</span> Journal
</button>

<button 
  onClick={toggleInventory} 
  className="view-inventory-button"
>
  <span className="emoji">🍵</span> Inventory
</button>

<button 
  onClick={toggleContentGuide} 
  className="content-guide-button"
>
  <span className="emoji">📜</span> Content Guide
</button>

<button 
  className="commonplace-book-button"
  onClick={toggleCommonplaceBook}
>
  <span className="emoji">✍🏼</span> Sketchbook
</button>

<button 
  className="mix-drugs-button"
  onClick={toggleMixingPopup}
>
  <span className="emoji">⚗️</span> Mix Drugs
</button>

<button 
  className="end-game-button"
  onClick={handleEndGame}
>
  <span className="emoji">🎩</span> End Game
</button>

    <button 
    onClick={toggleAbout} 
    className="about-button"
  >
    About
  </button>


          </div>

  {activeQuest && (
  <Quest
    currentTurn={turnNumber}
    userActions={userActions}
    location={gameState.location}
    activeQuest={activeQuest}
    setActiveQuest={setActiveQuest}
    time={gameState.time} 
    startQuest={startQuest}
    triggerNotificationPopup={triggerNotificationPopup}
    toggleInventory={toggleInventory}
    addJournalEntry={addJournalEntry}
    setConversationHistory={setConversationHistory}
    setHistoryOutput={setHistoryOutput}
    setTurnNumber={setTurnNumber}
    isPrescribePopupOpen={isPrescribePopupOpen}
    currentPrescriptionType={currentPrescriptionType}
    openPrescribePopup={openPrescribePopup}
    setIsPrescribePopupOpen={setIsPrescribePopupOpen}
    setCurrentPatient={setCurrentPatient}
    />
    )}

    {notificationPopup && (
          <NotificationPopup 
            popupData={notificationPopup} 
            onClose={() => setNotificationPopup(null)} 
          />
          )}
        </div>


           {showCounterNarrative && (
   <CounterNarrative historyOutput={historyOutput} handleIncorporate={handleIncorporate} />
)}



        <footer className="footer">

  
                <p style={{ fontSize: '15px', color: 'black', textAlign: 'center', marginTop: '10px' }}>
                     Made in Santa Cruz by <a 
            href="https://benjaminpbreen.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ color: 'black', textDecoration: 'underline' }}>
            Benjamin Breen
        </a>, © 2024. &nbsp;   
                    <span 
                        onClick={toggleColophon} 
                        style={{ color: 'black', textDecoration: 'underline', cursor: 'pointer' }}>
                        See the Colophon for more info.
                    </span>
                </p>

   

      <div className="quest-buttons-container" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
  <button
    style={{
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: '#6B7280', // Cool Gray
      color: 'white',
      fontSize: '10px',
      padding: '0',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      lineHeight: '20px'
    }}
    onClick={() => setActiveQuest(quests[0])}
  >
    0
  </button>
  <button
    style={{
      width: '18px',
      padding: '0',
      height: '18px',
      borderRadius: '50%',
      backgroundColor: '#4B5563', // Darker Gray
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      lineHeight: '18px'
    }}
    onClick={() => setActiveQuest(quests[1])}
  >
    1
  </button>
  <button
    style={{
      width: '18px',
      padding: '0',
      height: '18px',
      borderRadius: '50%',
      backgroundColor: '#9CA3AF', // Lighter Gray
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      lineHeight: '18px'
    }}
    onClick={() => setActiveQuest(quests[2])}
  >
    2
  </button>
  <button
    style={{
      width: '18px',
      height: '18px',
      padding: '0',
      borderRadius: '50%',
      backgroundColor: '#F59E0B', // Warm Amber
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      lineHeight: '18px'
    }}
    onClick={() => setActiveQuest(quests[3])}
  >
    3
  </button>
  <button
    style={{
      width: '18px',
      padding: '0',
      height: '18px',
      borderRadius: '50%',
      backgroundColor: '#10B981', // Emerald Green
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      lineHeight: '18px'
    }}
    onClick={() => setActiveQuest(quests[4])}
  >
    4
  </button>
  <button
    style={{
      width: '18px',
      height: '18px',
      padding: '0',
      borderRadius: '50%',
      backgroundColor: '#3B82F6', // Blue
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      lineHeight: '18px'
    }}
    onClick={() => setActiveQuest(quests[5])}
  >
    5
  </button>
  <button
    style={{
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      padding: '0',
      backgroundColor: '#EC4899', // Pink
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'sans-serif',
      textAlign: 'center',
     
    }}
    onClick={() => setActiveQuest(quests[6])}
  >
    6
  </button>
  <button
    style={{
      width: '18px',
      padding: '0',
      height: '18px',
      borderRadius: '50%',
      backgroundColor: '#8B5CF6', // Violet
      color: 'white',
      fontSize: '10px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      lineHeight: '18px'
    }}
    onClick={() => setActiveQuest(quests[7])}
  >
    7
  </button>

  <Helper />
</div>



         </footer>
            
            {showColophon && (
                <Colophon isOpen={showColophon} toggleColophon={toggleColophon} />
            )}

        


       {showSymptomsPopup && (
       <Symptoms 
         npcName={selectedNpcName} 
         onClose={closeSymptomsPopup} 
         onPDFClick={handlePDFClick}
         handleSubmit={handleSubmit}
         conversationHistory={conversationHistory}
  setHistoryOutput={setHistoryOutput}
  setConversationHistory={setConversationHistory}
  currentPatient={currentPatient} 
       />
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
                toggleMixingPopup={toggleMixingPopup}  // Pass the toggleMixingPopup function as a prop
              />
              <button className="close-mixing-button" onClick={toggleMixingPopup}>Close</button>
            </div>
          </div>
        )}

    <InventoryPane 
    inventory={gameState.inventory}
    compounds={gameState.compounds}
    isOpen={isInventoryOpen}
    toggleInventory={toggleInventory}
    isPrescribing={isPrescribing}
    onPDFClick={handlePDFClick}  
     refreshInventory={refreshInventory}
/>


        
<PrescribePopup 
  isOpen={isPrescribePopupOpen}
  onClose={() => {
    setIsPrescribePopupOpen(false);
    setCurrentPrescriptionType(null);
    setIsPrescribing(false);
    setIsInventoryOpen(false);
    setCurrentPatient(null);
  }}
  currentPatient={currentPatient}
  gameState={gameState}
  updateInventory={updateInventory}
  addCompoundToInventory={addCompoundToInventory}
  conversationHistory={conversationHistory}
  setHistoryOutput={setHistoryOutput}
  setConversationHistory={setConversationHistory}
  setTurnNumber={setTurnNumber}
  toggleInventory={toggleInventory}  
  setIsLoading={setIsLoading}
  addJournalEntry={addJournalEntry}
  currentWealth={currentWealth}
  prescriptionType={currentPrescriptionType} 

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
         <Journal
           journal={journal}
           isOpen={isJournalOpen}
           toggleJournal={toggleJournal}
           customJournalEntry={customJournalEntry}
           setCustomJournalEntry={setCustomJournalEntry}
           handleJournalEntrySubmit={handleJournalEntrySubmit}
         />
       )}

        {isHistoryOpen && (
          <SimulationHistory history={conversationHistory} isOpen={isHistoryOpen} toggleHistory={toggleHistory} />
        )}
      </div>

    {isPdfOpen && (
             <Suspense fallback={<div>Loading PDF...</div>}>
               <PDFPopup
                 isOpen={isPdfOpen}
                 onClose={closePdfPopup}
                 pdfPath={selectedPDF}
                 citation={selectedCitation}
               />
             </Suspense>
           )}

           {showEndGamePopup && (
  <EndGamePopup 
    assessment={gameAssessment} 
    onClose={() => setShowEndGamePopup(false)} 
  />
)}
 
    </DndProvider>
  );
}

export default App;

