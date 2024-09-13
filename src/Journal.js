import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function Journal({ journal, isOpen, toggleJournal }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        toggleJournal(); // Close the journal when "Escape" is pressed
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, toggleJournal]); // Re-run effect if `isOpen` changes

  return (
    <div className={`journal-pane ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleJournal} className="mb-4 bg-blue-600 text-white p-2 rounded">
        Close Journal
      </button>

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
