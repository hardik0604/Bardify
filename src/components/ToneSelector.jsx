import { memo } from 'react';
import { Feather, BookOpen, Crown } from 'lucide-react';

const ToneSelector = memo(function ToneSelector({ styleTone, setStyleTone }) {
  const options = [
    { value: 'Mild', icon: <Feather size={16} />, label: 'Mild' },
    { value: 'Classic', icon: <BookOpen size={16} />, label: 'Classic' },
    { value: 'Dramatic', icon: <Crown size={16} />, label: 'Dramatic' },
  ];

  return (
    <div className="flex bg-bg-surface/50 p-1.5 rounded-2xl border border-border-glass shadow-inner backdrop-blur-md">
      {options.map((opt) => {
        const isActive = styleTone === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => setStyleTone(opt.value)}
            className={`flex flex-1 items-center justify-center gap-1.5 md:gap-2 px-1 py-2 md:px-6 md:py-2.5 rounded-xl text-[10px] md:text-sm font-bold transition-all duration-300 ${
              isActive 
                ? 'bg-bg-card shadow-lg text-brand-gold border border-brand-gold/30 scale-[1.02]' 
                : 'text-text-muted hover:text-text-primary hover:bg-bg-surface'
            }`}
            aria-pressed={isActive}
            aria-label={`Select ${opt.label} tone`}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
});

export default ToneSelector;
