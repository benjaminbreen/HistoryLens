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

  // Function to convert journal entries to plain text and trigger download
  const handleSaveJournal = () => {
    const textContent = journal.map(entry => entry.content).join('\n\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'journal.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
  <div className={`journal-pane ${isOpen ? 'open' : ''}`}>
    <div className="button-container">
      <button onClick={toggleJournal} className="bg-blue-600 text-white p-2 rounded">
        Close Journal
      </button>

      {/* Save Journal button */}
      <button onClick={handleSaveJournal} className="bg-green-600 text-white p-2 rounded">
        Save Journal
      </button>
    </div>

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
