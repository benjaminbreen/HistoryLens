const EntityList = [
// Patients
{
   type: "patient",
    name: "Francisco Dias de Araujo",
    age: 35,
    gender: "Male",
    occupation: "Wealthy merchant",
    birthplace: "Puebla",
    currentResidence: "Mexico City, Calle de Plateros",
    casta: "Criollo",
    class: "Merchant class",
    symptoms: [
      { name: "Ardent fever", location: "head", quote: "My mind is troubled, señora. I fear I may have been cursed." },
      { name: "Burning tenesmus", location: "abdomen", quote: "A fiery pain seizes my belly. It is as if a serpent coils within, gnawing at my entrails day and night." },
      { name: "Severe abdominal pain", location: "abdomen", quote: "Food is one of the great joys of my life, but now it is a source only of misery." },
      { name: "Pain in both legs", location: "legs", quote: "My legs are tormenting me with pains." }
    ],
    diagnosis: "Syphilis",
    contemporaryTheory: "Malignant fever caused by the French Pox",
    socialContext: "Significant disruption to his business affairs",
    urgency: "Medium",
    image: "franciscodiasdearaujo",
    caption: "Francisco Dias de Araujo, merchant",
    description: "Francisco Dias de Araujo, a major merchant of textiles, looks wealthy and proud but his words tell another story.",
    astrologicalSign: "Aries",
    secret: "Francisco fears that he contracted syphilis from a brothel and is terrified of the social and economic repercussions if it becomes known.",
    imgdescription: "A highly detailed pixel art portrait of Francisco Dias de Araujo, a 45-year-old textile merchant from Mexico City in 1680. He is a criollo man of medium build, with sallow skin, dark circles under his eyes, and a gaunt face showing signs of stress and illness. Francisco is dressed in a fine black doublet with silver buttons, a white linen shirt with a ruff collar, and black breeches. He is a proud and wealthy man."
  },
  {
    type: "patient",
    name: "Fray Esteban",
    age: 50,
    gender: "Male",
    occupation: "Dominican friar",
    birthplace: "Dublin, Ireland",
    currentResidence: "Mexico City",
    casta: "European immigrant",
    class: "Clergy",
    symptoms: [
      { name: "Excessive bleeding", location: "chest", quote: "The blood flows too freely, a crimson river unending, as though my very life is draining away, madre de Dios!" },
      { name: "Extreme weakness", location: "whole body", quote: "I am but a shadow of my former self, my limbs like lead, my spirit weary." },
      { name: "Paleness", location: "head", quote: "They say my face is as pale as a ghost, drained of all color, as though the blood has fled from my veins." },
      { name: "Swelling throughout the body", location: "legs", quote: "My hands and feet swell like bloated corpses, a sign, perhaps, that the humors within me are in great disarray." }
    ],
    diagnosis: "Anemia",
    contemporaryTheory: "Excessive heat and thinness of blood causing continuous flux, leading to weakness of the sanguifying faculty and accumulation of serous humors",
    socialContext: "His illness has prevented him from performing his religious duties, causing concern in the Dominican community",
    urgency: "Medium",
    image: "frayesteban",
    caption: "Fray Esteban, a Dominican friar",
    description: "Fray Esteban, a devoted Dominican friar, suffers from a debilitating condition that has left him pale and weak, struggling to fulfill his duties.",
    astrologicalSign: "Sagittarius",
    secret: "Fray Esteban is convinced that he has been cursed or possessed after a heated dispute with a local curandera, and he seeks Maria's help in secret to avoid scandal.",
    imgdescription: "A highly detailed pixel art portrait of Fray Esteban, a 50-year-old Dominican friar in Mexico City, 1680. He is a pale, gaunt man of Irish descent, with sunken eyes and a long face showing signs of exhaustion and anemia. Fray Esteban wears the traditional white tunic and black cloak of his order, his thinning gray hair visible in a tonsure. Around his neck hangs a simple wooden cross."
  },
  {
    type: "patient",
    name: "Isabel de la Cruz",
    age: 28,
    gender: "Female",
    occupation: "Wife of a stonemason",
    birthplace: "Mexico City",
    currentResidence: "Mexico City, Templo Mayor area",
    casta: "Mestiza",
    class: "Lower middle class",
    symptoms: [
      { name: "Severe migraines", location: "head", quote: "The pain is so severe I cannot bear to open my eyes." },
      { name: "Blurred vision", location: "eyes", quote: "My sight betrays me, blurring as if a mist has descended over my eyes." },
      { name: "Nausea", location: "abdomen", quote: "My stomach churns with a terrible sickness." },
      { name: "Sensitivity to light and sound", location: "head", quote: "The light is blinding, the slightest sound a thunderclap." }
    ],
    diagnosis: "Migraine headaches",
    contemporaryTheory: "Excess of black bile affecting the brain and nervous system, exacerbated by exposure to strong odors and loud noises",
    socialContext: "Her condition has caused strain in her household, as she is often unable to perform her domestic duties",
    urgency: "Medium",
    image: "isabeldelacruz",
    caption: "Isabel de la Cruz, a young woman",
    description: "Isabel de la Cruz, a young wife, is plagued by severe migraines that leave her debilitated, struggling to maintain her household.",
    astrologicalSign: "Taurus",
    secret: "Isabel's husband is becoming increasingly frustrated with her inability to manage the household, leading her to seek remedies in desperation, fearing she may be cast out.",
    imgdescription: "A highly detailed pixel art portrait of Isabel de la Cruz, a 28-year-old mestiza woman in Mexico City, 1680. Isabel has a warm olive complexion, dark hair in a simple braid, and dark eyes that are squinting against the light, reflecting her sensitivity to brightness. She wears a modest blue huipil with white embroidery around the neck and a dark blue skirt. The background suggests the dim interior of her humble home, with a stone hearth visible. Her expression is pained and exhausted, her hand pressed to her forehead to signify the intense headache that plagues her."
  },
  {
    type: "patient",
    name: "Don Alejandro Cortez",
    age: 70,
    gender: "Male",
    occupation: "Retired judge",
    birthplace: "Madrid, Spain",
    currentResidence: "Mexico City, Plaza Mayor area",
    casta: "Peninsular",
    class: "Upper class",
    symptoms: [
      { name: "Severe gout attacks in the feet and hands", location: "extremities", quote: "The pain in my feet and hands is unbearable, as if fiery needles were piercing my flesh." },
      { name: "Swelling and redness", location: "extremities", quote: "My joints are swollen, red, and throbbing. Oh, God protect me." },
      { name: "Difficulty walking", location: "legs", quote: "Each step is agony, my legs failing me as though they were bound in chains." },
      { name: "Chronic pain", location: "whole body", quote: "Please... please help make it stop." }
    ],
    diagnosis: "Gout",
    contemporaryTheory: "Excess of uric acid (referred to as a cold, wet humor) in the blood, causing the formation of painful crystals in the joints",
    socialContext: "His gout has rendered him immobile, affecting his ability to engage in social and religious activities, leading to a decline in his social standing",
    urgency: "Medium",
    image: "donalejandrocortez",
    caption: "Don Alejandro Cortez, retired judge",
    description: "Don Alejandro Cortez, once a respected judge, is now confined to his home, his body racked by the painful affliction of gout.",
    astrologicalSign: "Virgo",
    secret: "Don Alejandro seeks out Maria instead of a licensed physician because he cannot afford to be seen as weak or dependent on charity in his social circles.",
    imgdescription: "A highly detailed pixel art portrait of Don Alejandro Cortez, a 70-year-old retired judge of Peninsular origin living in Mexico City in 1680. He is a distinguished-looking man with white hair, a neatly trimmed beard, and a lined face reflecting his age and the pain of his gout. Don Alejandro is dressed in a fine black doublet with gold embroidery, a white linen shirt with a ruff collar, and black breeches.  His expression is a mix of pain, frustration, and weariness."
  },
  {
    type: "patient",
    name: "Ana María de Soto",
    age: 22,
    gender: "Female",
    occupation: "Weaver",
    birthplace: "Oaxaca",
    currentResidence: "Mexico City, La Merced",
    casta: "Mestiza",
    class: "Lower class",
    symptoms: [
      { name: "Severe cough", location: "chest", quote: "The cough tears at my chest, each breath a struggle as if the very air itself refuses to enter my lungs." },
      { name: "Blood-streaked sputum", location: "chest", quote: "I cough up blood, dark and thick, a sign, perhaps, that my body is rotting from within." },
      { name: "Night sweats", location: "whole body", quote: "The nights are the worst, drenched in sweat as if a feverish fire consumes me from the inside." },
      { name: "Weight loss", location: "whole body", quote: "My friends tell me that I am wasting away." }
    ],
    diagnosis: "Tuberculosis (referred to as consumption)",
    contemporaryTheory: "Imbalance of humors in the lungs, possibly aggravated by poor diet",
    socialContext: "Her illness has caused fear among her coworkers, leading to social isolation and financial hardship due to her inability to work",
    urgency: "Medium",
    image: "anamariadesoto",
    caption: "Ana María de Soto, a young weaver",
    description: "Ana María de Soto, weakened by tuberculosis, struggles to breathe and finds herself increasingly isolated and fearful of her future.",
    astrologicalSign: "Pisces",
    secret: "Ana María fears that her illness is a punishment for a past sin, and she is desperate for a cure that will not draw attention to her plight.",
    imgdescription: "A highly detailed pixel art portrait of Ana María de Soto, a 22-year-old mestiza weaver in Mexico City, 1680. She is a thin, frail-looking young woman with dark hair, sunken cheeks, and tired brown eyes that reflect the toll of her tuberculosis. Ana María wears a simple white blouse and a faded red skirt, with a blue rebozo shawl draped over her shoulders."
  },
  {
    type: "patient",
    name: "Carlos Enriquez",
    age: 50,
    gender: "Male",
    occupation: "Attorney",
    birthplace: "Seville, Spain",
    currentResidence: "Mexico City, near the Royal Palace",
    casta: "Peninsular",
    class: "Upper middle class",
    symptoms: [
      { name: "Shortness of breath", location: "chest", quote: "My breath comes in short gasps, as if a great weight presses upon my chest, suffocating me." },
      { name: "Chest pain", location: "chest", quote: "A sharp pain stabs at my chest, worse with each breath, as though my very heart is being squeezed." },
      { name: "Fatigue", location: "whole body", quote: "I am constantly weary, my strength drained, unable to muster the energy to perform even the simplest tasks." },
      { name: "Edema in the legs", location: "legs", quote: "My legs swell, heavy and cumbersome, as though the blood refuses to circulate properly." }
    ],
    diagnosis: "Congestive heart failure",
    contemporaryTheory: "Weakness of the heart muscle due to imbalanced humors, leading to accumulation of fluids in the lungs and extremities",
    socialContext: "His declining health has caused concern among his clients and colleagues, affecting his legal practice and social standing",
    urgency: "Medium",
    image: "carlosenriquez",
    caption: "Carlos Enriquez, a wealthy attorney",
    description: "Carlos Enriquez, once a prominent lawyer, now struggles with a racing heartbeat and melancholy, his strength fading as the days go by.",
    astrologicalSign: "Cancer",
    secret: "Carlos Enriquez is deeply ashamed of his condition, which he fears may be linked to syphilis contracted in his youth. He is seeking Maria's help to avoid disgrace.",
    imgdescription: "A highly detailed pixel art portrait of Carlos Enriquez, a 50-year-old Peninsular attorney in Mexico City, 1680. He is a once-robust man now showing signs of declining health, with black hair, a pallid complexion, and dark circles under his eyes. Carlos is dressed in a rich black doublet with silver buttons, a white linen shirt with a lace collar, and black breeches. He leans on a polished wooden cane."
  },
  {
    type: "patient",
    name: "Rosa Maria Perez",
    age: 30,
    gender: "Female",
    occupation: "Housewife",
    birthplace: "Mexico City",
    currentResidence: "Mexico City, Barrio de Tepito",
    casta: "Criolla",
    class: "Lower middle class",
    symptoms: [
      { name: "Chronic headaches", location: "head", quote: "The pounding in my head is relentless..." },
      { name: "Dizziness", location: "head", quote: "I feel as though I am spinning, the world tilting and swaying. It does not feel well." },
      { name: "Fatigue", location: "whole body", quote: "I am so tired, María, so tired... my soul is drained." },
      { name: "Irritability", location: "head", quote: "I snap at everyone, even the children." }
    ],
    diagnosis: "Depression and anxiety",
    contemporaryTheory: "Rosa appears to be suffering from the effects of a *hechizo* (a curse or malign spell) or perhaps even demonic possession.",
    socialContext: "Her condition has made it difficult for her to care for her children and manage household duties, causing strain on her family",
    urgency: "Medium",
    image: "rosamariaperez",
    caption: "Rosa Maria Perez, wife and mother",
    description: "Rosa Maria Perez struggles with melancholia, leaving her drained of energy and struggling to keep up with her daily tasks. Once a loyal church-goer, she has lately struggled with her faith.",
    astrologicalSign: "Aries",
    secret: "Rosa Maria secretly believes she may be possessed by a demon, a fear she has not dared to confess even to her confessor.",
    imgdescription: "A highly detailed pixel art portrait of Rosa Maria Perez, a 30-year-old criolla housewife in Mexico City, 1680. She is a tired-looking woman with dark hair in a loose bun, dark circles under her eyes, and a slight frown that reflects her struggle with depression and anxiety. Rosa Maria wears a simple brown dress with a white apron, and a small silver cross around her neck. She is seated at a wooden table in her home, with a basket of mending beside her, but her hands are idle and her gaze is distant. The background shows the rustic interior of her house, with a small altar visible in the corner. Her expression is a mix of weariness, sadness, and a hint of fear as she secretly grapples with the thought that she may be possessed."
  },
  {
    type: "patient",
    name: "Diego Perez",
    age: 26,
    gender: "Male",
    occupation: "Carpenter",
    birthplace: "Tlaxcala",
    currentResidence: "Mexico City, Barrio de la Santísima",
    casta: "Indigenous",
    class: "Working class",
    symptoms: [
      { name: "Persistent cough", location: "chest", quote: "This cough, it will not leave me." },
      { name: "Shortness of breath", location: "chest", quote: "Even when I do not cough, my chest feels tight, making it hard to draw in air." },
      { name: "Chest pain when breathing deeply", location: "chest", quote: "Every deep breath is like a knife cutting through my chest." },
      { name: "Mild fever", location: "whole body", quote: "A fever burns within me, not high, but enough to sap my strength, leaving me weak and sweating." }
    ],
    diagnosis: "Pleurisy",
    contemporaryTheory: "An imbalance of cold and dry humors affecting the lungs, likely caused by exposure to damp environments and physical strain",
    socialContext: "Diego, a young carpenter, has been struggling to complete his work due to his condition, which could cause him to lose valuable contracts.",
    urgency: "High",
    image: "diegoperez",
    caption: "Diego Perez, a young carpenter",
    description: "Diego Perez, known for his craftsmanship and dedication, now finds himself battling a painful illness that threatens to take away his livelihood.",
    astrologicalSign: "Aries",
    secret: "Diego has been working extra hours to pay off a debt incurred by his father, but his illness has made it nearly impossible to keep up, and he fears his family’s future is in jeopardy.",
    imgdescription: "A highly detailed pixel art portrait of Diego Perez, a 26-year-old indigenous carpenter in Mexico City, 1680. He is a lean, muscular man with bronze skin, short black hair, and dark eyes that reflect both his physical pain and his worry about his livelihood. Diego wears a simple white cotton shirt, brown breeches, and a leather apron that signifies his trade."
},

{
  type: "patient",
  name: "Francisco Hernandez",
  age: 48,
  gender: "Male",
  occupation: "Merchant",
  birthplace: "Seville, Spain",
  currentResidence: "Mexico City, near Plaza Mayor",
  casta: "Peninsular",
  class: "Upper middle class",
  symptoms: [
    { name: "Mild fever", location: "whole body", quote: "I feel as though a slow fire burns within me." },
    { name: "Persistent cough", location: "chest", quote: "This cough lingers interminably, always there but never getting worse." },
    { name: "Fatigue", location: "whole body", quote: "My strength fades with each passing day, though I do nothing to tire myself." }
  ],
  diagnosis: "Feigned illness",
  contemporaryTheory: "Minor imbalance of the humors, perhaps a lingering flux caused by overindulgence in rich foods",
  socialContext: "Francisco is pretending to be ill to test Maria's willingness to prescribe without a physician's authority.",
  urgency: "Medium",
  image: "franciscohernandez",
  caption: "Francisco Hernandez, merchant",
  description: "Francisco Hernandez is a well-dressed merchant who seems too healthy for the symptoms he describes. His manner is calm, but his eyes dart around the room, betraying a deeper intention.",
  astrologicalSign: "Libra",
  secret: "Francisco Hernandez is actually Licenciado Francisco Ramirez, a guild lawyer investigating Maria's practice. He fakes an illness to trap her into prescribing without proper authority."
},



  // Places
  {
    type: "place",
    name: "Outside Maria's Shop (Day)",
    image: "outsideday",
    caption: "Outside Maria's shop during the day.",
    description: "The streets outside Maria's shop are bustling with activity. It's hot and humid today, and the sun beats down on the crowded thoroughfare.",
    imgdescription: "A highly detailed pixel art scene depicting the bustling street outside Maria's apothecary shop in Mexico City, 1680, during the day. The cobblestone street is lined with two- and three-story stone buildings with red tile roofs, wooden balconies, and colorful awnings. Vendors with carts sell fruits, vegetables, and handmade goods. A mix of people in period-appropriate clothing, from well-dressed Spaniards to humble indigenous laborers, walk by or stand in small groups conversing."
  },
  {
    type: "place",
    name: "Outside Maria's Shop (Night)",
    image: "outsidenight",
    caption: "Outside Maria's shop during the evening.",
    description: "The streets outside Maria's shop have quieted down as night falls. The air is cooler, and the sounds of distant revelry mix with the rustling of leaves.",
    imgdescription: "A highly detailed pixel art scene depicting the street outside Maria's apothecary shop in Mexico City, 1680, at night. The cobblestone street is dimly lit by the warm glow of oil lamps hanging from the buildings and the occasional torch carried by a passerby. The two- and three-story stone buildings with red tile roofs and wooden balconies cast long shadows in the flickering light. A few figures in cloaks hurry along the street, while the distant sounds of music and laughter suggest revelry elsewhere in the city. In the foreground, Maria's shop is closed for the night, the wooden sign with the mortar and pestle barely visible in the darkness. The sky is a deep, dark blue with a few twinkling stars visible above the rooftops."
  },
  {
    type: "place",
    name: "Generic Home",
    image: "generichome",
    caption: "Inside a home in Mexico City.",
    description: "The home is modest and simple, with a small altar in the corner and a few chairs around a wooden table. The scent of burning incense fills the air."
  },
  {
    type: "place",
    name: "market",
    image: "market",
    caption: "The bustling market in Mexico City.",
    description: "Vendors call out to passersby, offering a variety of goods from spices to fresh produce. The market is a vibrant and chaotic place, full of life."
  },
  {
    type: "place",
    name: "Shop Interior (Night)",
    image: "shopnight",
    caption: "Inside Maria's shop at night.",
    description: "Maria's shop is dimly lit by a few candles, casting long shadows across the shelves filled with herbs, tinctures, and other remedies. The air is heavy with the scent of dried plants."
  },
  {
    type: "place",
    name: "Countryside",
    image: "country",
    caption: "The open countryside near Mexico City.",
    description: "Rolling fields and distant mountains stretch out as far as the eye can see. The air is fresh and the landscape is dotted with small farms and wildflowers."
  },
  

  // Quest NPCs
{
  type: "questnpc",
  name: "Antonius Philalethes",
  age: 60,
  birthplace: "Athens, Greece",
  currentResidence: "Mexico City",
  casta: "Peninsular",
  class: "Upper class",
  occupation: "Alchemist",
  image: "antonius.jpg",
  caption: "Antonius Philalethes, Castilian Alchemist",
  description: "Antonius Philalethes is a young alchemist, expelled from Spain by the Inquisition for sorcery (*hechiceria*). Now residing in Mexico City, he seeks to continue his esoteric experiments, including the calcination of the powerful substance mumia, which he believes holds the key to eternal life. His arrival has stirred both interest and suspicion among the local populace.",
  astrologicalSign: "Scorpio",
  secret: "Antonius Philalethes is secretly working to create the Philosopher's Stone using various forbidden substances. He is willing to pay handsomely for help, but his involvement with dangerous alchemy could bring unwanted attention from the authorities. He had a child in Greece out of wedlock, who he abandoned, prompting his flight to Spain.",
  questTrigger: "afterFirstPrescribe", // Triggered the turn after the first #prescribe command is used
  questDetails: {
    unlocks: "Sublimation mixing method",
    stages: 3,
    reward: "knowledge_of_sublimation"
  }
},
{
  type: "questnpc",
  name: "Don Ignacio de Mendoza",
  age: 64,
  birthplace: "Madrid, Spain",
  currentResidence: "Mexico City",
  casta: "Peninsular",
  class: "Clergy",
  occupation: "High Inquisitor",
  image: "don_ignacio_mendoza.jpg",
  caption: "Don Ignacio de Mendoza, High Inquisitor",
  description: "Don Ignacio de Mendoza is the formidable High Inquisitor of New Spain. His stern demeanor and piercing gaze can make even the bravest tremble. Despite his authority, he is plagued by a shameful illness that could ruin his reputation if discovered. Desperate for a cure, he seeks Maria's discretion, but the risks involved in treating him are high.",
  astrologicalSign: "Capricorn",
  secret: "Don Ignacio has contracted syphilis, a condition he must keep hidden at all costs. He is willing to use any means necessary to secure a cure, including silencing those who know.",
  questTrigger: "turn20", // Triggered automatically on turn 20
  questDetails: {
    successOutcome: "Poison him and survive",
    failureOutcome: "Fail to poison him, game over",
    stages: 3
  }
},
{
  type: "questnpc",
  name: "Tlacaelel",
  age: 38,
  birthplace: "Texcoco",
  currentResidence: "Mexico City",
  casta: "Indigenous",
  class: "Lower middle class",
  occupation: "Nahuatl Scribe and Herbalist",
  image: "tlacaelel",
  caption: "Tlacaelel, Nahuatl Codex Bearer",
  description: "Tlacaelel is a Nahuatl scribe and herbalist who carries an ancient codex filled with knowledge of medicinal herbs. The codex, passed down through generations, contains images of plants that were once used for healing. Tlacaelel seeks Maria's help in deciphering the codex to preserve this knowledge, which he fears could be lost.",
  astrologicalSign: "Aquarius",
  secret: "The codex contains secret knowledge of powerful herbs that can cure or kill. Tlacaelel is torn between preserving his people's traditions and the potential exploitation of this knowledge by outsiders.",
  questTrigger: "afterMarketVisit", // Triggered after entering the 'market' or 'marketplace' location
  questDetails: {
    reward: "New inventory item",
    stages: 3,
    reward: "aztec_remedy"
  }
},
{
  type: "questnpc",
  name: "Alonso García",
  age: 35,
  birthplace: "Mexico City",
  currentResidence: "Mexico City",
  casta: "Mestizo",
  class: "Middle class",
  occupation: "Sign Maker",
  image: "alonso_garcia.jpg",
  caption: "Alonso García, a skilled Sign Maker",
  description: "Alonso García is a talented artisan known for his beautiful and intricate signs. He offers to create a new sign for Maria's apothecary, but his true motives are questionable. Alonso is secretly working for Maria's rival, Juan Braga, gathering information to undermine her business.",
  astrologicalSign: "Leo",
  secret: "Alonso is actually a spy for Juan Braga, Maria's rival. He hopes to gather intelligence that will give Braga an advantage in their ongoing competition.",
  questTrigger: "afterJuanBragaVisit", // Triggered after Juan Braga visits, on turn 8 or 15
  questDetails: {
    stages: 3
  }
},
{
  type: "questnpc",
  name: "Licenciado Francisco Ramírez",
  age: 48,
  birthplace: "Seville, Spain",
  currentResidence: "Mexico City",
  casta: "Peninsular",
  class: "Upper middle class",
  occupation: "Guild Lawyer",
  image: "francisco_ramirez.jpg",
  caption: "Licenciado Francisco Ramírez, Guild Lawyer",
  description: "Licenciado Francisco Ramírez is a cunning and ruthless lawyer representing the Physicians' Guild in their lawsuit against Maria for practicing medicine without a license. He harbors a personal grudge against unlicensed healers, driven by the death of his brother at the hands of one. He is determined to see Maria punished, no matter the cost.",
  astrologicalSign: "Libra",
  secret: "Licenciado Ramírez's vendetta against unlicensed healers stems from a deep personal loss. He will stop at nothing to see Maria brought to justice.",
  questTrigger: "turn20", // Automatically triggered on turn 20
  questDetails: {
    failureOutcome: "Game over due to arrest",
    stages: 4
  }
},


  // Non-patient, non-quest NPCs

  {
    type: "npc",
    name: "Assistant Inquisitor Fernando de Toledo",
    age: 55,
    birthplace: "Toledo, Spain",
    currentResidence: "Mexico City",
    casta: "Peninsular",
    class: "Clergy",
    occupation: "Inquisitor",
    image: "inquisitorfernando",
    caption: "Inquisitor Fernando de Toledo",
    description: "Inquisitor Fernando, a man of few words and fierce conviction, has a reputation for his unyielding pursuit of heretics. His presence is enough to strike fear into the hearts of many. Fernando is secretly investigating Maria's reasons for fleeing Portugal and Brazil. He is suspicious and relentless in his questioning, trying to uncover any heretical beliefs or practices. He will attempt to arrest Maria every time he appears, forcing her to flee or concede",
    secret: "add here TK"
  },

  {
    type: "npc",
    name: "Juan Braga (rival apothecary)",
    age: 40,
    birthplace: "Mexico City",
    currentResidence: "Mexico City",
    casta: "Mestizo",
    class: "Middle class",
    occupation: "Apothecary",
    image: "juan",
    caption: "Juan Braga, a rival apothecary",
    description: "Juan, Maria's closest competitor in the apothecary trade, is known for his expertise in medicinal plants from the Indies and his willingness to undercut Maria's prices. Their rivalry is well-known throughout the city.",
    secret: "add here TK"
  },
  {
    type: "npc",
    name: "João",
    age: 1,
    birthplace: "Mexico City",
    currentResidence: "Maria's shop",
    casta: "Animal",
    class: "N/A",
    occupation: "Kitten",
    image: "joao",
    caption: "João, the orange kitten",
    description: "João is a small, orange fluff ball who spends most of his time napping in the sun or playing with scraps of paper. His presence is a small comfort to Maria amid her daily struggles.",
    secret: "add here TK"
  },
  {
    type: "npc",
    name: "Marta (Herb woman)",
    age: 65,
    birthplace: "Tlaxcala",
    currentResidence: "Mexico City",
    casta: "Indigenous",
    class: "Lower class",
    occupation: "Traveling herb seller",
    image: "marta",
    caption: "Marta, a traveling herb woman",
    description: "Marta, an elderly woman with deep knowledge of the local flora, travels from town to town selling herbs and sharing remedies. Her age has not slowed her down, and she is respected by many for her wisdom.",
    secret: "add here TK"
  },
  {
    type: "npc",
    name: "Don Luis (Moneylender)",
    age: 60,
    birthplace: "Mexico City",
    currentResidence: "Mexico City, Plaza Mayor area",
    casta: "Criollo",
    class: "Upper middle class",
    occupation: "Moneylender",
    image: "donluis",
    caption: "Don Luis, a moneylender",
    description: "Don Luis, a shrewd and calculating moneylender, is known throughout the city for his ability to extract payment from even the most reluctant debtors. His visits are never a good sign.",
    secret: "add here TK"
  }
];


export default EntityList;
