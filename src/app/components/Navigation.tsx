import { useState } from 'react';

interface NavigationProps {
  onBookingClick: () => void;
  onAccountClick: () => void;
}

export default function Navigation({ onBookingClick, onAccountClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-12">
            <h4 className="tracking-wider">NATURE</h4>
            <div className="hidden md:flex gap-8 text-sm">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">Philosophy</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onAccountClick}
              className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              My Account
            </button>
            <button
              onClick={onBookingClick}
              className="px-6 py-2.5 bg-foreground text-background rounded-full text-sm hover:shadow-lg transition-all"
            >
              Book Now
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10"
            >
              <div className="space-y-1.5">
                <div className={`w-5 h-px bg-foreground transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <div className={`w-5 h-px bg-foreground transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-5 h-px bg-foreground transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-6 space-y-4">
            <a href="#services" className="block text-sm text-muted-foreground hover:text-foreground">Services</a>
            <a href="#about" className="block text-sm text-muted-foreground hover:text-foreground">Philosophy</a>
            <a href="#contact" className="block text-sm text-muted-foreground hover:text-foreground">Contact</a>
            <button onClick={onAccountClick} className="block text-sm text-muted-foreground hover:text-foreground">
              My Account
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
