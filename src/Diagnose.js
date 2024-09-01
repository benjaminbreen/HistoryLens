import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Popup.css';
import EntityList from './EntityList'; // Import your EntityList

const Diagnose = ({ isOpen, onClose, previousOutput, npcCaption }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    if (isOpen && npcCaption) {
      const patientName = npcCaption.split(',')[0];
      const patient = EntityList.find(entity => 
        entity.type === 'patient' && entity.name.toLowerCase().includes(patientName.toLowerCase())
      );
      setCurrentPatient(patient);
      if (patient) {
        generateDiagnosis(previousOutput, patient);
      }
    }
  }, [isOpen, npcCaption, previousOutput]);

  const generateDiagnosis = async (previousOutput, patient) => {
    setIsLoading(true);
    console.log('Previous Output:', previousOutput);
    console.log('Patient:', patient);

    try {
      const diagnosisPrompt = `
        You are an apothecary in the 1680s. Given the following patient information and recent observations from the historical simulation, provide a diagnosis for the patient and suggest medicinal simples or compound remedies of potential value.
        **Patient Information:**
        - Name: ${patient.name}
        - Age: ${patient.age}
        - Symptoms: ${patient.symptoms.map(s => `${s.name} (${s.location}): "${s.quote}"`).join('; ')}
        **Recent Observations:**
        ${previousOutput}
        Use period-appropriate medical concepts to depict Maria de Lima's thought process as she diagnoses the patient. Portray her thoughts in a plainspoken, simple (no "hath" or "thou"!), stream of consciousness style, almost like notes to herself, blunt and to the point, unsparing, citing relevent 17th century and earlier authorities frequently, with materia medica she considers using in italic. Limit your response to three paragraphs.
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
      console.log('API Response:', data);

      const diagnosisOutput = data.choices[0].message.content;
      setDiagnosis(diagnosisOutput);
    } catch (error) {
      console.error("Error generating diagnosis:", error);
      setDiagnosis(`An error occurred while generating the diagnosis: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

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