import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import './SimulationHistory.css'; // Make sure this is imported correctly

function SimulationHistory({ history, isOpen, toggleHistory }) {
  const historyRef = useRef(null);


  return (
    <div ref={historyRef} className={`simulation-history ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleHistory} className="mb-4 bg-blue-600 text-white p-2 rounded">
        Close Simulation History
      </button>
      <h2 className="text-xl font-semibold mb-2">Simulation History</h2>
      {history.map((entry, index) => (
        <div key={index} className="history-entry">
          {entry.role === 'user' ? (
            <p className="user-input"><strong>User Input:</strong> <ReactMarkdown>{entry.content}</ReactMarkdown></p>
          ) : (
            <p><ReactMarkdown>{entry.content}</ReactMarkdown></p>
          )}
        </div>
      ))}
    </div>
  );
}

export default SimulationHistory;
