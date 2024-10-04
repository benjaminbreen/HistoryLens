import React, { useEffect, useState } from 'react';
import EntityList from './EntityList';
import SymptomLocator from './SymptomLocator';
import './Symptoms.css';
import defaultnpc from './assets/defaultnpc.jpg'; // Add a default image

function Symptoms({ npcName, onClose, onPDFClick }) {
  const [npc, setNpc] = useState(null);
  const [showAstrologyImage, setShowAstrologyImage] = useState(false);
  const [astrologyImage, setAstrologyImage] = useState('');
  const [hoveredSymptom, setHoveredSymptom] = useState(null);
  const [additionalQuestions, setAdditionalQuestions] = useState('');
  const [patientResponse, setPatientResponse] = useState(''); // Store the patient's response
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
const [isAstrologyHovered, setIsAstrologyHovered] = useState(false);
 const handleDotHover = (symptomName) => {
    setHoveredSymptom(symptomName);
  };



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
    } else {
      // Auto-generate NPC if not found in EntityList
      setNpc({
        name: npcName,
        age: 40,  // Default age
        gender: 'Unknown',
        occupation: 'Unknown',
        currentResidence: 'Unknown',
        symptoms: generateRandomSymptoms(),  // Generate random symptoms if not defined
        image: 'defaultnpc' // Default image if image is missing
      });
    }
  }, [npcName]);



  // Fallback to avoid crashing if an NPC doesn't have predefined symptoms
  const generateRandomSymptoms = () => {
    const possibleSymptoms = [
      { name: 'Fever', location: 'head', quote: 'I feel hot all over, like a burning coal.' },
      { name: 'Cough', location: 'chest', quote: 'I can’t stop coughing, my chest hurts.' },
      { name: 'Fatigue', location: 'whole body', quote: 'I feel weak, like my limbs are made of lead.' },
      { name: 'Nausea', location: 'stomach', quote: 'My stomach turns with every breath.' },
    ];

    return possibleSymptoms.slice(0, Math.floor(Math.random() * 3) + 1);  // Generate 1-3 random symptoms
  };

// Fallback if an image is missing or incorrect
const getImage = (imageName) => {
  try {
    // Try loading the specific image with .jpg extension
    return require(`./assets/${imageName}.jpg`);
  } catch (errorJPG) {
    try {
      // If .jpg is not found, try without the extension
      return require(`./assets/${imageName}`);
    } catch (errorWithoutExtension) {
      console.warn(`Image ${imageName} not found with or without .jpg extension, using default image.`);
      return defaultnpc; // Return default image if neither is found
    }
  }
};

  if (!npc) {
    return (
      <div className="symptoms-root">
        <div className="symptoms-popup">
          <p>
            No NPC selected. If you want to check the symptoms of a character who is present, engage them in conversation first and see if they are willing to be your patient.
          </p>
          <button className="symptoms-popup-close" onClick={onClose}>
            Close


          </button>
        </div>
      </div>
    );
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
Your symptoms are:  ${npc.symptoms?.map(symptom => symptom.name).join(', ') || 'No symptoms'}. You are seeking treatment from the apothecary Maria de Lima in Mexico City in 1680.
Secret (do not reveal unless directly asked, but drop hints throughout): ${npc.secret || 'None'}.

Answer the following questions from the healer in first person, honestly, in one or two sentences per question. You may take offense at an impertinent or personal question, or be evasive, and frequently will break off without fully answering, in mid-sentence, perhaps to cough or moan or make some other utterance, or perhaps just because you are embarrassed. 

Be idiosyncratic and surprising in your responses, and keep them brief. Remember you are roleplaying as a real person who might not want to share some things. A person with secrets. You should reference real, specific details of your life in concrete and highly particular ways. Make the secret somewhat obvious if questioned. Keep in mind social class - wealthy or VIP characters will be extremely arrogant and look down on Maria, esepcially if her questions are not phrased respectfully. 
If data is not available, invent it.
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
            { role: 'system', content: 
            'You are simulating the patient responding to the healer\'s questions. The year is 1680 and all your responses should ALWAYS be precisely hitorically accurate and true to the reality of life in the 1680s. This was a difficult and at times grim world and patients suffered from appalling ailments that left them wracked with torment. Your rsponses should reflect that. At the time, they also observed strict codes of social propriety and were often reluctant to share personal details, so be evasive and difficult. ' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 150,
          temperature: 0.8,
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
          {npc ? (
            <>
              <div className="npc-info">
                {/* NPC Name */}
              

                {/* NPC Portrait and Astrology Symbol */}
                <div className="npc-portrait-container">
                  <img src={getImage(npc.image)} alt={npc.name} />
                  <div 
                    className="astrology-symbol" 
                    data-sign-name={npc.astrologicalSign}
                  >
                    {astrologySymbols[npc.astrologicalSign]}
                  </div>
                </div>

              {/* NPC Details */}
              <ul>
                
                  <div className="npc-name" onClick={handlePDFLinkClick}>
                  {npc.name}
                </div>
                <li><strong>Age:</strong> {npc.age}</li>
                <li><strong>Gender:</strong> {npc.gender}</li>
                <li><strong>Occupation:</strong> {npc.occupation}</li>
                <li><strong>Birthplace:</strong> {npc.birthplace || 'Unknown'}</li>
                <li><strong>Residence:</strong> {npc.currentResidence || 'Unknown'}</li>
                <li><strong>Casta:</strong> {renderCastaLink(npc.casta || 'Unknown')}</li>
                 <li>
                    <strong> Sign: </strong>
                    <span 
                      className="astrology-sign" 
                      onMouseEnter={() => setIsAstrologyHovered(true)}
                      onMouseLeave={() => setIsAstrologyHovered(false)}
                    >
                      {npc.astrologicalSign}
                    </span>
                    {/* Display astrology image if hovered */}
                   
                  </li>
              </ul>

               {isAstrologyHovered && astrologyImages[npc.astrologicalSign] && (
                      <div className="astrology-image-popup">
                        <img src={astrologyImages[npc.astrologicalSign]} alt={npc.astrologicalSign} />
                      </div>
                    )}

              {/* Additional Questions Section */}
              <textarea
                value={additionalQuestions}
                onChange={(e) => setAdditionalQuestions(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();  // Prevents newline in textarea
                    handleQuestionSubmit();  // Submit the questions
                  }
                }}
                placeholder="Ask additional questions about the patient's symptoms..."
                className="additional-questions-input"
              />

              {/* Display Patient's Response */}
              {isLoading ? (
                <p>Loading response...</p>
              ) : (
                patientResponse && (
                  <div className="patient-response">
                    <h3>Patient's Response:</h3>
                    <p>{patientResponse}</p>
                  </div>
                )
              )}
            </div>

            {/* Symptoms Chart Section */}
            <div className="symptoms-chart">
              <div className="body-chart">
                {npc.symptoms && npc.symptoms.length > 0 ? (
                  <SymptomLocator 
          symptoms={npc.symptoms} 
          hoveredSymptom={hoveredSymptom} 
          onDotHover={handleDotHover}
        />
                ) : (
                  <p>No symptoms available for this NPC.</p>
                )}
              </div>

              {/* Symptom List */}
            <div className="symptom-list">
        {npc.symptoms && npc.symptoms.length > 0 ? (
          <ul>
            {npc.symptoms.map((symptom, index) => (
              <li 
                key={index}
                onMouseEnter={() => setHoveredSymptom(symptom.name)}
                onMouseLeave={() => setHoveredSymptom(null)}
                style={{
                  backgroundColor: hoveredSymptom === symptom.name ? 'rgba(255, 255, 255, 0.4)' : 'transparent',
                  transition: 'background-color 0.3s ease'
                }}
              >
                <strong>{index + 1}.</strong> {symptom.name} ({symptom.location})<br/>
                <em>{symptom.quote}</em>
              </li>
            ))}
          </ul>
        ) : (
          <p>No symptoms to display.</p>
        )}
      </div>
    </div>
          </>
        ) : (
          <p>No NPC selected. If you want to check the symptoms of a character who is present, engage them in conversation first and see if they are willing to be your patient.</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="symptoms-buttons">
        <button 
          className="submit-questions-button" 
          onClick={handleQuestionSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Questions'}
        </button>
        <button className="symptoms-popup-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  </div>
);

}

export default Symptoms;