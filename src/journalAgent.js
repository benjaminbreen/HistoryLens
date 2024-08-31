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
  You are a journal summarizer for a historical simulation featuring Maria de Lima, a 45-year-old apothecary in Mexico City on August 22, 1680. 
  Given the following text, provide:
  1. A one-sentence past tense summary of what happened, always noting the names of any patients seen (their names ALWAYS bolded) inventory bought or sold, an estimate of much time passed during the turn, and other occurences. Format: "Summary: <summary>"
  2. A JSON object tracking the current location, date, and time of day formatted like:
  \`\`\`json
  {
      "location": "...",
      "date": "August xx, 1680",
      "time": "...",
  }
  \`\`\`
  3. Select the appropriate NPC image name based on PRIMARY NPC or location mentioned, from the NPC MAPPING list provided below. NPC MAPPING: 

                   - anamariadesoto.jpeg corresponds to Ana María de Soto
                   - araujo.jpeg corresponds to Francisco Dias de Araujo
                   - carlosenriquez.jpeg corresponds to Carlos Enriquez
                   - donalejandrocortez.jpeg corresponds to Don Alejandro Cortez
                   - frayesteban.jpeg corresponds to Fray Esteban
                   - isabel.jpeg corresponds to Isabel de la Cruz
                   - joao.jpeg corresponds to João (Kitten)
                   - diegoperez.jpeg corresponds to Diego Perez
                   - marta.jpeg corresponds to Marta (Herb woman)
                   - rosa.jpeg corresponds to Rosa Maria Perez
                   - juan.jpeg corresponds to Juan Braga (rival apothecary)
                   - donluis.jpeg corresponds to Don Luis (Moneylender)
                   - inquisitorfernando.jpeg corresponds to Assistant Inquisitor Fernando
                   - generichome.jpeg is used for any scene set inside a home in Mexico City.
                   - market.jpeg is used for any description of the market in Mexico City.
                   - street.jpeg is for any other scene in Mexico City. 
                   - outsideday.jpeg is used any time a scene is set outside Maria's shop during the day.
                   - outsidenight.jpeg is used any time a scene is set outside Maria's shop during the evening, dusk, or night.
                   - shopmorning.jpeg is used any time there is a scene inside Maria's shop during the morning, such as in the first scene.
                   - shopmorning.jpeg is used any time there is a scene inside Maria's shop during afternoon, such as in subsequent scenes in Maria's shop.
                   - manual.jpeg is used when a book of any kind is consulted.
                   - shopnight.jpeg is used any time there is a scene inside Maria's shop during the evening, dusk, or night.
                   - country.jpeg is used any time Maria leaves Mexico City or visits a village or country setting.
                   - genericwoman.jpg: placeholder image used for generic female characters not otherwise specified.
                   - genericmalecommoner.jpeg: placeholder image used for generic male peasant or commoner characters not otherwise specified.
                    - genericfemalecommoner.jpeg: placeholder image used for generic female peasant or commoner characters not otherwise specified.
                    - genericmaleupper.jpeg: placeholder image used for generic male nobility or "middling sort" (merchant, professional) characters not otherwise specified.
                    - genericfemaleupper.jpeg: placeholder image used for generic female nobility or "middling sort" (merchant, professional) characters not otherwise specified.
                   - study.jpeg: any turn involving reading or studying
                   - codex.jpeg: any book or when the #map command is used. 
                   - herbs.jpeg: herbs, foods, or medicines are examined or bought. 
                   - herbalist.jpeg: any herbalist other than Marta. 
                   - farm.jpeg: any turn involving farms or agriculture.
                   - mushroom.jpeg: when the curandera appears.
                   - trippy.jpeg: anything involving altered conciousness, a drug experience, trance, or dream, even terror.
                   - merchant.jpeg: any unnamed merchant character or other commercial scene. 
                   -priest.jpeg: any church setting or priest character. 
                   - default.jpeg: fallback image, used as last resort.

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

     IMPORTANT: You should ALWAYS select an NPC character over default or location. character or location in the current scene (using the NPC mapping list below).


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

        // Extract the NPC image name from the output
        const imageMatch = journalOutput.match(/NPC image:\s*(\S+)/);
        const npcImageName = imageMatch ? imageMatch[1].trim().toLowerCase() : "default";

        // Debugging: Console log outputs for verification
        console.log('Journal Agent Output:', journalOutput);
        console.log('Summary:', summary);
        console.log('Summary Data:', summaryData);
        console.log('NPC Image Name selected:', npcImageName);
        console.log('Inventory Changes:', inventoryChanges);

        // Return the parsed data
        return { summary, summaryData, npcImageName, inventoryChanges };

    } catch (error) {
        console.error("Error generating journal entry:", error);
        return { 
            summary: "Error: Could not generate summary.", 
            summaryData: { location: "", date: "", time: "", wealth: 0 }, 
            npcImageName: "default",
            inventoryChanges: []
        };
    }
};
