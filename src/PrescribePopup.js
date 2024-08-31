import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import './PrescribePopup.css';

const PrescribePopup = ({ isOpen, onClose, onPrescribe }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [amount, setAmount] = useState(1);
  const [price, setPrice] = useState(0);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'inventoryItem',
    drop: (item) => setSelectedItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handlePrescribe = () => {
    if (selectedItem) {
      onPrescribe(selectedItem, amount, price);
      setSelectedItem(null);
      setAmount(1);
      setPrice(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="prescribe-popup">
      <div className="prescribe-content">
        <h2>🧪 Prescribe a Medicine</h2>
        <div 
          ref={drop} 
          className={`prescription-area ${isOver ? 'drag-over' : ''}`}
        >
          {selectedItem ? (
            <div className="selected-item">
              <span className="emoji">{selectedItem.emoji}</span>
              <span>{selectedItem.name}</span>
            </div>
          ) : (
            <p>Drag an item here from the inventory to prescribe. And don't forget to set a price!</p>
          )}
        </div>
        <div className="prescription-controls">
          <label>
            Amount (drachms): 
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))}
              min="1"
            />
          </label>
          <label>
            Price (silver reales): 
            <input 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value))}
              min="0"
            />
          </label>
        </div>
        <div className="prescription-buttons">
          <button onClick={handlePrescribe} disabled={!selectedItem}>Prescribe</button>
          <button onClick={onClose}>Cancel</button> {/* Ensure this calls onClose */}
        </div>
      </div>
    </div>
  );
};

export default PrescribePopup;
