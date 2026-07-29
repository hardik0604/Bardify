import { GitBranch, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-32 pb-8 border-t border-border-glass pt-8 flex flex-col md:flex-row items-center justify-between text-text-muted/60 text-sm font-sans px-8">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        Made with React <Heart size={14} className="text-status-error" /> Powered by AI
      </div>
      <div className="flex items-center gap-2">
        &copy; {new Date().getFullYear()} Hardik. All rights reserved.
      </div>
    </footer>
  )
}
