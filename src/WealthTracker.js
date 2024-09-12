import React, { useEffect, useState } from 'react';
import './WealthTracker.css';

function WealthTracker({ llmResponse, onStatusChange }) {
  const [currentWealth, setCurrentWealth] = useState(11);  // Default starting wealth
  const [status, setStatus] = useState('rested');  // Default starting status
  const [reputationEmoji, setReputationEmoji] = useState('😐');  // Default reputation emoji

  useEffect(() => {
    // Extract wealth (either "reales" or "silver coins") from the LLM response
    const wealthMatch = llmResponse.match(/Maria has (\d+) (reales|silver coins)\./);
    const statusMatch = llmResponse.match(/She is feeling ([\w\s]+)\./);
    const reputationMatch = llmResponse.match(/Her reputation is represented by the emoji (.+)\./);  // Expecting reputation as emoji from the LLM

    // If wealth information is found
    if (wealthMatch && wealthMatch[1]) {
      setCurrentWealth(parseInt(wealthMatch[1], 10));
    }

    // If status information is found
    if (statusMatch && statusMatch[1]) {
      const newStatus = statusMatch[1].trim();
      setStatus(newStatus);

      // Notify the parent component of the status change
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
    }

    // If reputation emoji is found
    if (reputationMatch && reputationMatch[1]) {
      setReputationEmoji(reputationMatch[1].trim());
    }
  }, [llmResponse, onStatusChange]);

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
