import React, { useState } from 'react';
import { useDrag } from 'react-dnd';

import './Inventory.css';
import './Popup.css';

const inventoryData = [
    {
        name: 'Camphor',
        latinName: 'Cinnamomum camphora',
        spanishName: 'Alcanfor',
        price: 4,
        quantity: 2,
        humoralQualities: 'Cold & Moist',
        medicinalEffects: 'Relieves pain, anti-inflammatory, calming.',
        description: 'A fragrant resin obtained from the wood of the aromatic camphor tree. Cooling and resolutive.',
        emoji: '🌿',
    },
    {
        name: 'Chamomile',
        latinName: 'Matricaria chamomilla',
        spanishName: 'Manzanilla',
        price: 3,
        quantity: 30,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'Calming, anti-inflammatory, aids digestion.',
        description: 'A common herb used to reduce inflammation, soothe digestive issues, and calm the nerves.',
        emoji: '🌼',
    },
    {
        name: 'Crude Opium',
        latinName: 'Opium crudum',
        spanishName: 'Opio Crudo',
        price: 6,
        quantity: 3,
        humoralQualities: 'Cold & Dry',
        medicinalEffects: 'Powerful pain relief, sedative, and treatment for cough and diarrhea.',
        description: 'Dried latex obtained from the opium poppy. Most potent reliever of pain known.',
        emoji: '⚫️',
    },
    {
        name: 'Powdered millipedes',
        latinName: 'Pulvis millepedum',
        spanishName: 'Polvo de Milpiés',
        price: 3,
        quantity: 1,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'For ear pain and inflammation.',
        description: 'Powdered millipedes:  well known as ready cures for many sorts of ear pain and inflammation.',
        emoji: '🐛',
    },
    {
        name: 'Saffron',
        latinName: 'Crocus sativus',
        spanishName: 'Azafrán',
        price: 15,
        quantity: 2,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'Used to alleviate melancholy, improve digestion, and treat coughs.',
        description: 'Highly valued spice derived from the stigmas of Crocus flowers, often mixed in compound drugs.',
        emoji: '🌸',
    },
    {
        name: 'Mumia',
        latinName: 'Mumia vera',
        spanishName: 'Mumia',
        price: 40,
        quantity: 1,
        humoralQualities: 'Warm & Moist',
        medicinalEffects: 'For bruises, internal bleeding, and general healing.',
        description: 'Mumia, the powdered remains of Egyptian mummies. Potent healing properties. But can it be trusted to be real?',
        emoji: '⚰️',
    },
    {
        name: 'Quicksilver',
        latinName: 'Argentum vivum',
        spanishName: 'Azogue',
        price: 1,
        quantity: 8,
        humoralQualities: 'Cold & Moist',
        medicinalEffects: 'Treatment for syphilis and skin conditions.',
        description: 'Quicksilver, the metal most beloved of alchemists. Commonly used for treating the French Pox.',
        emoji: '⚗️',
    },
    {
        name: 'Powdered crab\'s eyes',
        latinName: 'Oculi cancrorum',
        spanishName: 'Ojos de Cangrejo',
        price: 4,
        quantity: 1,
        humoralQualities: 'Cold & Dry',
        medicinalEffects: 'Antacid and treatment for kidney stones.',
        description: 'Ground-up crab\'s eyes from the Indies. A singular remedy for kidney stones.',
        emoji: '🦀',
    },
    {
        name: 'Sugar',
        latinName: 'Saccharum',
        spanishName: 'Azúcar',
        price: 5,
        quantity: 4,
        humoralQualities: 'Warm & Dry',
        medicinalEffects: 'Used to soothe coughs, treat wounds, and improve digestion.',
        description: 'Sugar candies shipped from Seville. Extremely useful for compounding with noxious medicines.',
        emoji: '🍬',
    },
    {
        name: 'Rose Water',
        latinName: 'Aqua Rosae',
        spanishName: 'Agua de Rosas',
        price: 3,
        quantity: 9,
        humoralQualities: 'Cold & Moist',
        medicinalEffects: 'Soothes inflammation, cools the body, and calms the nerves.',
        description: 'Mixes well with almost anything. Useful in the treatment of melancholia.',
        emoji: '🌹',
    }
];

const getHumoralShorthand = (qualities) => qualities.split('&').map(q => q.trim().charAt(0)).join(' ');

const Inventory = ({ isOpen, toggleInventory, compounds, handleItemClick }) => {
    const maxItems = 16;
    const isInventoryFull = (compounds.length + inventoryData.length) >= maxItems;

    return (
        <div className={`inventory-pane ${isOpen ? 'open' : ''}`}>
            <div className="inventory-header">
                <h2>Inventory</h2>
                <button className="close-button" onClick={toggleInventory}>×</button>
            </div>

            {isInventoryFull && (
                <div className="inventory-full-warning">
                    <p>Your inventory is full. You can't add more items.</p>
                </div>
            )}

            <div className="inventory-section">
                <h3>Materia Medica</h3>
                <ul className="inventory-list">
                    {inventoryData.map((item, index) => (
                        <li key={index} className="inventory-item" onClick={() => handleItemClick(item)}>
                            <span className="emoji">{item.emoji}</span>
                            <div className="item-details">
                                <strong>{item.name} ({item.spanishName})</strong> - <i>{item.latinName}</i><br />
                                <strong>Price:</strong> {item.price} silver<br />
                                <strong>Humoral Qualities:</strong> {item.humoralQualities}<br />
                                <strong>Effects:</strong> {item.medicinalEffects}<br />
                                <small>{item.description}</small>
                            </div>
                            <div className="humoral-circle">
                                {getHumoralShorthand(item.humoralQualities)}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="inventory-section">
                <h3>Compounded Drugs</h3>
                {compounds.length > 0 ? (
                    <ul className="inventory-list">
                        {compounds.map((compound, index) => (
                            <li key={index} className="inventory-item" onClick={() => handleItemClick(compound)}>
                                <span className="emoji">{compound.emoji}</span>
                                <div className="item-details">
                                    <strong>{compound.name}</strong><br />
                                    <strong>Price:</strong> {compound.price} silver<br />
                                    <strong>Humoral Qualities:</strong> {compound.humoralQualities}<br />
                                    <strong>Effects:</strong> {compound.effects}<br />
                                    <small>{compound.description}</small>
                                </div>
                                <div className="humoral-circle">
                                    {getHumoralShorthand(compound.humoralQualities)}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No compounded drugs yet.</p>
                )}
            </div>
        </div>
    );
};

export { Inventory, inventoryData };