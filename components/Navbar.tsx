import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CVRequestModal from './CVRequestModal';

const links = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvOpen, setCvOpen]     = useState(false);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <CVRequestModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6"
        style={{ background: 'linear-gradient(to bottom, rgba(12,12,12,0.95), transparent)' }}
      >
        {/* Logo */}
        <a href="#home" onClick={e => scrollTo(e, '#home')}
          className="font-black uppercase text-[#D7E2EA] tracking-tight text-xl">
          &lt;Shanujan /&gt;
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={e => scrollTo(e, l.href)}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-[1.1rem] hover:opacity-70 transition-opacity">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => setCvOpen(true)}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-[1.1rem] hover:opacity-70 transition-opacity border border-[#D7E2EA]/30 rounded-full px-5 py-1.5"
          >
            Request CV
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(o => !o)} className="md:hidden text-[#D7E2EA]" aria-label="Menu">
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        className="fixed top-20 left-0 w-full z-40 overflow-hidden"
        style={{ background: 'rgba(12,12,12,0.98)' }}
      >
        <div className="flex flex-col items-center gap-6 py-8">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={e => scrollTo(e, l.href)}
              className="text-[#D7E2EA] font-medium uppercase tracking-wider text-lg hover:opacity-70">
              {l.label}
            </a>
          ))}
          <button onClick={() => { setCvOpen(true); setMenuOpen(false); }} className="contact-btn text-sm px-8 py-3">
            Request CV
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
