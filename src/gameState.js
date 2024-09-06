import { useState, useCallback } from 'react';
import { initialInventoryData, potentialInventoryItems } from './initialInventory';

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    inventory: initialInventoryData, 
    quests: [], 
    compounds: [], 
    time: 'Morning',
    location: 'Apothecary shop, Mexico City',
  });

  // Update inventory logic
  const updateInventory = useCallback((updateItemName, quantityChange) => {
    if (!updateItemName || typeof updateItemName !== 'string' || typeof quantityChange !== 'number') {
      console.error('Invalid updateItem or quantityChange:', updateItemName, quantityChange);
      return;
    }

    setGameState((prevState) => {
      const updatedInventory = prevState.inventory.map((item) => {
        if (item.name.toLowerCase() === updateItemName.toLowerCase()) {
          const newQuantity = item.quantity + quantityChange;
          return { ...item, quantity: Math.max(0, newQuantity) };
        }
        return item;
      });

      // Add new item if it does not exist in inventory
      const itemExists = updatedInventory.some(item => item.name.toLowerCase() === updateItemName.toLowerCase());
      if (!itemExists) {
        const newItem = potentialInventoryItems[updateItemName.toLowerCase()];
        updatedInventory.push({ ...newItem, quantity: quantityChange });
      }

      const filteredInventory = updatedInventory.filter(item => item.quantity > 0);
      return { ...prevState, inventory: filteredInventory };
    });
  }, []);

  // Add new compound to inventory logic
  const addCompoundToInventory = useCallback((compound) => {
    if (!compound || typeof compound !== 'object' || !compound.name) {
      console.error('Invalid compound:', compound);
      return;
    }

    setGameState((prevState) => {
      const existingItem = prevState.inventory.find(item =>
        item.name.toLowerCase() === compound.name.toLowerCase()
      );

      if (existingItem) {
        return {
          ...prevState,
          inventory: prevState.inventory.map(item =>
            item.name.toLowerCase() === compound.name.toLowerCase()
              ? { ...item, quantity: item.quantity + (compound.quantity || 1) }
              : item
          ),
        };
      } else {
        return {
          ...prevState,
          inventory: [...prevState.inventory, { ...compound }],
        };
      }
    });
  }, []);

  // Function to generate new item details
  const generateNewItemDetails = useCallback(async (itemName) => {
    const prompt = `Generate details for a new medicinal item named "${itemName}" in JSON format. Include the following fields exactly as specified:
    - name (string)
    - latinName (string)
    - spanishName (string)
    - price (integer between 1 and 20)
    - quantity (integer between 1 and 5)
    - humoralQualities (string)
    - medicinalEffects (string)
    - description (string)
    - emoji (single emoji character)
    Ensure the JSON is valid and uses double quotes for keys and string values.`;

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
              content: `You are an assistant that generates JSON data for medicinal items purchased in an educational game set in 1680 Mexico City. Use your historical knowledge to create accurate entries. Always return a valid JSON object with the exact fields specified, using double quotes for keys and string values. Here's an example of the expected format:
              {
                "name": "Saffron",
                "latinName": "Crocus sativus",
                "spanishName": "Azafrán",
                "price": 15,
                "quantity": 2,
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

        // Add the new item to the inventory
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
    }));
  }, []);

  // Start a quest
  const startQuest = useCallback((quest) => {
    setGameState(prevState => ({
      ...prevState,
      quests: [...prevState.quests, { ...quest, currentStage: 0 }],
    }));
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

// Complete a quest and remove it from active quests
const completeQuest = useCallback((questId, outcome) => {
  setGameState(prevState => {
    const updatedInventory = [...prevState.inventory];

    // Handle any specific outcome effects, if necessary (e.g., updating inventory based on quest outcome)
    // If no additional logic, you can remove this part

    return {
      ...prevState,
      inventory: updatedInventory, // Keep this line only if inventory is modified
      quests: prevState.quests.filter(quest => quest.id !== questId), // Remove the completed quest
    };
  });
}, []);

  return {
    gameState,
    updateInventory,
    addCompoundToInventory,
    generateNewItemDetails,  
    refreshInventory,
    startQuest,  // Ensure this is returned
    advanceQuestStage,
    completeQuest,
  };
};
