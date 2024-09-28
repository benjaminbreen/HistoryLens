import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Popup.css';
import EntityList from './EntityList'; // Import your EntityList

const Diagnose = ({ isOpen, onClose, previousOutput, npcCaption }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  // Helper: Fuzzy match function
  const fuzzyMatch = (input, target) => {
    if (!input || !target) return false;
    const cleanedInput = input.toLowerCase().trim();
    const cleanedTarget = target.toLowerCase().trim();
    return cleanedTarget.includes(cleanedInput);
  };

  // Find matching NPC logic
  const getMatchedNPC = (name) => {
    let matchedNPC = EntityList.find(entity => fuzzyMatch(name, entity.name));

    if (!matchedNPC && npcCaption) {
      matchedNPC = EntityList.find(entity => fuzzyMatch(npcCaption, entity.description));
    }

    return matchedNPC || null; // Explicitly return null if no match is found
  };

  // UseEffect to handle NPC matching when popup opens
  useEffect(() => {
    if (isOpen && npcCaption) {
      
  const npcName = npcCaption.split('seeks')[0].split(',')[0].trim();

      const matchedNpc = getMatchedNPC(npcName);

      if (matchedNpc) {
        setCurrentPatient(matchedNpc);
      } else {
        setCurrentPatient({
          name: npcName,
          age: 40,  // Default age
          gender: 'Unknown',
          occupation: 'Unknown',
          currentResidence: 'Unknown',
          image: 'defaultnpc', // Default image if none found
          symptoms: [] // Empty symptoms to prevent crash
        });
      }
    }
  }, [isOpen, npcCaption]);

  const generateDiagnosis = async (previousOutput, patient) => {
    if (!patient) return; // Don't attempt to generate a diagnosis without a valid patient
    setIsLoading(true);

    try {
      const diagnosisPrompt = `
        You are an apothecary in the 1680s. Given the following patient information and recent observations from the historical simulation, provide a brief diagnosis for the patient and suggest medicinal simples or compound remedies of potential value.
        **Patient Information:**
        - Name: ${patient.name}
        - Age: ${patient.age}
        - Symptoms: ${patient.symptoms.length > 0 
            ? patient.symptoms.map(s => `${s.name} (${s.location}): "${s.quote}"`).join('; ') 
            : 'No symptoms available'}
        **Recent Observations:**
        ${previousOutput}
         Use period-appropriate medical concepts to depict Maria de Lima's thought process as she diagnoses the patient. Portray her thoughts in a plainspoken, simple (no "hath" or "thou"!), stream of consciousness style, almost like notes to herself, blunt and to the point, unsparing, citing relevent 17th century and earlier authorities frequently (i.e. Avicenna, Pliny, Monardes), with materia medica she considers using in italic. 
         She is an eclectic apothecary and uses both New World and traditional drugs - i.e. she might prescribe drugs/simples from "the Indies" and alchemical remedies, not just traditional herbs. Limit your response to two paragraphs.
      `;

      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            temperature: .8,
            messages: [
              { role: 'system', content: 'You are assisting in a history simulation game about an apothecary in 1680.' },
              { role: 'user', content: diagnosisPrompt },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const diagnosisOutput = data.choices[0].message.content;
      setDiagnosis(diagnosisOutput);
    } catch (error) {
      console.error('Error generating diagnosis:', error);
      setDiagnosis(`An error occurred while generating the diagnosis: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentPatient) {
      generateDiagnosis(previousOutput, currentPatient);
    }
  }, [currentPatient, previousOutput]);

  if (!isOpen) return null;

  return (
    <div className="diagnose-popup">
      <div className="diagnose-popup-content">
        <h2>Diagnosis for {currentPatient ? currentPatient.name : 'Unknown Patient'}</h2>
        {isLoading ? (
          <p>Loading diagnosis...</p>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{diagnosis}</ReactMarkdown>
        )}
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default Diagnose;
