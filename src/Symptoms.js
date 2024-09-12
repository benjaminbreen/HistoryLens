import React, { useEffect, useState } from 'react';
import EntityList from './EntityList';
import SymptomLocator from './SymptomLocator';
import './Symptoms.css';

function Symptoms({ npcName, onClose, onPDFClick, addQuestionsToContext, handleSubmit}) {
  const [npc, setNpc] = useState(null);
  const [showAstrologyImage, setShowAstrologyImage] = useState(false);
  const [astrologyImage, setAstrologyImage] = useState('');
  const [hoveredSymptom, setHoveredSymptom] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState('');

  useEffect(() => {
    const selectedNpc = EntityList.find(entity => entity.name === npcName);
    if (selectedNpc) {
      setNpc(selectedNpc);
    }
  }, [npcName]);

  if (!npc) {
    return null;
  }

  // Define hyperlinks for specific Casta types
  const castaLinks = {
    Peninsular: "https://en.wikipedia.org/wiki/Peninsulares",
    Mestizo: "https://en.wikipedia.org/wiki/Mestizo",
    Criollo: "https://en.wikipedia.org/wiki/Criollo_people",
    Indigenous: "https://en.wikipedia.org/wiki/Indigenous_peoples_of_the_Americas"
  };

  const renderCastaLink = (casta) => {
    const url = castaLinks[casta];
    if (url) {
      return <a href={url} target="_blank" rel="noopener noreferrer" className="casta-link">{casta}</a>;
    }
    return casta;
  };

  // Define the images for the astrological signs
  const astrologyImages = {
    Aries: require('./assets/aries.jpg'),
    Taurus: require('./assets/taurus.jpg'),
    Gemini: require('./assets/gemini.jpg'),
    Cancer: require('./assets/cancer.jpg'),
    Leo: require('./assets/leo.jpg'),
    Virgo: require('./assets/virgo.jpg'),
    Libra: require('./assets/libra.jpg'),
    Scorpio: require('./assets/scorpio.jpg'),
    Sagittarius: require('./assets/sagittarius.jpg'),
    Capricorn: require('./assets/capricorn.jpg'),
    Aquarius: require('./assets/aquarius.jpg'),
    Pisces: require('./assets/pisces.jpg')
  };

  // Define Unicode symbols for astrological signs
  const astrologySymbols = {
    Aries: '♈',
    Taurus: '♉',
    Gemini: '♊',
    Cancer: '♋',
    Leo: '♌',
    Virgo: '♍',
    Libra: '♎',
    Scorpio: '♏',
    Sagittarius: '♐',
    Capricorn: '♑',
    Aquarius: '♒',
    Pisces: '♓'
  };

  const handleAstrologyClick = () => {
    setShowAstrologyImage(prev => !prev);
    setAstrologyImage(astrologyImages[npc.astrologicalSign] || '');
  };

  // Handler for submitting additional questions
const handleQuestionSubmit = () => {
  if (addQuestionsToContext) {
    addQuestionsToContext(additionalQuestions);
  }
  setAdditionalQuestions('');
  onClose(); // Close the popup

  // Trigger the next turn after questions are submitted
  if (handleSubmit) {
    handleSubmit({ preventDefault: () => {} }); // Pass an empty event to trigger submit
  }
};
  
    const handlePDFLinkClick = () => {
    if (onPDFClick && npc.pdf) {
      onPDFClick(npc.pdf);  // Trigger the PDF popup with the npc's PDF
    }
  };

  return (
    <div className="symptoms-root">
      <div className="symptoms-popup">
        <div className="symptoms-popup-content">
          <div className="npc-info">
            <div className="npc-portrait-container">
              <img src={require(`./assets/${npc.image}.jpg`)} alt={npc.name} />
              <span className="astrology-symbol">{astrologySymbols[npc.astrologicalSign]}</span>
            </div>

            {/* Text entry for additional questions */}
            <textarea
              value={additionalQuestions}
              onChange={(e) => setAdditionalQuestions(e.target.value)}
              placeholder="Ask additional questions about the patient's symptoms..."
              className="additional-questions-input"
            />

            <ul>
              <li>
                <strong>
                  <span
                    onClick={handlePDFLinkClick} // Trigger the PDF popup
                    style={{ textDecoration: 'underline', color: '#ffd700', fontSize: '22px', cursor: 'pointer' }}
                  >
                    {npc.name}
                  </span>
                </strong>
              </li>
              <li><strong>Age:</strong> {npc.age}</li>
              <li><strong>Gender:</strong> {npc.gender}</li>
              <li><strong>Occupation:</strong> {npc.occupation}</li>
              <li><strong>Birthplace:</strong> {npc.birthplace}</li>
              <li><strong>Current Residence:</strong> {npc.currentResidence}</li>
              <li><strong>Casta:</strong> {renderCastaLink(npc.casta)}</li>
              <li>
                <strong>Astrological Sign: </strong>
                <span 
                  className="astrology-sign" 
                  onClick={handleAstrologyClick} 
                  onMouseEnter={() => { setAstrologyImage(astrologyImages[npc.astrologicalSign] || ''); setShowAstrologyImage(true); }} 
                  onMouseLeave={() => setShowAstrologyImage(false)}
                >
                  {npc.astrologicalSign}
                </span>
                {showAstrologyImage && astrologyImage && (
                  <div className="astrology-image-popup">
                    <img src={astrologyImage} alt={npc.astrologicalSign} />
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className="symptoms-chart">
            <div className="body-chart">
              <SymptomLocator symptoms={npc.symptoms} hoveredSymptom={hoveredSymptom} />
            </div>
            <div className="symptom-list">
              <ul>
                {npc.symptoms.map((symptom, index) => (
                  <li 
                    key={index}
                    onMouseEnter={() => setHoveredSymptom(symptom.name)}
                    onMouseLeave={() => setHoveredSymptom(null)}
                  >
                    <strong>{index + 1}.</strong> {symptom.name} ({symptom.location})<br/>
                    <em>{symptom.quote}</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <button className="submit-questions-button" onClick={handleQuestionSubmit}>
          Submit Questions
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Symptoms;
