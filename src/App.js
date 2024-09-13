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
import { assessPrescription, assessGameplay } from './AssessmentAgent';
import About from './About';  
import imageMap from './imageMap';
import CounterNarrative from './CounterNarrative'; 
import NavMobile from './NavMobile';
import Diagnose from './Diagnose'; 
import Map from './Map';
import Quest, { quests } from './Quest';
import { initialInventoryData, potentialInventoryItems } from './initialInventory';
import HistoryOutput from './HistoryOutput';
import './App.css';
import './Inventory.css';
import './Popup.css';
const PDFPopup = lazy(() => import('./PDFPopup'));


function App() {
  const { gameState, updateInventory, updateLocation, addCompoundToInventory, generateNewItemDetails, startQuest, advanceQuestStage, completeQuest, advanceTime } = useGameState();


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
  const [isEmoji, setIsEmoji] = useState(false);
  
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [selectedCitation, setSelectedCitation] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [showPdfButtons, setShowPdfButtons] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState('');


// Toggle functions




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
  const openPrescribePopup = (npc) => {
    setCurrentPatient(npc);
    setIsPrescribePopupOpen(true);
  };

  const handleClosePrescribePopup = () => {
  setIsPrescribing(false);
  setIsPrescribePopupOpen(false);
};

  // Close the popup after use
  const closePrescribePopup = () => {
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
      setShowJournalEntryBox(false);
    }
  }, [customJournalEntry]);

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


  const addQuestionsToContext = (questions) => {
  setAdditionalQuestions(questions);
};

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
    You are Maria de Lima, apothecary. A new day dawns on your apothecary shop (*botica*) on the Calle de la Amargura in Mexico City.    
    &nbsp;  
    Shelves line the walls of your shop. Typically, they carry neat rows of medicines in jars. But not today — thanks to the thugs hired by Don Luis, the moneylender, who have either destroyed or confiscated all your most valuable cures. As you grind cacao, cornmeal, and cinnamon in a *molcajete* to make hot chocolate, you ponder what to do about your debts, which now top 100 *reales*. For now, your next move is to feed some scraps of dried fish to a friendly street kitten who you've named João.  
    &nbsp;  
    Meanwhile, the street outside comes to life. Servants hurry past with baskets of fresh produce, while a group of Dominican friars makes their way towards the nearby church. A water-carrier with his earthen jug trudges by, followed by a group of boisterous students. A patrol of soldiers carrying pikes is a reminder of troubling rumors – whispers of unrest in the northern provinces.  
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

// command detection
const handleCommandClick = (command) => {
  const commandParts = command.split(' ');
  const commandType = commandParts[0].toLowerCase();
  const targetName = commandParts.slice(1).join(' ');
    const npcName = npcCaption.split(',')[0]; 

  switch (commandType) {
    case '#symptoms':
      if (npcName) {
        setSelectedNpcName(npcName);
        setShowSymptomsPopup(true);
      } else {
        setHistoryOutput('No NPC is currently selected.');
      }
      break;

    case '#prescribe':
  let targetNPC;
  if (targetName) {
    targetNPC = EntityList.find(entity => 
      entity.name.toLowerCase() === targetName.toLowerCase()
    );
  } else {
    // First, check if there's an NPC in the current scene (from npcCaption)
    const currentNPCName = npcCaption.split(',')[0].trim();
    targetNPC = EntityList.find(entity => 
      entity.name.toLowerCase() === currentNPCName.toLowerCase()
    );
    
    // If no NPC found in the caption, fall back to checking the history output
    if (!targetNPC) {
      targetNPC = EntityList.find(entity => 
        historyOutput.toLowerCase().includes(entity.name.toLowerCase())
      );
    }
  }

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
      const patientForDiagnosis = EntityList.find(entity => 
        entity.type === 'patient' && historyOutput.toLowerCase().includes(entity.name.toLowerCase())
      );
      if (patientForDiagnosis) {
        setCurrentPatient(patientForDiagnosis);
        setIsDiagnoseOpen(true);
      } else {
        setHistoryOutput('No valid patient found for diagnosis. Make sure a patient is present in the current scene.');
      }
      break;

    case '#map':
      toggleMap();
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
    prescribe: historyOutput.includes('prescribe'),
    symptoms: historyOutput.includes('symptoms'),
    diagnose: historyOutput.includes('diagnose'),

    buy: historyOutput.includes('#buy'),
    // Add more commands as needed
  };
  setCommandsDetected(newCommandsDetected);
}, [historyOutput]);

//prologue quest start

useEffect(() => {
  console.log('Checking for prologue quest start...');
  if (gameState.quests.length === 0 && turnNumber === 0) {
    const prologueQuest = quests.find(q => q.id === 0);
    if (prologueQuest) {
      console.log('Prologue quest found, starting...');
      startQuest(prologueQuest);
      setActiveQuest(prologueQuest);
    }
  }
}, [gameState.quests.length, startQuest, turnNumber]);

// quest start check 

useEffect(() => {
    const checkForQuestStart = (currentTime) => {
      const availableQuests = quests.filter(quest => !quest.completed);
      const questToStart = availableQuests.find(quest => quest.trigger(turnNumber, userActions, location, currentTime));
      if (questToStart) {
        startQuest(questToStart);
      }
    };

    checkForQuestStart(gameState.time);
  }, [turnNumber, userActions, location, startQuest, gameState.time]);



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


const handleTurnEnd = useCallback(async (narrativeText) => {
  const { summary, summaryData, npcImageName, inventoryChanges } = await generateJournalEntry(narrativeText, process.env.REACT_APP_OPENAI_API_KEY);
  
  advanceTime(summaryData);  

  console.log('Journal Agent Output:', summary);
  console.log('NPC Image Name from Journal Agent:', npcImageName);

  const isEmoji = /^\p{Emoji}$/u.test(npcImageName);
  const lowerCaseImageName = npcImageName.toLowerCase();

  console.log('ImageMap keys:', Object.keys(imageMap));
  console.log('NPC Image Name (lowercase):', lowerCaseImageName);

  let selectedEntity = EntityList.find(entity => 
    (entity.image && entity.image.toLowerCase() === lowerCaseImageName) ||
    (entity.name && entity.name.toLowerCase().includes(lowerCaseImageName))
  );
  console.log('Selected entity:', selectedEntity);

  if (isEmoji) {
    setIsEmoji(true);
    setNpcImage(null);
    setNpcCaption(`Scene in ${summaryData.location || location}`);
    setNpcInfo(`<span class="emoji-image">${npcImageName}</span>`);
  } else if (selectedEntity) {
    setIsEmoji(false);
    setNpcImage(imageMap[selectedEntity.image]);
    setNpcCaption(selectedEntity.caption);
    setNpcInfo(selectedEntity.description);
    console.log('Image set from EntityList:', selectedEntity.image);
  } else if (imageMap[lowerCaseImageName]) {
    setIsEmoji(false);
    setNpcImage(imageMap[lowerCaseImageName]);
    const timeOfDay = summaryData.time.toLowerCase().includes('night') ? 'night' : 'day';
    setNpcCaption(`A scene in ${summaryData.location || location}`);
    setNpcInfo(`A typical ${timeOfDay} scene in ${summaryData.location || location}.`);
    console.log('Image set from imageMap:', lowerCaseImageName);
  } else {
    // Fuzzy matching for locations and generic scenes
    const possibleMatches = Object.keys(imageMap).filter(key => 
      lowerCaseImageName.includes(key) || key.includes(lowerCaseImageName)
    );

    if (possibleMatches.length > 0) {
      const bestMatch = possibleMatches[0]; // Use the first match
      setIsEmoji(false);
      setNpcImage(imageMap[bestMatch]);
      setNpcCaption(`A scene in ${summaryData.location || location}`);
      setNpcInfo(`A scene related to ${bestMatch} in ${summaryData.location || location}.`);
      console.log('Image set from fuzzy match:', bestMatch);
    } else {
      console.warn(`No matching image found for: ${npcImageName}. ImageMap keys: ${Object.keys(imageMap).join(', ')}. Using emoji as fallback.`);
      setIsEmoji(true);
      setNpcImage(null);
      setNpcCaption(`Scene in ${summaryData.location || location}`);
      setNpcInfo(`<span class="emoji-image">${npcImageName || '🏞️'}</span>`);
    }
  }

  // Add journal entry
setJournal(prevJournal => [...prevJournal, { content: summary, type: 'auto' }]);

// Update gameState with the new date, time and location from summaryData
if (summaryData.time && summaryData.date) {
  advanceTime(); // Call advanceTime to update time and date
}
if (summaryData && summaryData.location) {
  updateLocation(summaryData.location); // Use updateLocation to update the location
}


// Handle any inventory changes (assuming you already handle this elsewhere)
if (inventoryChanges && inventoryChanges.length > 0) {
  inventoryChanges.forEach(change => {
    updateInventory(change.name, change.quantity);
  });
}

}, [
  setIsEmoji, 
  setNpcImage, 
  setNpcCaption, 
  setNpcInfo, 
  setJournal, 
  imageMap, 
  EntityList, 
  updateInventory,
  advanceTime,
  updateLocation, 
  advanceTime 
]);


// Handling Submission
const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  let narrativeText = userInput.trim().toLowerCase(); // Convert to lowercase for easier matching

    // Check for #prescribe command
  if (narrativeText === '#prescribe') {
    handleCommandClick('#prescribe');
    setUserInput('');
    setIsLoading(false);
    return;
  }

  // Step 1: Prepare the inventory summary for the history agent
  const inventorySummary = gameState.inventory.map(item => 
    `${item.name} (Quantity: ${item.quantity}, Price: ${item.price} silver coins)`
  ).join('\n');
  
  // Helper function to determine if a quest should advance
const shouldAdvanceQuest = (quest, actions) => {
  // This is a placeholder implementation
  // tk come back to this to finalize quest functionality
  return actions.some(action => action.includes(`advanceQuest${quest.id}`));
};
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
  

  // track user actions
  setUserActions(prevActions => [...prevActions, narrativeText]);

  // Normalize the command by removing the hashtag if present
  const command = narrativeText.startsWith('#') ? narrativeText.substring(1) : narrativeText;

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


// core gameplay logic (HistoryAgent)
  const selectedEntity = selectEntity();
  if (selectedEntity) {
    narrativeText += `\n\nA new character has entered the scene: ${selectedEntity.name}, ${selectedEntity.age} years old, ${selectedEntity.occupation}. ${selectedEntity.description}`;
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
          messages: [
            {
              role: 'system',
              content: `You are HistoryLens, an advanced historical simulation engine. You maintain an immersive simulation which begins in Mexico City and environs on August 22, 1680. The simulation is based on brief MUD-like descriptions and commands and maintains vividly realistic historical versimilitude. 
              The user's playable character (PC) is Maria de Lima, a 45-year-old Coimbra-born converso apothecary who, ten years earlier, fled to Mexico City following her arrest by the Portuguese Inquisition. 
              Remember, the simulation must remain true to the context of the 17th century: avoid anachronistic language and concepts, and ensure that all actions, objects, and references are historically plausible.

              **Gameplay Guidelines:**
              - The human user's inputs should never lead you to move outside the historical frame of Mexico in 1680. For instance, if they input "give the patient a vaccine," you would respond by saying "That is historically inaccurate. Please enter a new command that reflects the setting." Otherwise, player inputs have a wide latitude and should be accepted.
              - Your responses should be concise, rarely exceeding three paragraphs and sometimes as few as one, and always grounded in the vivid, sensory historical realities of 1680s life. Use appropriate period-specific language and avoid modern concepts (for instance, Maria would never prescribe a medicine because of its vitamin content - vitamins are unknown. Instead she might mention humoral characteristics or Keith Thomas-style magical-medical beliefs prevalent in 17th century alchemical medicine.)
              - Patients sometimes complain about the foreignness or noxiousness of a medicine Maria prescribes. They are often in a bad mood. Maria/the player needs to converse with them to draw out relevent details. 
              - If a entity (a patient or other NPC) appears in a turn, they become the main subject of the turn, but they must always be interwoven with the context of time and place. For instance, if it is the middle of the night, a patient might be desperately knocking on Maria's door with an urgent malady, whereas at noon they might be less desperate. Maria (the player) is allowed to tell patients to go away and do something else, but other NPCs like inquisitors may be more insistent. 

              **Commands:**
              - Certain key words are commands: #symptoms, #prescribe, #diagnose, #forage, and #buy. In addition to suggesting a plausible course of action, like "perhaps you could ask her more about her illness" or "the herbs you need might be at the Portal de Mercaderes or La Alameda" you might suggest up to three specific commands whenever contextually appropriate. This should come at the end of the turn, and remember to always use the hashtag. Suggest exploring #symptoms, attempting to  #diagnose, or to use #prescribe if they feel certain of the diagnosis. #buy is suggested whenever items for sale may be nearby, #forage when items may be harvested.
              - when treating a patient, you should always ask is player wants to use #symptoms command.
              - #buy: herbs and other materia medica are available at the herb stalls of the Portal de Mercaderes and other local markets. ALWAYS provide a markdown list, with name, brief description, and price in silver coins, of all herbs, medicines, or drugs for sale nearby. Some of the items that Maria can buy are: "Peyote",[only very rarely] "Hongos Malos", "Ayahuasca", "Epazote", "Cochineal", "Tobacco", "Arnica", "Violets", 
    "Nutmeg", "Thyme", "Pennyroyal", "Sage", "Guaiacum", "Cinchona", "Ginger", "Angelica", "Lavender", 
    "Wormwood", "Burdock", "Celandine", "Cardamom", "Coriander", "Myrrh", "Cloves", "Cinnamon", "Fennel", 
    "Rhubarb", "Licorice Root", "Mugwort", "Oregano", "Passionflower", "Rhubarb", "St. John's Wort", "Tobacco,"
    "Yarrow", "Valerian", Radish seeds," "Scorpions", "Vinegar", Calendula", "Mullein", "Echinacea", "Anise", "Chamiso", "Sassafras", "a Small Cat," "Skull of a Man," "Bird Feathers," 
    "Marshmallow Root", "Mandrake", "Blackberry Root", "Lemon Balm", "Spearmint", "Willow Bark", "Comfrey", 
    "Hyssop", "Wine", "Ginger", "Chili", "Aloe Vera", "Peppermint", "Nightshade", "Deer Antlers", "Vanilla", "Bezoar" (very expensive)
              - #forage: Maria is a skilled forager and can find some of the above substances (and others, as contextually appropriate) in the countryside. She may add them to inventory with the #forage command.

              **Contextual Awareness:**
              - Avoid overly optimistic or rosy depictions of the past - Maria de Lima is in debt and has a strong incentive to make money from her patients; likewise, patients are sick and often annoyed. Maria is in an increasingly desperate personal and financial state, owing 100 reales to Don Luis and 20 reales to Marta the herb woman. 
              - Reference real places and events of 1680 Mexico City and beyond (it is theoretically possible for Maria to travel long distances, although passage across the Atlantic or land travel to colonial North America is far more likely than say, travel to China)
              - Keep in mind that Maria is practicing outside the realm of the legality by prescribing medicines without a physician's prescription - so her patients are often seeking her out because they have a secret or are in particular need. The patient may also explain that a doctor's orders have failed, for instance that bleeding did not work.
              - Allow FULL latitude for player choice. If Maria wants to ignore her patients to go on an adventure, let her! Encourage experimentation. Some places Maria might visit include: 


              **Character and Narrative Control:**
              - The simulation should reflect Maria's struggles with societal pressures, her past, and the challenges of maintaining her business. In particular, it begins with Don Luis, the moneylender, demanding payment of 100 reales (silver coins) by sunset of August 23. Make sure that Don Luis or his representatives (armed thugs) periodically reppear aggressively in the story as long as Maria is in Mexico City - give her the option to flee if threatened. 
              - The user has the option to click an "Incorporate counter-narrative" button which adds a critique of the previous turn output by an expert historian to your context for preparing the next turn. Integrate this knowledge subtly but actively to enhance realism.
              - When contextually appropriate, reference rumors of brujas and curanderos in the villages outside the city, using an unfamiliar drug called *hongos malos.* And other intriguing things of that nature, for instance rumors of the Pueblo Revolt on the northern border, or Catholic-Protestant tensions (its the era of the Popish Plot in England), or rivalries between Cartesians and Aristotelians (ancients vs moderns) or the growing importance of "drogas da India" -- exotic materia medica from China, India, and the tropics in general.
              - At the Portal de Mercaderes, there is a quest available if you visit spend more than one turn at the marketplace stalls where a Nahuatl man named Tlacaelel approaches you and initiates Quest 3, the Nahuatl Codex. This quest is implemented when the user types: Tlacaelel, as in "speak to Tlacaelel," so he should introduce himself by name and you should ask if the user wnats to speak to him.
              - On some turns, such as Turn 1, you will introduce patients and other NPCs from a list of "entities" (NPCs, patients, places, and events) which is in the underlying source code. The NPC/patient should DIRECTLY appear - not a family member. Always introduce their full name, age, and background. After Maria prescribes medicine of any kind, the NPC departs the scene and does not linger, though they may reappear in later turns (and, at times, NPCs may even be killed by a toxic prescription).
              - Maria starts with 11 silver coins. If there are any changes to Maria's wealth, status (she awakens feeling rested, but might feel tired, amused, exhilarated, curious, desperate, terribly frightened, etc in later turns - i.e. if she encounters an Inquisitor, she will be frightened or anxious - always one word), or her "reputation meter" (for instance, if she is sued, if a patient dies or complains, if she steals, if the Inquisition questions her) then note it at the END of your response. Update status and reputation (via emoji) every turn. If Maria sold a drug for 2 coins, write "Maria has sold [drug name] for [#] coins."
               Remember that when Maria sells a drug, the coins she makes ADD to her existing wealth. When she buys a drug, they DETRACT. 
               - certain NPCs have no names. For instance, an NPC like "soldado" or "Doña" or "Caballero" represents a whole class of people. When you introduce them, give them names to individualize them, like "Doña Maria de Gallego" or "Eduardo, a sailor."
               - when a turn seems to be an important moment, begin your output with either h3 markdown tags (announcing a change or event, like "Maria left Mexico City" or "A new day dawns...") or h4 markdown tags, which render as red and signal an emergency or crisis point, like "Maria has been arrested!" or "The Inquisitor has arrived...".
               - Track Maria's wealth, status, reputation, and the date and time in each response. Reputation is displayed via a choice of ONE of these emojis (Maria starts at 3, 😐) 😡 (1) ; 😠 (2) ; 😐 (3) ; 😶 (4) ; 🙂 (5) ; 😌 (6) ; 😏 (7) ; 😃 (8) ; 😇 (9) ; 👑 (10)Your final line should always be in this exact format:

              **Maria has [integer] silver coins. She is feeling [single word status]. Her reputation is [emoji]. The time is # AM (or PM), xx [month] [year].**

              On any turn when Maria buys an item, you must ALWAYS end your response by noting the item purchased. The item bought must ALWAYS come at the end of your response, like this:  **Maria has [integer] silver coins. She spent [integer] of them. Maria bought [itemname].** 
              Likwise for the #forage command: If Maria successfully forages for an item, always end your response noting it as follows: **Maria has [integer] silver coins. Maria foraged [itemname].** 
              Tracking buying and foraging in this specific way is very important. It allows the game to track new items.  

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
        isEmoji={isEmoji}  
        status={mariaStatus}  
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
    </div>



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
          <h3>Available Documents:</h3>
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
      location={gameState.location}
      activeQuest={activeQuest}
      setActiveQuest={setActiveQuest}
      time={gameState.time} 
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
       <Symptoms 
         npcName={selectedNpcName} 
         onClose={closeSymptomsPopup} 
         onPDFClick={handlePDFClick}
         addQuestionsToContext={addQuestionsToContext}  
         handleSubmit={handleSubmit}
         conversationHistory={conversationHistory}
  setHistoryOutput={setHistoryOutput}
  setConversationHistory={setConversationHistory}
       />
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
                toggleMixingPopup={toggleMixingPopup}  // Pass the toggleMixingPopup function as a prop
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
          onPDFClick={handlePDFClick}  
        />
        
<PrescribePopup 
  isOpen={isPrescribePopupOpen}
  onClose={() => {
    setIsPrescribePopupOpen(false);
    setIsPrescribing(false);
    setIsInventoryOpen(false);
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
 
    </DndProvider>
  );
}

export default App;

