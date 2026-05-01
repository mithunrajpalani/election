import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

async function listModels() {
  try {
    const response = await ai.models.list();
    // Assuming models might be an async iterable or an array
    for await (const model of response) {
      console.log(model.name);
    }
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
