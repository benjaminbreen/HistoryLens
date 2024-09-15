// QuestTester.js
import React, { useState } from 'react';
import { quests } from './Quest'; // Import the quests array

function QuestTester() {
  const [userInput, setUserInput] = useState(''); // Input state for the user command
  const [activeQuest, setActiveQuest] = useState(null); // Active quest state

  // Function to handle form submission and trigger the quest
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    if (userInput.startsWith('quest')) {
      const questNumber = parseInt(userInput.replace('quest', '')); // Extract the quest number
      const questToStart = quests.find((quest) => quest.id === questNumber); // Find the quest by its ID

      if (questToStart) {
        setActiveQuest(questToStart); // Set the active quest
        console.log(`Quest started: ${questToStart.name}`); // Log to console for debugging
      } else {
        console.log('Quest not found.');
      }
    } else {
      console.log('Invalid command.');
    }

    setUserInput(''); // Clear the input field after submission
  };

  return (
    <div>
      <h1>Quest Tester</h1>

      {/* Input form for the user to type quest commands */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type 'quest1', 'quest2', etc. to start a quest"
        />
        <button type="submit">Submit</button>
      </form>

      {/* Display the active quest's name if available */}
      {activeQuest && (
        <div>
          <h2>Active Quest: {activeQuest.name}</h2>
          {/* Display quest stages or other details here */}
        </div>
      )}
    </div>
  );
}

export default QuestTester;
