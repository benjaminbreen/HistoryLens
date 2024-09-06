import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './Mixing.css';

// Importing images
import distillImage from './assets/distill.jpg';
import distillActiveImage from './assets/distill-active.jpg';
import sublimateImage from './assets/sublimate.jpg';
import sublimateActiveImage from './assets/sublimate-active.jpg';
import decoctImage from './assets/decoct.jpg';
import decoctActiveImage from './assets/decoct-active.jpg';
import calcinateImage from './assets/calcinate.jpg';
import calcinateActiveImage from './assets/calcinate-active.jpg';
import confectionImage from './assets/confection.jpg';
import confectionActiveImage from './assets/confection-active.jpg';

const Mixing = ({ simples, addCompoundToInventory, updateInventory, apiKey, addJournalEntry, toggleMixingPopup }) => {
    const [selectedSimples, setSelectedSimples] = useState({});
    const [isMixButtonEnabled, setIsMixButtonEnabled] = useState(false);
    const [compoundResult, setCompoundResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hoveredSimple, setHoveredSimple] = useState(null);

    // Initial methods available
    const methods = [
        { name: 'Distill', image: distillImage, activeImage: distillActiveImage, caption: "Distillation separates components by heating. It concentrates the active principles, often producing strong, warming compounds." },
        { name: 'Decoct', image: decoctImage, activeImage: decoctActiveImage, caption: "Decoction is boiling to extract essences. Useful for creating strong remedies from tough substances like roots or barks." },
        { name: 'Calcinate', image: calcinateImage, activeImage: calcinateActiveImage, caption: "Calcination burns ingredients into ashes to purify and concentrate their properties. Often used to produce powders." },
        { name: 'Confection', image: confectionImage, activeImage: confectionActiveImage, caption: "Confectioning involves mixing powders with honey or syrup to create palatable pastes, pills, or lozenges." }
    ];

    const handleDrop = (item, method) => {
        setSelectedSimples((prev) => ({
            ...prev,
            [method.name]: (prev[method.name] || []).concat(item),
        }));
        setIsMixButtonEnabled(true);
    };

    const handleMixing = async () => {
        const selectedMethod = Object.keys(selectedSimples).find(method => selectedSimples[method].length > 0);
        const ingredients = selectedSimples[selectedMethod];

        if (selectedMethod && ingredients.length > 0) {
            setIsLoading(true);
            setError(null);

            const systemPrompt = `
                You are a 1680s iatrochemist tasked with simulating the process of creating compound drugs based on real principles of "chymical medicine." 
                When provided with two or more simple ingredients (materia medica) and a compounding method, you must generate a historically plausible compound drug.
                Use reasoning to determine if the result is successful or becomes "Unusable Sludge." Return a JSON object with the following fields:
                - **name**: Name of the compound or "Unusable Sludge".
                - **humoralQualities**: Description of humoral qualities.
                - **effects**: Single word description of the effects, like "soporific" or "stupefying" or "expectorant."
                - **description**: Brief, pithy, witty description of the process and result, no more than single short sentence or phrase.
                - **price**: Price in silver coins, or 0 if "Unusable Sludge".
                - **emoji**: A single emoji to represent the result. Unusable Sludge is always ☠️.

                Example:
                {
                    "name": "Aqua Vitae",
                    "humoralQualities": "Warm & Dry",
                    "effects": "Soporific",
                    "description": "Distilled from the roots of Angelica and Valerian.",
                    "price": 15,
                    "emoji": "🔥"
                }
            `;

            const userInput = `
            Ingredients: ${ingredients.map(i => i.name).join(' and ')}
            Compounding Method: ${selectedMethod}
        `;

        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: userInput }
                    ]
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            let compoundData;

            try {
                compoundData = JSON.parse(data.choices[0].message.content);
            } catch (error) {
                // If there's a JSON error, default to "Unusable Sludge"
                console.error('Error parsing JSON:', error);
                throw new Error("Invalid JSON");
            }

            const newCompound = {
                id: new Date().getTime(), // Generate a unique ID for the new compound
                name: compoundData.name || "Unusable Sludge",
                emoji: compoundData.emoji || "☠️",
                price: compoundData.price || 0,
                humoralQualities: compoundData.humoralQualities || "N/A",
                effects: compoundData.effects || "N/A",
                description: compoundData.description || "The mixing process failed, resulting in an unusable sludge.",
                quantity: 1
            };

            // Add compound to inventory
            addCompoundToInventory(newCompound);

            // Generate a journal entry
            if (newCompound.name === "Unusable Sludge") {
                addJournalEntry("Maria created a worthless compound called **Unusable Sludge**. This was a failed experiment - better luck next time!");
            } else {
                addJournalEntry(`Maria created a new compound named **${newCompound.name}** using the ${selectedMethod} method. The compound is ${newCompound.humoralQualities} with ${newCompound.effects} effects and is worth ${newCompound.price} silver coins.`);
            }

            // Deduct used ingredients from inventory
            ingredients.forEach(ingredient => {
                updateInventory(ingredient.name, -1);
            });

            setCompoundResult(newCompound);
            setSelectedSimples({});
            setIsMixButtonEnabled(false);
        } catch (error) {
            console.error('Error generating compound:', error);
            // Fallback to "Unusable Sludge" in case of any error, including JSON errors
            const unusableSludge = {
                id: new Date().getTime(), // Generate a unique ID for the sludge
                name: "Unusable Sludge",
                emoji: "☠️",
                price: 0,
                humoralQualities: "N/A",
                effects: "N/A",
                description: "The mixing process failed, resulting in an unusable sludge.",
                quantity: 1
            };

            // Add "Unusable Sludge" to inventory
            addCompoundToInventory(unusableSludge);

            // Generate a journal entry for the failed experiment
            addJournalEntry("Maria's attempt to create a new compound failed, resulting in an unusable sludge. Better luck next time!");

            // Deduct used ingredients from inventory
            ingredients.forEach(ingredient => {
                updateInventory(ingredient.name, -1);
            });

            setCompoundResult(unusableSludge);
            setSelectedSimples({});
            setIsMixButtonEnabled(false);
        } finally {
            setIsLoading(false);
        }
    }
};

    const resetSelection = () => {
        setSelectedSimples({});
        setIsMixButtonEnabled(false);
        setCompoundResult(null);
        setError(null);
        updateInventory(); // Trigger an inventory update
    };

    return (
        <div className={`mixing-container ${isLoading ? 'loading' : ''}`}>
            <h1 className="mixing-header">Mix a New Drug</h1>

            {error && <div className="error-message">{error}</div>}

            {compoundResult && (
                <div className="compound-result">
                    <div className="compound-item">
                        <span className="emoji">{compoundResult.emoji}</span>
                        <div className="item-details">
                            <strong>{compoundResult.name}</strong><br />
                            <strong>Price:</strong> {compoundResult.price} silver<br />
                            <strong>Humoral Qualities:</strong> {compoundResult.humoralQualities}<br />
                            <strong>Effects:</strong> {compoundResult.effects}<br />
                            <small>{compoundResult.description}</small>
                        </div>
                    </div>
                </div>
            )}

            <div className="method-grid">
                {methods.map((method, index) => (
                    <MethodSquare 
                        key={index} 
                        method={method} 
                        onDrop={(item) => handleDrop(item, method)}
                        ingredients={selectedSimples[method.name] || []}
                    />
                ))}
            </div>

            <div className="inventory-grid">
                {simples.map((simple, index) => (
                    <InventoryItem 
                        key={index} 
                        simple={simple} 
                        onHover={setHoveredSimple}
                        onLeave={() => setHoveredSimple(null)}
                    />
                ))}
            </div>

            {hoveredSimple && (
                <div className="mixing-hover-popup">
                    <strong>{hoveredSimple.name}</strong><br />
                    <i>{hoveredSimple.latinName} ({hoveredSimple.spanishName})</i><br />
                    <strong>Price:</strong> {hoveredSimple.price} silver<br />
                    <strong>Quantity:</strong> {hoveredSimple.quantity} drachms<br />
                    <strong>Humoral Qualities:</strong> {hoveredSimple.humoralQualities}<br />
                    <strong>Medicinal Effects:</strong> {hoveredSimple.medicinalEffects}<br />
                    <small>{hoveredSimple.description}</small>
                </div>
            )}

            <div className="mix-button-container">
                <button 
                    onClick={handleMixing} 
                    className={`mix-button ${isMixButtonEnabled ? 'enabled' : 'disabled'}`}
                    disabled={!isMixButtonEnabled || isLoading}
                >
                    {isLoading ? 'Mixing...' : 'Mix Drug'}
                </button>
                <button className="reset-button" onClick={resetSelection}>Reset</button>
            </div>
        </div>
    );
};

// InventoryItem Component
const InventoryItem = ({ simple, onHover, onLeave }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'simple',
        item: { id: simple.id, name: simple.name }, // Include `id` if it's part of your data structure
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }), [simple]);

    return (
        <div 
            ref={drag} 
            className="mixing-inventory-item" 
            style={{ opacity: isDragging ? 0.5 : 1 }}
            onMouseEnter={() => onHover(simple)}
            onMouseLeave={onLeave}
        >
            {simple.emoji} {simple.name}
        </div>
    );
};

// MethodSquare Component
const MethodSquare = ({ method, onDrop, ingredients }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'simple',
        drop: (item) => onDrop(item),
        collect: monitor => ({
            isOver: monitor.isOver(),
        }),
    }), [onDrop]);

    const image = ingredients.length > 0 ? method.activeImage : method.image;

    return (
        <div className="method-square-container">
            <div className="method-title">{method.name}</div>

            <div 
                ref={drop} 
                className="method-square" 
                style={{ backgroundImage: `url(${image})`, boxShadow: isOver ? '0px 0px 10px 2px rgba(255, 255, 255, 0.7)' : 'none' }}
            >
                {ingredients.length > 0 && (
                    <div className="ingredient-list">
                        {ingredients.map((ing, index) => (
                            <span key={index}>{ing.emoji}</span>
                        ))}
                    </div>
                )}
                
                <div className="method-hover-box">
                    <small><i>{method.caption}</i></small>
                </div>
            </div>
        </div>
    );
};

export default Mixing;
