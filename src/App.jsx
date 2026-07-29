import Home from './pages/Home'
import { motion } from 'framer-motion'

function App() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col font-sans">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-bg-primary z-[-5]"></div>
      <div className="absolute inset-0 bg-radial-purple z-[-4]"></div>
      <div className="absolute inset-0 bg-radial-gold z-[-4]"></div>
      <div className="absolute inset-0 bg-noise z-[-3]"></div>
      
      {/* Floating Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-2]">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0.1, 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-1 h-1 bg-brand-gold rounded-full"
          />
        ))}
      </div>

      <Home />
    </div>
  )
}

export default App
