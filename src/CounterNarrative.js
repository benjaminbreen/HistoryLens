import React, { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';
import ReactMarkdown from 'react-markdown';
import './CounterNarrative.css';
import EntityList from './EntityList';

const CounterNarrative = ({ historyOutput, handleIncorporate, currentPatient }) => {
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
                    As a professional historian, critically and succinctly analyze the output of this historical simulation of an apothecary named Maria and her life and work in the year 1680 in Mexico City, identifying the 2-3 biggest historical inaccuracies or anachronisms, in NO MORE THAN TWO PARAGRAPHS. Be plainspoken. Never pedantic, and cite at least 5-6 real scholars who can provide further information - put their names in bold. Potential authors/works to cite when appropriate: Paula De Vos, Compound Remedies: Galenic Pharmacy in Colonial Mexico (2010)
Pablo F. Gómez, The Experiential Caribbean: Creating Knowledge and Healing in the Early Modern Atlantic (2017)
Londa Schiebinger, Plants and Empire: Colonial Bioprospecting in the Atlantic World (2004)
Antonio Barrera-Osorio, Experiencing Nature: The Spanish American Empire and the Early Scientific Revolution (2006)
Matthew James Crawford, The Andean Wonder Drug: Cinchona Bark and Imperial Science in the Spanish Atlantic (2016)
Andrew Wear, Knowledge and Practice in English Medicine, 1550-1680 (2000)
Harold J. Cook, Matters of Exchange: Commerce, Medicine, and Science in the Dutch Golden Age (2007)
Ralph Bauer, The Alchemy of Conquest: Science, Religion, and the Secrets of the New World (2019)
Daniela Bleichmar, Visible Empire: Botanical Expeditions and Visual Culture in the Hispanic Enlightenment (2012)
Juan Pimentel, The Rhinoceros and the Megatherium: An Essay in Natural History (2017), José Pardo-Tomás, Science and Empire in the Atlantic World (2017); María M. Portuondo, Secret Science: Spanish Cosmography and the New World (2009); Marcy Norton, Sacred Gifts, Profane Pleasures: A History of Tobacco and Chocolate in the Atlantic World (2008); Karen Ordahl Kupperman, Indians and English: Facing Off in Early America (2000); Júnia Ferreira Furtado, Tropical Empiricism: Making Medical Knowledge in Colonial Brazil (2016); Ann Twinam, Purchasing Whiteness: Pardos, Mulattos, and the Quest for Social Mobility in the Spanish Indies (2015); John Slater, Medicine and Empire: Learned Medicine and Colonial Knowledge in the Spanish Empire (2011)
                `;
            } else if (narrativeType === 'Subjective POV') {
    // Dynamically get the NPC from currentPatient or historyOutput
    const npc = currentPatient || (historyOutput.npcName && EntityList.find(entity => entity.name === historyOutput.npcName));

    if (npc) {
        systemPrompt = `
            From the perspective of ${npc.name}, a ${npc.age || 'unknown age'}-year-old ${npc.occupation || 'unknown occupation'} from ${npc.birthplace || 'unknown birthplace'}, write a highly subjective, brief, but thoughtful and surprisingly personal stream-of-consciousness narrative reflecting their thoughts and emotions during this encounter. Use first-person perspective and include references to the NPC's background, secrets, and fears as described in their character details.
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
                    model: 'gpt-4o-2024-08-06',
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
