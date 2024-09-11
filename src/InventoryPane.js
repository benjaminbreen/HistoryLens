import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import PDFPopup from './PDFPopup'; // Import the PDFPopup component
import './Inventory.css';

function InventoryItem({ item, index, getHumoralShorthand, onPDFClick }) {
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
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
    >
      <div className="emoji-container">
        <span className="emoji">{item.emoji}</span>
      </div>
      <div className="item-details">
        <strong 
          className="item-name"
          style={{
            fontWeight: item.pdf ? 'bold' : 'normal',
            textDecoration: item.pdf ? 'underline dotted' : 'none',
            cursor: item.pdf ? 'pointer' : 'default'
          }}
          onClick={item.pdf ? () => onPDFClick(`/pdfs/${item.pdf}`, item.citation) : undefined}  // Pass the PDF path and citation when clicking
        >
          {item.name} {item.pdf && '📄'}
        </strong>
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

function InventoryPane({ inventory, isOpen, toggleInventory }) {
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [selectedPdfPath, setSelectedPdfPath] = useState('');
  const [selectedCitation, setSelectedCitation] = useState('');

  const handlePDFClick = useCallback((pdfPath, citation) => {
    setSelectedPdfPath(pdfPath);
    setSelectedCitation(citation);
    setIsPdfOpen(true);
  }, []);

  const getHumoralShorthand = (qualities) => {
    return qualities.split('&').map(q => q.trim().charAt(0)).join(' ');
  };

  // Add escape key listener to close inventory pane
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        toggleInventory(); // Close the inventory pane when "Escape" is pressed
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggleInventory]); // Re-run effect if `isOpen` changes

  return (
    <>
    <div className={`inventory-pane ${isOpen ? 'open' : ''}`}>
      <button className="close-button" onClick={toggleInventory}>Close</button>
      <h2>Inventory</h2>
      <ul className="inventory-list">
        {inventory.map((item, index) => (
          <InventoryItem 
            key={index}
            item={item}
            index={index}
            getHumoralShorthand={getHumoralShorthand}
            onPDFClick={handlePDFClick}  // Pass the PDF click handler to InventoryItem
          />
        ))}
      </ul>
       </div>

      {/* PDF Popup */}
      {isPdfOpen && (
        <PDFPopup
          isOpen={isPdfOpen}
          onClose={() => setIsPdfOpen(false)}
          pdfPath={selectedPdfPath}
          citation={selectedCitation}
        />
      )}
   </>
  );
}

export { InventoryPane, InventoryItem };
