import React, { useEffect, useState } from 'react';
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
    


     // Define the updateInventory function inside the component
    const updateInventoryLocal = (itemName, quantityChange) => {
        updateInventory(itemName, quantityChange); // Use the passed-in updateInventory prop
    };

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
        [method.name]: (prev[method.name] || []).concat({
            ...item,
            emoji: item.emoji // Ensure the emoji is included
        }),
    }));
    setIsMixButtonEnabled(true);
};
    
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                toggleMixingPopup(); // Close the mixing popup when "Escape" is pressed
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggleMixingPopup]);

    const handleMixing = async () => {
        const selectedMethod = Object.keys(selectedSimples).find(method => selectedSimples[method].length > 0);
        const ingredients = selectedSimples[selectedMethod];

        if (selectedMethod && ingredients.length > 0) {
            setIsLoading(true);
            setError(null);

            const systemPrompt = `
                You are a 1680s iatrochemist tasked with simulating the process of creating compound drugs based on real principles of "chymical medicine." Some potential compound drug names: Balsamum Lucatelli, Elixir Proprietatis, Theriac, Sal Volatile Oleosum, Aurum Potabile, Gascon's Powder, Tinctura Antimonii, Elixir de Paracelso, Balsamo Peruviano, Salt of Mallow, Pulvis Cephalico, Hysteric Water, Cinnamon Water, Aqua Celestis, Camphorated Wine Spirit, Volatile Spirit, Aqua Vitae, Tinctura Opii Crocata, Plague Water, Mercurius Dulcis, Balsam of Sulphur, Aqua Mercurialis, Camphorated Oil, Quicksilver Liniment, Mithridate.
                When provided with two or more simple ingredients (materia medica) and a compounding method, you must generate a historically plausible compound drug. Mention if it is toxic in the description. Toxic drugs can either be unusuable sludge or can be usable purgatives (classified as "Vomitorios").
                Guide for mixing (other combos work too - this is just a guide to general logic):
                Quicksilver: Calcination of quicksilver ALWAYS yields toxic but highly valuable red precipitate of mercury (used in ointments); distillation yields distilled quicksilver, other methods nothing, as quicksilver is volatile and not suited for these methods. Distillation yields Distilled Quicksilver which is toxic and usually produces toxic compounds (not unusuable sludge - actual named compounds with toxic properties) when mixed.
Camphor: Distillation yields camphor oil (medicinal), Confectioning produces Trochisci de Camphora (lozenges); Decoction destroys camphor’s volatile properties, creating ineffective residue.
Rose Water: Distillation for Aqua Rosae (calming); Confectioning with improper ingredients can result in bitter, ineffective syrup. 
Opium: Distillation produces forms of Laudanum (for instance, opium distilled with saffron = Sydenham's Laudanum, while opium distilled with alchemical products like quicksilver produces Laudanum Paracelsi) or variant; Decoction makes ineffective solution, as opium must be distilled for potency. Opiate compound drugs are highly potent and can be toxic. Mixing opium with any spirits or alcohol creates laudanum.
Powdered Millipedes: Confection for Pulvis Millepedum (skin treatment), decoction with any plant or herb for asthma treatment. 
Powdered Crab’s Eyes: Calcination yields various valuable alchemical elemental products.
Saffron distilled with other herbs makes valuable Hysteric Water.
Sugar: Confectioning alone makes Syrupus Simplex; with other simples makes various juleps and treacles. Calcined sugar = molasses. Distillation makes an alcoholic spirit which varies depending on other ingredients; distilled sugar = rum, distilled wine = brandy, and so forth.
Laudanum mixed with other simples can be toxic, especially when mixed with alcoholic simples. 
Senna: Decoction for Decoctum Sennae (laxative); Confectioning weakens potency, creating ineffective cheap compound.
White Horehound: Makes tea when decocted alone, or horehound ale when decocted with sugar. Creates valuable balsams when distilled in herbal compounds, and mithridate when distilled with laudanum or opium.
Decoction works with most every plant but not with alchemical substances. Nettle, Chamomile, sapphron, mint, pennyroyal and other herbs ALWAYS create usable medicine via Decoction method; a tea or infusion if used alone, a cordial if used with rosewater or sugar.
Calcination of all substances breaks them down into simpler elemental material, of the sort alchemists used, like potash, sal ammoniac, magnesia (highly valuable), salt of tartar, vegetable salts, calx of vitriol.
Confectioning almost always works with everything, as long as you use sugar or honey. 
Honey can be distilled into various products or will make unguents and treacles if confectioned. Decocting honey makes honey water, useful for mixing more valuable drugs. Decocting wine makes vinegar, which if combined with honey makes oxymel.
Compounds can be distilled with additional ingredients to create more valuable ones; two or more compounds distilled with make a form of mithridate. 
Distilling cinchona or quina or guiacum produces a highly valuable febrifuge "Agua" like "Agua da Inglaterra."
Sal Ammoniac can be distilled or calcinated with other drugs, but may produce semi-toxic or unusual alchemical compounds.Sal Ammoniac: calcification = Calx Ammoniaci or Vaporis Pulmonalis;  distillation: Spiritus Ammoniaci. Can be mixed with rosewater, syrups and sugars, and herbs. If mixed with quicksilver, it makes a deadly poison called "Alchemist's Fulminate." 
Animals and animal products can ALWAYS be distilled and calcinated. For instance, if Maria buys an iguana, she can calcinate it to make "iguana ash" or distill it to make "spiritus iguanae" or "iguana licqueur". Confectioning animal ashes with any plant or herb can produce an extremely valuable item, either the Bezoartico, the Lapis de Goa, or the Artificial Snakestone, depending on the admixtures. Lapis de Goa requires gold and is valued at over 200 reales. 
               Remember that calcination of most products = alchemical raw materials. Always. Ashes, but also other things like potash. These can sometimes be valuable and interesting.
                Always observe rules above. Another option is for a drug to become somethign weaker, i.e. decoction of opium might create weaker, cheaper "poppy water." 

                When provided with ingredients and a compounding method, return a JSON object with the following fields:

                {
                  "name": "Name of the compound or 'Unusable Sludge'",
                  "latinName": "The Latin name of the compound (be creative)",
                  "spanishName": "The name of the compound in Spanish",
                  "humoralQualities": "Two word description of humoral qualities: warm and moist, cold and dry, cold and moist, or warm and dry.",
                  "medicinalEffects": "The specific effects it has on health and the body - defined in a phrase, like "soporific and resolutive, but potentially toxic",
                  "description": "Brief, pithy, witty description of the process and result (no more than a single short sentence or phrase)",
                  "price": Number of reales in value (0 if 'Unusable Sludge')",
                  "emoji": "A single HISTORICALLY ACCURATE and CREATIVE emoji to represent the result (Unusable Sludge is always ☠️)",
                  "citation": "Real primary ource or historical reference which mentions it or something like it",
                  "quantity": "1"
                }

                Examples:

               {
                 "name": "Aqua Vitae",
                 "latinName": "Aqua Vitae",
                 "spanishName": "Agua de Vida",
                 "humoralQualities": "Warm & Dry",
                 "medicinalEffects": "Soporific, intoxicating, and highly potent",
                 "description": "A powerful alcoholic spirit distilled from the roots of Angelica and Valerian, commonly used to induce sleep and reduce fever.",
                 "price": 15,
                 "emoji": "🔥",
                 "citation": "John French, *The Art of Distillation* (London, 1651)",
                 "quantity": 1
               }

              {
                "name": "Chamomile Rosewater Cordial",
                "latinName": "Matricaria chamomilla et Aqua Rosae",
                "spanishName": "Cordial de Manzanilla y Agua de Rosas",
                "humoralQualities": "Warm & Moist",
                "medicinalEffects": "Calming and resolutive",
                "description": "A pleasant decoction of chamomile, rosewater, and sugar, known for its soothing and calming properties.",
                "price": 2,
                "emoji": "🍵",
                "citation": "Curvo Semmedo, João. *Observaçoens Medicas* (Lisbon, 1707)",
                "quantity": 1
              }

              {
                "name": "Mithridate",
                "latinName": "Mithridatum",
                "spanishName": "Mitridato",
                "humoralQualities": "Hot & Dry",
                "medicinalEffects": "Miraculous antidote with ability to cure plague",
                "description": "An ancient antidote against poison, made from a mixture of distilled herbs and opium, often given to royalty.",
                "price": 100,
                "emoji": "🜦",
                "citation": "Galen, *De Antidotis* (Rome, 165 AD)",
                "quantity": 1
              }

                IMPORTANT: Ensure your response is a valid JSON object. Do not include any text outside the JSON structure. Before returning your response, please check that it is a valid JSON object. It should:
1. Start with an opening curly brace {
2. End with a closing curly brace }
3. Have all keys in double quotes
4. Have all string values in double quotes
5. Not have any trailing commas
6. Not have any comments or additional text outside the JSON structure

If your response doesn't meet these criteria, please correct it before returning.
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
                              temperature: .9,
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
                latinName: compoundData.latinName || "N/A",
                spanishName: compoundData.spanishName || "N/A",
                emoji: compoundData.emoji || "☠️",
                price: compoundData.price || 0,
                humoralQualities: compoundData.humoralQualities || "N/A",
                medicinalEffects: compoundData.medicinalEffects || "N/A",
                description: compoundData.description || "The mixing process failed, resulting in an unusable sludge.",
                citation: compoundData.citation || "N/A",
                quantity: compoundData.quantity || 1
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
      
   };
    return (
         <div className={`mixing-container ${isLoading ? 'loading' : ''}`}>
            <h1 className="mixing-header">Mix a New Drug</h1>
            
            {/* Conditional rendering for instructions */}
            {!compoundResult ? (
            <p className="mixing-instructions">
                Drag and drop inventory items into one of the four method options below and then click the Mix Drug button to create new compound remedies.
            </p>
             ) : (
            <p className="mixing-instructions">
                A new compound drug has been created! You can read about its properties below, and try prescribing it using the #prescribe command.
            </p>
        )}

            {error && <div className="error-message">{error}</div>}

            {compoundResult && (
                <div className="compound-result">
                    <div className="compound-item">
                        <span className="emoji">{compoundResult.emoji}</span>
                        <div className="item-details">
                            <strong>{compoundResult.name}</strong><br />
                            <strong>Price:</strong> {compoundResult.price} silver<br />
                            <strong>Humoral Qualities:</strong> {compoundResult.humoralQualities}<br />
                            <strong>Effects:</strong> {compoundResult.effects}
                            <em>{compoundResult.description}</em>
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

                    <strong>Price:</strong> {hoveredSimple.price} silver<br />
                    <strong>Quantity:</strong> {hoveredSimple.quantity} drachms<br />
                    <strong></strong> {hoveredSimple.humoralQualities}<br />
                    <strong>Effects:</strong> {hoveredSimple.medicinalEffects}<br />
      
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
        item: { 
            id: simple.id, 
            name: simple.name, 
            emoji: simple.emoji  // Explicitly include the emoji
        },
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
            <span className="inventory-item-emoji">{simple.emoji}</span> {simple.name}
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
                            <span key={index} className="large-emoji">{ing.emoji}</span>
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
