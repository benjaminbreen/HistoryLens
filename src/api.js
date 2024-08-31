import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Allow usage in a browser environment (Use with caution)
});

export async function requestDalleImage(description) {
  try {
    const response = await openai.images.generate({
      prompt: `A highly detailed, Albrecht Durer-like pen and ink illustration of ${description} from a Renaissance apothecary's manual, drawn with sepia toned pen and occasional watercolor`,
      n: 1,
      size: "512x512",
    });

    const imageUrl = response.data[0].url;
    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}
