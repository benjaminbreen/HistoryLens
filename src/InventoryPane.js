import React, { useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import './Inventory.css';

function InventoryItem({ item, index, onItemClick, getHumoralShorthand }) {
  const ref = useRef(null);
  
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'inventoryItem',
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  drag(ref);

  return (
    <li 
      ref={ref}
      key={index} 
      className={`inventory-item ${isDragging ? 'dragging' : ''}`}
      onClick={() => onItemClick(item)}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
    >
      <div className="emoji-container">
        <span className="emoji">{item.emoji}</span>
      </div>
      <div className="item-details">
        <strong className="item-name">{item.name}</strong>
        <div className="item-meta">
          <div className="meta-section">
            <span className="meta-label">QUANTITY:</span>
            <span className="meta-value">{item.quantity} drachms</span>
          </div>
          <div className="meta-section">
            <span className="meta-label">VALUE:</span>
            <span className="meta-value">{item.price} coins</span>
          </div>
        </div>
        <p className="item-description">{item.description}</p>
      </div>
      <div className="humoral-circle">
        {getHumoralShorthand(item.humoralQualities)}
      </div>
    </li>
  );
}

function ItemPopup({ item, onClose }) {
  return (
    <div className="item-popup">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>{item.name}</h2>
      <p><i>{item.latinName} ({item.spanishName})</i></p>
      <p><strong>Price:</strong> {item.price} silver</p>
      <p><strong>Quantity:</strong> {item.quantity} drachms</p>
      <p><strong>Humoral Qualities:</strong> {item.humoralQualities}</p>
      <p><strong>Medicinal Effects:</strong> {item.medicinalEffects}</p>
      <p>{item.description}</p>
      {item.popupText && <p>{item.popupText}</p>}
    </div>
  );
}

function InventoryPane({ inventory, isOpen, toggleInventory, isPrescribing }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const getHumoralShorthand = (qualities) => {
    return qualities.split('&').map(q => q.trim().charAt(0)).join(' ');
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <div className={`inventory-pane ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleInventory}>Close</button>
      <h2>Inventory</h2>
      <ul className="inventory-list">
        {inventory.map((item, index) => (
          <InventoryItem 
            key={index}
            item={item}
            index={index}
            onItemClick={handleItemClick}
            getHumoralShorthand={getHumoralShorthand}
            isPrescribing={isPrescribing}
          />
        ))}
      </ul>
      {selectedItem && (
        <ItemPopup 
          item={selectedItem} 
          onClose={closePopup}
        />
      )}
    </div>
  );
}

export { InventoryPane, InventoryItem };