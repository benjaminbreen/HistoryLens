import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Popup.css';

const Map = ({ isOpen, onClose, previousOutput, apiKey }) => {
  const [mapOutput, setMapOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && previousOutput) {
      generateMap(previousOutput);
    }
  }, [isOpen, previousOutput]);

  const generateMap = async (previousOutput) => {
    setIsLoading(true);
    try {
      const mapPrompt = `
        Create a detailed ASCII map of Maria de Lima's surroundings for a historical simulation which begins in Mexico City in 1680 but can move to other locations (for instance, you might make a map of a house, the hold of a ship at sea, a desolate landscape, an ocean, or even a continent). Use the following guidelines:
        - Use a consistent width for all lines (e.g., 60 characters).
        - Use '|' for vertical borders and '-' for horizontal borders.
        - Pad shorter lines with spaces to maintain rectangular shape.
        - Use emojis and ASCII characters for landmarks and objects.
        - Include a legend below the map.
        
        Ensure the map includes:
        - Named or mentioned NPCs
        - Any other relevant landmarks or features mentioned in the narrative

        Base the map on this description of the surroundings:
        ${previousOutput}

        Format the output as a code block for proper rendering.
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are an expert in creating detailed ASCII maps. Always format your map output as a code block by wrapping it in triple backticks (```).' },
            { role: 'user', content: mapPrompt },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const mapText = data.choices[0].message.content;
      setMapOutput(mapText);
    } catch (error) {
      console.error("Error generating map:", error);
      setMapOutput("An error occurred while generating the map.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="map-overlay">
        <div className="map-popup">
          <div className="map-popup-content">
            <h2>Map</h2>
            {isLoading ? (
              <p>Loading map...</p>
            ) : (
              <pre className="ascii-map">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{mapOutput}</ReactMarkdown>
              </pre>
            )}
            <button onClick={onClose} className="close-map-button">Close</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Map;