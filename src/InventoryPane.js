import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import PDFPopup from './PDFPopup'; // Import the PDFPopup component
import './Inventory.css';
import './Popup.css'; // Make sure this is imported to handle popup styling

function InventoryItem({ item, index, getHumoralShorthand, onPDFClick, onItemClick }) {
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
      onClick={() => onItemClick(item, index)} // Pass the clicked item and its index to show popup
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
          onClick={item.pdf ? (e) => { e.stopPropagation(); onPDFClick(`/pdfs/${item.pdf}`, item.citation); } : undefined} // Pass the PDF path and citation when clicking
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
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item for popup
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // Track selected index for arrow key navigation

  const handlePDFClick = useCallback((pdfPath, citation) => {
    setSelectedPdfPath(pdfPath);
    setSelectedCitation(citation);
    setIsPdfOpen(true);
  }, []);

  const handleItemClick = useCallback((item, index) => {
    setSelectedItem(item); // Open the popup with the selected item
    setSelectedItemIndex(index); // Set the index of the selected item
  }, [setSelectedItem, setSelectedItemIndex]);

  const closeItemPopup = () => {
    setSelectedItem(null); // Close the item popup
    setSelectedItemIndex(null); // Reset the index when closing the popup
  };

  // Add escape key listener to close inventory pane and arrow keys to navigate items
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        toggleInventory(); // Close the inventory pane when "Escape" is pressed
      }

      if (selectedItem !== null) {
        if (event.key === 'ArrowRight') {
          // Navigate to the next item
          const nextIndex = (selectedItemIndex + 1) % inventory.length;
          setSelectedItem(inventory[nextIndex]);
          setSelectedItemIndex(nextIndex);
        } else if (event.key === 'ArrowLeft') {
          // Navigate to the previous item
          const prevIndex = (selectedItemIndex - 1 + inventory.length) % inventory.length;
          setSelectedItem(inventory[prevIndex]);
          setSelectedItemIndex(prevIndex);
        }
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, selectedItem, selectedItemIndex, inventory, toggleInventory]); // Re-run effect if `isOpen` or other dependencies change

  const getHumoralShorthand = (qualities) => {
    return qualities.split('&').map(q => q.trim().charAt(0)).join(' ');
  };

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
              onItemClick={handleItemClick}  // Handle item click for popup
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

      {/* Item Attribute Popup */}
      {selectedItem && (
        <div className="item-popup-overlay" onClick={closeItemPopup}>
          <div className="item-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeItemPopup}>×</button>

            {/* Item header with separate lines for the name */}
            <h1 className="medieval-header">
              <span>{selectedItem.name}</span>
              <br />
              <span className="spanish-name">({selectedItem.spanishName})</span>
            </h1>

            {/* Display the image beneath the header */}
            {selectedItem.image && (
              <img 
                src={selectedItem.image} 
                alt={selectedItem.name} 
                className="item-image"
              />
            )}

            {/* Larger italicized Latin name */}
            <p style={{ fontSize: '1.8rem', fontStyle: 'italic', textAlign: 'center', marginBottom: '15px' }}>
              {selectedItem.latinName}
            </p>

            {/* Other item details */}
            <p><strong>Price:</strong> {selectedItem.price} silver coins</p>
            <p><strong>Quantity:</strong> {selectedItem.quantity} drachms</p>
            <p><strong>Humoral Qualities:</strong> {selectedItem.humoralQualities}</p>
            <p><strong>Medicinal Effects:</strong> {selectedItem.medicinalEffects}</p>
            <p>{selectedItem.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export { InventoryPane, InventoryItem };
