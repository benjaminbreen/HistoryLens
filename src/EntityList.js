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
    pdf: "araujo.pdf",
    citation: "Francisco de Araujo was a real person, his case documented in João Curvo Semedo, Observaçoens medicas doutrinaes de cem casos gravissimos, [Medical Observations of One Hundred Very Grave Cases] (Lisbon, 1707).",
    secret: "Francisco fears that he contracted syphilis from a brothel and is terrified of the social and economic repercussions if it becomes known.",
    imgdescription: "A highly detailed pixel art portrait of Francisco Dias de Araujo, a 45-year-old textile merchant from Mexico City in 1680. He is a criollo man of medium build, with sallow skin, dark circles under his eyes, and a gaunt face showing signs of stress and illness. Francisco is dressed in a fine black doublet with silver buttons, a white linen shirt with a ruff collar, and black breeches. He is a proud and wealthy man."
  },
  {
    type: "patient",
    name: "Fray Patricio",
    age: 50,
    gender: "Male",
    occupation: "Dominican friar",
    birthplace: "Dublin, Ireland",
    currentResidence: "Mexico City",
    casta: "European immigrant",
    class: "Clergy",
    symptoms: [
      { name: "Rectal bleeding", location: "abdomen", quote: "The blood from my bowels flows freely, a crimson river unending, as though my very life is draining away, madre de Dios!" },
      { name: "Extreme weakness", location: "whole body", quote: "I am a shadow of my former self, my limbs like lead, my spirit weary." },
      { name: "Paleness", location: "head", quote: "They say my face is as pale as a ghost, drained of all color. I feel most unwell, Maria." },
      { name: "Swelling throughout the body", location: "legs", quote: "My hands and feet swell unendingly... a sign, perhaps, that the humors within me are in great disarray." }
    ],
    diagnosis: "Cirrhosis of the liver",
    contemporaryTheory: "Excessive heat and thinness of blood causing continuous flux, leading to weakness of the sanguifying faculty and accumulation of serous humors",
    socialContext: "His illness has prevented him from performing his religious duties, causing concern in the Dominican community",
    urgency: "Medium",
    image: "fraypatricio",
    caption: "Fray Patricio, a Dominican friar",
    description: "Fray Patricio, a devoted Dominican friar of Irish origin, suffers from a debilitating condition that has left him pale and weak, struggling to fulfill his duties. Fray Patricio is convinced that he has been cursed or possessed after a heated dispute with a local curandera, and he seeks Maria's help in secret to avoid scandal.",
    astrologicalSign: "Sagittarius",
    pdf: "fraypatricio.pdf",
    citation: "João Curvo Semedo, Observaçoens medicas doutrinaes de cem casos gravissimos, [Medical Observations of One Hundred Very Grave Cases] (Lisbon, 1707), pgs. 70-73",
    secret: "Fray Patricio is a severe alcoholic and is dying of liver damage caused by heavy drinking. He thinks this secret is better kept than it is.",
    imgdescription: "A highly detailed pixel art portrait of Fray Patricio, a 50-year-old Irish-born Dominican friar in Mexico City, 1680. He is a pale, gaunt man known for his unrelenting work ethic, with sunken eyes and a long face showing signs of exhaustion and anemia. Fray Patricio wears the traditional white tunic and black cloak of his order, his thinning gray hair visible in a tonsure. Around his neck hangs a simple wooden cross."
  },
  {
    type: "patient",
    name: "Sebastián Athayde",
    age: 12,
    gender: "Male",
    occupation: "Apprentice candle maker",
    birthplace: "Mexico City",
    currentResidence: "Mexico City, La Merced district",
    casta: "Pensinsular",
    class: "Craftsman",
    symptoms: [
      { 
        name: "Shortness of breath", 
        location: "chest", 
        quote: "I can barely breathe, mamá. It feels like my lungs are too small to hold any air."
      },
      { 
        name: "Fatigue", 
        location: "whole body", 
        quote: "I feel so tired, even though I haven’t done anything today." 
      }
    ],
    diagnosis: "Asthma",
    contemporaryTheory: "Asthma caused by an excess of cold and damp humors obstructing the lungs, worsened by exposure to cold air at night.",
    prescription: "Maria might prescribe a decoction of chamomile and crab eyes, with a small amount of powdered millipedes (*mil pies*), as recommended in *Medicina practica de Guadalupe* by Francisco Sanz de Dios y Guadalupe (1734). She also advises the family to burn aromatic herbs like rosemary to purify the air in their home and to wrap Sebastián in warm cloths to counteract the cold humors.",
    socialContext: "Sebastián’s illness has left him unable to help his family in the candle-making shop. His parents are concerned that his inability to work may affect his apprenticeship, and they worry about the long-term impact on their household’s income.",
    urgency: "Medium",
    image: "sebastianathayde",
    caption: "Sebastián Athayde, apprentice candle maker",
    description: "Sebastián Athayde is a 12-year-old boy living in Mexico City. His worsening asthma has left him weak and unable to assist in the family business, causing great concern for his future.",
    astrologicalSign: "Leo",
    pdf: "athayde.pdf",
    citation: "*Medicina practica de Guadalupe* by Francisco Sanz de Dios y Guadalupe (1734)",
    secret: "Sebastián is secretly afraid that his asthma will prevent him from continuing his apprenticeship, and he feels a great deal of guilt for not being able to help his family more in the shop."
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
    pdf: "isabel.pdf",
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
      { name: "Swelling and redness", location: "extremities", quote: "My joints are swollen, red, and throbbing. Oh, God protect me." },
      { name: "Difficulty urinating", location: "abdomen", quote: "It feels as though a heavy weight sits upon my bladder, and no relief comes despite the urge." },
      { name: "Chronic lower back pain", location: "abdomen", quote: "Please... please help make it stop." }
    ],
    diagnosis: "Kidney stone blocking urination, aggravated by gout",
    contemporaryTheory: "An obstruction caused by a stone or blood clot in the urinary tract, further inflamed by heat and humor imbalance.",
    socialContext: "His affliction has rendered him immobile, affecting his ability to engage in social and religious activities, leading to a decline in his social standing",
    urgency: "Medium",
    image: "donalejandrocortez",
    caption: "Don Alejandro Cortez, retired judge",
    description: "Don Alejandro Cortez, once a respected judge, is now confined to his home, his body racked by the painful affliction of gout.",
    astrologicalSign: "Virgo",
    pdf: "doncortez.pdf",
    citation: "Florilegia Medicinal by by Juan de Esteyneffer (Mexico, 1712), pages 196 and 206",
    secret: "Don Alejandro seeks out Maria instead of a licensed physician because he has suffered repeated fainting spells from the physician's prescription of frequent bleedings.",
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
        pdf: "anamariadesoto.pdf",
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
        pdf: "isabel.pdf",
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
        pdf: "isabel.pdf",
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
        pdf: "diegoperez.pdf",
    secret: "Diego has been working extra hours to pay off a debt incurred by his father, but his illness has made it nearly impossible to keep up, and he fears his family’s future is in jeopardy.",
    imgdescription: "A highly detailed pixel art portrait of Diego Perez, a 26-year-old indigenous carpenter in Mexico City, 1680. He is a lean, muscular man with bronze skin, short black hair, and dark eyes that reflect both his physical pain and his worry about his livelihood. Diego wears a simple white cotton shirt, brown breeches, and a leather apron that signifies his trade."
},

{
  type: "patient",
  name: "Rodrigo Hernandez",
  age: 48,
  gender: "Male",
  occupation: "Merchant",
  birthplace: "Seville, Spain",
  currentResidence: "Mexico City, near Plaza Mayor",
  casta: "Peninsular",
  class: "Upper middle class",
  symptoms: [
    { name: "Mild fever", location: "whole body", quote: "I feel as though a slow fire burns within me. I fear I have plague." },
    { name: "Persistent cough", location: "chest", quote: "This cough lingers interminably, always there but never getting worse." },
    { name: "Fatigue", location: "whole body", quote: "My strength fades with each passing day, though I do nothing to tire myself." }
  ],
  diagnosis: "Feigned illness",
  contemporaryTheory: "Minor imbalance of the humors, perhaps a lingering flux caused by overindulgence in rich foods",
  socialContext: "Rodrigo is pretending to be ill to test Maria's willingness to prescribe without a physician's authority.",
  urgency: "Medium",
  image: "rodrigohernandez",
  caption: "Rodrigo Hernandez, merchant",
  description: "Rodrigo Hernandez is a well-dressed merchant who seems too healthy for the symptoms he describes. His manner is calm, but his eyes dart around the room, betraying a deeper intention.",
  astrologicalSign: "Libra",
      pdf: "hysteria.pdf",
  secret: "Rodrigo Hernandez is actually Licenciado Rodrigo Ramirez, a guild lawyer investigating Maria's practice. He fakes an illness to trap her into prescribing without proper authority."
},



  // Places
  
  {
    type: "place",
    name: "Generic Home",
    image: "generichome",
    caption: "Inside a home in Mexico City.",
    description: "The home is modest and simple, with a small altar in the corner and a few chairs around a wooden table. The scent of burning incense fills the air."
},
{
    type: "place",
    name: "Market",
    image: "market",
    caption: "The bustling marketplace.",
    description: "Vendors call out to passersby, offering a variety of goods from spices to fresh produce. The market is a vibrant and chaotic place, full of life."
},
{
    type: "place",
    name: "Street (Day)",
    image: "street",
    caption: "A city street during the day.",
    description: "The cobblestone streets of Mexico City are filled with people going about their daily business. The sound of horse hooves clattering and merchants calling out fills the air."
},
{
    type: "place",
    name: "Street (Night)",
    image: "streetnight",
    caption: "A city street at night.",
    description: "The streets of Mexico City have quieted as night falls. The occasional flicker of torchlight reveals small groups of people hurrying home, shadows cast by the stone buildings loom over the thoroughfare."
},
{
    type: "place",
    name: "Outside Maria's Shop (Day)",
    image: "outsideday",
    caption: "Outside Maria's shop during the day.",
    description: "The streets outside Maria's shop are bustling with activity. It's hot and humid today, and the sun beats down on the crowded thoroughfare."
},
{
    type: "place",
    name: "Outskirts",
    image: "outskirts",
    caption: "On the outskirts of Mexico City.",
    description: "A barren landscape just outside Mexico City, with scattered farms and small homes dotting the horizon."
},
{
    type: "place",
    name: "Village",
    image: "village",
    caption: "A rural village near Mexico City.",
    description: "A small village with adobe houses and dusty streets, where locals gather by a well and share the latest news."
},
{
    type: "place",
    name: "Dockside",
    image: "dockside",
    caption: "Dockside at a nearby river port.",
    description: "Wooden docks stretch out into the river, where small boats are tied and fishermen sell their catch to passing travelers."
},
{
    type: "place",
    name: "Port",
    image: "port",
    caption: "A bustling port.",
    description: "Ships docked at the port unload their cargo, while merchants haggle over prices and workers carry heavy crates along the shore."
},
{
    type: "place",
    name: "Hills",
    image: "hills",
    caption: "Rolling hills near Mexico City.",
    description: "The gentle hills are covered in green grass and dotted with trees, providing a quiet retreat from the bustling city."
},
{
    type: "place",
    name: "Forest",
    image: "forest",
    caption: "A dense forest near the countryside.",
    description: "Tall trees stretch towards the sky, their branches forming a thick canopy that blocks out most of the sunlight."
},
{
    type: "place",
    name: "Frontier",
    image: "frontier",
    caption: "The frontier near New Spain.",
    description: "An arid and rugged landscape that marks the edge of Spanish-controlled territory, where the wilderness stretches out into the unknown."
},
{
    type: "place",
    name: "Abandoned Temple",
    image: "abandonedtemple",
    caption: "An abandoned temple deep in the forest.",
    description: "The ruins of an ancient temple, overgrown with vines and partially buried by time, stand in eerie silence."
},
{
    type: "place",
    name: "Country Church",
    image: "countrychurch",
    caption: "A small country church.",
    description: "A quaint stone church with a modest bell tower, nestled in the countryside and surrounded by wildflowers."
},
{
    type: "place",
    name: "Canyon",
    image: "canyon",
    caption: "A deep canyon near the outskirts.",
    description: "A vast canyon carved by a river, with steep cliffs and narrow trails that wind down towards the valley floor."
},
{
    type: "place",
    name: "Outside Maria's Shop (Night)",
    image: "outsidenight",
    caption: "Outside Maria's shop during the evening.",
    description: "The streets outside Maria's shop have quieted down as night falls. The air is cooler, and the sounds of distant revelry mix with the rustling of leaves."
},
{
    type: "place",
    name: "Shop Interior (Morning)",
    image: "shopmorning",
    caption: "Inside Maria's shop in the morning.",
    description: "The sun filters in through the windows, illuminating the shelves filled with herbs and tinctures. The shop is quiet, but the day has just begun."
},
{
    type: "place",
    name: "Shop Interior (Afternoon)",
    image: "shopafternoon",
    caption: "Inside Maria's shop in the afternoon.",
    description: "The shop is filled with a warm, afternoon glow. Maria carefully arranges her herbs and remedies, preparing for the day's patients."
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
    image: "countryside",
    caption: "The open countryside.",
    description: "Rolling fields and distant mountains stretch out as far as the eye can see. The air is fresh and the landscape is dotted with small farms and wildflowers."
},
{
    type: "place",
    name: "Study",
    image: "study",
    caption: "Maria studies a book.",
    description: "Maria sits at a wooden table with several open books and scrolls in front of her. The smell of old parchment mixes with the sharp scent of dried herbs."
},
{
    type: "place",
    name: "Codex",
    image: "codex",
    caption: "The Nahuatl Codex.",
    description: "Maria carefully examines an ancient Nahuatl codex, its pages filled with faded drawings and cryptic symbols. She feels the weight of history as she tries to decipher its meaning."
},
{
    type: "place",
    name: "Herbs",
    image: "herbs",
    caption: "Examining herbs at a market stall.",
    description: "Bundles of dried herbs hang from an herb stall as a merchant woman sells them."
},
{
    type: "place",
    name: "Farm",
    image: "farm",
    caption: "Riverside farmlands outside Mexico City.",
    description: "A plot of irrigated farmland with rows of crops stretching towards the horizon along with canals plyed by river boats."
},
{
    type: "place",
    name: "Mushroom",
    image: "mushroom",
    caption: "Encounter with the curandera.",
    description: "The curandera presents a basket filled with strange, otherworldly mushrooms."
},
{
    type: "place",
    name: "Trippy",
    image: "trippy",
    caption: "A trance-like vision.",
    description: "The world begins to warp and twist, colors bleeding into one another. Maria's vision blurs as she falls into a deep trance, the boundaries between reality and dream dissolving."
},
{
    type: "place",
    name: "Merchant",
    image: "merchant",
    caption: "A merchant's stall in the market.",
    description: "A merchant stands behind a wooden stall, gesturing animatedly as he tries to sell his wares. The air is filled with the scent of spices and fresh produce."
},
{
    type: "place",
    name: "Priest",
    image: "priest",
    caption: "Inside a church in Mexico City.",
    description: "The stone church is dimly lit by flickering candles. A priest stands at the altar, reciting prayers in Latin as the scent of incense fills the room."
},
{
    type: "place",
    name: "City (Day)",
    image: "cityday",
    caption: "A bustling city street during the day.",
    description: "The sun shines brightly over the rooftops of Mexico City. People move through the crowded streets, vendors call out, and carts rumble over the cobblestones."
},
// Place Entries

{
  type: "place",
  name: "Plaza Mayor",
  location: "Mexico City",
  description: "The Plaza Mayor, located at the heart of Mexico City, is a grand square surrounded by important buildings such as the Viceroy’s Palace and the Metropolitan Cathedral. It is a bustling center of commerce, political activity, and social gatherings.",
  imgdescription: "The Plaza Mayor is a wide, open square paved with cobblestones. The surrounding buildings are imposing, with the grand façade of the Viceroy’s Palace on one side and the towering spires of the Cathedral on the other. Merchants line the edges of the square, selling goods under large canvas awnings, while carriages and horses move through the center.",
  pdf: "plazamayor.pdf",
  citation: "Antonio de Solis, *Historia de la conquista de Mexico* (Madrid, 1684)",
  image: "plazamayor"
},
{
  type: "place",
  name: "Calle de la Amargura",
  location: "Mexico City",
  description: "A narrow street in Mexico City known for its small shops and humble residences. The cobblestones are worn from years of foot traffic, and the air is often filled with the sounds of street vendors selling their goods.",
  imgdescription: "The Calle de la Amargura is a long, narrow street lined with simple, low-built adobe houses. Wooden signs hang from the shops, and the street is shaded by overhanging balconies. The cobbled road is uneven, and small groups of people gather outside doorways, chatting or bargaining with vendors.",
  pdf: "calleamargura.pdf",
  citation: "From the *Gazeta de Mexico*, March-April 1794, pg 228, available at https://www.google.com/books/edition/Gazetas_de_Mexico/csyuPK3XA3UC?hl=en&gbpv=1&pg=PA228&printsec=frontcover",
  image: "calle_amargura"
},
{
  type: "place",
  name: "La Merced Market",
  location: "Mexico City",
  description: "One of the largest markets in Mexico City, La Merced is filled with stalls selling everything from fresh produce to handmade goods. The market is always crowded, with the noise of haggling merchants and customers filling the air.",
  imgdescription: "The market is a maze of stalls and vendors, each selling their wares under colorful cloth canopies. The ground is dusty, and the air is thick with the smells of fresh fruit, roasted meat, and the occasional whiff of incense. People push past each other, jostling for the best deals while merchants call out from behind their stands.",
  pdf: "null",
  image: "lamerced"
},
{
  type: "place",
  name: "Tenochtitlan Ruins",
  location: "Mexico City",
  description: "The ancient ruins of Tenochtitlan, the former Aztec capital, lie beneath and around the colonial buildings of Mexico City. These ruins serve as a reminder of the city's Indigenous past, with portions of temples and palaces still visible.",
  imgdescription: "The ruins are scattered across the landscape, with the crumbling remains of stone temples and walls visible beneath the colonial structures. The stone is weathered and cracked, with vines and plants creeping through the gaps. Some areas are fenced off, but locals still wander through the site, leaving offerings or simply observing.",
  pdf: "templo.pdf",
  citation: "Antonio de Solis, *Historia de la conquista de Mexico* (Madrid, 1684)",
  image: "tenochtitlan"
},
{
  type: "place",
  name: "Metropolitan Cathedral",
  location: "Mexico City",
  description: "The Metropolitan Cathedral is a grand structure that dominates the Plaza Mayor. Built over centuries, it is the largest cathedral in the Americas and a center of religious and political power in New Spain.",
  imgdescription: "The Cathedral’s grand stone façade is adorned with carvings and statues of saints. Two massive bell towers rise above the surrounding buildings, and the entrance is framed by ornate iron gates. Inside, the air is cool and dim, with tall stone columns supporting the vaulted ceiling. Candles flicker in alcoves where worshippers kneel in prayer.",

  image: "metropolitancathedral"
},
{
  type: "place",
  name: "Alameda Central",
  location: "Mexico City",
  description: "The Alameda Central is a large public park in Mexico City, a place where people of all classes come to relax, socialize, and enjoy the natural beauty of the gardens. The park is lined with trees and dotted with fountains and sculptures.",
  imgdescription: "The Alameda Central is a green, expansive park with gravel pathways winding between rows of tall trees. Marble benches are placed at regular intervals, and fountains burble gently in the background. The park is well-maintained, with flowering bushes and carefully manicured lawns providing a tranquil escape from the bustling city.",

  image: "alamedacentral"
},

{
  type: "place",
  name: "Portal de Mercaderes",
  location: "Mexico City",
  description: "The Portal de Mercaderes is a covered walkway located next to the Plaza Mayor, lined with shops and stalls where merchants sell their goods. It is one of the busiest commercial hubs in the city, frequented by people from all walks of life.",
  imgdescription: "The Portal de Mercaderes is a long, arched corridor with stone columns supporting the ceiling above. Stalls line both sides, overflowing with textiles, silver goods, and various trinkets. The ground is worn smooth from the footsteps of countless customers, and the air is filled with the chatter of merchants and buyers haggling over prices.",
  pdf: "portal.pdf",
  citation: "Santos, Juan. *Lauros panegiricos, aclamaciones reales, y festiuos aplausos.* En la imprenta de Bernardo de Villa-Diego, 1693.",
  image: "portalmercaderes"
},

{
  type: "place",
  name: "Outskirts",
  location: "Just outside Mexico City",
  description: "The outskirts of Mexico City are areas just beyond the city's walls, where sparse homes, farms, and isolated patches of land stretch out toward the countryside. It's a quieter, more rural environment compared to the bustling city.",
  imgdescription: "The outskirts consist of dirt paths winding between small adobe homes and open fields. Farmers tend to their crops, and the occasional rider passes by on horseback. The sound of the city fades into the distance, replaced by the rustle of trees and the calls of distant animals.",

  image: "outskirts"
},
{
  type: "place",
  name: "Village",
  location: "Countryside",
  description: "A small, rural settlement far from the center of Mexico City. The village is a cluster of modest homes, with a local church and market where residents gather.",
  imgdescription: "The village is made up of a few simple, thatched-roof houses, grouped around a small square with a well in the center. Chickens peck at the dirt, and children run through the narrow lanes while villagers go about their daily routines.",
  pdf: "",
  image: "village"
},
{
  type: "place",
  name: "Dockside",
  location: "Near Water",
  description: "The docks are a bustling area filled with activity as ships come and go. Sailors and dockworkers load and unload cargo, and the air is thick with the scent of saltwater and fish.",
  imgdescription: "The dockside is lined with wooden piers, where ships of all sizes are tied up. Crates and barrels are stacked high, and dockworkers haul goods off the ships while sailors call out to each other in a cacophony of voices. The water laps at the shore, and the creaking of wooden ships fills the air.",
  pdf: "",
  image: "dockside"
},
{
  type: "place",
  name: "Port",
  location: "Harbor",
  description: "A busy harbor where ships from all over the world bring their goods to be traded. Merchants and sailors fill the area, negotiating deals and overseeing the loading and unloading of cargo.",
  imgdescription: "The port is a sprawling area filled with ships of all sizes, from small fishing vessels to grand merchant ships. The air is alive with the sounds of trade, the clinking of chains, and the cries of gulls overhead. The docks are lined with crates and barrels, ready to be shipped or sold.",
  pdf: "",
  image: "port"
},
{
  type: "place",
  name: "Hills",
  location: "Countryside",
  description: "The rolling hills outside the city offer a quiet, peaceful retreat from the noise and bustle of urban life. The hills are dotted with wildflowers, and the air is fresh and cool.",
  imgdescription: "The hills rise gently from the flat plains, their grassy slopes broken by patches of wildflowers and the occasional stand of trees. The sun casts long shadows over the landscape, and a light breeze rustles the grass as you walk through the serene setting.",
  pdf: "",
  image: "hills"
},
{
  type: "place",
  name: "Forest",
  location: "Outskirts",
  description: "A dense, mysterious forest on the outskirts of the city. The forest is home to a variety of wildlife and has long been associated with superstition and the unknown.",
  imgdescription: "The forest is thick with towering trees, their branches intertwining to form a canopy that blocks out much of the sunlight. The air is cool and damp, and the ground is littered with fallen leaves and twisted roots. Shadows move between the trees, and the sounds of wildlife echo through the stillness.",
  pdf: "",
  image: "forest"
},
{
  type: "place",
  name: "Frontier",
  location: "Borderlands",
  description: "The frontier is the edge of civilization, where the wilderness begins. It is a rugged, untamed land, home to settlers, explorers, and bandits.",
  imgdescription: "The frontier stretches out as far as the eye can see, a vast expanse of rocky terrain and scrubby vegetation. The land is harsh, with little water and few signs of life, save for the occasional bird of prey circling in the distance. The path is rough, winding through narrow passes and over steep ridges.",
  pdf: "",
  image: "frontier"
},
{
  type: "place",
  name: "Abandoned Temple",
  location: "Countryside",
  description: "A forgotten temple, long abandoned and overgrown with vines. The stone walls and carvings are a reminder of a time long past, though few dare to explore its crumbling remains.",
  imgdescription: "The temple stands in ruins, its once-grand stone façade now cracked and covered in moss. Vines creep up the walls, and the interior is dark and musty. Broken statues and fragments of pottery litter the floor, and the air is thick with the scent of decay. A faint light filters through the collapsed roof, casting eerie shadows.",
  pdf: "",
  image: "abandonedtemple"
},
{
  type: "place",
  name: "Country Church",
  location: "Countryside",
  description: "A small, rural church set among fields and farms. The church serves as a peaceful gathering place for the local villagers, who come to worship and seek guidance.",
  imgdescription: "The church is a simple stone building with a modest bell tower. A small graveyard sits beside it, its headstones weathered by time. Inside, the walls are whitewashed, and wooden pews line the aisle leading to the altar. The smell of incense lingers in the air, and the only sound is the occasional creak of the wooden floorboards.",
  pdf: "",
  image: "countrychurch"
},
{
  type: "place",
  name: "Canyon",
  location: "Remote Wilderness",
  description: "A deep, rocky canyon carved by centuries of wind and water. The canyon is a remote and dangerous place, far from civilization.",
  imgdescription: "The canyon walls rise steeply on either side, their jagged edges casting long shadows over the narrow trail below. The ground is littered with rocks and pebbles, and the air is dry and hot. Above, the sky is a bright blue, and the only sound is the occasional cry of a bird echoing off the stone walls.",
  pdf: "",
  image: "canyon"
},
{
  type: "place",
  name: "Square",
  location: "Mexico City",
  description: "A public square where people gather to meet, shop, and engage in civic life. The square is a hub of activity, with vendors, performers, and citizens all going about their business.",
  imgdescription: "The square is paved with cobblestones and surrounded by tall buildings. Merchants set up stalls along the edges, selling food, textiles, and other goods. People move through the space in groups, talking and laughing, while street performers entertain the crowds with music and acrobatics.",
  pdf: "",
  image: "square"
},
{
  type: "place",
  name: "Herb Shop",
  location: "Mexico City",
  description: "A small shop filled with jars of dried herbs, tinctures, and potions. The herb shop is a place where both commoners and the wealthy come to seek remedies for their ailments.",
  imgdescription: "The herb shop is dimly lit, with shelves lining the walls, each filled with glass jars and bundles of dried plants. The air is thick with the smell of herbs and spices, and the counters are cluttered with scales, mortar and pestles, and handwritten labels. A small fire burns in the hearth, casting flickering shadows over the room.",
  pdf: "",
  image: "herbshop"
},
{
  type: "place",
  name: "City Center",
  location: "Mexico City",
  description: "The heart of Mexico City, where government buildings, churches, and major markets are located. It is always bustling with activity, as citizens gather to conduct business or attend civic events.",
  imgdescription: "The city center is a crowded, noisy place, with people hurrying in all directions. Tall, ornate buildings loom over the streets, their facades covered in intricate carvings. Carriages clatter over the cobblestones, and the air is filled with the sounds of bells, voices, and the occasional street vendor calling out their wares.",
  pdf: "",
  image: "citycenter"
},
{
  type: "place",
  name: "Hacienda",
  location: "Countryside",
  description: "A large estate in the countryside, where crops are grown and livestock is raised. The hacienda is the center of rural life, with a small village of workers surrounding the main house.",
  imgdescription: "The hacienda is a sprawling estate, with the main house overlooking fields of crops and pastures for livestock. The house is a grand, two-story building with whitewashed walls and a red-tiled roof. Workers can be seen tending to the fields, while smoke rises from the small cottages where they live.",
  pdf: "",
  image: "hacienda"
},
{
  type: "place",
  name: "Taverna",
  location: "Mexico City",
  description: "A lively tavern where locals gather to eat, drink, and socialize. The taverna is a common meeting place for tradesmen, travelers, and soldiers looking to unwind after a long day.",
  imgdescription: "The taverna is dimly lit, with wooden tables and benches filling the room. The air smells of roasted meat and spilled wine, and the sound of laughter and conversation fills the space. A fire burns in the hearth, casting a warm glow over the stone walls, while the barkeep moves quickly between customers, filling their cups.",
  pdf: "",
  image: "taverna"
},
{
  type: "place",
  name: "Church Courtyard",
  location: "Mexico City",
  description: "The courtyard outside a grand church, where people gather for religious festivals, outdoor sermons, or simply to socialize after attending mass.",
  imgdescription: "The courtyard is a large, open space surrounded by tall stone walls. Potted plants and fountains line the edges, and the ground is paved with smooth stones. The shadow of the church’s bell tower falls over the space, and groups of people linger in conversation, enjoying the cool air after the warmth of the church’s interior.",
  pdf: "",
  image: "churchcourtyard"
},
{
  type: "place",
  name: "Cobblestones",
  location: "Mexico City",
  description: "A detail of the roads or pavements in the city, often worn smooth from the passage of feet, horses, and carriages.",
  imgdescription: "The cobblestones are uneven, worn down by years of use. Some are cracked or missing, leaving small gaps in the road. The stones are slick with rain or dust, depending on the season, and the sound of hooves and wheels echoes as they pass over the rough surface.",
  pdf: "",
  image: "cobblestones"
},
{
  type: "place",
  name: "Rock",
  location: "Wilderness",
  description: "A rugged, rocky outcrop or boulder, often encountered in wilderness areas or along difficult paths.",
  imgdescription: "The rock is rough and jagged, standing out against the landscape like a weathered sentinel. Moss and lichen cling to its surface, and the ground around it is scattered with smaller stones and pebbles. The air is cool and quiet, the only sound the wind whistling through the cracks in the stone.",
  pdf: "",
  image: "rock"
},
{
  type: "place",
  name: "Turf",
  location: "Countryside",
  description: "A patch of grassy land, often seen in rural or wilderness settings.",
  imgdescription: "The turf is thick and green, the blades of grass soft underfoot. Small wildflowers dot the landscape, and the ground is springy, the earth damp from recent rain. The air is fresh and cool, filled with the scent of grass and soil.",
  pdf: "",
  image: "turf"
},
{
  type: "place",
  name: "Ocean",
  location: "Coastal",
  description: "The vast, open ocean, stretching out to the horizon. The waves crash against the shore, and the salty air is filled with the sound of seabirds.",
  imgdescription: "The ocean stretches out endlessly, its surface rippling with waves that shimmer in the sunlight. The water is a deep blue, and the distant horizon is barely visible where the sky meets the sea. The wind carries the scent of salt, and the calls of seabirds echo overhead.",
  pdf: "",
  image: "ocean"
},
{
  type: "place",
  name: "Bottles",
  location: "Interior",
  description: "A close-up of bottles, often used to store medicines, herbs, or liquids.",
  imgdescription: "The bottles are made of clear or colored glass, their surfaces smooth and reflective. Some are stoppered with cork, while others are sealed with wax. The liquids inside range in color from deep reds to pale yellows, and the labels are handwritten in faded ink.",
  pdf: "",
  image: "bottles"
},
{
  type: "place",
  name: "Moon",
  location: "Night Scene",
  description: "A view of the moon at night, casting light over the landscape. The moon is often a symbol of mystery and change in the night sky.",
  imgdescription: "The moon hangs high in the dark sky, a glowing crescent or full orb depending on its phase. The light it casts is pale and cool, illuminating the landscape in soft, silvery tones. Shadows stretch long across the ground, and the air is still and quiet under the moon’s gaze.",
  pdf: "",
  image: "moon"
},
{
  type: "place",
  name: "Ship",
  location: "Coastal or Ocean",
  description: "The interior of a sailing vessel, often cramped and filled with the smell of saltwater and wood.",
  imgdescription: "The ship's interior is dark and cramped, with low wooden beams overhead. Hammocks sway gently from the movement of the waves, and barrels of supplies are stacked against the walls. The smell of saltwater and tar fills the air, and the creaking of wood echoes through the small space.",
  pdf: "",
  image: "ship"
},
{
  type: "place",
  name: "Horse",
  location: "Countryside or Urban",
  description: "A horse, often used for transportation or labor, standing in a field or tied up in a town square.",
  imgdescription: "The horse stands tall and strong, its coat shining in the sunlight. Its mane is long and slightly tangled from travel, and its saddle is worn but well-cared for. The horse’s eyes are calm, and it occasionally stamps its hoof against the ground, impatient to continue its journey.",
  pdf: "",
  image: "horse"
},

  

  // Quest NPCs
{
  type: "questnpc",
  name: "Antonius Philalethes",
  age: 40,
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
   },
  imgdescription: "Antonius, a black-haired Greek man of 40, wears a dark wool doublet, cut close to the body, with plain linen cuffs and a high collar. His attire is modest but of good quality, fitting for an educated man. His breeches are of heavy fabric, ending just below the knee, and he wears plain leather shoes, well-worn from years of use. His hands are often clasped behind his back, betraying faint traces of soot from his clandestine alchemical work."
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
  },
  imgdescription: "Don Ignacio is dressed in a black wool cassock, with a narrow white collar and sleeves that fall just above the wrist. His attire is austere, reflecting his role in the church. His face is marked by the lines of age and stress, his eyes sharp but sunken. He holds a wooden rosary loosely in his left hand, though it is more often kept in his pocket than used publicly."
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
  secret: "The codex holds the secret to powerful herbs, capable of both healing and harm. Tlacaelel is conflicted about sharing this knowledge, fearing it could be exploited by outsiders.",
  questTrigger: "afterMarketVisit", // Triggered after entering the 'market' or 'marketplace' location
  questDetails: {
    reward: "New inventory item",
    stages: 3,
    reward: "aztec_remedy"
  },
  imgdescription: "Tlacaelel wears a simple cotton tunic dyed in earthy tones, with a *tilmatli* cloak draped over one shoulder. His sandals, made of leather strips, are worn from travel, and a small leather pouch hangs at his waist, filled with plants and herbs gathered from the countryside. His demeanor is quiet and thoughtful, his movements deliberate."
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
  },
  imgdescription: "Alonso dresses in a neatly pressed linen shirt, with a broad belt securing his breeches, which are made of sturdy cloth suited to his profession. His leather apron is often spotted with traces of paint and wood shavings, a testament to his work as a sign maker. His appearance is humble, but his sharp eyes reveal a calculating nature."
},
{
  type: "questnpc",
  name: "Licenciado Rodrigo Ramírez",
  age: 48,
  birthplace: "Seville, Spain",
  currentResidence: "Mexico City",
  casta: "Peninsular",
  class: "Upper middle class",
  occupation: "Guild Lawyer",
  image: "rodrigo_ramirez.jpg",
  caption: "Licenciado Rodrigo Ramírez, Guild Lawyer",
  description: "Licenciado Rodrigo Ramírez is a cunning and ruthless lawyer representing the Physicians' Guild in their lawsuit against Maria for practicing medicine without a license. He harbors a personal grudge against unlicensed healers, driven by the death of his brother at the hands of one. He is determined to see Maria punished, no matter the cost.",
  astrologicalSign: "Libra",
  secret: "Licenciado Ramírez's vendetta against unlicensed healers stems from a deep personal loss. He will stop at nothing to see Maria brought to justice.",
  questTrigger: "turn20", // Automatically triggered on turn 20
  questDetails: {
    failureOutcome: "Game over due to arrest",
    stages: 4
  },
  imgdescription: "Licenciado Ramírez wears a black doublet over a white linen shirt, with finely tailored breeches that reach just below the knee. His black shoes are polished but practical, and he carries a small leather portfolio containing legal documents. His face is clean-shaven, with a stern, unforgiving expression."
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
     secret: "Fernando has become increasingly paranoid about potential heretical movements, which makes him see conspiracies where there may be none. He also harbors doubts about his own faith but keeps these secret to avoid incrimination. He is also homosexual but has come to terms with this.",
  imgdescription: "Fernando wears a black cassock with a simple white collar, his attire modest and appropriate for a man of his rank in the Church. His face is weathered, his expression impassive, but his eyes carry the intensity of a man used to power. A small wooden crucifix dangles from his neck, mostly tucked away beneath his garments."
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
    secret: "Juan is secretly in financial trouble, as his business has begun to fail due to increased competition and poor management. He hopes to sabotage Maria's apothecary to save his own.",
  imgdescription: "Juan wears a plain brown wool doublet over a linen shirt, his sleeves rolled up from constant work. His apron is often stained with herbs and oils, and his hair is tied back neatly, though his face shows the strain of a man trying to maintain control in a faltering business."
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
  secret: "João was abandoned on the streets as a kitten and found his way to Maria’s shop. Though he provides comfort, his skittish behavior hints at the rough life he once led.",
  imgdescription: "João is a small, orange tabby kitten, his fur soft and slightly tousled from frequent naps. His large eyes and delicate whiskers give him a playful, curious appearance as he lounges in the warm sunlight."
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
    secret: "Marta secretly holds a vast network of connections in the herbalist community. She often supplies apothecaries with rare herbs but also has a darker reputation for providing poisons.",
  imgdescription: "Marta wears a long, faded *rebozo* draped over her shoulders, a traditional garment of the Indigenous people of Tlaxcala. Her face is lined with age, and her hands are calloused from years of work in the fields. A small leather pouch at her side carries her carefully wrapped bundles of herbs."
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
     secret: "Don Luis keeps most of his wealth hidden in secret compartments within his home, as he does not trust anyone. He also has dealings with several corrupt officials who protect him in exchange for financial favors.",
  imgdescription: "Don Luis is dressed in a finely tailored wool coat with a high collar, his breeches made of dark, heavy fabric. His shoes are polished, and he carries a silver-headed walking cane, a symbol of his authority and status. His face is stern, and he exudes an air of control and power."
},
// Generic NPCs
{
  type: "npc",
  name: "Paisano",
  age: 30,
  casta: "Indigenous",
  class: "Lower class",
  occupation: "Laborer",
  image: "paisano",
  caption: "A paisano from the countryside",
  description: "A common laborer working the fields or doing hard manual work in the city. Often paid in small wages or goods, he works long hours under the sun.",
  imgdescription: "The peón wears a simple cotton *camisa* (shirt) and loose *calzones* tied with a cord. His sandals are worn, and his skin is darkened by long days working in the sun. His hands are rough, and his face is serious but resigned to his lot."
},

{
  type: "npc",
  name: "Shopkeeper",
  age: 45,
  casta: "Mestizo",
  class: "Middle class",
  occupation: "Shopkeeper",
  image: "shopkeeper",
  caption: "A comerciante or shopkeeper",
  description: "A middle-class shopkeeper who runs a small market stall or store selling daily necessities. He is savvy and knows how to negotiate with customers.",
  imgdescription: "The comerciante wears a simple wool doublet over a linen shirt, his hands often marked with the stains of ink and merchandise. He carries a small ledger book in which he keeps track of sales, though it's well-concealed under his clothing. His face is friendly, but sharp with business."
},
{
  type: "npc",
  name: "Doña",
  age: 35,
  casta: "Criollo",
  class: "Upper class",
  occupation: "Aristocrat",
  image: "dona.jpg",
  caption: "Doña, an aristocratic woman",
  description: "A high-class woman, wife of a nobleman or wealthy landowner. She carries herself with dignity and is rarely seen without her maidservant.",
  imgdescription: "The doña wears a fine silk *saya* (gown) in deep burgundy, with intricate embroidery at the cuffs and hem. A lace veil covers her hair, and she wears pearl earrings, a subtle display of her wealth and status. Her hands are gloved, and she carries a delicate fan made of ivory."
},

{
  type: "npc",
  name: "Friar",
  age: 50,
  casta: "Peninsular",
  class: "Clergy",
  occupation: "Friar",
  image: "friar",
  caption: "A monk",
  description: "A friar offering religious services and preaching to the people of the city. He walks the streets barefoot, carrying only a simple satchel.",
  imgdescription: "The friar wears a rough brown wool robe, tied at the waist with a simple rope belt. His feet are bare, and his face is weathered from years of traveling and preaching. A small wooden rosary hangs from his waist, and he carries a worn leather bag with religious texts and alms for the poor."
},
{
  type: "npc",
  name: "Curandera",
  age: 50,
  casta: "Indigenous",
  class: "Lower middle class",
  occupation: "Healer",
  image: "curandera",
  caption: "Curandera, a traditional healer",
  description: "A curandera, or traditional healer, who uses herbs and rituals passed down through generations to heal the sick and ward off evil.",
  imgdescription: "The curandera wears a loose, earth-toned dress and a woven *rebozo* draped over her shoulders. Her hands are often stained with the juices of freshly picked herbs, and she carries a small woven basket filled with medicinal plants. Her face is lined with age, and her eyes are sharp with knowledge passed down through the generations."
},
{
  type: "npc",
  name: "Soldado",
  age: 30,
  casta: "Peninsular",
  class: "Military",
  occupation: "Soldier",
  image: "soldier",
  caption: "A soldier or soldado",
  description: "A soldier stationed in the city, guarding important buildings and keeping the peace. He is often seen on patrol with a small group of comrades.",
  imgdescription: "The soldado wears a well-fitted leather jerkin over a wool shirt, with steel gauntlets and a helmet. His boots are sturdy, and he carries a sword at his side. His posture is stiff, and he walks with the confidence of a man trained in combat."
},

{
  type: "npc",
  name: "Tejedora",
  age: 30,
  casta: "Indigenous",
  class: "Lower class",
  occupation: "Weaver",
  image: "tejedora",  
  caption: "Tejedora, a female weaver",
  description: "A woman of humble means, working as a weaver, creating cloth from raw fibers to sell or trade in the local market. Her life is hard, and she works long hours at her loom to support her family.",
  imgdescription: "The tejedora wears a simple, loose cotton dress, stained from daily labor. Her feet are bare, and her hands are rough from years of weaving. A thin shawl is wrapped around her shoulders, her hair pulled back into a tight bun to keep it out of her way as she works."
},

{
  type: "npc",
  name: "Caballero",
  age: 45,
  casta: "Peninsular",
  class: "Upper class",
  occupation: "Landowner",
  image: "caballero",  // New file path using a Spanish term for a generic male upper-class figure
  caption: "Caballero, a nobleman",
  description: "A wealthy landowner who oversees vast estates in New Spain, managing both the land and the laborers who work it. His wealth grants him influence, and his power is respected by those beneath him.",
  imgdescription: "The caballero wears a fine velvet doublet with lace cuffs and a broad-brimmed hat adorned with a feather. His shoes are polished, and a gold chain hangs across his chest. He carries himself with the dignity expected of someone of his stature, his face calm and composed."
},

{
  type: "npc",
  name: "Bandito",
  age: 28,
  casta: "Mestizo",
  class: "Lower class",
  occupation: "Bandit",
  image: "bandito",  // File path remains the same as term
  caption: "Bandito, a dangerous criminal",
  description: "A bandit who roams the countryside, robbing travelers and small villages. Known for his ruthlessness and cunning, he has evaded capture for years.",
  imgdescription: "The bandito wears a worn leather vest over a loose shirt, his pants tattered from long days on the run. His face is unshaven, with a scar running down his cheek, and he carries a small knife at his waist, always ready for trouble."
},

{
  type: "npc",
  name: "Soldado",
  age: 35,
  casta: "Peninsular",
  class: "Military",
  occupation: "Soldier",
  image: "soldado",  // File path remains the same as term
  caption: "Soldado, a Spanish soldier",
  description: "A seasoned soldier stationed in New Spain, tasked with maintaining order and protecting the colony from internal and external threats. He follows orders without question and is loyal to the crown.",
  imgdescription: "The soldado wears a well-maintained breastplate over a red wool tunic, with a steel helmet and boots that have seen many battles. His sword hangs at his side, and his posture is rigid, as if always on guard for the next command."
},

{
  type: "npc",
  name: "Curandera",
  age: 50,
  casta: "Indigenous",
  class: "Lower middle class",
  occupation: "Traditional healer",
  image: "curandera",  // File path remains the same as term
  caption: "Curandera, a traditional healer",
  description: "A healer who uses herbal remedies and traditional rituals to cure ailments and ward off evil. She is respected by the Indigenous community and feared by some for her knowledge of potent herbs.",
  imgdescription: "The curandera wears a simple cotton dress and carries a woven basket filled with dried herbs. Her face is lined with age and wisdom, her hair tied back with a piece of cloth. She moves with slow, deliberate steps, always careful in her craft."
},

{
  type: "npc",
  name: "Ranchero",
  age: 40,
  casta: "Mestizo",
  class: "Lower middle class",
  occupation: "Rancher",
  image: "ranchero",  // File path remains the same as term
  caption: "Ranchero, a cattleman",
  description: "A rancher who oversees the care of cattle and other livestock on the vast open plains of New Spain. He is a hardworking man who lives off the land and knows the countryside better than most.",
  imgdescription: "The ranchero wears a wide-brimmed hat to shield his face from the sun, a thick leather belt around his waist, and sturdy boots. His clothes are well-worn, covered in dust from long days on horseback. A coil of rope hangs from his shoulder, ready for use."
},

{
  type: "npc",
  name: "Dona",
  age: 35,
  casta: "Criollo",
  class: "Upper class",
  occupation: "Noblewoman",
  image: "dona",  // File path remains the same as term
  caption: "Doña, a noblewoman of New Spain",
  description: "A wealthy woman of high standing, often seen attending social events and overseeing the running of her household. She is refined and well-educated, playing an influential role in colonial society.",
  imgdescription: "The doña wears a luxurious silk gown with intricate embroidery at the hems, a lace veil over her hair. Her jewelry is subtle but valuable, with a pearl necklace and matching earrings. Her posture is graceful, and she carries herself with quiet authority."
},

{
  type: "npc",
  name: "Paisano",
  age: 32,
  casta: "Mestizo",
  class: "Lower class",
  occupation: "Tradesman",
  image: "paisano",  // File path remains the same as term
  caption: "Paisano, a common tradesman",
  description: "A simple tradesman who works in the markets or on the roads, often performing manual labor. He takes odd jobs to support his family and leads a humble life.",
  imgdescription: "The paisano wears a loose cotton shirt, tied at the waist with a simple rope belt, and sturdy sandals. His hands are rough from labor, and his face is sun-worn, marked by years of work in the outdoors."
},

{
  type: "npc",
  name: "Enslaved Person",
  age: 25,
  casta: "African",
  class: "Lower class",
  occupation: "Enslaved laborer",
  image: "enslavedperson",  // File path remains the same as term
  caption: "Enslaved person in New Spain",
  description: "An enslaved person of African descent, forced to work in the fields or in homes under brutal conditions. Their life is marked by hardship and suffering, but they hold onto hope for a better future.",
  imgdescription: "The enslaved person wears ragged, plain cotton clothing, often torn or worn thin from years of labor. Their body bears the marks of physical toil, and their eyes reflect the weight of their difficult life."
},

{
  type: "npc",
  name: "Sailor",
  age: 40,
  casta: "Mestizo",
  class: "Working class",
  occupation: "Sailor",
  image: "sailor",  // File path remains the same as term
  caption: "Sailor, a man of the seas",
  description: "A sailor who works aboard ships, traveling the seas between New Spain and the Old World. He is rough and weathered, experienced in the dangers of the ocean.",
  imgdescription: "The sailor wears a loose-fitting shirt tucked into belted breeches, his skin tanned from years under the sun. His hair is often windblown, and his hands are calloused from working the ropes of the ship. A small knife hangs from his belt, a necessary tool for the life he leads."
},

];


export default EntityList;
