import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
          className="fixed top-28 left-1/2 transform -translate-x-1/2 z-[100] bg-bg-surface/95 backdrop-blur-xl border border-border-glass px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3"
        >
          <CheckCircle2 className="text-status-success" size={20} />
          <span className="text-text-primary font-medium tracking-wide font-sans text-sm">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
