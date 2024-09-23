import imageMap from './imageMap';

const generateImageAndCaption = async (narrativeText, apiKey) => {
  try {
    const imageMapDescription = Object.entries(imageMap).map(([key, value]) => {
      if (value.tags) {
        return `${key}: ${value.tags.join(', ')}`;
      } else {
        return `${key}: generic image`;
      }
    }).join('\n');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.5,
        messages: [
          {
            role: 'system',
            content: `
              You are an image selector for a historical simulation game set in 1680s Mexico City, in which the playable character is a Portuguese-born converso apothecary named Maria de Lima. 
              Given the narrative text, select the most appropriate image key from the available options. It is essential that if a patient is in a turn, you select their image and provide their FULL name in the caption. NPCs who are patients include: Pancho Rodriguez, Francisco Dias de Araujo, Fray Jordanes, Fray Patricio, Antonia de Ochoa, Sebastián Athayde, Isabel de la Cruz, Don Alejandro Cortez, Ana María de Soto, Carlos Enriquez, Rosa Maria Perez, Diego Perez, Arturo Hernandez.
              If no image fits well, you may suggest a single historically and contextually appropriate emoji instead. However, prioritize selecting an image. 
              If there is no NPC in the turn whose name is a direct match with imagemap, then creatively select the most appropriate image from imagemap. I want it to be a bit poetic at times. if Maria thinks about animals, then naturally you would see this in imagemap:   horse: {
    src: require('./assets/horse.jpg'),
    tags: ['horse', 'animal', 'transport'] and return "Selected Image: horse."" However, if Maria thinks about her longing for home, perhaps you would return "Selected image: ocean" to evoke her travel acros the Atlantic. If an NPC appears in the turn but they do not correspond to a name in imagemap, make a best guess to match them, for instance if Maria meets a tavern owner, pick taverna. If she meets a hunter, pick ranchero. You can also be cretive about places; for instance if Maria goes to St. Paul's Cathedral in London or a church in Rome, you might pick metropolitancathedral since it shows a cathedral amid city life, even if it isn't an exact match. 
              
              Available images and their associated tags (if any):
              ${imageMapDescription}

              Respond in the following format:
              1. Selected Image: [exact key from imageMap OR a single unicode emoji]
              2. Caption: [A very short (6 words maximum) vivid description of the scene. ALWAYS include the full NPC name AT THE BEGINNING of the caption, like "Rosa Maria Perez, wife and mother.""]
              3. Description: [A four sentence elaboration on the caption, avoiding overwraught language. Always use the FULL NPC NAME here too. Write simply and succinctly and with an understated Hemmingway-esque flair, also listing at the end all sounds you imagine Maria can hear, rendered onomonopoetically as needed, in 1-2 sentences. Be extremely accurate and thoughtful in deciding what sounds are audible in this moment in the 1680s, emphasizing extreme fidelity to lived experience and historical accuracy and using real-life, unique, distinctive, specialized historical terms that distinctly evoke the specific setting in period language. KEEP IT SIMPLE. Be plainspoken. Think Cormac McCarthy. Then in a brief, fragmentary phrase evoke Maria's proprioception, her physical experience of this moment...]
              Choose the image that best matches the narrative context, using the tags as guidelines when available.
            `
          },
          { role: 'user', content: narrativeText },
        ],
      }),
    });

   const data = await response.json();
    const messageContent = data.choices[0].message.content;

    const imageMatch = messageContent.match(/Selected Image:\s*(.+?)(?:\n|$)/);
    const captionMatch = messageContent.match(/Caption:\s*(.+?)(?:\n|$)/);
    const descriptionMatch = messageContent.match(/Description:\s*(.+?)(?:\n|$)/);

   let selectedImage = imageMatch ? imageMatch[1].trim() : null;
    let caption = captionMatch ? captionMatch[1].trim() : "A scene in 1680s Mexico City.";
    let description = descriptionMatch ? descriptionMatch[1].trim() : "";

    if (selectedImage && !imageMap.hasOwnProperty(selectedImage) && !/^\p{Emoji}$/u.test(selectedImage)) {
      console.warn(`Invalid image selected: ${selectedImage}. Falling back to default.`);
      selectedImage = 'default';
    }

    return { npcImage: selectedImage, caption, description };
  } catch (error) {
    console.error("Error generating image and caption:", error);
    return {
      npcImage: 'default',
      caption: "A scene in Mexico City.",
      description: "An unexpected event occurred in colonial Mexico City."
    };
  }
};

export default generateImageAndCaption;