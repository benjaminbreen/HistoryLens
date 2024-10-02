import React, { useState, useEffect } from 'react';
import './Buy.css'; // Optional: Styling for the Buy Popup

function Buy({
  isOpen, 
  onClose, 
  gameState, 
  updateInventory, 
  setHistoryOutput, 
  currentWealth, 
  handleWealthChange, 
  addJournalEntry,  
  conversationHistory,  
  handleTurnEnd  
}) {
  const [availableItems, setAvailableItems] = useState([]); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [offeredPrice, setOfferedPrice] = useState(0);
  const [merchantResponse, setMerchantResponse] = useState(null);
  const [isFetchingItems, setIsFetchingItems] = useState(false);  // Local loading state for fetching items
 const [isClosing, setIsClosing] = useState(false);
 const [isFadingOut, setIsFadingOut] = useState(false);


   const closePopup = () => {
    // Trigger the fade-out animation
    setIsClosing(true);

      setTimeout(() => {
      setIsClosing(false); // Reset the closing state
      onClose(); // Close the popup after animation ends
    }, 500); // Match the duration of the fade-out animation (0.5s)
  };

  // Fetch available items based on the previous turn context
  useEffect(() => {
    const fetchItemsForSale = async () => {
      if (isOpen) {
        setIsFetchingItems(true);  // Use local loading state
        const previousTurnContext = conversationHistory[conversationHistory.length - 1]?.content || '';
        
        const prompt = `
          You are a historical simulator generating market items for sale in 1680 Mexico City. Determine the most likely and authentic list of HIGHLY SPECIFIC items for sale based on the provided context. 
          If context includes mention of items available for sale, be sure to ALWAYS include them. However, it needs to be specific. If the context mentions "tropical fruits," then extrapolate that to mean you should list something like ripe papayas and green mangoes (as two seperate items), not a generic "tropical fruit" item.
          
          Based on the following context:
          "${previousTurnContext}"

          Maria's current wealth is ${currentWealth} reales. Generate a list of between 1 and 6 items available for sale within the context of the previous turn (be strictly accurate about what MIGHT be available in this setting - you can imagine possibilities, but they need to fit in the context). Each item should include:
          1. **name**: The item's name.
          2. **description**: A brief description of the item.
          3. **origin**: Where the item is from. BE HIGHLY SPECIFIC.
          4. **price**: Price in reales (as an integer).
          5. **emoji**: An appropriate emoji that symbolizes the item, such as 🫚 (for ginger) or 🍵🫖 (for teas) 
          
          Example 1:
          [
            {
              "name": "Peruvian Cinchona Bark",
              "description": "Used to treat fevers, particularly malaria. Quite rare.",
              "origin": "Loxa, Peru",
              "price": 8,
              "emoji": "🪵"
            }
          ]

          Example 2:
          [
            {
              "name": "Yucatan Honey",
              "description": "A common sweetener and medicinal ingredient.",
              "origin": "Yucatan Peninsula",
              "price": 1,
              "emoji": "🍯"
            },
            {
              "name": "Aloe Vera",
              "description": "A common plant used to treat skin conditions.",
              "origin": "Mexico City environs",
              "price": 1,
              "emoji": "🌵"
            }
          ]

          Example 3:
          [
            {
              "name": "Guava",
              "description": "A fruit used for its medicinal and nutritional properties.",
              "origin": "Central America",
              "price": 3,
              "emoji": "🍈"
            },
            {
              "name": "Clove",
              "description": "A spice and medicinal ingredient.",
              "origin": "Malaku Islands, East Indies",
              "price": 4,
              "emoji": "🌰"
            }
          ]

          Ensure your response is formatted in strict JSON format, with no additional characters outside of the JSON object.
          IMPORTANT: Use no backticks in your response. Include no additional text of any kind. ONLY JSON formatted as above.
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
              temperature: 0.3,
              messages: [
                { role: 'system', content: 'You are a historical simulator generating market items for sale in 1680 Mexico City. Follow the prompt instructions exactly.' },
                { role: 'user', content: prompt }
              ],
            }),
          });

          if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
          }

          const data = await response.json();
          let generatedItems;
          try {
            generatedItems = JSON.parse(data.choices[0].message.content);
          } catch (jsonParseError) {
            console.warn("JSON parsing failed. Attempting to sanitize output.", jsonParseError);
            const jsonMatch = data.choices[0].message.content.match(/\[.*?\]/s);
            if (jsonMatch) {
              generatedItems = JSON.parse(jsonMatch[0]);
            } else {
              throw new Error("Failed to extract valid JSON structure from GPT response.");
            }
          }

          setAvailableItems(generatedItems);
        } catch (error) {
          console.error("Error fetching items from GPT-4:", error);
          setHistoryOutput('Error generating items for sale.');
        } finally {
          setIsFetchingItems(false);  // End local loading state
        }
      }
    };

    fetchItemsForSale();
  }, [isOpen, conversationHistory, setHistoryOutput]);

  const handleOffer = async (price) => {
    if (!selectedItem) {
      alert("Please select an item to buy.");
      return;
    }

    if (currentWealth < price) {
      alert("Not enough wealth to buy this item.");
      return;
    }

    // Deduct wealth first
    const updatedWealth = currentWealth - price;

    // Deduct wealth first in state
    handleWealthChange(updatedWealth);  // Deduct the price from Maria's wealth first

    updateInventory(selectedItem.name, 1);

    setIsFetchingItems(true);  // Use local loading state

    const basePrice = selectedItem.price || 5;
    let response = '';

    if (price >= basePrice) {
      response = `The merchant happily accepts your offer of ${price} reales for ${selectedItem.name}. You can now access this item as part of your inventory. Maria now has ${updatedWealth} reales.      
      &nbsp;       
      You can #buy again if you would like to purchase more items, or enter a new command to move on to something else.
  &nbsp;    
      **Maria received ${selectedItem.name}. It has been added to her inventory. **`;
      onClose();  // Close the Buy popup
    } else if (price >= basePrice * 0.8) {
      response = `The merchant hesitates but accepts your offer for ${selectedItem.name}. *Maria received ${selectedItem.name}. She paid ${price} reales. It has been added to her inventory.*`;

      handleWealthChange(currentWealth - price);
      addJournalEntry(`Maria bought ${selectedItem.name} for ${price} reales.`);
      onClose();  // Close the Buy popup
    } else {
      response = `The merchant scoffs at your offer of ${price} reales and refuses to sell the item.`;
    }

    setHistoryOutput(response);
    setMerchantResponse(response);

    await handleTurnEnd(response);  // Trigger next turn

    setIsFetchingItems(false);  // End local loading state
  };

  const handleClose = () => {
  setIsFadingOut(true);  // Trigger fade out

  setTimeout(() => {
    onClose();  // Actually close after the fade-out is complete (0.5s for the animation)
  }, 500);  // Match this with the animation duration
};


  return (
    <>
   {isOpen && (
        <div className={`buy-popup ${isClosing ? 'fade-out' : ''}`}>
          <div className="buy-popup-overlay" />
          <div className="buy-popup-content">
            <h2>Buy Items</h2>

            {isFetchingItems ? (
              <p>Loading items for sale...</p>
            ) : (
              <div className="item-list">
                {availableItems.map((item) => (
                  <div
                    key={item.name}
                    className={`item ${selectedItem === item ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedItem(item);
                      setOfferedPrice(item.price); // Automatically set the price when an item is selected
                    }}
                  >
                    {/* Display emoji centered above the item name */}
                   <span className="emoji" style={{ fontSize: '2rem', display: 'block', textAlign: 'center' }}>{item.emoji}</span>
                   <strong>{item.name}</strong>
                   <div>{item.description}</div>
                   <div style={{ fontStyle: 'italic', marginTop: '8px' }}>Origin: {item.origin}</div> 
                   <div style={{ fontWeight: 'bold', marginTop: '5px' }}>Price: {item.price} reales</div>

                  </div>
                ))}
              </div>
            )}

            {selectedItem && (
              <div className="buy-controls">
                <p>
                  You've selected: <strong>{selectedItem.name}</strong> - {selectedItem.description}
                </p>
                <label>
                  Offer price:
                  <input
                    type="number"
                    value={offeredPrice}
                    onChange={(e) => setOfferedPrice(Number(e.target.value))}
                    min="1"
                  />
                </label>
                <button onClick={() => handleOffer(offeredPrice)} disabled={isFetchingItems}>
                  {isFetchingItems ? 'Processing...' : 'Make Offer'}
                </button>
              </div>
            )}

            {merchantResponse && (
              <div className="merchant-response">
                <p>{merchantResponse}</p>
                <button onClick={() => setMerchantResponse(null)}>Continue</button>
              </div>
            )}

            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Buy;