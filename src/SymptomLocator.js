import React from 'react';

const SymptomLocator = ({ symptoms, hoveredSymptom }) => {
  const getPosition = (location) => {
    switch (location.toLowerCase()) {
      case 'head': return { top: '5%', left: '50%' };
      case 'chest': return { top: '25%', left: '50%' };
      case 'abdomen': return { top: '40%', left: '50%' };
      case 'legs': return { top: '70%', left: '50%' };
      case 'whole body': return { top: '50%', left: '50%' };
      default: return { top: '50%', left: '50%' };
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {symptoms.map((symptom, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            width: hoveredSymptom === symptom.name ? '40px' : '20px',
            height: hoveredSymptom === symptom.name ? '40px' : '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 0, 0, 0.7)',
            boxShadow: hoveredSymptom === symptom.name
              ? '0 0 10px 5px rgba(255, 69, 0, 0.7), 0 0 25px 10px rgba(255, 140, 0, 0.8), 0 0 30px 15px rgba(255, 165, 0, 0.3)'
              : 'none',
            ...getPosition(symptom.location),
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease-in-out',
            zIndex: hoveredSymptom === symptom.name ? 2 : 1
          }}
          title={symptom.name}
        />
      ))}
    </div>
  );
};

export default SymptomLocator;