import { useState, useCallback, useEffect } from 'react';
import useTranslation from '../hooks/useTranslation';
import useHistory from '../hooks/useHistory';
import ToneSelector from './ToneSelector';
import OutputBox from './OutputBox';
import ActionButtons from './ActionButtons';
import Toast from './Toast';
import History from './History';
import { motion } from 'framer-motion';
import { Sparkles, History as HistoryIcon } from 'lucide-react';



export default function Translator() {
  const {
    inputText,
    setInputText,
    translatedText,
    setTranslatedText,
    isTranslating,
    error,
    handleTranslate
  } = useTranslation();
  
  const { history, addHistoryItem, clearHistory } = useHistory();
  const [toastMsg, setToastMsg] = useState('');
  const [styleTone, setStyleTone] = useState('Classic');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const showToast = useCallback((msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  }, []);

  const onSubmit = useCallback(async () => {
    if (isTranslating || !inputText.trim()) return;
    const result = await handleTranslate(inputText, styleTone);
    if (result) {
      addHistoryItem(inputText, result, styleTone);
    }
  }, [inputText, styleTone, isTranslating, handleTranslate, addHistoryItem]);

  const handleToneChange = useCallback(async (newTone) => {
    setStyleTone(newTone);
    if (inputText.trim().length > 0 && !isTranslating) {
      const result = await handleTranslate(inputText, newTone);
      if (result) {
        addHistoryItem(inputText, result, newTone);
      }
    }
  }, [inputText, isTranslating, handleTranslate, addHistoryItem]);

  const onClear = useCallback(() => {
    setInputText('');
    setTranslatedText('');
  }, [setInputText, setTranslatedText]);

  const onCopy = useCallback(async () => {
    if (translatedText && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(translatedText);
        showToast('Translation copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  }, [translatedText, showToast]);

  const onDownload = useCallback(() => {
    if (!translatedText) return;
    const blob = new Blob([translatedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Shakespeare_Translation_${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('File downloaded successfully!');
  }, [translatedText, showToast]);

  const onSwap = useCallback(() => {
    if (!translatedText) return;
    setInputText(translatedText);
    setTranslatedText('');
  }, [translatedText, setInputText, setTranslatedText]);



  const onLoadHistoryItem = useCallback((item) => {
    setInputText(item.input);
    setTranslatedText(item.output);
    setStyleTone(item.tone);
    showToast('History item loaded!');
  }, [setInputText, setTranslatedText, setStyleTone, showToast]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        onSubmit();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault(); 
        onClear();
      }
      if (e.key === 'Escape') {
        setTranslatedText('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSubmit, onClear, setTranslatedText]);

  return (
    <div id="translator" className="w-full max-w-6xl flex flex-col relative items-center z-10">
      <Toast message={toastMsg} isVisible={!!toastMsg} />
      
      <div className="w-full flex justify-between items-end mb-6">
        <button 
          onClick={() => setIsHistoryOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bg-surface/50 backdrop-blur-md border border-border-glass text-text-muted hover:text-brand-gold hover:border-brand-gold/30 hover:bg-bg-card transition-all font-bold text-xs tracking-widest uppercase shadow-md"
        >
          <HistoryIcon size={16} /> History
        </button>
        <ToneSelector styleTone={styleTone} setStyleTone={handleToneChange} />
      </div>

      <div className="w-full bg-bg-card/40 backdrop-blur-2xl rounded-[2rem] p-6 md:p-10 border border-border-glass shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row gap-6 h-auto md:h-[500px]">
          
          <div className="flex-1 flex flex-col relative h-full rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-bg-surface/80 backdrop-blur-md rounded-2xl border border-border-glass transition-all duration-300 group-focus-within:border-brand-gold/50 group-focus-within:shadow-[0_0_30px_rgba(212,175,55,0.15)] -z-10"></div>
            


            <textarea
              aria-label="Input modern English text"
              className="flex-grow w-full bg-transparent p-5 pb-16 md:p-8 md:pb-16 text-text-primary placeholder-text-muted/40 focus:outline-none resize-none text-lg md:text-2xl font-light leading-relaxed scrollbar-thin rounded-2xl"
              placeholder="Enter your modern English..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
            
            <div className="absolute bottom-6 right-8 text-sm text-brand-gold/50 font-sans font-medium tracking-widest uppercase" aria-live="polite">
              {inputText.length} Chars
            </div>
          </div>

          <div className="flex items-center justify-center md:flex-col -mx-4 md:mx-2 z-20">
            <motion.button 
              onClick={onSwap}
              disabled={!translatedText}
              whileHover={{ scale: translatedText ? 1.15 : 1 }}
              whileTap={{ scale: translatedText ? 0.9 : 1 }}
              aria-label="Swap input and output text"
              className={`w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-xl transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple ${
                isTranslating 
                  ? 'bg-brand-purple/20 border-brand-purple text-brand-gold animate-pulse'
                  : translatedText 
                    ? 'bg-bg-surface border-brand-purple text-brand-purple hover:bg-brand-purple/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]' 
                    : 'bg-bg-surface border-border-glass text-text-muted/30 cursor-not-allowed'
              }`}
              title="Swap"
            >
              {isTranslating ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                  <Sparkles size={24} />
                </motion.div>
              ) : (
                <svg className="w-6 h-6 transform md:rotate-0 rotate-90" fill="none" stroke="currentColor" aria-hidden="true" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              )}
            </motion.button>
          </div>

          <OutputBox 
            error={error} 
            translatedText={translatedText} 
            isTranslating={isTranslating} 
          />
        </div>

        <div className="w-full mt-2">
          <ActionButtons 
            onClear={onClear}
            onCopy={onCopy}
            onSubmit={onSubmit}
            onDownload={onDownload}
            isTranslating={isTranslating}
            hasInput={inputText.trim().length > 0}
            hasOutput={!!translatedText}
          />
        </div>
      </div>

      <History 
        history={history} 
        onLoadItem={onLoadHistoryItem} 
        onClear={clearHistory} 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
      />
    </div>
  );
}
