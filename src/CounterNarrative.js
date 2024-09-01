import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';
import ReactMarkdown from 'react-markdown';
import './CounterNarrative.css';
import EntityList from './EntityList';

const CounterNarrative = ({ historyOutput, handleIncorporate }) => {
    const [leftNarrative, setLeftNarrative] = useState('Subjective POV'); // Default to Subjective POV
    const [rightPaneContent, setRightPaneContent] = useState(''); // Renamed to avoid conflict
    const [leftContent, setLeftContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchNarrative = async (narrativeType, setContent) => {
        setIsLoading(true);
        try {
            let systemPrompt;

            if (narrativeType === 'Historian Critique') {
                systemPrompt = `
                    As a professional historian, critically and succinctly analyze the output of this historical simulation of an apothecary named Maria and her life and work in the year 1680 in Mexico City, identifying the 2-3 biggest historical inaccuracies or anachronisms, in NO MORE THAN TWO PARAGRAPHS. Be plainspoken. Never pedantic, and cite at least 5-6 real scholars who can provide further information - put their names in bold.
                `;
            } else if (narrativeType === 'Subjective POV') {
                const npc = EntityList.find(entity => entity.name === historyOutput.npcName);

                if (npc) {
                    systemPrompt = `
                        From the perspective of ${npc.name}, a ${npc.age}-year-old ${npc.occupation} from ${npc.birthplace}, write a subjective, stream-of-consciousness narrative reflecting their thoughts and emotions during this encounter. Use first-person perspective and include references to the NPC's background, secrets, and fears as described in their character details.
                    `;
                } else {
                    // Fallback: Write from the POV of a character in the current scenario
                    systemPrompt = `
                        From the perspective of a character involved in the current scenario described in the history agent output, write a subjective, stream-of-consciousness narrative reflecting their thoughts and emotions during the encounter. Use first-person perspective and incorporate the context and events provided in the output. Limit three paragraphs.
                    `;
                }
            }

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o-mini',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: historyOutput },
                    ],
                }),
            });

            const data = await response.json();
            setContent(data.choices[0].message.content);
        } catch (error) {
            console.error('Error fetching data:', error);
            setContent(`An error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNarrative('Historian Critique', setRightPaneContent); // Fetch right pane content by default
    }, []);

    useEffect(() => {
        if (leftNarrative) {
            fetchNarrative(leftNarrative, setLeftContent);
        }
    }, [leftNarrative]);

    const handleIncorporateClick = () => {
        handleIncorporate(rightPaneContent); // Use the updated state variable
    };

    return (
        <div className="counter-narrative-container">
            <div className="pane left-pane critique-agent-container">
                <div className="dropdown-container">
                    <select onChange={(e) => setLeftNarrative(e.target.value)}>
                        <option value="Subjective POV">Subjective POV</option>
                        {/* Add more options if needed */}
                    </select>
                </div>
                <div className={`output-box ${isLoading ? 'loading' : ''}`}>
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <ReactMarkdown>{leftContent || 'Please select a counter-narrative.'}</ReactMarkdown>
                    )}
                </div>
            </div>

            <div className="pane right-pane critique-agent-container">
                <div className="header">Critique by a Skeptical Historian</div> 
                
                {/* Add "Incorporate" Button */}
                <div className="incorporate-button-container" style={{ textAlign: 'right', marginBottom: '10px' }}>
                    <button onClick={handleIncorporateClick} className="incorporate-button">
                        Incorporate
                    </button>
                </div>

                <div className={`output-box ${isLoading ? 'loading' : ''}`}>
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <ReactMarkdown>{rightPaneContent || 'Loading...'}</ReactMarkdown>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CounterNarrative;
