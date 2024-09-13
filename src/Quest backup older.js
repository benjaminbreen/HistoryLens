import React, { useState, useCallback, useEffect } from 'react';
import './Quest.css'; // Ensure you have Quest.css to style the quest popups
import { useGameState } from './gameState';
import imageMap from './imageMap';

const quests = [
  {
    id: 1,
    name: 'The Castilian Alchemist',
    npc: 'Antonius Lysandros',  // New Greek name
    classification: 'Helper',
    trigger: (turnNumber, actions) => actions.includes('#startQuest1') || actions.includes('#prescribe'),
    stages: [
      {
        type: 'banner',
        image: imageMap.quest1a,
        text: 'At dusk, after the shop has closed to patients, an unfamiliar man stands in the doorway. He is wearing the wide-brimmed black hat of a traveler, and the pouches strapped to his belt at first make you think he must be a peddler of some kind. He pauses at the threshold, taking in the smells of herbs and the quiet bustle of the street behind him. Then he speaks. "ood day, señora. I hope I am not interrupting. I am Antonius Lysandros, formerly of Valencia, though my origins are Greek. By fortune and folly, I find myself in your city. You see, I am not unfamiliar with the arts you practice here. I was told that you are a skilled apothecary. And that, like me, you are not from this land. Could we speak for a few moments?"',
        buttons: ['Yes. What are you inquiring about?', 'No, the shop is closed', 'Who told you about me?'],
      },
      {
        type: 'dialogue',
        image: imageMap.quest1b,
        text: `
          Antonius Lysandros: "G
          <br /> 
         "I spent some years in study at the University of Valencia. I had the good fortune of winning the patronage of a nobleman there, but the winds of change blow in strange directions. Now, here I stand, wishing to see how the practice of the chymical arts has taken shape in these distant parts."

          Antonius pauses for a moment, his tone measured. "In truth, I have a deep interest in natural philosophy—Descartes, you may know of him? And I have had the honor of corresponding with a few gentlemen of the Royal Society. The world is changing, señora, and new ideas are stirring. I wonder if you share my curiosity." He smiles faintly, waiting for your response. "Ah, but I should not keep you too long. Perhaps another time, we might exchange ideas in greater depth."

          He pauses, almost as if considering whether to say more. "There is one matter I wished to mention before I depart... I have in my possession a substance—*mumia*—of great interest. I would be grateful if you might permit me to use some of your tools to conduct a small experiment with it. But only if you think it prudent."
        `,
        npcResponses: [
          'Descartes has introduced a way of thinking that seeks to measure and understand the world through reason, rather than the old doctrines. It is not without controversy, I assure you.',
          'I have found the Royal Society a curious collection of men—keen to see the world through their lenses, yet bound by their old institutions. The tension is palpable, but fascinating.',
          'Mumia is said to contain within it a balsam that can aid in the restoration of the body’s own natural faculties, as Paracelsus once noted. A delicate matter, indeed.',
        ],
        playerChoices: [
          'Express interest in the new ideas and inquire further about natural philosophy.',
          'Ask more about his correspondence with the Royal Society.',
          'Inquire cautiously about mumia and its properties.',
        ],
        decisionPoint: true,
        inputType: 'text',
        maxExchanges: 4,
      },
      {
        type: 'dialogue',
        image: imageMap.quest1c,
        text: `
          Antonius Lysandros: "You have a keen mind, señora. Mumia, as I mentioned, is a substance of peculiar nature. Paracelsus once wrote that 'our own nature is a physician to itself, which is to say, it has within itself that of which it is in need.' This mumia, according to his teachings, can help unlock that vital principle within the body—what he called the inborn balsam."

          Antonius's gaze sharpens slightly, as though assessing whether you are open to these ideas. "I do not profess to be a charlatan or a miracle worker. I leave such claims to those who peddle snake oils in the markets. My interest is in understanding—truly understanding—the hidden workings of nature. And that is why I am here. I ask for your assistance, not your submission. You have your own knowledge, your own expertise, which I deeply respect."

          He nods thoughtfully. "But I should not impose on your hospitality. If you would allow it, I would like to show you this mumia and attempt a simple calcination. The results may surprise us both."
        `,
        npcResponses: [
          'Paracelsus believed that healing comes not from external force, but from fostering the body’s own vital essence. A notion that, to some, may seem radical.',
          'I am not here to boast of wonders. Rather, I seek to explore—carefully, mind you—the potential of this substance.',
          'Calcination is but one of many steps in the alchemical process. It is as much a matter of observation as it is of transformation.',
        ],
        playerChoices: [
          'Agree to help him with the experiment, trusting in his knowledge.',
          'Express skepticism, voicing concerns about the safety of his methods.',
          'Ask to see the mumia first, before agreeing to anything.',
        ],
        decisionPoint: true,
        inputType: 'text',
        maxExchanges: 4,
      },
      {
        type: 'decision',
        image: imageMap.quest1d,
        text: 'Do you allow Antonius to use your tools to calcinate the mumia?',
        options: ['Yes', 'No'],
        inputType: 'buttons',
      },
      {
        type: 'outcome',
        image: imageMap.quest1d,
        text: `
          The calcination is conducted with precision. Antonius works quietly, methodically, as if performing a well-practiced ritual. The air fills with a faint, acrid scent as the mumia is reduced to a fine, dark ash.

          "There it is," Antonius says softly, peering into the vessel. "A simple process, and yet... profound in its implications. I thank you for your trust. You have my word that this knowledge of sublimation—this method of refining substances—will serve you well."

          He carefully gathers his things, offering you a polite bow before departing. "Until next we meet, señora. I am certain our paths will cross again, should the winds of fate allow."
        `,
        outcome: 'success',
        reward: 'unlocks_sublimation',
      },
    ],
  },
  {
    id: 2,
    name: 'The Inquisitor with Syphilis',
    npc: 'High Inquisitor Santiago Valdez',
    classification: 'Antagonist',
    trigger: (turnNumber, actions) => actions.includes('#startQuest2') || turnNumber === 20,
    stages: [
      {
        type: 'banner',
        image: imageMap.quest2a,
        text: 'A nervous-looking messenger delivers a sealed letter from the Inquisition.',
        buttons: ['Yes, I\'ll go', 'No, I\'m not interested', 'Tell me more'],
      },
      {
        type: 'dialogue',
        image: imageMap.quest2b,
        text: `
          High Inquisitor Santiago Valdez: "I require your utmost discretion, señora. A grievous matter has befallen me. I fear I have contracted a venereal disease. You understand the delicacy of my position—should this become public knowledge, it would ruin me, and by extension, you would not be spared from scrutiny."

          Valdez is a man of imposing stature, yet there is a noticeable tremor in his voice, betraying the fear beneath his stern exterior. "I have heard of your skills, and I am willing to offer a handsome reward for your silence and your service. The Church must not find out."

          His eyes narrow as he continues, "There are many in the Inquisition who would delight in my downfall. We live in precarious times, señora, where a single rumor can lead to one’s undoing. Will you aid me in my hour of need, or must I seek other, less reputable means?"
        `,
        npcResponses: [
          'The Church has no mercy for those who fall from grace. We must act swiftly and silently.',
          'This illness is not just a physical ailment; it is a scourge upon my very soul. Perhaps it is a punishment, but I cannot afford to be seen in this weakened state.',
          'Your discretion is as valuable as your medicine, señora. Betrayal would be unforgivable.',
        ],
        playerChoices: [
          'Agree to treat the Inquisitor discreetly.',
          'Refuse and suggest he sees a licensed physician.',
          'Hint at a more sinister solution, such as poison.',
        ],
        decisionPoint: true,
        inputType: 'text',
        maxExchanges: 3,
      },
      {
        type: 'decision',
        image: imageMap.quest2c,
        text: 'Do you agree to treat him, and possibly poison him?',
        options: ['Yes', 'No'],
        inputType: 'buttons',
      },
      {
        type: 'outcome',
        image: imageMap.quest2d,
        text: `
          You mix a concoction that you assure him will bring relief, but in truth, it is laced with a deadly poison. Valdez drinks it without suspicion, his desperation blinding him to the bitter taste.

          As you watch him leave, a heavy feeling settles in your chest. You have just committed a grave act, one that will haunt you. The next morning, you hear whispers of his death. It won't be long before suspicions arise, and you know you must flee the city before the Inquisition turns its eyes on you.

          The choice you made has sealed your fate, and now, you must live with the consequences—or die trying to escape them.
        `,
        outcome: 'game_over',
      },
    ],
  },
  {
    id: 3,
    name: 'The Nahuatl Codex',
    npc: 'Tlacaelel',
    classification: 'Investigate',
    trigger: (turnNumber, actions, location) => actions.includes('#startQuest3') || location === 'market',
    stages: [
      {
        type: 'banner',
        image: imageMap.quest3a,
        text: 'A Nahuatl man approaches you with an ancient codex in hand, seeking your help to interpret its contents.',
        buttons: ['Yes, I\'ll help', 'No, I\'m not interested', 'Tell me more'],
      },
      {
        type: 'dialogue',
        images: [imageMap.quest3b1, imageMap.quest3b2, imageMap.quest3b3, imageMap.quest3b4, imageMap.quest3b5],
        text: `
          Tlacaelel: "This codex was passed down from my ancestors. It contains images of plants that were once used by our people for healing. The Spaniards, they have tried to erase our knowledge, but this book survived. If you can help me identify these plants, I will reward you with an herbal remedy known only to my people."

          Tlacaelel’s voice is steady, but you can sense the weight of his words. "These plants, they are more than just medicine. They are our history, our connection to the land that has been taken from us. Will you help me preserve this knowledge?"
        `,
        npcResponses: [
          'This codex is sacred. Its knowledge has been kept secret for centuries.',
          'The images are faded, but I believe they depict plants that grow in the mountains near Tenochtitlan.',
          'The Spaniards have tried to destroy our heritage, but this codex survived. Help me preserve what little remains.',
        ],
        playerChoices: [
          'Examine the first image carefully.',
          'Ask Tlacaelel about the origins of the codex.',
          'Attempt to identify the plants based on your knowledge.',
        ],
        decisionPoint: true,
        inputType: 'text',
        maxExchanges: 5,
        thumbnails: true,
      },
      {
        type: 'decision',
        image: imageMap.quest3c,
        text: 'Have you identified the plants correctly?',
        options: ['Yes', 'No'],
        inputType: 'buttons',
      },
      {
        type: 'outcome',
        image: imageMap.quest3d,
        text: `
          Your knowledge of herbal remedies impresses Tlacaelel. He smiles, a rare expression of relief crossing his features. "You have done well, señora. Our people’s knowledge will not be lost, not while there are those like you who are willing to help."

          Tlacaelel offers you a small vial of a powerful Aztec remedy. "This is our gift to you, a token of our gratitude. Use it wisely, for it is rare and potent."
        `,
        outcome: 'success',
        reward: 'aztec_remedy',
      },
    ],
  },
  {
    id: 4,
    name: 'The Guild Lawsuit',
    npc: 'Licenciado Francisco Ramírez',
    classification: 'Antagonist',
    trigger: (turnNumber, actions) => actions.includes('#startQuest4') || turnNumber === 20,
    stages: [
      {
        type: 'banner',
        image: imageMap.quest4a,
        text: 'A stern-looking lawyer arrives at your shop with a summons. The Physicians\' Guild is suing you for practicing medicine without a license.',
        buttons: ['Yes, I\'ll go', 'No, I\'m not interested', 'Tell me more'],
      },
      {
        type: 'dialogue',
        image: imageMap.quest4b,
        text: `
          Licenciado Francisco Ramírez: "You have been accused of practicing medicine unlawfully, señora. The Guild does not take kindly to those who infringe upon their domain. You will need to defend yourself in court."

          Ramírez is a man of precise words and a cold demeanor. "The evidence against you is strong, and the penalties severe. However, there may be a way to avoid the worst of it. The Guild is open to... negotiation, provided you are willing to cooperate."

          He pauses, letting the implications sink in. "It would be wise to settle this matter quickly, before it escalates further. The choice, of course, is yours."
        `,
        npcResponses: [
          'The evidence against you is overwhelming. You should consider settling before things get worse.',
          'The Guild has powerful allies. Fighting them could ruin you.',
          'However, if you have something to offer, perhaps we can reach an agreement.',
        ],
        playerChoices: [
          'Argue that you are providing a necessary service to the community.',
          'Attempt to negotiate a settlement.',
          'Refuse to negotiate and prepare for court.',
        ],
        decisionPoint: true,
        inputType: 'text',
        maxExchanges: 4,
      },
      {
        type: 'decision',
        image: imageMap.quest4c,
        text: 'Do you negotiate or prepare for court?',
        options: ['Negotiate', 'Prepare for court'],
        inputType: 'buttons',
      },
      {
        type: 'outcome',
        image: imageMap.quest4d,
        text: `
          After tense negotiations, you manage to reach a settlement. A fine is paid, and the charges are dropped, but the Guild has made it clear that you are being watched.

          You have avoided immediate danger, but the experience has left its mark. Your reputation may be tarnished, and the Guild will not forget this transgression easily. However, for now, you are free to continue your work.
        `,
        outcome: 'success',
        reward: 'avoid_arrest',
      },
    ],
  },
];

const questAgent = (quest, stage, userInput) => {
  if (stage.type === 'dialogue') {
    if (stage.npcResponses.length > 0) {
      return stage.npcResponses.shift(); 
    }
    if (stage.decisionPoint) {
      return 'What will you do next?';
    }
  }
  if (stage.type === 'decision') {
    if (userInput.toLowerCase() === 'yes') {
      return 'You decided to proceed with the plan.';
    } else if (userInput.toLowerCase() === 'no') {
      return 'You decided against it.';
    }
  }
  return 'The quest continues...';
};

export const Quest = ({ currentTurn, userActions, historyAgent, location, activeQuest, setActiveQuest }) => {
  const { gameState, startQuest, advanceQuestStage, completeQuest } = useGameState();
  const [currentStage, setCurrentStage] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showQuestPopup, setShowQuestPopup] = useState(false);

  const checkForQuestStart = useCallback(() => {
    const questToStart = quests.find(quest => quest.trigger(currentTurn, userActions, location));
    if (questToStart) {
      setActiveQuest(questToStart);
      setCurrentStage(0);
      setShowQuestPopup(true);
      startQuest(questToStart);
    }
  }, [currentTurn, userActions, location, startQuest]);

  const handleQuestInput = (input) => {
    const nextStageIndex = currentStage + 1;
    const questResponse = questAgent(activeQuest, activeQuest.stages[currentStage], input);

    setUserInput(input);

    if (nextStageIndex < activeQuest.stages.length) {
      setCurrentStage(nextStageIndex);
      advanceQuestStage(activeQuest.id);
    } else {
      completeQuest(activeQuest.id);
      setShowQuestPopup(false);
    }
  };

  useEffect(() => {
    checkForQuestStart();
  }, [checkForQuestStart]);

  return (
    showQuestPopup && (
      <div className="quest-popup">
        <div className="quest-header">
          <h2>{activeQuest.name}</h2>
          <img src={activeQuest.stages[currentStage].image} alt="Quest Stage" />
        </div>
        <div className="quest-content">
          <p>{activeQuest.stages[currentStage].text}</p>
          {activeQuest.stages[currentStage].thumbnails && (
            <div className="thumbnail-gallery">
              {activeQuest.stages[currentStage].images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  onClick={() => setCurrentStage(idx)}
                />
              ))}
            </div>
          )}
          <div className="quest-options">
            {activeQuest.stages[currentStage].buttons && (
              <div className="button-group">
                {activeQuest.stages[currentStage].buttons.map((btn, idx) => (
                  <button key={idx} onClick={() => handleQuestInput(btn)}>
                    {btn}
                  </button>
                ))}
              </div>
            )}
            {activeQuest.stages[currentStage].inputType === 'text' && (
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleQuestInput(userInput);
                }}
                placeholder="Type your response..."
              />
            )}
            {activeQuest.stages[currentStage].inputType === 'buttons' && (
              <div className="button-group">
                {activeQuest.stages[currentStage].options.map((option, idx) => (
                  <button key={idx} onClick={() => handleQuestInput(option)}>
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export { quests };
export default Quest;
