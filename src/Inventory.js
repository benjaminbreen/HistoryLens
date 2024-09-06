import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import './Inventory.css';
import './Popup.css';

// Import the initial inventory data
import initialInventoryData from './initialInventory';

const getHumoralShorthand = (qualities) => qualities.split('&').map(q => q.trim().charAt(0)).join(' ');

const Inventory = ({ isOpen, toggleInventory, compounds, handleItemClick, gameState }) => {
    const { inventory } = gameState; // Destructure inventory directly from gameState

    useEffect(() => {
        // Sync inventory when gameState changes
        setInventory(inventory);
    }, [inventory]);

    const maxItems = 16;
    const isInventoryFull = (compounds.length + inventory.length) >= maxItems;

    const renderInventoryItem = (item, itemType) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: itemType,
            item: { ...item, type: itemType },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }));

        return (
            <li 
                key={item.id} 
                ref={drag}
                className={`inventory-item ${isDragging ? 'dragging' : ''}`} 
                onClick={() => handleItemClick(item)}
            >
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
        );
    };

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
                    {inventory.map((item) => renderInventoryItem(item, 'inventoryItem'))}
                </ul>
            </div>

            <div className="inventory-section">
                <h3>Compounded Drugs</h3>
                {compounds.length > 0 ? (
                    <ul className="inventory-list">
                        {compounds.map((compound) => renderInventoryItem(compound, 'compoundItem'))}
                    </ul>
                ) : (
                    <p>No compounded drugs yet.</p>
                )}
            </div>
        </div>
    );
};

export { Inventory };
