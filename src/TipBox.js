import React, { useState, useEffect } from 'react';

function TipBox({ currentTurn }) {
  // Define the tips
  const tips = [
    "Your goal is to cure your patients—and make money in the process. If you don't know what to do next, try the #map, #buy, #prescribe, #diagnose, or #symptoms commands.",
    "Remember to keep an eye on your inventory and restock your apothecary as needed. Running out of crucial ingredients might leave you unable to help a patient in need.",
    "Not all patients can afford expensive remedies. Sometimes, offering a simpler, cheaper solution is better for your reputation and might still earn you a loyal customer.",
    "Pay attention to the symptoms described by your patients—they might hint at underlying issues that aren't immediately obvious. Diagnosing correctly will improve your outcomes.",
    "Use the mixing functionality to create custom compounds by combining different ingredients. Experiment with various combinations to discover potent remedies, but be mindful of your inventory!"
  ];

  // State to keep track of the current tip index and visibility
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Effect to change the tip every few turns
  useEffect(() => {
    const turnsPerTip = 2; // Change tip every 2 turns
    if (currentTurn > 0 && currentTurn % turnsPerTip === 0) {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }
  }, [currentTurn]);

  // Function to hide the tip box
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Don't render the tip box if it's not visible
  }

  return (
    <div
      className="w-full max-w-2xl bg-yellow-100 shadow-md rounded p-4 mb-2 cursor-pointer relative" // Changed mb-4 to mb-2
      onClick={() => setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent click event from triggering tip change
          handleClose();
        }}
        className="absolute top-2 right-2 text-yellow-900 font-bold opacity-75 hover:opacity-100 transition-opacity"
        style={{
          fontSize: '1rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label="Close"
      >
        ×
      </button>
      <h2 className="text-l font-semibold mb-2 text-yellow-900" style={{ fontSize: '0.95rem' }}>Tips</h2> {/* Adjusted font size */}
      <p style={{ fontSize: '0.9rem' }} className="text-gray-700">
        {tips[currentTipIndex]}
      </p>
    </div>
  );
}

export default TipBox;
