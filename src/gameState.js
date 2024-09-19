import { useState, useCallback } from 'react';
import { initialInventoryData, potentialInventoryItems } from './initialInventory';

// Fisher-Yates shuffle function to shuffle the array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Function to get a random selection of 10 items from the full inventory
const getRandomInventory = () => {
  const shuffledInventory = shuffleArray([...initialInventoryData]); // Create a shuffled copy of the array
  return shuffledInventory.slice(0, 10); // Return the first 10 items
};

// initial game state
export const useGameState = () => {
  const [gameState, setGameState] = useState({
    inventory: getRandomInventory(), // Initialize with a random selection of 10 items
    quests: [], 
    compounds: [], 
    time: '8:00 AM',  
    date: 'August 22, 1680', 
    location: 'Botica de la Amurgura, Mexico City',
    turnNumber: 1,  
  });

  // Update location
  const updateLocation = useCallback((newLocation) => {
    if (!newLocation) return;

    setGameState((prevState) => ({
      ...prevState,
      location: newLocation, // Update to the new location
    }));
  }, []);

const startQuest = useCallback((newQuest) => {
  setGameState((prevState) => {
    // Check if the quest already exists
    const existingQuest = prevState.quests.find(quest => quest.id === newQuest.id);
    if (existingQuest) {
      console.warn(`Quest with ID ${newQuest.id} already started.`);
      return prevState; // Prevent adding the same quest twice
    }

    // Add the new quest to the quests array
    return {
      ...prevState,
      quests: [...prevState.quests, { ...newQuest, currentStage: 1, completed: false }],
    };
  });
}, []);

   // Update inventory logic
  const updateInventory = useCallback((updateItemName, quantityChange) => {
    setGameState((prevState) => {
      let updatedInventory = prevState.inventory.map((item) => {
        if (item.name.toLowerCase() === updateItemName.toLowerCase()) {
          const newQuantity = item.quantity + quantityChange;
          return { ...item, quantity: Math.max(0, newQuantity) };
        }
        return item;
      });

      const itemExists = updatedInventory.some(item => item.name.toLowerCase() === updateItemName.toLowerCase());
      if (!itemExists) {
        const newItem = potentialInventoryItems[updateItemName.toLowerCase()];
        if (newItem) {
          updatedInventory = [...updatedInventory, { ...newItem, quantity: quantityChange }];
        }
      }

      const filteredInventory = updatedInventory.filter(item => item.quantity > 0);
      return { ...prevState, inventory: filteredInventory };
    });
  }, []);

  // Add compound to inventory logic
const addCompoundToInventory = useCallback((compound) => {
  if (!compound || typeof compound !== 'object' || !compound.name) {
    console.error('Invalid compound:', compound);
    return;
  }

  setGameState((prevState) => {
    const updatedInventory = [...prevState.inventory]; // Create a new array for immutability
    const existingItemIndex = updatedInventory.findIndex(
      (item) => item.name.toLowerCase() === compound.name.toLowerCase()
    );

    if (existingItemIndex >= 0) {
      updatedInventory[existingItemIndex].quantity += (compound.quantity || 1);
    } else {
      updatedInventory.push({ ...compound });
    }

    return {
      ...prevState,
      inventory: updatedInventory,
      compounds: [...prevState.compounds, { ...compound }],
    };
  });
}, []);


  // Function to generate new item details
  const generateNewItemDetails = useCallback(async (itemName) => {
    const prompt = `Generate details for a new materia medica named "${itemName}" in JSON format. Note that a wide range of plants, animals, and minerals can be materia medica - everything from cats and dogs and monkeys to medicinal cannibalism to spices. 
    The following fields must be included in your output in exactly this format:

name (string): The name of the materia medica in English.
latinName (string): The Latin name of the materia medica.
spanishName (string): The name of the materia medica in Spanish.
price (integer): The price in silver coins (range: 1-20).
quantity (integer): The default quantity of the item (range: 1-5).
humoralQualities (string): Describe its qualities according to humoral theory (e.g., "Warm & Moist").
medicinalEffects (string): The specific effects it has on health and the body.
description (string): A brief, historically plausible description of the item.
emoji (single emoji character): Choose a SINGLE emoji to represent the item, for instance 🥃 for rum, ☄️ for red sulphur, or 🐌 for snailwater.
Ensure the JSON is valid and uses double quotes for keys and string values.

Here are two examples of expected formatting:

Example 1: "Monkey" (Animal)

{
  "name": "Monkey",
  "latinName": "Simia",
  "spanishName": "Mono",
  "price": 25,
  "quantity": 1,
  "humoralQualities": "Warm & Moist",
  "medicinalEffects": "Monkeys are sometimes used in exotic medicinal recipes and believed to bring warmth and vitality.",
  "description": "A rare and lively pet, considered a luxury in 17th-century Mexico. Monkeys are often prized for their exotic nature.",
  "emoji": "🐒"
}
Example 2: "Peyote" (Plant)

{
  "name": "Peyote",
  "latinName": "Lophophora williamsii",
  "spanishName": "Peyote",
  "price": 10,
  "quantity": 1,
  "humoralQualities": "Hot & Dry",
  "medicinalEffects": "Used for spiritual healing and to treat ailments of the mind and spirit, inducing visions.",
  "description": "A sacred cactus used in religious ceremonies by indigenous peoples, known for its hallucinogenic properties.",
  "emoji": "🌵"
}
    Ensure the JSON is valid and uses double quotes for keys and string values.
    1. Start with an opening curly brace {
2. End with a closing curly brace }
3. Have all keys in double quotes
4. Have all string values in double quotes
5. Not have any trailing commas
6. Not have any comments or additional text outside the JSON structure

If your response doesn't meet these criteria, please correct it before returning.`;

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
            {
              role: 'system',
              content: `You are an assistant that generates JSON data for materia medica purchased in an educational game set in 1680 Mexico City. Use your historical knowledge to create accurate entries. Always return a valid JSON object with the exact fields specified, using double quotes for keys and string values. Here's an example of the expected format:
              {
                "name": "Saffron",
                "latinName": "Crocus sativus",
                "spanishName": "Azafrán",
                "price": 15,
                "quantity": 1,
                "humoralQualities": "Warm & Dry",
                "medicinalEffects": "Used to alleviate melancholy, improve digestion, and treat coughs.",
                "description": "Highly valued spice derived from the stigmas of Crocus flowers, often mixed in compound drugs.",
                "emoji": "🌸"
              }
              Ensure that the JSON is correctly formatted and includes all required fields.`
            },
            { role: 'user', content: prompt }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      let newItemDetails;

      try {
        newItemDetails = JSON.parse(data.choices[0].message.content);

        // Add the new item to the inventory and compounds
        addCompoundToInventory({
          ...newItemDetails,
          name: itemName,
        });
      } catch (error) {
        console.error("Error parsing new item details:", error);
      }

    } catch (error) {
      console.error("Error generating new item details:", error);
    }
  }, [addCompoundToInventory]);

  // Function to ensure that inventory updates are immediately reflected in the game state
const refreshInventory = useCallback(() => {
  setGameState((prevState) => ({
    ...prevState,
    inventory: [...prevState.inventory],
    compounds: [...prevState.compounds]  // Add this line to refresh compounds as well
  }));
}, []);


  // time handling via summarydata from journal.agent JSON output

  const advanceTime = useCallback((summaryData) => {
    setGameState((prevState) => {
      let newTime = prevState.time;
      let newDate = prevState.date;

      // Check if the journal agent provided an estimated time and date
      if (summaryData && summaryData.time && summaryData.date) {
        newTime = summaryData.time;  // Use the exact time provided by the journal agent
        newDate = summaryData.date;  // Use the exact date provided by the journal agent
      } else {
        // Fallback logic: Increment by 1 hour if journal output is unavailable
        const currentTime = new Date(`August 22, 1680 ${prevState.time}`);
        currentTime.setHours(currentTime.getHours() + 1);
        newTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // If the new time goes past midnight, increment the date
        if (newTime === '12:00 AM') {
          const currentDate = new Date(prevState.date);
          currentDate.setDate(currentDate.getDate() + 1);
          newDate = currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
      }

      return {
        ...prevState,
        time: newTime,
        date: newDate,
      };
    });
  }, []);


  // Advance quest to the next stage
  const advanceQuestStage = useCallback((questId) => {
    setGameState(prevState => ({
      ...prevState,
      quests: prevState.quests.map(quest =>
        quest.id === questId ? { ...quest, currentStage: quest.currentStage + 1 } : quest
    ),
    }));
  }, []);

// Complete a quest and mark it as completed without removing it
const completeQuest = useCallback((questId) => {
  setGameState(prevState => ({
    ...prevState,
    quests: prevState.quests.map(quest =>
      quest.id === questId ? { ...quest, completed: true } : quest
    ),
  }));
}, []);


 return {
    gameState,
    updateInventory,
    setGameState,
    updateLocation,
    addCompoundToInventory,
    generateNewItemDetails,
    refreshInventory,
    startQuest,  
    advanceQuestStage,
    completeQuest,
    advanceTime,
  };
};
