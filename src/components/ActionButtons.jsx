import { memo } from 'react';
import { motion } from 'framer-motion';
import { Eraser, Copy, Sparkles } from 'lucide-react';

const ActionButtons = memo(function ActionButtons({ onClear, onCopy, onSubmit, isTranslating, hasInput, hasOutput }) {
  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center justify-center sm:justify-end gap-3 sm:gap-4 mt-6">
      <motion.button
        whileHover={{ scale: (!hasInput && !hasOutput) ? 1 : 1.05 }}
        whileTap={{ scale: (!hasInput && !hasOutput) ? 1 : 0.95 }}
        onClick={onClear}
        disabled={!hasInput && !hasOutput}
        aria-label="Clear fields, Shortcut Control K"
        className="col-span-1 flex-1 px-2 sm:px-6 py-3 rounded-2xl bg-bg-surface border border-border-glass text-text-muted hover:text-text-primary hover:bg-bg-card transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-widest text-[10px] sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 shadow-lg"
      >
        <Eraser size={18} />
        Clear <span className="hidden sm:inline text-[10px] opacity-50 ml-1 font-mono tracking-tighter bg-black/30 px-1.5 py-0.5 rounded">CTRL+K</span>
      </motion.button>
      

      <motion.button
        whileHover={{ scale: !hasOutput ? 1 : 1.05 }}
        whileTap={{ scale: !hasOutput ? 1 : 0.95 }}
        onClick={onCopy}
        disabled={!hasOutput}
        aria-label="Copy translation to clipboard"
        className="col-span-1 flex-1 px-2 sm:px-6 py-3 rounded-2xl bg-bg-surface border border-border-glass text-text-muted hover:text-brand-purple hover:bg-bg-card hover:border-brand-purple/30 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-widest text-[10px] sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 shadow-lg"
      >
        <Copy size={18} /> Copy
      </motion.button>
      
      <motion.button
        whileHover={{ scale: (isTranslating || !hasInput) ? 1 : 1.05, y: (isTranslating || !hasInput) ? 0 : -2 }}
        whileTap={{ scale: (isTranslating || !hasInput) ? 1 : 0.95 }}
        onClick={onSubmit}
        disabled={isTranslating || !hasInput}
        aria-label="Convert to Shakespearean, Shortcut Control Enter"
        className="order-first sm:order-none col-span-2 sm:col-span-1 w-full sm:w-auto px-4 sm:px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-gold to-brand-gold-dark text-bg-primary hover:brightness-110 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs sm:text-sm font-extrabold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 relative overflow-hidden group"
      >
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
        <span className="relative flex items-center gap-2">
          <Sparkles size={18} className="group-hover:rotate-12 transition-transform duration-300" />
          Convert <span className="hidden sm:inline text-[10px] opacity-60 ml-1 font-mono tracking-tighter bg-black/20 px-1.5 py-0.5 rounded">CTRL+↵</span>
        </span>
      </motion.button>
    </div>
  );
});

export default ActionButtons;
