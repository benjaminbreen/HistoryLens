import React, { useState, useEffect } from 'react';
import './App.css';

function TipBox({ currentTurn }) {
  const tips = [
    "Your goal is to cure your patients—and make money in the process. If you don't know what to do next, try the #map, #buy, #prescribe, #diagnose, or #symptoms commands.",
    "Remember to keep an eye on your inventory and restock your apothecary as needed. Running out of crucial ingredients might leave you unable to help a patient in need.",
    "Not all patients can afford expensive remedies. Sometimes, offering a simpler, cheaper solution is better for your reputation and might still earn you a loyal customer.",
    "Pay attention to the symptoms described by your patients—they might hint at underlying issues that aren't immediately obvious. Diagnosing correctly will improve your outcomes.",
    "Use the mixing functionality to create custom compounds by combining different ingredients. Experiment with various combinations to discover potent remedies, but be mindful of your inventory!",
    "Try the #sleep command to jump to the next morning and change up the narrative.",
    "Remember that you can #forage for medicinal substances and #buy them in marketplaces. Both can be lucrative.",
    "Try visiting the university, the market, the Zocalo, or the cathedral for some historical sight-seeing. Or try taking a trip out of town...",
    "Remember to use the Mix Drugs button to create more valuable and effective cures.",
    "Consider consulting older medical texts in the university for special knowledge. Quests may also be activated which provide you with new drugs and skills.",
    "You can learn more about key characters and items by clicking the 📄 item beside their name or the NPC guide button below.",
    "Be creative in your prompting. Try copying and pasting from real primary sources to add more historical detail.",
    "If you don't know what to do next, type #help to get suggestions. Or take a leap into the unknown with a creative or unusual prompt.",
    "The #symptoms screen allows you to ask detailed questions of any patient, while #prescribe allows you to offer them a treatment.",
    "Keep your reputation high. Word of mouth can bring new clients or drive them away. You can track it in the box above.",
    "Earning 120 coins to repay your debts is the immediate goal - but be creative and explore the limits of this simulated world.",
    "Sometimes, a little empathy is the best medicine—ask about the patient and their life. Your bedside manner may impact the success of your treatment — and its profitability.",
    "Be aware of potential spies or rivals who might sabotage your work. Not everyone is who they seem."
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    }
  }, [currentTurn, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
    className="tip-box"
      style={{
        width: '100%',
        maxWidth: '640px',
        backgroundColor: '#FEF3C7',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        padding: '9px',
        position: 'relative',
        cursor: 'pointer',
        maxHeight: '400px'
      }}
      onClick={() => setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          color: '#854d0e',
          fontWeight: 'bold',
          opacity: 0.75,
          fontSize: '1rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          transition: 'opacity 0.3s',
        }}
        onMouseOver={(e) => (e.target.style.opacity = 1)}
        onMouseOut={(e) => (e.target.style.opacity = 0.75)}
        aria-label="Close"
      >
        ×
      </button>
      <h2 style={{ fontSize: '1.05rem', fontWeight: '600', color: '#854d0e' }}>
        Tips (click for more...)
      </h2> 
      <p style={{ fontSize: '1rem', color: '#4a5568' }}>
        {tips[currentTipIndex]}
      </p>
      {/* Small note at the bottom */}

    </div>
  );
}

export default TipBox;
