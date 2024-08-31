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
                   1. A one-sentence past tense summary of what happened (always noting the names of patients seen - their names bolded - and inventory bought or sold, as well as always stating the location and time, like "at the market at dusk" or "in Maria's shop in the afternoon") in the following format: "Summary: <summary>"
                   2. A JSON object with PRECISE current location (like "Maria's shop, Mexico City" or "Market Square, Mexico City"), date, time of day ("Late morning," "dusk"), and current wealth indicated by an integer, wrapped in triple backticks and labeled as json, like this: 
                   \`\`\`json
                   {
                       "location": "...",
                       "date": "...",
                       "time": "...",
                       "wealth": ...
                   }
                   \`\`\`
                   3. Select the appropriate NPC image name from the following list: [anamariadesoto, araujo, carlosenriquez, country, default, donalejandrocortez, diegoperez, donluis, frayesteban, generichome, genericwoman, inquisitorfernando, isabel, joao, juan, mariacoelho, market, marta, outsideday, outsidenight, rosa, shop, shopnight].
                   Return the selected image name as a separate string labeled "NPC image". For instance:
                   - If the name "Ana María de Soto" or "Soto" appears, return "NPC image: anamariadesoto".
                   - If a cat or kitten is referenced, or the name João, return "NPC image: joao".
                   - If the name "Isabel de la Cruz" or "Isabel" appears, return "NPC image: isabel".
                   - If a female patient appears with no specific name, default to "genericwoman".
                   - If a male patient appears with no specific name, default to "araujo".
                   - If there are references to night or dusk, use "shopnight" or "outsidenight" based on context.
                   - If Maria enters a home, use "generichome".
                   - if she studies, use "study".
                   - if a book figures significantly, use "manual".

                   IMPORTANT: Choose the image name that best matches the main character or location in the current scene (using the NPC mapping list below).

                   4. NPC MAPPING: Use the following image to NPC mapping when generating journal entries:

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
                   - outsideday.jpeg is used any time a scene is set outside Maria's shop during the day.
                   - outsidenight.jpeg is used any time a scene is set outside Maria's shop during the evening, dusk, or night.
                   - shopmorning.jpeg is used any time there is a scene inside Maria's shop during the morning, such as in the first scene.
                   - shopmorning.jpeg is used any time there is a scene inside Maria's shop during afternoon, such as in subsequent scenes in Maria's shop.
                   - manual.jpeg is used when a book of any kind is consulted.
                   - shopnight.jpeg is used any time there is a scene inside Maria's shop during the evening, dusk, or night.
                   - country.jpeg is used any time Maria leaves Mexico City or visits a village or country setting.
                   - genericwoman.jpg is a placeholder image used for generic female characters not otherwise specified.
                   - genericman.jpg is a placeholder image used for generic male characters not otherwise specified.
                   - study.jpeg is for any turn involving reading or studying.
                   - farm.jpeg is for any turn involving farms or agriculture.
                   - mushroom.jpeg is for when the curandera appears with her psilocybin mushrooms.
                   - default.jpeg is a fallback image used when no other image matches the scene.
       

                    4. Provide details of any inventory changes in JSON format. Include the item name, quantity, and any available attributes like price, humoral qualities, etc., using this structure:
                   \`\`\`json
                   {
                       "inventoryChanges": [
                           {
                               "name": "Aloe Vera",
                               "quantity": 1,
                               "price": 2,
                               "description": "Aloe Vera purchased at the market.",
                               "humoralQualities": "Cool & Moist",
                               "emoji": "🌵"
                   `
                   },

                    { role: 'user', content: narrativeText }
                ],
            }),
        });

        const journalAgentData = await journalAgentResponse.json();
        const journalOutput = journalAgentData.choices[0].message.content;



        console.log('Journal Agent Output:', journalOutput); // Debugging

        const summaryMatch = journalOutput.match(/Summary:\s*(.*)/);
        const jsonMatch = journalOutput.match(/```json([\s\S]*?)```/);
        const imageMatch = journalOutput.match(/NPC image:\s*(\S+)/);

        const summary = summaryMatch ? summaryMatch[1].trim() : "Error: Could not generate summary.";
        const summaryData = jsonMatch ? JSON.parse(jsonMatch[1].trim()) : {};
        const npcImageName = imageMatch ? imageMatch[1].trim().toLowerCase() : "default";

        
        console.log('Summary:', summary); // Debugging
        console.log('Summary Data:', summaryData); // Debugging
        console.log('NPC Image Name selected:', npcImageName); // Debugging

 // New Section: Parse Inventory Changes
        let inventoryChanges = [];
        try {
            const inventoryJsonMatch = journalOutput.match(/```json([\s\S]*?)```/g);
            if (inventoryJsonMatch && inventoryJsonMatch[1]) {
                const parsedInventoryData = JSON.parse(inventoryJsonMatch[1]);
                if (parsedInventoryData.inventoryChanges) {
                    inventoryChanges = parsedInventoryData.inventoryChanges;
                }
            }
        } catch (e) {
            console.error("Error parsing inventory changes:", e);
        }

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