import imageMap from './imageMap';

const isEmoji = (char) => {
  return [...char].some(c => c.match(/\p{Emoji}/u));
};

// Function to normalize image keys to a single word without underscores or spaces
const normalizeImageKey = (key) => {
  return key.toLowerCase().replace(/[_\s]+/g, ''); // Remove underscores and spaces, convert to lowercase
};


// Helper function to calculate Levenshtein distance
const levenshteinDistance = (a, b) => {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]).map((row, i) =>
    row.concat(Array.from({ length: b.length }, (_, j) => (i === 0 ? j + 1 : 0)))
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
};

// Fuzzy match function to find best matching key
const fuzzyMatchImage = (selectedKey) => {
  const normalizedKey = selectedKey.toLowerCase();
  let closestMatch = null;
  let smallestDistance = Infinity;

  // Try to find an imageMap key that includes the selectedKey or has a tag that matches
  for (const [key, value] of Object.entries(imageMap)) {
    if (value && value.tags && Array.isArray(value.tags)) {
      // Check key similarity using Levenshtein distance
      const keyDistance = levenshteinDistance(normalizedKey, key);
      if (keyDistance < smallestDistance) {
        closestMatch = key;
        smallestDistance = keyDistance;
      }

      // Check tags similarity
      value.tags.forEach((tag) => {
        const tagDistance = levenshteinDistance(normalizedKey, tag);
        if (tagDistance < smallestDistance) {
          closestMatch = key;
          smallestDistance = tagDistance;
        }
      });
    }
  }

  // Return closest match only if it is reasonably similar
  return smallestDistance <= 2 ? closestMatch : null;  // Set threshold for similarity
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
        temperature: 0.8,
        messages: [
          {
            role: 'system',
            content: `
              You are an image selector for a historical simulation game set in 1680s Mexico City, in which the playable character is a Portuguese-born converso apothecary named Maria de Lima. 
              You will select the most appropriate image from the imageMap based on the narrative text. Follow these rules strictly:

              0. **Match only the available imageMap keys.** Do not invent keys or names for images that aren't present in the imageMap. Stick strictly to the provided keys or their close synonyms/tags. If a specific image key is not available, fall back to the closest relevant category (e.g., use "ship" or other related image keys depending on context - like "junkchineseship" or "shipinterior" etc, for any ship scene, regardless of its specific name).

              1. If an NPC is mentioned in the narrative text, and their exact name appears, use their key from the imageMap. This should always be the preference if available. It's good to repeat the same NPC key if they reappear across turns. Do not vary the depiction of named NPCs - if you selected one image of them for a turn, be consistent with it. This is the highest priority rule. Ensure consistency: once you select an image for an NPC, **always** reuse the same image across turns unless the narrative introduces a significant change in appearance or setting. 
              Do not introduce variety unless the narrative requires it. Remember that reappearing NPCs should look the same across turns for narrative coherence.
              2. If no FULL NPC name appears or you are uncertain about the match (i.e. if it is simply "Diego" and not "Diego Perez" (diegoperez), fall back to selecting a generic image based on the context. Prioritize "close ups" meaning if Maria is in a setting (like a market) and buys an item, pick an image that best represents the item (if available) in preference to a general image of the setting. Or if she meets a young man named Diego (but NOT Diego Perez) select an image that represents the TYPE OF PERSON represented, not their name. If she books passage on a ship, don't select an image key based on the name of the ship since this does not exist, instead pick one of the ship-related image keys. 
              However if a specific place is mentioned prominently in a turn AND has a corresponding image key, return the specific place, for instance "portalmercederes" instead of simply "market" for a turn that mentions Portal de Mercederes. 
              If an item has been bought or is central to a turn, always select an image that best represents the item without being too specific. For instance, if Maria buys dandelion root, select "root" from imagemap.
               **Ensure to match singular/plural forms (e.g., 'goats' should match 'goat' in the imageMap if no exact match is found).**
              3. Avoid selecting a specific NPC's image unless their name is clearly mentioned. However, generic NPC images tagged as such in imagemap.js are fine to use when a non named NPC is featured (for instance, dons, enslavedperson, priest, bandito, townsfolk, child, shopkeeper, priest, ranchero, soldier, scholar, physician, mestizo, etc)
              4. You can use non-NPC images to evoke the scene or atmosphere when appropriate. This is the final fallback. Be creative here. Avoid repeating the same image.
              5. As a final fallback, you can suggest an appropriate emoji. 

              Available images and their associated tags:
              ${imageMapDescription}

              Respond in this format:
              
      1. Selected Image: [Provide the exact key from imageMap. The key must match one of the provided image names—do not invent keys. Stick to valid entries without spaces or underscores.]
      2. Caption: [A brief but vivid description of the image. If an NPC is the focus, begin with their full name. No more than 6-7 words.]
      3. Description: [Give a historically accurate explanation of Maria's experience at that moment, focusing on any mentioned NPCs, objects, or surroundings. Always include sensory details: sights, sounds, smells, tactile sensations, and any other relevant emotions or proprioception. Maximum of three sentences. Do not include time or location unless they are clearly stated in the context. This should be written in a fragmentary way emphasizing intense specificity, i.e. instead of saying "It is a summer evening and Maria can hear crickets chirping from her window" you might say "Crickets chirping. Maria sitting alone at her window, evening breeze cool on her phase."]
      4. Reasoning: [Explain why you selected this specific key from the imageMap. Be clear and concise.]

       REMEMBER: Ensure that when a named NPC appears in the narrative text, their corresponding image key from imageMap is used IF their name matches an imageMap entry (otherwise use the most appropriate non-named image to show an NPC). Prioritize exact matches for named NPCs over generic or descriptive matches.
  If no named NPC is mentioned, use context-based images as before.
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

// Helper function to calculate Levenshtein distance
const levenshteinDistance = (a, b) => {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]).map((row, i) =>
    row.concat(Array.from({ length: b.length }, (_, j) => (i === 0 ? j + 1 : 0)))
  );

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
};

// Fuzzy match function to find best matching key
const fuzzyMatchImage = (selectedKey) => {
  const normalizedKey = selectedKey.toLowerCase();
  let closestMatch = null;
  let smallestDistance = Infinity;

  // Try to find an imageMap key that includes the selectedKey or has a tag that matches
  for (const [key, value] of Object.entries(imageMap)) {
    if (value && value.tags && Array.isArray(value.tags)) {
      // Check key similarity using Levenshtein distance
      const keyDistance = levenshteinDistance(normalizedKey, key);
      if (keyDistance < smallestDistance) {
        closestMatch = key;
        smallestDistance = keyDistance;
      }

      // Check tags similarity
      value.tags.forEach((tag) => {
        const tagDistance = levenshteinDistance(normalizedKey, tag);
        if (tagDistance < smallestDistance) {
          closestMatch = key;
          smallestDistance = tagDistance;
        }
      });
    }
  }

  // Return closest match only if it is reasonably similar
  return smallestDistance <= 2 ? closestMatch : null;  // Set threshold for similarity
};


  // Validate the selected image or fallback
if (selectedImage) {
  let normalizedImageKey = selectedImage.toLowerCase();

  if (!imageMap.hasOwnProperty(normalizedImageKey) && !/^\p{Emoji}$/u.test(selectedImage)) {
    // Attempt to fuzzy match with the imageMap
    const fuzzyMatchedImage = fuzzyMatchImage(normalizedImageKey);
    if (fuzzyMatchedImage) {
      console.log(`Fuzzy match found: ${fuzzyMatchedImage}`);
      normalizedImageKey = fuzzyMatchedImage;
    } else {
      console.warn(`Invalid image selected: ${selectedImage}. Falling back to default.`);
      normalizedImageKey = 'default';
    }
  }

  // Reassign the selectedImage to either a valid image or default
  selectedImage = normalizedImageKey;
}

// Log the selected image key for debugging
console.log(`Selected Image Key: ${selectedImage}`);


      // **Add this console log to track the selected image key**
    console.log(`Selected Image Key: ${selectedImage}`);

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
