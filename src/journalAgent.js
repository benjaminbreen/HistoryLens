export const generateJournalEntry = async (narrativeText) => {
    try {
        const journalAgentResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                temperature: 0.2,
                messages: [
                    {
                        role: 'system',
                        content: `
You are a journal summarizer for a historical simulation featuring Maria de Lima, a 45-year-old apothecary who runs the Botica de la Amurgura in Mexico City. The game begins on August 22, 1680 and can extend for up to a year beyond that.
Given the following text, provide:
1. A one-sentence past tense summary of what happened, always noting the names of any patients seen (their names ALWAYS bolded) inventory bought or sold, and primary location. Always start EVERY entry with the date and time and short summary of location bold. Format: " Summary:**Date, Location**: summary with **NPC names bolded**" For example: Summary:**August 23, 10:15 AM, Botica de la Amurgura**:Maria assessed a patient named **Fray Patricio**, recognizing symptoms of anemia, and spent roughly 30 minutes asking about his urine, humoral balance, and diet.

2. A JSON object tracking the *full* current location, date, and time of day. ALWAYS make note of the region or city name, not just local name, for location, and be sure to include it. This is essential so that the simulation does not "forget" where action is taking place - i.e. say "Drawing room, Greenwich Observatory, London" rather than just "Drawing room." This MUST ALWAYS BE formatted as follows:
\`\`\`json
{
    "location": "Botica de la Amargura, Mexico City",
    "date": "August 22, 1680",
    "time": "8:35 AM"
}
\`\`\`

When updating the time and date, please follow these specific rules:
- A turn typically lasts between 5 minutes and several hours/days. Use your judgement to determine the length. If there is no significant event in the narrative that suggests a large time jump, estimate the time passage to be within a 1-2 hour range. However, NEVER go backwards in time. If it is dusk, you can only go further into evening, or the morning of the following day if the turn calls for it.
- If the action described spans multiple events (e.g., traveling to another town, treating multiple patients), increase the time accordingly—use hours, and if necessary, increment the date by a day or more.
- Always provide an exact time in the format "8:35 AM" or "11:45 PM". Never return vague times like "morning" or "evening".
- If the current time passes midnight (12:00 AM), increment the date by one day. If the date changes due to significant time passage, clearly reflect this in the JSON output.
- For example: If Maria treats a patient at 9:15 PM on August 23 and then travels for 4 hours, set the new time as 1:15 AM the next day, August 24.
- Give the location as a short phrase which clearly indicates the setting - for instance, rather than just "street," you could say "Busy thoroughfare, Mexico City" or instead of "ship" you could say "Fisherman's trawler, mid-Atlantic"

3. A JSON object tracking any inventory changes:
\`\`\`json
{
    "inventoryChanges": [
        {"item": "Aloe Vera", "quantity": 2, "action": "bought"},
        {"item": "Cacao", "quantity": 1, "action": "sold"}
    ]
}
\`\`\`

IMPORTANT: Provide a concise summary of the turn's events. Do not repeat the entire narrative. Focus on key actions, interactions, and changes in Maria's situation. Be witty when warranted, at times somewhat arch. 
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

        // Debugging: Console log outputs for verification
        console.log('Journal Agent Output:', journalOutput);
        console.log('Summary:', summary);
        console.log('Summary Data:', summaryData);
        console.log('Inventory Changes:', inventoryChanges);

        // Return the parsed data
        return { 
            summary, 
            summaryData, 
            inventoryChanges 
        };

    } catch (error) {
        console.error("Error generating journal entry:", error);
        return { 
            summary: "Error: Could not generate summary.", 
            summaryData: { location: "", date: "", time: "" }, 
            inventoryChanges: []
        };
    }
};