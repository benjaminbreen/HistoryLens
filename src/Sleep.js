import React, { useState, useEffect, useCallback } from 'react';
import './Sleep.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PDFPopup from './PDFPopup';  // Import PDFPopup component
import imageMap from './imageMap';

const Sleep = ({
  isOpen,
  onClose,
  gameState,
  conversationHistory,
  handleTurnEnd,
  addJournalEntry,
  setHistoryOutput,
  setConversationHistory,
  setTurnNumber,
}) => {
  const { time, date, location } = gameState;
  const [randomDream, setRandomDream] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedOutput, setSimulatedOutput] = useState('');
  const [sleepPrompt, setSleepPrompt] = useState('');
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [selectedPdfPath, setSelectedPdfPath] = useState('');
  const [selectedCitation, setSelectedCitation] = useState('');
  const [dreamLoaded, setDreamLoaded] = useState(false);

  const dreams = [
  {
    title: "The Dream of the Serpent",
    summary: "a serpent coiled around itself in a dense wood. 🐍",
    fullDescription: "In my sleep, I wandered through a dense wood, thick with the scent of decay and damp earth. There, in the heart of the forest, I saw a serpent coiled tightly around its own body, biting into its tail. Its eyes flickered with a knowing malice, and I felt that the creature had been waiting for me all along. As it devoured itself, its skin shimmered and cracked, revealing silver beneath—a substance more fluid than flesh, quicksilver-like, shifting between forms. **I recognized the endless cycle of exile and return. I woke with the bitter taste of metal on my tongue, thinking about alchemy. I believe I should mix some compound drugs today.**",
    image: imageMap['dream1'],
    pdf: "pdfs/dream1.pdf",
    citation: "Lucas Jennis, *Musaeum hermeticum reformatum et amplificatum,* (Frankfurt, 1749)",
  },
  {
    title: "The Dream of the Janus Head",
    summary: "two heads, attached, hovering over a distant city. 🎭",
    fullDescription: "A dream of two faces. Joined at the neck. One looking forward. One looking back. Both staring into the distance, past the crumbling city below. The air thick with heat, blurring the horizon. One face whispers, 'What should I do?' The other: 'What do I abandon?' There's a stone in my hand. It feels heavy, like it’s pulling me down. The wind picks up. I want to let go of the stone, but my fingers tighten. The city below fades into the heat. I feel as though I must leave it, forever. **The heads stay silent, gazing past me toward a future I cannot see...**",
    image: imageMap['dream4'],
    pdf: "pdfs/dream4.pdf",
    citation: "Andrea Alciati, *Emblemi,* (Padua, 1626), Emblem XVII. 'What should I do? What do I abandon?' From the wise troop of flying cranes, it is said that each carries a stone in its foot to prevent itself from falling behind, pushed by opposing winds. In this way, a man should regulate his life."
},
{
    title: "The Dream of the Drowning Shield",
    summary: "a broken shield sinking into the sea, waves crashing against a ruined tomb. 🌊",
    fullDescription: "This night, as so often, I dream of the sea. The waves crash against stone. Cold and violent. A broken shield, stained with blood, drifts in the water. The surface churns, swallowing it slowly. I see a tomb, rising from the shore, its edges crumbling as the waves pull at it. The air smells of salt and rust. A voice rises from the sea. 'You have won,' it says, 'you are worthy of the arms.' But the words fall empty, carried away by the wind. **The shield sinks, lost to the depths.**",
    image: imageMap['dream5'],
    pdf: "pdfs/dream5.pdf",
    citation: "Andrea Alciati, *Emblemi,* (Padua, 1626), Emblem XXIII. 'You have won, son of Telamon; you are more worthy of the arms. Affection must yield to justice.'"
},
{
    title: "The Dream of the Winged Pursuit",
    summary: "being chased by winged creatures through a desolate landscape. 🪽",
    fullDescription: "This night I dream of flight. Two creatures, part woman, part bird, chase me across the sky. Their wings beat against the air, filling it with a terrible noise. They shriek my name. *Maria. Maria.* I run, but the ground shifts beneath my feet. Mountains rise, then crumble. The sky is full of feathers and talons. In the distance, I see two figures—warriors with wings of their own, armed with swords. They fight off the creatures, their blades cutting through the air. **I feel the wind change, the harpies pull back, retreating into the clouds. I wake with the echo of their cries still in my ears. I feel braver than before.**",
    image: imageMap['dream6'],
    pdf: "pdfs/dream6.pdf",
    citation: "Andrea Alciati, *Emblemi,* (Padua, 1626), Emblem XXXII. 'Me, miserable, whom the twin harpies seize like Phineus and drive from my home. Our integrity, and the spirit of the seeker of honesty, depend on the winged Zetes and Calais.'"
},
{
    title: "The Dream of the Storm-Tossed Ship",
    summary: "a ship battling through violent waves, sails torn by the wind. 💨",
    fullDescription: "A dream of a ship. Vast and heavy, its sails torn by the wind. The sea rages, saltwater spraying over the deck. I hold tight to the ropes, the wood creaking beneath me. The horizon vanishes into dark clouds. The ship rises, then falls, as if the ocean itself is alive—pulling us down, letting us go. Stars flicker faintly above, distant and cold. The crew shouts, but the wind steals their words. I look ahead—another wave, towering, ready to swallow us whole. **Yet, somewhere beyond, I sense a light. It is faint but steady. I wake just before the ship is consumed.**",
    image: imageMap['dream8'],
    pdf: "pdfs/dream8.pdf",
    citation: "Andrea Alciati, *Emblemi,* (Padua, 1626), Emblem XLIII. 'In countless storms our republic is tossed, and only hope of the future brings salvation: just as ships are driven through the middle of the sea by the winds, tired by the waves, and close to sinking. But if Helen's star arrives, the brothers' spirits are revived by good hope.'"
},

{
    title: "The Dream of the Lizard",
    summary: "A small lizard crawls out from the shadows, its body covered in dark spots. 🦎",
    fullDescription: "I dream of shadows. A small lizard, its body speckled with dark stars, crawls from a hidden place. It moves slowly, almost deliberately, as though it carries a secret. I feel envy. The lizard hides beneath tombstones, feeding on the dark. Faces appear, shrouded in mist. I look down and see the lizard at my feet. It coils around my ankle, cold and heavy. **I wake with a dull ache in my chest, as though something precious has slipped away.**",
   image: imageMap['dream10'],
    pdf: "pdfs/dream10.pdf",
    citation: "Andrea Alciati, *Emblemi,* (Padua, 1626), Emblem XLIX. 'The spotted body, small lizard, the stellion, covered in dark drops, inhabits hidden places and hollow tombs. Painted, it bears symbols of envy and treachery, too well known to the jealous.'"
},
];

 
  // Generate a random dream only once
  const generateRandomDream = useCallback(() => {
    if (!dreamLoaded) {
      const randomIndex = Math.floor(Math.random() * dreams.length);
      setRandomDream(dreams[randomIndex]);
      setDreamLoaded(true);
    }
  }, [dreamLoaded, dreams]);

  // Function to handle the sleep process
  const handleSleep = useCallback(async () => {
    // Access the current randomDream state
    const currentDream = randomDream;
    const dreamSummary = currentDream ? currentDream.summary : "No dream remembered";
    const sleepMessage = `Maria is going to sleep at ${time} on ${date} in ${location}. She will wake up the following morning. A summary of her dream: "${dreamSummary}". Please advance the simulation to the next morning and briefly describe what happens when Maria wakes up in the same location, incorporating the dream if possible. Present a numbered list of three possible next steps after this. At the end of your response, remember to include a status line at the end in this exact format: "**Maria slept and awoke the following day. She is feeling [single word status]. Time: 7:00 AM, xx [month] [year].**" Maria always wakes up the day after she sleeps, i.e. if Maria sleeps on 9:00 pm on August 24, 1680, she awakens at 7:00 AM on August 25, 1680.`;

    setSleepPrompt(sleepMessage);

    try {
      setIsLoading(true);

      const messages = Array.isArray(conversationHistory)
        ? [...conversationHistory, { role: 'user', content: sleepMessage }]
        : [{ role: 'user', content: sleepMessage }];

      // Send the sleep command to the history agent to advance the turn
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.3,
          messages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const simulatedOutput = data.choices[0].message.content;
      setSimulatedOutput(simulatedOutput);

      // Journal entry
      const journalEntry = `🛌 Maria went to sleep at ${time} on ${date} in ${location}. She dreamt of ${dreamSummary} She woke up the following morning.`;
      addJournalEntry(journalEntry);

    } catch (error) {
      console.error("Error advancing the turn during sleep:", error);
      setHistoryOutput("An error occurred while advancing to the next turn.");
    } finally {
      setIsLoading(false);
    }
  }, [time, date, location, conversationHistory, addJournalEntry, setHistoryOutput, randomDream]);

  // When the popup opens, select a dream and handle the sleep process
  useEffect(() => {
    if (isOpen && !dreamLoaded) {
      generateRandomDream();
    }
  }, [isOpen, dreamLoaded, generateRandomDream]);

  useEffect(() => {
    if (isOpen && dreamLoaded && randomDream) {
      handleSleep();
    } else if (!isOpen) {
      setRandomDream(null);
      setSimulatedOutput('');
      setDreamLoaded(false);
    }
  }, [isOpen, handleSleep, dreamLoaded, randomDream]);

  // Function to handle the PDF popup
  const handlePDFClick = () => {
    if (randomDream) {
      setSelectedPdfPath(randomDream.pdf);
      setSelectedCitation(randomDream.citation);
      setIsPdfOpen(true);  // Open the PDF popup
    }
  };

  // Function to handle when the user confirms/continues after reading the dream and the morning scenario
  const handleContinue = () => {
    setHistoryOutput(simulatedOutput); // Update the game state with the new turn's output
    setConversationHistory(prev => [
      ...prev,
      { role: 'user', content: sleepPrompt },
      { role: 'assistant', content: simulatedOutput }
    ]);
    setTurnNumber(prev => prev + 1); // Move to the next turn
    onClose(); // Close the sleep popup
  };

  if (!isOpen || !randomDream) return null;

  return (
    <div className="sleep-overlay">
      <div className="sleep-popup">
        <h3>{randomDream.title}</h3>
          {randomDream.image && (
          <img
            src={randomDream.image}
            alt={randomDream.title}
            className="dream-image"
           
            
          />
        )}

      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {randomDream.fullDescription}
      </ReactMarkdown>


      

        {/* Only show this in the main game screen, not the popup */}
        {!simulatedOutput && (
          <p>{isLoading ? 'Advancing to the next morning...' : ''}</p>
        )}

    
        <button className="continue-button" onClick={handleContinue} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Continue'}
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>

          {/* View PDF button */}
        <button
          className="dream-pdf-button"
          onClick={handlePDFClick}
          disabled={!randomDream.pdf}
        >
          View PDF of the primary source this is based on
        </button>
      </div>

      {/* PDF Popup */}
      {isPdfOpen && (
        <PDFPopup
          isOpen={isPdfOpen}
          onClose={() => setIsPdfOpen(false)}
          pdfPath={selectedPdfPath}
          citation={selectedCitation}
        />
      )}
    </div>
  );
};

export default Sleep;

