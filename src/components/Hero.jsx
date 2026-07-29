import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <div className="w-full max-w-4xl flex flex-col items-center justify-center text-center mt-12 md:mt-24 mb-16 md:mb-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-7xl font-serif font-bold text-glow mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-brand-gold via-yellow-100 to-brand-gold-dark">
          Transform Modern English<br />Into Shakespearean Poetry
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed font-sans font-light mb-12">
          Let AI rewrite your words in the timeless language of William Shakespeare. Experience the elegance of the Renaissance in a single click.
        </p>
        
        <button 
          onClick={() => document.getElementById('translator')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-bg-primary bg-gradient-to-r from-brand-gold to-brand-gold-dark rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-1 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        >
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
          <span className="relative flex items-center gap-2 uppercase tracking-widest text-sm">
            Start Translating
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown size={18} strokeWidth={3} />
            </motion.div>
          </span>
        </button>
      </motion.div>
    </div>
  )
}
