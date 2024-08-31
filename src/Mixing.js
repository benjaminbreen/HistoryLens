import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './Mixing.css';

// Importing images
import distillImage from './assets/distill.jpg';
import distillActiveImage from './assets/distill-active.jpg';
import fermentImage from './assets/ferment.jpg';
import fermentActiveImage from './assets/ferment-active.jpg';
import decoctImage from './assets/decoct.jpg';
import decoctActiveImage from './assets/decoct-active.jpg';
import calcinateImage from './assets/calcinate.jpg';
import calcinateActiveImage from './assets/calcinate-active.jpg';

const Mixing = ({ simples, addCompoundToInventory, updateInventory, apiKey, addJournalEntry }) => {
    const [selectedSimples, setSelectedSimples] = useState({});
    const [isMixButtonEnabled, setIsMixButtonEnabled] = useState(false);
    const [compoundResult, setCompoundResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hoveredSimple, setHoveredSimple] = useState(null); // State for tracking hovered item

    const methods = [
        { name: 'Distill', image: distillImage, activeImage: distillActiveImage, caption: "Distillation separates components by heating. It concentrates the active principles, often producing strong, warming compounds." },
        { name: 'Ferment', image: fermentImage, activeImage: fermentActiveImage, caption: "Fermentation uses natural yeasts to transform ingredients. It creates potent mixtures, sometimes altering humoral properties." },
        { name: 'Decoct', image: decoctImage, activeImage: decoctActiveImage, caption: "Decoction is boiling to extract essences. Useful for creating strong remedies from tough substances like roots or barks." },
        { name: 'Calcinate', image: calcinateImage, activeImage: calcinateActiveImage, caption: "Calcination burns ingredients into ashes to purify and concentrate their properties. Often used to produce powders." },
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
                You are a 1680s iatrochemist (e.g., Thomas Sydenham) tasked with simulating the process of creating compound drugs based on real principles of "chymical medicine." When provided with two or more simple ingredients (materia medica) and a compounding method, you must generate a historically plausible compound drug.  

                Your output must be a **valid JSON object** with the following fields:
                - **name**: A string representing the name of the compound, drawn from real early modern drug names. Use reasoning (i.e., distilled opium makes laudanum). If the combination or method is even somewhat implausible, the result should be "Unusable Sludge" and the name should be "Unusable Sludge."  
                - **humoralQualities**: A string describing the humoral qualities of the compound, e.g. Warm & Dry, Warm & Cold, Cold & Moist, or Cold & Dry.  
                - **effects**: A string describing the effects of the compound, e.g., "resolutive" or "emetic" etc. SINGLE WORD ONLY.  
                - **description**: A string that briefly (short sentence) describes the origin of the ingredients, the compounding method, and the potential effects, using early modern medical terminology. If the result is Unusable Sludge, describe how the process failed.
                - **price**: An integer or float representing the estimated selling price in silver coins, based on the value of the components. If the result is Unusable Sludge, the price should be 0.
                - **emoji**: A single emoji from the following list: [🧪, 🥀, 🍵, 💧, 🔮, 🌼, 🍃, 🩸, 🍭, 🍯, 🫙, 🧉, ☠️]. Use ☠️ for Unusable Sludge. 

                IMPORTANT: There is a ~50% chance that a combination of ingredients and methods become Unusable Sludge. The system should reason based on the historical plausibility of the combination and method to determine whether the result is a successful compound drug or Unusable Sludge. 

                TIPS: Fermenting saffron, chamomile, and other plants work well. Mumia is a wildcard: compounds with it can be extremely valuable or almost worthless. Quicksilver works with calcination and distillation only. Sugar works with everything. Millipedes ferment well. It is possible to make food items with fermentation - fermenting flour makes sourdough for instance. 
                
                Here is an example of the expected JSON format:

                {
                    "name": "Aqua Vitae",
                    "humoralQualities": "Warm & Dry",
                    "effects": "Soporific",
                    "description": "Distilled from the roots of Angelica and Valerian, this seems useful in the treatment of cold phlegmatic humors.",
                    "price": 15,
                    "emoji": "🔥"
                }
                IMPORTANT: ALWAYS ensure that the JSON object is correctly formatted and that all keys are included in your response. Your response must be a valid JSON object.
Double-check that the output is in correct JSON format before finalizing your response.
Ensure all keys are included in the JSON object.
If the JSON format is incorrect or missing a key, regenerate it correctly.
The JSON must be formatted with double quotes around keys and string values. NEVER SINGLE QUOTES.
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
                const compoundData = JSON.parse(data.choices[0].message.content);

                const newCompound = {
                    name: compoundData.name,
                    emoji: compoundData.emoji,
                    price: compoundData.price,
                    humoralQualities: compoundData.humoralQualities,
                    effects: compoundData.effects,
                    description: compoundData.description,
                    quantity: 1
                };

                // Add compound to inventory
                addCompoundToInventory(newCompound);

                // Generate a journal entry including custom message for Unusable Sludge
                if (compoundData.name === "Unusable Sludge") {
                    addJournalEntry("Maria created a worthless compound called **Unusable Sludge**. This was a failed experiment - better luck next time!");
                } else {
                    addJournalEntry(`Maria created a new compound named **${compoundData.name}** using the ${selectedMethod} method. The compound is ${compoundData.humoralQualities} with ${compoundData.effects} effects and is worth ${compoundData.price} silver coins.`);
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
                setError(`Failed to create compound: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={`mixing-container ${isLoading ? 'loading' : ''}`}>
            <h1 className="mixing-header">Mix a New Drug</h1>

            <div className="mix-button-container">
                <button 
                    onClick={handleMixing} 
                    className={`mix-button ${isMixButtonEnabled ? 'enabled' : 'disabled'}`}
                    disabled={!isMixButtonEnabled || isLoading}
                >
                    {isLoading ? 'Mixing...' : 'Mix Drug'}
                </button>
            </div>

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
                    <p>{hoveredSimple.popupText}</p>
                </div>
            )}
        </div>
    );
};

// InventoryItem Component
const InventoryItem = ({ simple, onHover, onLeave }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'simple',
        item: simple,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    }));

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
    }));

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
