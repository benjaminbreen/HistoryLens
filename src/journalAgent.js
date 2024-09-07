export const generateJournalEntry = async (narrativeText, apiKey) => {
    try {
        const journalAgentResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
content: `
You are a journal summarizer for a historical simulation featuring Maria de Lima, a 45-year-old apothecary in Mexico City which begins on August 22, 1680 and can extend for up to a month beyond that.
Given the following text, provide:
1. A one-sentence past tense summary of what happened, always noting the names of any patients seen (their names ALWAYS bolded) inventory bought or sold, an estimate of much time passed during the turn, and primary location. Format: "Summary: <summary>"
2. A JSON object tracking the current location, date, and time of day formatted like:
\`\`\`json
{
    "location": "Maria's shop",
    "date": "August 22, 1680",
    "time": "8:35 AM",
}
\`\`\`

NOTE: When updating the time and date, please follow these rules:
- If the previous entry was in the evening and the current entry is in the morning, increment the date by one day.
- If the time passes midnight, increment the date.
- if a turn involves significant time passing, estimate it and increment the date. In general a turn takes around 15 to 30 minutes but some may take days. 

3. Select the most appropriate image name based on the PRIMARY NPC, location, or scene described. Use ONLY the following options. think carefully and reflect on your journal entry before selecting the best choice. If any named NPC is included, ALWAYS use their image:

- NPC names: anamariadesoto, franciscodiasdearaujo, carlosenriquez, donalejandrocortez, frayesteban, isabeldelacruz, joao, diegoperez, marta, rosamariaperez, juanbraga, donluis, inquisitorfernando, franciscohernandez, franciscoramirez, donignaciodemendoza, tlacaelel
- Locations: countryside, generichome, market, street, streetnight, outsideday, outsidenight, shopmorning, shopafternoon, shopnight, farm, cityday
- Generic scenes: study, codex, herbs, herbalist, mushroom, trippy, merchant, priest,
- Generic people: genericfemalecommoner, genericmalecommoner, genericfemaleupper, genericmaleupper

- Locations and scenes (with expanded uses):
  - countryside: rural areas, wilderness, mountains, forests, open fields
  - generichome: any indoor residential scene, private meetings, domestic activities
  - market: bustling public spaces, trade activities, social gatherings
  - street: urban daytime scenes, city life, public interactions
  - streetnight: urban nighttime scenes, nocturnal activities, dimly lit areas
  - outsideday: exterior daytime scenes in any setting, outdoor activities
  - outsidenight: exterior nighttime scenes, stargazing, nocturnal nature
  - shopmorning: any business or workplace in the morning, early activities
  - shopafternoon: busy workplaces, peak business hours, afternoon scenes
  - shopnight: late work, candlelit activities, nighttime business
  - farm: agricultural scenes, rivers, irrigation, boats, freshwater activities, rural labor, riverside, rivers
  - cityday: urban panoramas, city architecture, busy city life
  - study: intellectual activities, reading, writing, planning, strategizing
  - codex: any scene involving books, documents, maps, or written materials
  - herbs: selling, buying or observing herbs or plants in an outdoor setting (outside Maria's shop)
  - herbalist: healing practices, folk medicine, herbal remedies, consultations
  - mushroom: foraging, mysterious or magical elements, altered states
  - trippy: visions, dreams, hallucinations, spiritual experiences
  - merchant: any commercial activity, negotiations, trading
  - priest: religious scenes, spiritual guidance, church activities
  - joao is joao, Maria's cat
  - outskirts: areas just outside the city, with sparse homes, farms, and more isolated areas
  - village: rural settlements, small clusters of homes, local village life
  - dockside: docks and piers near water, activity involving boats and sailors
  - port: bustling harbors, cargo loading and unloading, sea trade
  - hills: natural landscapes, rolling hills, quiet and remote areas
  - forest: wooded areas, dense foliage, wildlife, mysterious surroundings
  - frontier: rugged terrain, the border of civilization, untamed wilderness
  - abandonedtemple: ruins, ancient places, mysterious or forgotten locales
  - countrychurch: rural churches, quiet places of worship, serene landscapes
  - canyon: deep ravines, rocky trails, remote natural formations
  - square: public squares, plazas, meetings, urban areas
  - herbshop: store interior, produce, goods for sale
  - citycenter: urban life, city landmarks, public gatherings, civic activities, bustling 
  - hacienda: rural life, farming activities, crop fields, small villages
  - taverna: social gatherings, food and drinks, candlelit interiors, local culture
  - churchcourtyard: religious spaces, grand buildings, outdoor gatherings, colonial architecture
  - cobblestones: detail of road or pavement
  - rock: any turn centering on rock or mineral
  - turf: any turn centering on staring at grass or foiliage or turf
  - ocean: any turn centering on ocean 
  - bottles: any closeup of bottles
  - moon: any moon or night scene which is otherwise not defined
  - ship: any sailing vessel interior
  - horse: any horse



- Generic people:
  - genericfemalecommoner: any non-specific female character of lower social status, e.g. weaver, wife, peasant woman, farmer, tradeswoman
  - genericmalecommoner: any non-specific male character of lower social status, e.g. sailor, farmer, peasant, tradesman of all sorts
  - genericfemaleupper: any non-specific female character of higher social status, e.g. countess, aristocratic woman, wife of magnate, professional, or lord
  - genericmaleupper: any non-specific male character of higher social status, e.g. any Don, lord, inquisitor, political figure, or senior religious figure
  - spanishnoble: well-dressed, upper-class Spaniard, ruling class, colonial officials
  - mestizo: a mixed-race person, often involved in both labor and trade, caught between Spanish and Indigenous worlds
  - friar: religious figures, often walking through towns or monasteries, offering religious services
  - laborer: lower-class workers, often seen toiling in fields, workshops, or serving nobility
  - soldier: military figure, part of a patrol or guarding important locations
  - curandera: traditional healer
  - ranchero: rancher or cowboy managing livestock, overseeing ranches, rural lifestyle
  - scholar: any learned figure or university professor or student
  - dons: a group of powerful men or nobles
  - child: any children
  - enslavedperson: any African slave or enslaved enslavedperson
  - sailor: any sailor or dockworker
  - frontierdweller: any resident of the frontera or frontier or mountainous areas
  - curandera: unlicensed traditional healer
  - peasantwoman: any peasant woman in countryside
  - bandito: a bandit or criminal or dangerous person
  - townsfolk: a group of city or town residents
  - laborer: any unnamed workers
  - shopkeeper: any shopkeeper

Prioritize NPC images and then locations first, before using emojis as a last resort, i.e. it's always better to show "countryside" image than an emoji representing it. Prioritize using image names with broad latitude, being creative about potential uses to fit a scene. As a last resort, if no specific image name matches the scene, select an emoji that best represents the mood or context of the scene. For example:
- 🏜️ for deserts, dry landscapes, or hardship
- 🕯️ for mysterious, secretive, or intimate scenes
- 📜 for scenes involving documents, study, or knowledge
- ⛵ for water-related scenes, travel, or exploration
- 🏘️ for town or city scenes, community
- 🔥 for scenes involving fire, danger, or passion
- ⛰️ for forest, nature scenes, or serenity 
- ⛪ for church, religious scenes, or spirituality
- 🌵 for arid landscapes, resilience, or isolation
- 🎭 for performative or deceptive situations
- 🌋 for volatile situations or sudden changes
- 🏕️ for encampments, tents or small settlements
- 🌅 for the riverside, lakeside, or bodies of water

Always return the selected image name or emoji as a separate string labeled "NPC image". For instance:
"NPC image: anamariadesoto" or "NPC image: 🌙"

IMPORTANT: When selecting an image, always prefer a specific location or NPC image over an emoji. Only use an emoji if there is absolutely no relevant image in the provided list. For example, if the scene is in the countryside, always use "NPC image: countryside" instead of an emoji, even if the emoji seems more specific.
Also, try to vary your image choice. Avoid repeating the same image more than once or twice.  
IMPORTANT: When providing the "NPC image" output, ensure there are no extra characters, spaces, or quotation marks. The output should be exactly in this format:
NPC image: imagename
For example:
NPC image: franciscohernandez
Not "NPC image: "franciscohernandez"" or any other variation.
`

                    },
                    { role: 'user', content: narrativeText }
                ],
            }),
        });

        const journalAgentData = await journalAgentResponse.json();
        const journalOutput = journalAgentData.choices[0].message.content;

        // Extract the summary from the output
        const summaryMatch = journalOutput.match(/Summary:\s*(.*)/);
        const summary = summaryMatch ? summaryMatch[1].trim() : "Error: Could not generate summary.";

        // Extract JSON objects from the output
        const jsonMatches = journalOutput.match(/```json([\s\S]*?)```/g);
        const summaryData = jsonMatches && jsonMatches[0] 
            ? JSON.parse(jsonMatches[0].replace(/```json|```/g, '').trim()) 
            : { location: "", date: "", time: "" };
        
        const inventoryChanges = jsonMatches && jsonMatches[1] 
            ? JSON.parse(jsonMatches[1].replace(/```json|```/g, '').trim()).inventoryChanges 
            : [];

      // Extract the NPC image name or emoji from the output
const imageMatch = journalOutput.match(/NPC image:\s*(.+)/);
let npcImageName = imageMatch ? imageMatch[1].trim().toLowerCase() : "default";

// Remove any extra quotation marks
npcImageName = npcImageName.replace(/['"]+/g, '');

// Fuzzy matching for NPC names
const npcNames = ['anamariadesoto', 'franciscodiasdearaujo', 'carlosenriquez', 'donalejandrocortez', 'frayesteban', 'isabeldelacruz', 'joao', 'diegoperez', 'marta', 'rosamariaperez', 'juanbraga', 'donluis', 'inquisitorfernando', 'franciscohernandez', 'franciscoramirez', 'donignaciodemendoza', 'tlacaelel'];

const fuzzyMatch = npcNames.find(name => npcImageName.includes(name));
if (fuzzyMatch) {
  npcImageName = fuzzyMatch;
}


        // Check if the image is an emoji
        const isEmoji = npcImageName.startsWith('emoji:');
        const emojiOrImageName = isEmoji ? npcImageName.slice(6) : npcImageName;
        

        // Debugging: Console log outputs for verification
        console.log('Journal Agent Output:', journalOutput);
        console.log('Summary:', summary);
        console.log('Summary Data:', summaryData);
        console.log('NPC Image Name selected:', npcImageName);
        console.log('Inventory Changes:', inventoryChanges);

        // Return the parsed data
        return { 
            summary, 
            summaryData, 
            npcImageName: emojiOrImageName, 
            isEmoji, 
            inventoryChanges 
        };

    } catch (error) {
        console.error("Error generating journal entry:", error);
        return { 
            summary: "Error: Could not generate summary.", 
            summaryData: { location: "", date: "", time: "", wealth: 0 }, 
            npcImageName: "🤔",
            isEmoji: true,
            inventoryChanges: []
        };
    }
};