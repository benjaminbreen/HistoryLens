import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './SimulationHistory.css'; // Make sure this is imported correctly

function SimulationHistory({ history, isOpen, toggleHistory }) {
  const historyRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        toggleHistory(); // Close the pane when "Escape" is pressed
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggleHistory]); // Re-run effect if `isOpen` changes

  return (
    <div ref={historyRef} className={`simulation-history ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleHistory} className="mb-4 bg-blue-600 text-white p-2 rounded">
        Close Simulation History
      </button>
      <h2 className="text-xl font-semibold mb-2">Simulation History</h2>
      {history.map((entry, index) => (
        <div key={index} className="history-entry">
          {entry.role === 'user' ? (
            <p className="user-input">
              <strong>User Input:</strong> <ReactMarkdown>{entry.content}</ReactMarkdown>
            </p>
          ) : (
            <p><ReactMarkdown>{entry.content}</ReactMarkdown></p>
          )}
        </div>
      ))}
    </div>
  );
}

export default SimulationHistory;
