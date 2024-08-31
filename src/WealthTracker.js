import React, { useEffect, useState } from 'react';
import './WealthTracker.css';

function WealthTracker({ llmResponse, onStatusChange }) {
  const [currentWealth, setCurrentWealth] = useState(11);  // Default starting wealth
  const [status, setStatus] = useState('rested');  // Default starting status

  useEffect(() => {
    // Extract wealth and status from the LLM response
    const wealthMatch = llmResponse.match(/Maria has (\d+) silver coins\./);
    const statusMatch = llmResponse.match(/She is feeling ([\w\s]+)\./);

    if (wealthMatch && wealthMatch[1]) {
      setCurrentWealth(parseInt(wealthMatch[1], 10));
    }
    if (statusMatch && statusMatch[1]) {
      const newStatus = statusMatch[1].trim();
      setStatus(newStatus);

      // Notify the parent component of the status change
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
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
      </div>
    </div>
  );
}

export default WealthTracker;
