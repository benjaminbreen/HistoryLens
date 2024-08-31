import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';

function Journal({ journal, isOpen, toggleJournal }) {
  const journalRef = useRef(null);

  return (
    <div ref={journalRef} className={`journal-pane ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleJournal} className="mb-4 bg-blue-600 text-white p-2 rounded">Close Journal</button>
      
      <h2>Journal</h2>
      {journal && journal.length > 0 ? (
        journal.map((entry, index) => (
          <div 
            key={index} 
            className={`journal-entry ${entry.type === 'human' ? 'human-entry' : 'auto-entry'}`}
          >
            <ReactMarkdown>{entry.content}</ReactMarkdown>
          </div>
        ))
      ) : (
        <p>No entries yet.</p>
      )}
    </div>
  );
}

export default Journal;
