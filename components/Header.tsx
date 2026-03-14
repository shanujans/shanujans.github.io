import React, { useState, useEffect } from 'react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#services', label: 'Services' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navLinks.map(l => l.href.slice(1));
      let current = 'home';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a14]/85 backdrop-blur-md border-b border-[#00ff9d]/10 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="#home"
            onClick={e => scrollTo(e, '#home')}
            className="font-jetbrains-mono text-xl font-bold text-white hover:text-[#00ff9d] transition-colors duration-300 group"
          >
            <span className="text-[#00ff9d] group-hover:text-white transition-colors">&lt;</span>
            Shanujan
            <span className="text-[#7700ff]"> /</span>
            <span className="text-[#00ff9d] group-hover:text-white transition-colors">&gt;</span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => scrollTo(e, link.href)}
                  className={`relative px-4 py-2 text-sm font-medium font-jetbrains-mono transition-all duration-300 rounded ${
                    isActive
                      ? 'text-[#00ff9d]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded bg-[#00ff9d]/10 border border-[#00ff9d]/30"
                      style={{ boxShadow: '0 0 12px rgba(0,255,157,0.1)' }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              );
            })}
            <a
              href="/Shanujan-CV.pdf"
              download
              className="ml-4 px-4 py-2 text-sm font-jetbrains-mono font-medium border border-[#00ff9d] text-[#00ff9d] rounded hover:bg-[#00ff9d] hover:text-[#0a0a14] transition-all duration-300"
              style={{ boxShadow: '0 0 8px rgba(0,255,157,0.3)' }}
            >
              Resume ↓
            </a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-[#00ff9d] focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(10,10,20,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <nav className="flex flex-col items-center gap-4 py-8 border-t border-[#00ff9d]/10">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={e => scrollTo(e, link.href)}
              className={`font-jetbrains-mono text-lg transition-colors duration-300 ${
                activeSection === link.href.slice(1) ? 'text-[#00ff9d]' : 'text-gray-300 hover:text-[#00ff9d]'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="/Shanujan-CV.pdf" download className="btn-primary mt-2">Resume ↓</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
