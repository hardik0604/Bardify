import { useState } from 'react';
import { Feather, Menu, X, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToTop = (e) => {
    e?.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToTranslator = (e) => {
    e?.preventDefault();
    document.getElementById('translator')?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleShare = async (e) => {
    e?.preventDefault();
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Bardify - AI Shakespeare Translator',
          text: 'Transform modern English into the timeless language of William Shakespeare!',
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('App link copied to clipboard!');
      }
    } catch (err) {
      console.error(err);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full mt-6 py-4 px-8 flex items-center justify-between rounded-2xl backdrop-blur-xl bg-bg-card/40 border border-border-glass shadow-2xl sticky top-6 z-50 transition-all duration-300">
      <div 
        className="flex items-center gap-4 group cursor-pointer" 
        onClick={scrollToTop}
        aria-label="Bardify Home"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-gold to-brand-gold-dark flex items-center justify-center text-bg-primary shadow-lg shadow-brand-gold/20 transition-all duration-500 transform group-hover:scale-105 group-hover:rotate-6 border border-brand-gold/50">
          <Feather size={24} strokeWidth={2.5} />
        </div>
        <h1 className="text-2xl font-serif font-bold tracking-wide text-text-primary group-hover:text-brand-gold transition-colors duration-300">
          Bardify<span className="text-brand-purple">.</span>
        </h1>
      </div>
      
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">

        <button onClick={scrollToTranslator} className="hover:text-brand-gold transition-colors focus:outline-none">Translator</button>
        <button onClick={handleShare} className="hover:text-brand-gold transition-colors flex items-center gap-2 focus:outline-none">
          <Share2 size={16} /> Share
        </button>
      </nav>
      
      <div className="flex md:hidden">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-text-muted hover:text-brand-gold focus:outline-none p-2"
          aria-label="Open Mobile Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full bg-bg-surface/95 backdrop-blur-xl border border-border-glass rounded-2xl p-6 shadow-2xl flex flex-col gap-6 md:hidden z-[100]"
          >
            <div className="flex justify-between items-center border-b border-border-glass pb-4">
              <span className="font-serif font-bold text-brand-gold">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-text-muted hover:text-text-primary focus:outline-none">
                <X className="w-6 h-6" />
              </button>
            </div>

            <button onClick={scrollToTranslator} className="text-left text-lg font-medium text-text-muted hover:text-brand-gold focus:outline-none">Translator</button>
            <button onClick={handleShare} className="text-left text-lg font-medium text-text-muted hover:text-brand-gold flex items-center gap-2 focus:outline-none">
              <Share2 size={18} /> Share App
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
