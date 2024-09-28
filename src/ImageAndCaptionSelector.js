import imageMap from './imageMap';

const isEmoji = (char) => {
  return [...char].some(c => c.match(/\p{Emoji}/u));
};


const generateImageAndCaption = async (narrativeText, apiKey) => {
  try {
    // Create a description of available images based on the imageMap
    const imageMapDescription = Object.entries(imageMap).map(([key, value]) => {
      if (value.tags) {
        return `${key}: ${value.tags.join(', ')}`;
      } else {
        return `${key}: generic image`;
      }
    }).join('\n');

    // Send request to OpenAI for image selection and caption generation
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content: `
              You are an image selector for a historical simulation game set in 1680s Mexico City, in which the playable character is a Portuguese-born converso apothecary named Maria de Lima. 
              You will select the most appropriate image from the imageMap based on the narrative text. Follow these rules strictly:

              1. If an NPC is mentioned in the narrative text, and their exact FULL name appears, use their image from the imageMap. 
              2. If no NPC name appears or you are uncertain about the match, fall back to selecting a general image based on the tags or context. Prioritize specificity and "close ups" meaning if Maria is in a setting (like a market) and buys an item, pick an image that best represents the item (if available) in preference to a general image of the setting.
              3. Avoid selecting a specific NPC's image unless their name is clearly mentioned. However, generic NPC images tagged as such in imagemap.js are fine to use when a non named NPC is featured (for instance, dons, enslavedperson, priest, bandito, townsfolk, child, shopkeeper, priest, ranchero, soldier, scholar, physician, mestizo, etc)
              4. You can use non-NPC images to evoke the scene or atmosphere when appropriate. This is the final fallback. Be creative here. Avoid repeating the same image.

              Available images and their associated tags:
              ${imageMapDescription}

              Respond in this format:
              1. Selected Image: [exact key from imageMap WITHOUT spaces]
              2. Caption: [A short, vivid description beginning with the FULL NPC name if relevant. No more than 6-7 words]
              3. Description: [A historically accurate explanation of what Maria is experiencing in this precise moment. ALWAYS include any NPC names from the narrativeText here if any appear. 
              List specific things visible to Maria in the setting, and describe one or two notable things she is hearing, smelling, or feeling - tactile sensations, proprioception, even subconscious moods are all fair game. Maximum three sentences, usually two.]
              4. Reasoning: [One sentence explanation of why this image was selected. Include the EXACT name of the image selected.]
            `
          },
          { role: 'user', content: narrativeText },
        ],
      }),
    });

    const data = await response.json();
    const messageContent = data.choices[0].message.content;

    // Extract the selected image, caption, and description
    const imageMatch = messageContent.match(/Selected Image:\s*(.+?)(?:\n|$)/);
    const captionMatch = messageContent.match(/Caption:\s*(.+?)(?:\n|$)/);
    const descriptionMatch = messageContent.match(/Description:\s*(.+?)(?:\n|$)/);
    const reasoningMatch = messageContent.match(/Reasoning:\s*(.+?)(?:\n|$)/);

    let selectedImage = imageMatch ? imageMatch[1].trim() : null;
    let caption = captionMatch ? captionMatch[1].trim() : "A scene in 1680s Mexico City.";
    let description = descriptionMatch ? descriptionMatch[1].trim() : "";
     let reasoning = reasoningMatch ? reasoningMatch[1].trim() : "No reasoning provided.";

         // Log the reasoning behind the image selection
    console.log(`Image Selection Reasoning: ${reasoning}`);

     // Validate if the selected image is valid or a generic emoji
    if (selectedImage) {
      const normalizedImageKey = selectedImage.toLowerCase();

      if (!imageMap.hasOwnProperty(normalizedImageKey) && !/^\p{Emoji}$/u.test(selectedImage)) {
        console.warn(`Invalid image selected: ${selectedImage}. Falling back to default.`);
        selectedImage = 'default';
      } else {
        selectedImage = normalizedImageKey; // Use the normalized key for valid images
      }
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

// Function to match exact NPC names in the narrative
const isNPCMentioned = (narrativeText, npcName) => {
  const regex = new RegExp(`\\b${npcName}\\b`, 'i'); // Full word match, case insensitive
  return regex.test(narrativeText);
};

// Export the function
export default generateImageAndCaption;
