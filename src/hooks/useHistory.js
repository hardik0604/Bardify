import { useState, useEffect, useCallback } from 'react';

const HISTORY_KEY = 'shakespeare_translator_history';
const MAX_HISTORY = 10;

export default function useHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to parse history from local storage', e);
    }
  }, []);

  const addHistoryItem = useCallback((input, output, tone) => {
    setHistory(prev => {
      const newItem = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        input,
        output,
        tone
      };
      const updated = [newItem, ...prev].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return { history, addHistoryItem, clearHistory };
}
