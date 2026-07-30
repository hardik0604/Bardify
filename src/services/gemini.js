export async function translateToShakespeare(text, tone, direction) {
  if (!text || !text.trim()) {
    throw new Error("The parchment is bare. Pray, provide some text to translate.");
  }

  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, tone, direction }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'The Bard remained silent. Please try again.');
    }

    if (data.text) {
      return data.text;
    } else {
      throw new Error("The Bard remained silent. Please try again.");
    }
  } catch (error) {
    console.error('API Error:', error);
    
    // Pass through custom errors from our API or fallback to generic network error
    throw new Error(error.message || 'Alas, an error occurred in translation.');
  }
}

