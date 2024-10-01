import React, { useEffect, useState, useMemo } from 'react';
import './WealthTracker.css';

// Memoized WealthTracker component
const WealthTracker = React.memo(({ llmResponse, onStatusChange, onWealthChange }) => {
  const [currentWealth, setCurrentWealth] = useState(11);  // Default starting wealth
  const [status, setStatus] = useState('rested');  // Default starting status
  const [reputationEmoji, setReputationEmoji] = useState('😐');  // Default reputation emoji

  // Define the allowed reputation emojis
  const allowedEmojis = ['😡', '😠', '😐', '😶', '🙂', '😌', '😏', '😃', '😇', '👑'];

  // Memoize the parsing of wealth
  const parsedWealth = useMemo(() => {
    const wealthMatch = llmResponse.match(/(?:Maria now has|You now have|Your current wealth is now|Maria has|Your current wealth stands at|Your wealth stands at|The current wealth of Maria is now|The wealth of Maria is now|You possess)\s+(\d{1,3}(?:,\d{3})*)\s+(?:silver coins|reales|coins)/i);
    return wealthMatch ? parseInt(wealthMatch[1].replace(/,/g, ''), 10) : currentWealth;
  }, [llmResponse, currentWealth]);

  // Memoize the parsing of status
  const parsedStatus = useMemo(() => {
    const statusMatch = llmResponse.match(/She is feeling ([\w\s]+)\./);
    return statusMatch ? statusMatch[1].trim() : status;
  }, [llmResponse, status]);

  // Memoize the parsing of emoji
  const parsedEmoji = useMemo(() => {
    const emojiMatch = llmResponse.match(/([\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])/u);
    const foundEmoji = emojiMatch ? emojiMatch[1].trim() : reputationEmoji;
    return allowedEmojis.includes(foundEmoji) ? foundEmoji : reputationEmoji;
  }, [llmResponse, reputationEmoji, allowedEmojis]);

  // Use useEffect to update state values when the parsed data changes
  useEffect(() => {
    if (parsedWealth !== currentWealth) {
      setCurrentWealth(parsedWealth);
      if (onWealthChange) {
        onWealthChange(parsedWealth);  // Notify parent component of wealth change
      }
    }

    if (parsedStatus !== status) {
      setStatus(parsedStatus);
      if (onStatusChange) {
        onStatusChange(parsedStatus);  // Notify parent component of status change
      }
    }

    if (parsedEmoji !== reputationEmoji) {
      setReputationEmoji(parsedEmoji);
    }
  }, [parsedWealth, parsedStatus, parsedEmoji, currentWealth, status, reputationEmoji, onWealthChange, onStatusChange]);

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
});

export default WealthTracker;
