import { motion, AnimatePresence } from 'framer-motion';
import { X, History as HistoryIcon, Trash2 } from 'lucide-react';

export default function History({ history, onLoadItem, onClear, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-bg-primary/80 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ x: '100%', boxShadow: '0 0 0 rgba(0,0,0,0)' }}
            animate={{ x: 0, boxShadow: '-20px 0 50px rgba(0,0,0,0.5)' }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-bg-surface/95 backdrop-blur-2xl border-l border-border-glass z-[70] flex flex-col shadow-2xl"
          >
            <div className="p-8 border-b border-border-glass flex justify-between items-center bg-bg-card/50">
              <h3 className="text-2xl font-serif text-brand-gold flex items-center gap-3 font-bold text-glow">
                <HistoryIcon size={24} /> Tale of Past
              </h3>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full border border-transparent hover:border-border-glass hover:bg-bg-surface text-text-muted hover:text-brand-gold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                aria-label="Close History"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scrollbar-thin">
              {history && history.length > 0 ? history.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, ease: "easeOut" }}
                  onClick={() => {
                    onLoadItem(item);
                    onClose();
                  }}
                  className="bg-bg-card/50 border border-border-glass p-6 rounded-2xl cursor-pointer hover:bg-bg-card hover:border-brand-purple/50 hover:shadow-[0_10px_30px_rgba(139,92,246,0.1)] transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                     <span className="text-[10px] font-bold text-brand-purple uppercase tracking-widest bg-brand-purple/10 px-3 py-1.5 rounded-lg border border-brand-purple/20">Load</span>
                  </div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono text-text-muted/60 bg-bg-primary px-2.5 py-1 rounded-md border border-border-glass">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-md mr-12">
                      {item.tone}
                    </span>
                  </div>
                  <p className="text-sm text-text-primary/70 line-clamp-2 mb-4 font-sans leading-relaxed">{item.input}</p>
                  <p className="text-lg text-brand-gold font-serif italic line-clamp-3 leading-relaxed">{item.output}</p>
                </motion.div>
              )) : (
                <div className="flex flex-col items-center justify-center h-full text-text-muted/50 font-serif italic gap-4">
                  <HistoryIcon size={48} className="opacity-20" />
                  <p>No tales have been spun yet.</p>
                </div>
              )}
            </div>
            
            {history && history.length > 0 && (
              <div className="p-8 border-t border-border-glass bg-bg-card/50">
                <button 
                  onClick={() => {
                    onClear();
                    onClose();
                  }}
                  className="w-full py-4 rounded-xl border border-status-error/30 text-status-error hover:bg-status-error/10 hover:border-status-error/50 transition-all duration-300 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-status-error"
                >
                  <Trash2 size={18} /> Clear History
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
