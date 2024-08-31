import React, { useState, useEffect, useMemo } from 'react';
import apothecaryImage from './assets/apothecary.jpeg';
import mariaCoelhoImage from './assets/mariacoelho.jpeg'; // Import Maria Coelho's image
import mariaDetermined from './assets/mariadetermined.jpg';
import mariaHappy from './assets/mariahappy.jpg';
import mariaNormal from './assets/marianormal.jpg';
import mariaSad from './assets/mariasad.jpg';
import mariaWorried from './assets/mariaworried.jpg';
import mariaCurious from './assets/mariacurious.jpg'; // Import Maria Curious image

// Status mappings
const statusMappings = {
  normal: ['rested', 'calm', 'neutral', 'normal', 'composed', 'serene'],
  happy: ['content', 'happy', 'joyful', 'pleased', 'satisfied', 'elated', 'cheerful'],
  worried: ['worried', 'frightened', 'anxious', 'nervous', 'concerned', 'troubled', 'uneasy'],
  sad: ['sad', 'melancholy', 'depressed', 'downcast', 'gloomy', 'forlorn'],
  determined: ['determined', 'resolute', 'focused', 'steadfast', 'resolved', 'unwavering'],
  curious: ['curious', 'inquisitive', 'interested', 'intrigued', 'exploratory', 'questioning'],
};

// Function to get the appropriate image based on Maria's status
const getStatusImage = (status) => {
  if (statusMappings.normal.includes(status)) {
    return mariaNormal;
  } else if (statusMappings.happy.includes(status)) {
    return mariaHappy;
  } else if (statusMappings.worried.includes(status)) {
    return mariaWorried;
  } else if (statusMappings.sad.includes(status)) {
    return mariaSad;
  } else if (statusMappings.determined.includes(status)) {
    return mariaDetermined;
  } else if (statusMappings.curious.includes(status)) {
    return mariaCurious;
  } else {
    return mariaNormal; // Default to normal if status is not recognized
  }
};

function PortraitSection({ npcImage, npcCaption, npcInfo, pcCaption, status }) {
  const [showNpcPopup, setShowNpcPopup] = useState(false);
  const [showPcPopup, setShowPcPopup] = useState(false);
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    setFadeClass('fade-out');
    const timeout = setTimeout(() => {
      setFadeClass('fade-in');
    }, 500); // This matches the CSS transition duration
    return () => clearTimeout(timeout);
  }, [npcImage]);

  const handleNpcClick = () => setShowNpcPopup(true);
  const handlePcClick = () => setShowPcPopup(true);
  const closeNpcPopup = () => setShowNpcPopup(false);
  const closePcPopup = () => setShowPcPopup(false);

  // Memoize the status image to avoid unnecessary recalculations
  const mariaPortrait = useMemo(() => getStatusImage(status), [status]);

  // Detailed information about Maria for the popup
  const pcInfoContent = (
    <div>
      <h2 className="medieval-header">
        <span>NAME:</span> Maria de Lima<br/>
        <span>AGE:</span> 45<br/>
        <span>BIRTHPLACE:</span> Coimbra, Portugal
      </h2>
      <p><strong>Biography:</strong> Maria, a skilled apothecary, has been living in Mexico City for the past 10 years after she was charged with heresy and deported from Portugal by the Inquisition. Born into a <i>converso</i> family, she is well-versed in the hybrid of alchemical and Galenic medicine practiced in mid-seventeenth-century Iberia.</p>
      <p>Maria is based on the real-life historical figure of Maria Coelho, who had a similar background and life history but who disappears from the historical record following her deportation from Portugal by the Inquisition in 1669. She was last recorded as bound for Brazil. You can read more about the real-life Maria <a href="https://recipes.hypotheses.org/4710" target="_blank" rel="noopener noreferrer">here</a>.</p>
      <img src={mariaCoelhoImage} alt="Maria Coelho" style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );

  return (
    <div className="portrait-section">
      {/* NPC Portrait - Aligned Left with Caption Below */}
      <div className="npc-portrait-container" onClick={handleNpcClick}>
        <div className="npc-portrait-wrapper">
          <img 
            src={npcImage} 
            alt="NPC" 
            className={`npc-portrait-image ${fadeClass}`} 
            onError={(e) => {
              e.target.src = apothecaryImage; // Fallback to apothecary image
            }}
          />
          <p className="portrait-caption">{npcCaption}</p>
        </div>
      </div>

      {/* PC Portrait (Maria) - Aligned Right with Caption Below */}
      <div className="pc-portrait-container" onClick={handlePcClick}>
        <div>
          <img src={mariaPortrait} alt="Maria" className="pc-portrait-image" />
          <p className="portrait-caption">{pcCaption}</p>
        </div>
      </div>

      {/* NPC Popup */}
      {showNpcPopup && (
        <div className="portrait-popup">
          <img src={npcImage} alt="NPC" className="popup-portrait-image" />
          <p><strong>{npcCaption.split(' ').slice(2).join(' ')}</strong></p>
          <p className="popup-info">{npcInfo}</p>
          <button onClick={closeNpcPopup} className="close-button">Close</button>
        </div>
      )}

      {/* PC Popup */}
      {showPcPopup && (
        <div className="portrait-popup">
          <img src={mariaPortrait} alt="Maria" className="popup-portrait-image" />
          <p><strong>Maria de Lima</strong></p>
          <div className="popup-info">{pcInfoContent}</div> {/* Display detailed PC info */}
          <button onClick={closePcPopup} className="close-button">Close</button>
        </div>
      )}
    </div>
  );
}

export default PortraitSection;
