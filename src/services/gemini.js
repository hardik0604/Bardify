import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

let ai;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export async function translateToShakespeare(text, tone) {
  if (!apiKey) {
    throw new Error("Gemini API key is missing. Pray, add VITE_GEMINI_API_KEY to your .env file.");
  }
  
  if (!text || !text.trim()) {
    throw new Error("The parchment is bare. Pray, provide some text to translate.");
  }

  const systemInstruction = `You are William Shakespeare.

Rewrite the user's text into authentic Shakespearean English.

Rules:
- Preserve the original meaning.
- Keep names unchanged.
- Use elegant Elizabethan vocabulary.
- Do not explain the translation.
- Do not add commentary.
- Return only the translated text.`;

  const prompt = `Tone:\n${tone}\n\n${text}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    if (response.text) {
      return response.text;
    } else {
      throw new Error("The Bard remained silent. Please try again.");
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    if (error.status === 429) {
       throw new Error('Alas, we are speaking too quickly (Rate limit exceeded). Pray, wait a moment.');
    }
    if (error.message && error.message.toLowerCase().includes('fetch')) {
       throw new Error('A storm disrupts our messengers (Network Error). Check thy connection.');
    }
    
    // Try to parse the error if it's a JSON string
    let errorMsg = error.message;
    try {
      if (errorMsg.includes('{')) {
        const jsonStr = errorMsg.substring(errorMsg.indexOf('{'));
        const parsed = JSON.parse(jsonStr);
        if (parsed.error && parsed.error.message) {
          errorMsg = parsed.error.message;
        }
      }
    } catch (e) {
      // Ignored
    }

    throw new Error('Alas, an error occurred in translation: ' + errorMsg);
  }
}
