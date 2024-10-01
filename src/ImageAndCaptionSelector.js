import imageMap from './imageMap';

const isEmoji = (char) => {
  return [...char].some(c => c.match(/\p{Emoji}/u));
};

// Function to normalize image keys to a single word without underscores or spaces
const normalizeImageKey = (key) => {
  return key.toLowerCase().replace(/[_\s]+/g, ''); // Remove underscores and spaces, convert to lowercase
};


// Fuzzy match function to find best matching key
const fuzzyMatchImage = (selectedKey) => {
  const normalizedKey = selectedKey.toLowerCase();
  
  // Try to find an imageMap key that includes the selectedKey or has a tag that matches
  for (const [key, value] of Object.entries(imageMap)) {
    if (key.includes(normalizedKey) || value.tags.some(tag => tag.includes(normalizedKey))) {
      return key; // Return the matched key
    }
  }
  return null; // Return null if no match is found
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
        temperature: 0.6,
        messages: [
          {
            role: 'system',
            content: `
              You are an image selector for a historical simulation game set in 1680s Mexico City, in which the playable character is a Portuguese-born converso apothecary named Maria de Lima. 
              You will select the most appropriate image from the imageMap based on the narrative text. Follow these rules strictly:

              1. If an NPC is mentioned in the narrative text, and their exact name appears, use their key from the imageMap. This should always be the preference if available. It's good to repeat the same NPC key if they reappear across turns as the primary figure in a turn. Do not vary the depiction of named NPCs - if you selected one image of them for a turn, be consistent with it. This is the highest priority rule. Ensure consistency: once you select an image for an NPC, **always** reuse the same image across turns unless the narrative introduces a significant change in appearance or setting. Do not introduce variety unless the narrative requires it. Remember that reappearing NPCs should look the same across turns for narrative coherence.
              2. If no NPC name appears or you are uncertain about the match, fall back to selecting a general image based on the tags or context. Prioritize specificity and "close ups" meaning if Maria is in a setting (like a market) and buys an item, pick an image that best represents the item (if available) in preference to a general image of the setting.
              If an item has been bought or is central to a turn, always select an image that best represents the item without being too specific. For instance, if Maria buys dandelion root, select "root" from imagemap.
              3. Avoid selecting a specific NPC's image unless their name is clearly mentioned. However, generic NPC images tagged as such in imagemap.js are fine to use when a non named NPC is featured (for instance, dons, enslavedperson, priest, bandito, townsfolk, child, shopkeeper, priest, ranchero, soldier, scholar, physician, mestizo, etc)
              4. You can use non-NPC images to evoke the scene or atmosphere when appropriate. This is the final fallback. Be creative here. Avoid repeating the same image.

              Available images and their associated tags:
              ${imageMapDescription}

              Respond in this format:
              
      1. Selected Image: [Provide the exact key from imageMap. The key must match one of the provided image names—do not invent keys. Stick to valid entries without spaces or underscores.]
      2. Caption: [A brief but vivid description of the image. If an NPC is the focus, begin with their full name. No more than 6-7 words.]
      3. Description: [Give a historically accurate explanation of Maria's experience at that moment, focusing on any mentioned NPCs, objects, or surroundings. Always include sensory details: sights, sounds, smells, tactile sensations, and any other relevant emotions or proprioception. Maximum of two sentenecs. Do not include time or location unless they are clearly stated in the context.]
      4. Reasoning: [Explain why you selected this specific key from the imageMap. Be clear and concise.]
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
      // Normalize the image key to ensure consistency (lowercase, no underscores or spaces)
      const normalizedImageKey = normalizeImageKey(selectedImage);

      // Check if the normalized key exists, if not, attempt a fuzzy match
      if (!imageMap.hasOwnProperty(normalizedImageKey) && !isEmoji(normalizedImageKey)) {
        const fuzzyMatch = fuzzyMatchImage(normalizedImageKey);
        if (fuzzyMatch) {
          console.log(`Fuzzy match found: ${fuzzyMatch}`);
          normalizedImageKey = fuzzyMatch;
        } else {
          console.warn(`Invalid image selected: ${selectedImage}. Falling back to default.`);
          normalizedImageKey = 'default';
        }
      }
      selectedImage = normalizedImageKey; // Use the matched or default image
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
