import React, { useState, useEffect, useMemo, Suspense } from 'react';
import apothecaryImage from './assets/apothecary.jpeg';
import mariaCoelhoImage from './assets/mariacoelho.jpeg'; 
import mariaDetermined from './assets/mariadetermined.jpg';
import mariaHappy from './assets/mariahappy.jpg';
import mariaNormal from './assets/marianormal.jpg';
import mariaSad from './assets/mariasad.jpg';
import mariaWorried from './assets/mariaworried.jpg';
import mariaCurious from './assets/mariacurious.jpg';
import './PortraitSection.css'; 
import EntityList from './EntityList'; 

// Lazy load the PDFPopup component
const PDFPopup = React.lazy(() => import('./PDFPopup'));

const statusMappings = {
  normal: ['rested', 'calm', 'neutral', 'normal', 'composed', 'serene'],
  happy: ['content', 'happy', 'joyful', 'pleased', 'satisfied', 'elated', 'cheerful', 'delighted'],
  worried: ['worried', 'frightened', 'anxious', 'nervous', 'concerned', 'troubled', 'uneasy', 'weary', 'uncertain'],
  sad: ['sad', 'melancholy', 'depressed', 'downcast', 'gloomy', 'forlorn', 'terrified', 'desperate'],
  determined: ['determined', 'resolute', 'focused', 'steadfast', 'resolved', 'unwavering'],
  curious: ['curious', 'inquisitive', 'interested', 'intrigued', 'exploratory', 'questioning', 'fascinated', 'perceptive', 'reckless'],
};

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
    return mariaNormal;
  }
};

function PortraitSection({ npcImage, npcCaption, npcInfo, pcCaption, status, isEmoji }) {
  const [showNpcPopup, setShowNpcPopup] = useState(false);
  const [showPcPopup, setShowPcPopup] = useState(false);
  const [showPDFPopup, setShowPDFPopup] = useState(false); 
  const [selectedPDF, setSelectedPDF] = useState(null); 
  const [fadeClass, setFadeClass] = useState('fade-in');

  useEffect(() => {
    setFadeClass('fade-out');
    const timeout = setTimeout(() => {
      setFadeClass('fade-in');
    }, 500); 
    return () => clearTimeout(timeout);
  }, [npcImage, npcInfo]);

  const handleNpcClick = () => setShowNpcPopup(true);
  const handlePcClick = () => setShowPcPopup(true);
  const closeNpcPopup = () => setShowNpcPopup(false);
  const closePcPopup = () => setShowPcPopup(false);

  const handlePDFClick = (pdfPath) => {
    setSelectedPDF(pdfPath);
    setShowPDFPopup(true);
  };

  const closePDFPopup = () => {
    setShowPDFPopup(false);
    setSelectedPDF(null);
  };

  const mariaPortrait = useMemo(() => getStatusImage(status), [status]);

  const pcInfoContent = (
    <div>
      <h2 className="portrait-medieval-header">
        <span>NAME:</span> Maria de Lima<br/>
        <span>AGE:</span> 45<br/>
        <span>BIRTHPLACE:</span> Coimbra, Portugal
      </h2>
      <p><strong>Biography:</strong> Maria, a skilled apothecary, has been living in Mexico City for the past 10 years after she was charged with heresy and deported from Portugal by the Inquisition. Born into a <i>converso</i> family, she is well-versed in the hybrid of alchemical and Galenic medicine practiced in mid-seventeenth-century Iberia.</p>
      <p>Maria is based on the real-life historical figure of Maria Coelho, who had a similar background and life history but who disappears from the historical record following her deportation from Portugal by the Inquisition in 1669. She was last recorded as bound for Brazil. You can read more about the real-life Maria <a href="https://recipes.hypotheses.org/4710" target="_blank" rel="noopener noreferrer">here</a> and by clicking the Content Guide button.</p>
      <img src={mariaCoelhoImage} alt="Maria Coelho" style={{ maxWidth: '100%', height: 'auto' }} />
      <div className="pdf-button-container">
      </div>
    </div>
  );

  const getNpcPDF = (npcName) => {
    const npc = EntityList.find((entity) => entity.name === npcName);
    return npc ? npc.pdf : null;
  };

  const getNpcInfo = (npcName) => {
    const npc = EntityList.find((entity) => entity.name === npcName);
    if (npc) {
      return (
        <div>
          <p><strong>Age:</strong> {npc.age}</p>
          <p><strong>Occupation:</strong> {npc.occupation}</p>
          <p><strong>Birthplace:</strong> {npc.birthplace}</p>
          <p><strong>Current Residence:</strong> {npc.currentResidence}</p>
          <p><strong>Description:</strong> {npc.description}</p>
          {npc.symptoms && (
            <div>
              <p><strong>Symptoms:</strong></p>
              <ul>
                {npc.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom.name}: "{symptom.quote}"</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }
    return <p>{npcInfo}</p>;
  };

  return (
    <div className="portrait-section">
      <div className="npc-portrait-container" onClick={handleNpcClick}>
        <div className="npc-portrait-wrapper">
          {isEmoji ? (
            <div 
              className={`emoji-image ${fadeClass}`}
              dangerouslySetInnerHTML={{ __html: npcInfo }}
            />
          ) : (
            <img 
              src={npcImage}
              alt="NPC" 
              className={`npc-portrait-image ${fadeClass}`} 
              onError={(e) => {
                e.target.src = apothecaryImage;
              }}
            />
          )}
          <p className="portrait-caption">
            {npcCaption}{' '}
            {getNpcPDF(npcCaption) && (
              <span 
                className="pdf-name" 
                onClick={() => handlePDFClick(getNpcPDF(npcCaption))}
              >
                📄
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="pc-portrait-container" onClick={handlePcClick}>
        <div>
          <img src={mariaPortrait} alt="Maria" className="pc-portrait-image" />
          <p className="portrait-caption">{pcCaption}</p>
        </div>
      </div>

      {showNpcPopup && (
        <div className="portrait-popup">
          {isEmoji ? (
            <div 
              className="emoji-image popup-portrait-image"
              dangerouslySetInnerHTML={{ __html: npcInfo }}
            />
          ) : (
            <img src={npcImage} alt="NPC" className="popup-portrait-image" />
          )}
          <p><strong>{npcCaption.split(' ').slice(2).join(' ')}</strong></p>
          <div className="popup-info">{getNpcInfo(npcCaption.split(',')[0])}</div>
          <button onClick={closeNpcPopup} className="close-map-button">Close</button>
        </div>
      )}

      {showPcPopup && (
        <div className="portrait-popup">
          <img src={mariaPortrait} alt="Maria" className="popup-portrait-image" />
          <p><strong>Maria de Lima</strong></p>
          <div className="popup-info">{pcInfoContent}</div>
          <button onClick={closePcPopup} className="close-map-button">Close</button>
        </div>
      )}

      {showPDFPopup && (
        <Suspense fallback={<div>Loading PDF...</div>}>
          <PDFPopup 
            isOpen={showPDFPopup}
            onClose={closePDFPopup}
            pdfPath={selectedPDF}  
          />
        </Suspense>
      )}
    </div>
  );
}

export default PortraitSection;

