import React, { useEffect, useState } from 'react';
import EntityList from './EntityList';
import SymptomLocator from './SymptomLocator';
import './Symptoms.css';

function Symptoms({ npcName, onClose, onPDFClick }) {
  const [npc, setNpc] = useState(null);
  const [showAstrologyImage, setShowAstrologyImage] = useState(false);
  const [astrologyImage, setAstrologyImage] = useState('');
  const [hoveredSymptom, setHoveredSymptom] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState('');
  const [patientResponse, setPatientResponse] = useState(''); // Store the patient's response
  const [isLoading, setIsLoading] = useState(false); // To handle loading state

useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose(); // Trigger the close function when "Escape" is pressed
    }
  };

  document.addEventListener('keydown', handleKeyDown);

  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}, [onClose]);

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
  const handleQuestionSubmit = async () => {
    if (!additionalQuestions.trim()) {
      return;
    }

    setIsLoading(true);

    // Build the prompt
    const prompt = `
You are ${npc.name}, a ${npc.age}-year-old ${npc.gender}, occupation: ${npc.occupation}, currently residing in ${npc.currentResidence}. 
Your symptoms are: ${npc.symptoms.map(symptom => symptom.name).join(', ')}. You are seeking treatment from the apothecary Maria de Lima in Mexico City in 1680.
Secret (do not reveal unless directly asked, but drop hints throughout): ${npc.secret || 'None'}.

Answer the following questions from the healer in first person, honestly, in one or two sentences per question. You may take offense at an impertinent or personal question, or be evasive, and frequently will break off without fully answering, in mid-sentence, perhaps to cough or moan, or perhaps just because you are embarrassed. 

Be idiosyncratic and surprising in your responses, and keep them brief. Remember you are roleplaying as a real person who might not want to share some things. A person with secrets.

Questions:
${additionalQuestions}

Responses:
`;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini', // Use the 'gpt-4o-mini' model as specified
          messages: [
            { role: 'system', content: 'You are simulating the patient responding to the healer\'s questions.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content.trim();

      setPatientResponse(aiResponse);
    } catch (error) {
      console.error('Error fetching patient response:', error);
      setPatientResponse('Sorry, I am unable to answer right now.');
    } finally {
      setIsLoading(false);
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
            <div 
  className="astrology-symbol" 
  data-sign-name={npc.astrologicalSign}  // This will pass the astrological sign name to the CSS
>
  {astrologySymbols[npc.astrologicalSign]}
</div>
          </div>

          <ul>
            <li>
              <strong>
                <span
                  onClick={handlePDFLinkClick} // Trigger the PDF popup
                 
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

          {/* Text entry for additional questions */}
         <textarea
           value={additionalQuestions}
           onChange={(e) => setAdditionalQuestions(e.target.value)}
           onKeyDown={(e) => {
             if (e.key === 'Enter') {
               e.preventDefault(); // Prevents newline in the textarea
               handleQuestionSubmit(); // Triggers question submission
             }
           }}
           placeholder="Ask additional questions about the patient's symptoms..."
           className="additional-questions-input"
         />

          {/* Display the patient's response */}
          {isLoading ? (
            <p>Loading response...</p>
          ) : patientResponse && (
            <div className="patient-response">
              <h3>Patient's Response:</h3>
              <p>{patientResponse}</p>
            </div>
          )}
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
      <div className="symptoms-buttons">
        <button className="submit-questions-button" onClick={handleQuestionSubmit}>
          {isLoading ? 'Submitting...' : 'Submit Questions'}
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  </div>
);

}

export default Symptoms;
