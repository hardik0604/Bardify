import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

let ai;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key is missing on the server.' });
  }

  try {
    const { text, tone, direction } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'The parchment is bare. Pray, provide some text to translate.' });
    }

    const systemInstruction = direction === 'toModern'
      ? `You are a modern English translator. Rewrite the user's Shakespearean text into clear, everyday modern English. Preserve the original meaning and keep names unchanged. Do not explain the translation or add commentary. Return only the translated text.`
      : `You are William Shakespeare.

Rewrite the user's text into authentic Shakespearean English.

Rules:
- Preserve the original meaning.
- Keep names unchanged.
- Use elegant Elizabethan vocabulary.
- Do not explain the translation.
- Do not add commentary.
- Return only the translated text.`;

    const prompt = `Tone:\n${tone || 'Default'}\n\n${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    if (response.text) {
      return res.status(200).json({ text: response.text });
    } else {
      return res.status(500).json({ error: 'The Bard remained silent. Please try again.' });
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    if (error.status === 429) {
       return res.status(429).json({ error: 'Alas, we are speaking too quickly (Rate limit exceeded). Pray, wait a moment.' });
    }
    if (error.message && error.message.toLowerCase().includes('fetch')) {
       return res.status(502).json({ error: 'A storm disrupts our messengers (Network Error). Check thy connection.' });
    }
    
    let errorMsg = error.message || 'Unknown error';
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

    return res.status(500).json({ error: 'Alas, an error occurred in translation: ' + errorMsg });
  }
}
