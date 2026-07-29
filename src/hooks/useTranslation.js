import { useState, useCallback } from 'react';
import { translateToShakespeare } from '../services/gemini';

export default function useTranslation() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslate = useCallback(async (text, tone) => {
    if (!text.trim()) return;
    
    setIsTranslating(true);
    setError(null);
    
    try {
      const result = await translateToShakespeare(text, tone);
      setTranslatedText(result);
      return result;
    } catch (err) {
      setError(err.message || 'Alas, the translation failed. Pray, try again.');
    } finally {
      setIsTranslating(false);
    }
  }, []);

  return {
    inputText,
    setInputText,
    translatedText,
    setTranslatedText,
    isTranslating,
    error,
    handleTranslate
  };
}
