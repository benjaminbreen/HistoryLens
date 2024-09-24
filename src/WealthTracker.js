// WealthTracker.js
import React, { useEffect, useState } from 'react';
import './WealthTracker.css';

function WealthTracker({ llmResponse, onStatusChange, onWealthChange }) {
  const [currentWealth, setCurrentWealth] = useState(11);  // Default starting wealth
  const [status, setStatus] = useState('rested');  // Default starting status
  const [reputationEmoji, setReputationEmoji] = useState('😐');  // Default reputation emoji

  // Define the allowed reputation emojis
  const allowedEmojis = ['😡', '😠', '😐', '😶', '🙂', '😌', '😏', '😃', '😇', '👑'];

  useEffect(() => {
  console.log("LLM Response:", llmResponse);  // Log the LLM response for debugging
  
  const wealthMatch = llmResponse.match(/(?:Maria now has|You now have|Maria has|Your current wealth stands at|Your wealth stands at|You possess)\s+(\d{1,3}(?:,\d{3})*)\s+(?:silver coins|reales|coins)/i);
  const statusMatch = llmResponse.match(/She is feeling ([\w\s]+)\./);
  
  // Regex to match any emoji in the response
  const emojiMatch = llmResponse.match(/([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])/u);

  console.log("Wealth Match:", wealthMatch);
  console.log("Status Match:", statusMatch);
  console.log("Emoji Match:", emojiMatch);

  if (wealthMatch && wealthMatch[1]) {
    const newWealth = parseInt(wealthMatch[1].replace(/,/g, ''), 10);  // Handle commas
    console.log("Parsed Wealth:", newWealth);
    setCurrentWealth(newWealth);
    if (onWealthChange) {
      onWealthChange(newWealth);  // Notify parent component of wealth change
    }
  }

  if (statusMatch && statusMatch[1]) {
    const newStatus = statusMatch[1].trim();
    console.log("Parsed Status:", newStatus);
    setStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);  // Notify parent component of status change
    }
  }

  if (emojiMatch && emojiMatch[1]) {
    const foundEmoji = emojiMatch[1].trim();
    if (allowedEmojis.includes(foundEmoji)) {
      console.log("Parsed Emoji:", foundEmoji);
      setReputationEmoji(foundEmoji);  // Update reputation emoji if it's in the allowed list
    }
  }
}, [llmResponse, onStatusChange, onWealthChange]);


  return (
    <div className="wealth-tracker">
      <div className="wealth-box">
        <div className="wealth-item">
          <span className="wealth-label">WEALTH:</span>
          <span className="wealth-value">{currentWealth} silver coins</span>
        </div>
        <div className="wealth-item">
          <span className="wealth-label">STATUS:</span>
          <span className="wealth-value">Maria feels {status}</span>
        </div>
        <div className="wealth-item">
          <span className="wealth-label">REPUTATION:</span>
          <span className="wealth-value"><span className="emoji">{reputationEmoji}</span></span>
        </div>
      </div>
    </div>
  );
}

export default WealthTracker;
