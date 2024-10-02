// HISTORYLENS: 1680s Apothecary Simulator

import React, { useState, useEffect, useCallback, Suspense, lazy} from 'react';
import Header from './Header';
import Colophon from './Colophon'; // Import the new Colophon component
import InputBox from './InputBox';
import TipBox from './TipBox';
import Journal from './Journal';
import LoadingIndicator from './LoadingIndicator';
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
import sublimateactive from './assets/sublimate-active.jpg';
import panic from './assets/panic.jpg';
import rainy from './assets/rainy.jpg';
import background2 from './assets/background2.jpg';
import NewItemPopup from './NewItemPopup';
import Buy from './Buy';

const PDFPopup = lazy(() => import('./PDFPopup'));

function App() {const { gameState, updateInventory, updateLocation, addCompoundToInventory, generateNewItemDetails, startQuest, advanceTime, refreshInventory, lastAddedItem, clearLastAddedItem, unlockMethod, unlockedMethods } = useGameState();
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
  const [showSymptomsPopup, setShowSymptomsPopup] = useState(false);
  const [selectedNpcName, setSelectedNpcName] = useState('');
  const [isPrescribing, setIsPrescribing] = useState(false);
  const [isPrescribePopupOpen, setIsPrescribePopupOpen] = useState(false);
  const [currentPrescriptionType, setCurrentPrescriptionType] = useState(null);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [showContentGuide, setShowContentGuide] = useState(false);
  const [incorporatedContent, setIncorporatedContent] = useState('');
  const [isAboutOpen, setIsAboutOpen] = useState(false); 
  const [showColophon, setShowColophon] = useState(false);
  const [mariaStatus, setMariaStatus] = useState('rested'); 
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state
    const [isDiagnoseOpen, setIsDiagnoseOpen] = useState(false);
    const [isMapOpen, setIsMapOpen] = useState(false);
  const handleStatusChange = (newStatus) => {
    setMariaStatus(newStatus); };
  const [isEmoji, setIsEmoji] = useState(false);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [showPdfButtons, setShowPdfButtons] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState('');
  const [currentWealth, setCurrentWealth] = useState(11);
  const [isSleepOpen, setIsSleepOpen] = useState(false);

  // new items, quests, methods and notification popups
  const [activeQuest, setActiveQuest] = useState(null);
  const [userActions, setUserActions] = useState([]);
  const [startedQuests, setStartedQuests] = useState(new Set());
  const [notificationPopup, setNotificationPopup] = useState(null);
  const [pendingEndGame, setPendingEndGame] = useState(false);
  const [showNewItemPopup, setShowNewItemPopup] = useState(false);
  const [newItemDetails, setNewItemDetails] = useState(null);
const [isBuyOpen, setIsBuyOpen] = useState(false);



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
const handlePDFClick = useCallback((pdfPath, citation) => {
  console.log("PDF Clicked:", pdfPath);
  setSelectedPDF(pdfPath);
  setSelectedCitation(citation);
  setIsPdfOpen(true);
}, [setSelectedPDF, setSelectedCitation, setIsPdfOpen]);
const closePdfPopup = () => {
    setIsPdfOpen(false);
    setSelectedPDF(null);
    setSelectedCitation(null);
  };

  const handleAddItemToInventory = async (itemName) => {
  // Verify if the item is mentioned in the previous narrative
  if (!historyOutput.toLowerCase().includes(itemName.toLowerCase())) {
    setHistoryOutput(`You cannot add "${itemName}" to your inventory because it was not mentioned in the previous narrative.`);
    return;
  }

  // Generate item details
  await generateNewItemDetails(itemName);

  setHistoryOutput(`"${itemName}" has been added to your inventory.`);
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
  }, [turnNumber, currentWealth, gameState.inventory, journal, triggerNotificationPopup]);

// hotkey handling
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

  if (matchedNPC) {
    console.log('Matched NPC:', matchedNPC); // Log full NPC details
  }

  return matchedNPC; // Return full entity object
};


  switch (commandType) {

     case '#buy':
  setIsBuyOpen(true); 
  setUserInput(''); // Clear the input field
  setIsLoading(false);
  toggleInventory(true);
  break;

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


    case '#add':
      // Extract the item name from the command
      const itemName = commandParts.slice(1).join(' ').replace('to my inventory', '').trim();
      handleAddItemToInventory(itemName);
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

  // new item logic 

  useEffect(() => {
    if (lastAddedItem) {
      setNewItemDetails(lastAddedItem);
      setShowNewItemPopup(true);

      // Clear lastAddedItem after handling it
      clearLastAddedItem();
    }
  }, [lastAddedItem, clearLastAddedItem]);

  // Handler to close the popup
  const handleCloseNewItemPopup = () => {
    setShowNewItemPopup(false);
    setNewItemDetails(null);
  };

  const handleCloseBuyPopup = () => {
  setIsBuyOpen(false); // Close the Buy component
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
}, [turnNumber, gameState.date, gameState.time]);




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
    // 1. Generate the image and caption based on the narrative text
    const { npcImage, caption, description } = await generateImageAndCaption(narrativeText, process.env.REACT_APP_OPENAI_API_KEY);

    // 2. Check if the result is an emoji
    const isEmoji = npcImage && [...npcImage].some(char => char.match(/\p{Emoji}/u));

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

    // 3. **Set the narrative text in history output**
    setHistoryOutput(narrativeText);



   
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

    // 8. Handle inventory changes from generateJournalEntry (if any)
    if (inventoryChanges && inventoryChanges.length > 0) {
      inventoryChanges.forEach(change => {
        updateInventory(change.item, change.quantity, change.action);
      });
    }

     // 4. **NEW CODE: Parse narrativeText for item acquisition lines**
    const itemAcquisitionRegex = /Maria received (.+?)\. It has been added to her inventory\./g;
    let match;
    // Use a loop in case there are multiple items
    while ((match = itemAcquisitionRegex.exec(narrativeText)) !== null) {
      const itemName = match[1].trim();

      // Generate item details and add to inventory
      await generateNewItemDetails(itemName);
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
  setHistoryOutput, // Make sure this is included in dependencies
  setJournal,
  advanceTime,
  updateLocation,
  updateInventory,
  generateNewItemDetails // Include this in your dependencies
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

  if (userInput.trim().toLowerCase() === '#buy') {
  setIsBuyOpen(true); // Open the Buy component
  setUserInput(''); // Clear the input field
  setIsLoading(false);
  return;
}

  // Prepare the inventory summary for the history agent
  const inventorySummary = gameState.inventory.map(item => 
    `${item.name} (Quantity: ${item.quantity}, Price: ${item.price} silver coins)`
  ).join('\n');

  
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
    narrativeText += `\n\nA new character is available for you to deploy as part of the narrative, if it is contextually appropriate. Remember that if they do not have a specific name and background, you should ALWAYS invent a detailed plausible background and name for them: ${selectedEntity.name}, ${selectedEntity.age} years old, ${selectedEntity.occupation}. ${selectedEntity.description}`;
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
   You are HistoryLens, an advanced historical simulation engine. Your role is to maintain an immersive, historically accurate simulation set in Mexico City and its environs, beginning on August 22, 1680. Your responses should be concise, exceptionally historically accurate, and grounded in the specific, gritty, earthy realities of 17th-century life.

###Core Principles

Historical Accuracy: Maintain strict adherence to 1680s context. Avoid anachronisms in language, concepts, or technology.
Vivid Specificity without Pretension: Provide rich, plainspoken, detailed descriptions of people, places, and events. Use period-specific terminology and reference real historical locations and figures when appropriate. If the user says "go to the market" in Mexico City, send them to a *specific place* like La Merced Market or Portal de Mercederes. Avoid cliches, purple prose, and overwritten descriptions. 
Write simply and clearly and without a lot of big words. Use the simplest language you can to convey complex ideas, themes, and events. For instance, just use "says" as a dialogue tag. Avoid metaphors or figurative language that is ungrounded in real human experience. For instance, never say "the air is thick" with anything. 
Narrative Flexibility: Allow for player-driven story progression while maintaining historical plausibility. Suggest potential paths at key moments, for instance if a patient requires a certain materia medica, suggest places where the player might buy or forage it. 
Educational Value: Subtly incorporate historical information to educate players about 17th-century life, medicine, and society. NPCs must always behave as fully-realized 17th century people with secrets and inner lives. They conceal things from the player and even from themselves. Shame, honor, guilt, family pressures, and spiritual yearning are strongly felt emotions in the 17th century. For instance, a wealthy mechant suffering from syphilis would never admit this fact, perhaps not even in private. 

###Setting and Character

Protagonist: Maria de Lima, a 45-year-old Coimbra-born converso apothecary
Background: Fled to Mexico City 10 years ago after arrest by the Portuguese Inquisition
Current Situation: Practicing illegally, in debt (100 reales to Don Luis, 20 reales to Marta the herb woman)
Starting Wealth: 11 silver coins (reales) 

The simulation is based on brief MUD-like descriptions and commands and maintains vivid historical verisimilitude to educate, inform, and engage.

### Setting:

- The user's playable character (PC) is **Maria de Lima**, a 45-year-old Coimbra-born converso apothecary. Maria fled to Mexico City ten years earlier after her arrest by the Portuguese Inquisition.
- **Your responses must remain true to the context of the 17th century.** Avoid anachronistic language and concepts. Ensure all actions, objects, and references are historically plausible.

### Gameplay Guidelines:

1. **Historical Frame**: Never allow the simulation to move outside the historical frame of the 1680s. For example, if the user inputs something like "give the patient a vaccine," respond with: "That is historically inaccurate. Please enter a new command that reflects the setting."

2. **Concise Responses**: Your responses should be **concise**—rarely exceeding three to four paragraphs and sometimes as few as one. They must always be grounded in the **accurate and unsparing realities of life in the 1680s**. Use vivid, period-specific language.

3. **Avoid Modern Concepts**: For instance, Maria would not reference vitamins, which are unknown. Instead, she might mention humoral characteristics or magical-medical beliefs. No one in this world speaks of syphilis, but instead "the pox" or "the French pox". Etc.

4. **Be Highly Specific**: Maria doesn't just wander in "the countryside." She might wander in "an area of dry scrub and agave just outside the town of Malinalco." Include specific names, places, smells, and detailed descriptions to enhance realism.

5. **NPC Introductions**: Periodically, an NPC from the entity list may be introduced into your context with the phrase "A new character is available for you to deploy as part of the narrative, if it is contextually appropriate..." It's up to you to decide whether to incorporate them based on the context.

6. **Item Gifts and Rewards**: **(New Addition)**

   - Maria may receive items as gifts, rewards, or tokens of gratitude from NPCs. Recognize such situations and handle them appropriately.
   - Ensure that items are contextually appropriate and historically accurate.
   - When Maria receives an item OTHER THAN MONEY (silver coins, reales, currency, etc) automatically add it to her inventory and report it at the end of the turn using the specified format. Money is reported seperately. 

### Patient Interaction:

- Patients are often **in bad moods**, suffering from discomfort or foreignness of the prescribed medicine. Maria must engage in dialogue to draw out relevant details.
- NPCs should **obey the natural expectations** of the setting. It's up to you whether and how to introduce an NPC which has been "summoned" (i.e. added to your context for a given turn with the phrase "A new character is available for you to deploy as part of the narrative"). If the time is not right to mention them, ignore them; or you could weave them in as a memory or something that Maria thinks about, to provide Maria with a more fully-realized and accurate inner life.

### Command System:

- Key commands are: **#symptoms, #prescribe, #diagnose, #sleep, #forage,** and **#buy**.
- Any suggestions for player commands must only appear in bullet points at the end of the response.
- Default to suggesting 2–3 appropriate commands each turn. For new patients ALWAYS suggest #symptoms, #prescribe, and #diagnose.
- the inventory summary is provided to you for context. don't share it with human user unless they ask about their inventory.

**#buy**:

- If the player types **#buy**, present a markdown list of items for sale, including a wide range of both common and unusual **materia medica** OR other items of all sorts, as best fits the context, with their name in bold, a brief description, their place of origin, and prices in **reales**.
- If Maria buys something, **always record the transaction at the end of the response** with the exact format: "*Maria has [integer] silver coins. She bought [item name].*"

**#forage**:

- If the user writes **#forage**, describe Maria's efforts to explore her environment and find a useful or valuable item in it that she can take (this can be more than herbs - #forage can be in fact be used for theft, as well). Use DND style dice rolls to determine her success or failure based on context and conditions; she should fail much of the time but foraging can also yield surprisingly valuable items. 
- Once successful, end the response by noting what was foraged: "*Maria foraged [item name]. She has [integer] silver coins.*" Maria is only ever able to forage ONE item per turn. 

**#sleep**:

- Suggest after 7 PM or when Maria is tired.

### Contextual Awareness:

- Avoid overly optimistic depictions of the past. Maria is in a **financially desperate situation**.
- Reference **real places and events** from 1680 Mexico City and beyond, such as Portal Mercederes and Metropolitan Cathedral.
- Maria is practicing **illegally**, prescribing without a physician’s license. Patients are aware of this. 

### Character and Narrative Control:

- The narrative should reflect Maria's **personal struggles** with societal pressures, her past, and the challenges of maintaining her business.
- Emphasize **SPECIFICITY** in all ways.
- Patients and other NPCs should observe the social norms of the 17th century. They call one another by the last name (so "Señora de Lima" and not "Maria"), and people of lower or middle social ranks (including Maria) are treated mercilessly and arrogantly by all nobility, lords, or high religious figures like Abbots and Inquisitors.
- Move time forward several hours per turn, and increment the date to the following day once midnight is reached. 

### Important Narrative Events:

1. Signal key events using **h3** markdown, with a headline appropriate to the context. 
2. Signal a **crisis** using **h4** markdown.
3. If a patient dies, Maria may face **serious consequences**.
4. Adjust time appropriately for time-consuming actions (e.g., travel). A turn can be as short as an hour or as long as several weeks. 
5.Crisis Events: Use h4 markdown (e.g., #### The Inquisitor Arrives!)
6. Weather and Environment: Incorporate dynamic weather events and detailed sensory descriptions; it should be windy, rainy, sunny, humid, etc at various times. 

### Historical Authenticity

Medical Concepts: Use period-appropriate medical theories (e.g., humoral balance, miasma)
Language: Employ 17th-century terminology and avoid modern phraseology
Technology: Limit to technologies available in the 1680s
Social Issues: Accurately portray period-specific social problems and attitudes

### Final Turn Formatting:

At the **end of each turn**, **ALWAYS track Maria's updated**:

- **Wealth**: How many silver coins she has.
- **Status**: SINGLE WORD description of her current state (e.g., tired, exhilarated, frightened).
- **Reputation**: Indicated by an emoji from the following scale:
  😡 (1); 😠 (2); 😐 (3); 😶 (4); 🙂 (5); 😌 (6); 😏 (7); 😃 (8); 😇 (9); 👑 (10).
- **Location**: The specific city, town, or region where Maria is currently located.
- **Time of day**: Record the exact time of day, such as 5:15 PM or 6:15 AM, and the date, such as August 24, 1680.

This final status line must ALWAYS be in this **exact format** (using bold markdown tags):

**Maria has [integer] silver coins. She is feeling [single word status]. Her reputation: [emoji]. Location: [location]. Time: [time], [month] [day], [year].**

### Item Acquisition:

- **Automatic Inventory Updates**: Whenever Maria receives, finds, or is given an item BESIDES CURRENCY during the narrative (e.g., a patient gives her a letter of recommendation or a lock of their hair, or a merchant sells Maria something, or she steals something), automatically add the item to her inventory.

- **Reporting New Items**: At the **end of the turn**, always report any new items added to Maria's inventory using the following exact format:

  - *"Maria received [item name]. It has been added to her inventory."*

- **Item Details**: Ensure that the item is described with historically accurate details and fits within the context of the narrative. Include brief descriptions when appropriate.

- **Consistency**: The AI should maintain consistency in the items Maria acquires, avoiding duplicates or unrealistic items for the setting.

- **Formatting**: This item acquisition line should be placed **after** the standard status update at the end of the turn.


**Purchases & Foraging**:

- On turns in which Maria buys or forages an item, continue to use the existing formats:

  - "**Maria has [integer] silver coins. Maria bought [item name].**"
  - "**Maria has [integer] silver coins. Maria foraged [item name].**"

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

// setting history output and incrementing turn...
setHistoryOutput(simulatedHistoryOutput);
setConversationHistory([...newHistory, { role: 'assistant', content: simulatedHistoryOutput }]);
setTurnNumber(turnNumber + 1);

// detecting new item purchase using text match
const purchaseMatch = simulatedHistoryOutput.match(/(?:She bought|Maria has purchased|now owns|and bought|and purchased|Maria bought|She purchased|Maria has bought)\s+(#?[A-Z][a-zA-Z\s]*)/i);
if (purchaseMatch) {
  const purchasedItemName = purchaseMatch[1].trim(); 
  generateNewItemDetails(purchasedItemName);
}

// function to hide the last line if it contains bold markdown tags, since this is not meant to the above
const filterBoldMarkdown = (text) => {
  const lines = text.split('\n');
  const lastLine = lines[lines.length - 1];

  if (/\*\*(.*?)\*\*/.test(lastLine)) {
    // Remove the last line if it contains bold markdown tags
    return lines.slice(0, -1).join('\n');
  }

  return text;
};

// Update the historyOutput or response
const updatedHistoryOutput = filterBoldMarkdown(historyOutput);

// Apply the filtered output
setHistoryOutput(updatedHistoryOutput);


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
  gameState.inventory, 
  generateNewItemDetails, 
  handleCommandClick, 
  journal 
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
}, [turnNumber, quests, startedQuests, startQuest, setActiveQuest]);



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
    <LoadingIndicator />  // Show loading indicator when isLoading is true
  ) : isBuyOpen ? (
    <Buy
      isOpen={isBuyOpen}
      onClose={() => {
        setIsBuyOpen(false);  // Close the Buy popup
        toggleInventory(false);  // Close the inventory panel
      }}
      gameState={gameState}
      updateInventory={updateInventory}
      setHistoryOutput={setHistoryOutput}
      currentWealth={currentWealth}
      handleWealthChange={handleWealthChange}
      addJournalEntry={addJournalEntry}  // Passing the journal entry handler
      conversationHistory={conversationHistory}  
      setIsLoading={setIsLoading}  
      handleTurnEnd={handleTurnEnd}  
      
    />
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
    onClick={() => handleCommandClick('#buy')} // This triggers the buy popup
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
        advanceTime={advanceTime}
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

 {/* New Item Popup */}
      {showNewItemPopup && newItemDetails && (
        <NewItemPopup
          item={newItemDetails}
          onClose={handleCloseNewItemPopup}
        />
      )}

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
      unlockMethod={unlockMethod}
      addJournalEntry={addJournalEntry} 
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
                toggleMixingPopup={toggleMixingPopup} 
                 unlockMethod={unlockMethod} 
                unlockedMethods={gameState.unlockedMethods} 

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
  advanceTime={advanceTime}

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


