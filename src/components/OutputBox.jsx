import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Feather } from 'lucide-react';

const OutputBox = memo(function OutputBox({ error, translatedText, isTranslating }) {
  const readAloud = () => {
    if (!translatedText || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const words = translatedText ? translatedText.split(" ") : [];

  return (
    <div className="flex-1 flex flex-col relative h-full rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-bg-surface/60 backdrop-blur-2xl rounded-2xl border border-border-glass shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] -z-10"></div>
      
      {translatedText && !isTranslating && !error && (
        <button 
          onClick={readAloud}
          aria-label="Read Aloud Translation"
          className="absolute top-6 right-6 z-20 text-text-muted hover:text-brand-gold bg-bg-card p-3 rounded-full border border-border-glass hover:border-brand-gold/50 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold shadow-lg"
          title="Listen"
        >
          <Volume2 size={20} />
        </button>
      )}

      <div className="flex-grow p-8 overflow-y-auto scrollbar-thin" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-status-error font-medium"
            >
              {error}
            </motion.p>
          ) : translatedText && !isTranslating ? (
            <motion.div
              key={translatedText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="text-2xl md:text-3xl text-brand-gold font-serif leading-relaxed italic pr-12 relative"
            >
              {/* Golden flash effect */}
              <motion.div 
                initial={{ opacity: 1, scale: 0.9 }}
                animate={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 bg-brand-gold/10 blur-xl rounded-full pointer-events-none"
              />
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease: "easeOut" }}
                  className="inline-block mr-3 mb-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl md:text-2xl text-text-muted/40 italic font-light mt-4"
            >
              Thy translated prose shall appear here...
              <span className="block text-xs mt-6 font-sans opacity-50 not-italic">Press <kbd className="font-mono bg-black/40 px-2 py-1 rounded">ESC</kbd> to clear output anytime.</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
        {isTranslating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-bg-primary/80 backdrop-blur-md rounded-2xl flex flex-col items-center justify-center z-10"
            role="status"
            aria-label="Translating"
          >
            <motion.div
              animate={{ 
                x: [-10, 10, -5, 15, -10],
                y: [0, -10, 5, -5, 0],
                rotate: [-5, 10, -5, 15, -5]
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <Feather size={48} className="text-brand-gold mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
            </motion.div>
            
            {/* Golden particles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
               {[...Array(5)].map((_, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 10, x: 0 }}
                   animate={{ opacity: [0, 1, 0], y: -50, x: (Math.random() - 0.5) * 50 }}
                   transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
                   className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-brand-gold rounded-full"
                 />
               ))}
            </div>

            <p className="text-brand-gold font-serif text-xl tracking-widest uppercase text-glow">
              Consulting the Bard...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default OutputBox;
