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
  3. Select the appropriate NPC image name based on PRIMARY NPC or location mentioned, from the NPC MAPPING list provided below. NPC MAPPING: 

                    - anamariadesoto corresponds to Ana María de Soto
                   - franciscodiasdearaujo corresponds to Francisco Dias de Araujo
                   - carlosenriquez corresponds to Carlos Enriquez
                   - donalejandrocortez corresponds to Don Alejandro Cortez
                   - frayesteban corresponds to Fray Esteban
                   - isabeldelacruz corresponds to Isabel de la Cruz
                   - joao corresponds to João (Kitten)
                   - diegoperez corresponds to Diego Perez
                   - marta corresponds to Marta (Herb woman)
                   - rosamariaperez corresponds to Rosa Maria Perez
                   - juanbraga corresponds to Juan Braga (rival apothecary)
                   - donluis corresponds to Don Luis (Moneylender)
                   - inquisitorfernando corresponds to Assistant Inquisitor Fernando
                   - franciscohernandez or franciscoramirez corresponds to Licenciado Francisco Ramírez
                   - donignaciodemendoza corresponds to Don Ignacio de Mendoza
                   - generichome is used for any scene set inside a home in Mexico City.
                   - market is used for any description of the market in Mexico City.
                   - street is for any other scene in Mexico City during the day.
                   - streetnight is for any other scene during the night.
                   - outsideday is used any time a scene is set outside Maria's shop during the day.
                   - outsidenight is used any time a scene is set outside Maria's shop during the evening, dusk, or night.
                   - shopmorning is used any time there is a scene inside Maria's shop during the morning.
                   - shopafternoon is used any time there is a scene inside Maria's shop during the afternoon.
                   - manual is used when a book of any kind is consulted.
                   - shopnight is used any time there is a scene inside Maria's shop during the evening, dusk, or night.
                   - country is used any time Maria leaves Mexico City or visits a village or country setting.
                   - genericwoman: placeholder image used for generic female characters not otherwise specified.
                   - genericmalecommoner: used for any unnamed male peasant or commoner characters not otherwise specified.
                   - genericfemalecommoner:  used for any unnamed female peasant or commoner characters not otherwise specified.
                   - genericmaleupper: used for unnamed male nobility or "middling sort" (merchant, professional) characters not otherwise specified.
                   - genericfemaleupper: used for unnamed female nobility or "middling sort" (merchant, professional) characters not otherwise specified.
                   - study: any turn involving reading or studying
                   - codex: any book or when the #map command is used. 
                   - herbs: herbs, foods, or medicines are examined or bought. 
                   - herbalist: any herbalist other than Marta. 
                   - farm: any turn involving farms or agriculture.
                   - mushroom: when the curandera appears.
                   - trippy: anything involving altered conciousness, a drug experience, trance, or dream, even terror.
                   - merchant: any unnamed merchant character or other commercial scene. 
                   - priest: any church setting or priest character. 
                   - cityday: any daytime city scene not covered by other categories.
                   - tlacaelel: Tlacaelel, the Nahuatl man at the market who begins the Nahuatl codex quest if spoken to. 
                   - default: fallback image, used as last resort.

                   ALWAYS return the selected image name as a separate string labeled "NPC image". For instance:
                   - If "Ana María de Soto" or or "Ana" or "Soto" appears, return "NPC image: anamariadesoto".
                   - If a cat or kitten is referenced, or the name João or Joao, return "NPC image: joao".
                   - If "Isabel de la Cruz" or "Isabel" appears, return "NPC image: isabel".
                   - If a female patient appears with no specific name, default to "genericwoman".
                   - If a male patient appears with no specific name, default to "araujo".
                   - If there are references to night or dusk, use "shopnight" or "outsidenight" based on context.
                   - If Maria enters a home, use "generichome".
                   - if she studies, use "study".
                   - if a book or map figures significantly, use "codex". etc.
                   - use the location choice as a guide for the primary NPC image to show - for instance, if Maria goes to "countryside" or "desert" or "mountains" return "country"

     IMPORTANT: You should ALWAYS select an NPC character over default or location. character or location in the current scene (using the NPC mapping list above).
     IMPORTANT: Don't repeat the same image. Vary your choices while still staying relevent to the context of the scene. 

If you can't determine an appropriate image from the list above, select an emoji that best represents the mood or context of the scene. For example:
- 🌙 for night scenes (but always prefer outsidenight image)
- 🌞 for scenes involving observing the sun or being hot (but always prefer outsideday)
- 🌿 for herb-related scenes
- 💰 for financial situations
- 🏜️ for deserts or mesas 
- 🕯️ for mysterious or secretive scenes
- 📜 for scrolls or ancient texts
- ⛵ for ships at sea
- 🌵 for scrub desert or arid landscapes
- 🏘️ for village or town squares
- 🐍 for snakes
- 🔥 for fires
- 🛶 for river or lake scenes 
- 🌲 for forests
- ⛰️ for mountains
- other emojis might include 🍇, 🐎, 🌋, ⛪, 🐂, 🎭, 🛖, 🦎, 🌳
and many more. be creative. 

Return the selected emoji as "NPC image: emoji:[emoji character]" if an emoji is chosen instead of an image name.




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
        const imageMatch = journalOutput.match(/NPC image:\s*(\S+)/);
        const npcImageName = imageMatch ? imageMatch[1].trim().toLowerCase() : "default";

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