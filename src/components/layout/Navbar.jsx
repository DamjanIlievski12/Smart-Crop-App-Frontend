import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import Logo from '../ui/Logo';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop nav actions */}
        <nav className="hidden md:flex items-center gap-3">
          <Button variant="ghost">Login</Button>
          <Button variant="primary">Get Started</Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200/60 px-6 py-4 flex flex-col gap-3">
          <Button variant="ghost" className="w-full justify-center">Login</Button>
          <Button variant="primary" className="w-full justify-center">Get Started</Button>
        </div>
      )}
    </header>
  );
}
