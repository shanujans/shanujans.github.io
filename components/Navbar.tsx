import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CVRequestModal from './CVRequestModal';

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact'  },
];

const Navbar: React.FC = () => {
  const [visible, setVisible]   = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvOpen, setCvOpen]     = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      // Show when scrolling up or near top; hide when scrolling down
      if (currentY < 60) {
        setVisible(true);
      } else if (currentY > lastY.current + 6) {
        setVisible(false);
        setMenuOpen(false);
      } else if (currentY < lastY.current - 6) {
        setVisible(true);
      }
      lastY.current = currentY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <CVRequestModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />

      <AnimatePresence>
        {visible && (
          <motion.header
            key="navbar"
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 w-full z-50"
            style={{ background: 'linear-gradient(to bottom, rgba(12,12,12,0.92), transparent)' }}
          >
            <div className="flex items-center justify-between px-5 md:px-10 py-5">
              {/* Logo */}
              <a
                href="#home"
                onClick={e => scrollTo(e, '#home')}
                className="font-black uppercase text-[#D7E2EA] tracking-tight text-base md:text-lg flex-shrink-0"
              >
                &lt;SHANUJAN /&gt;
              </a>

              {/* Desktop — CENTERED links */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-10 absolute left-1/2 -translate-x-1/2">
                {links.map(l => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={e => scrollTo(e, l.href)}
                    className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm lg:text-base hover:opacity-60 transition-opacity"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              {/* Right side — CV button */}
              <button
                onClick={() => setCvOpen(true)}
                className="hidden md:flex contact-btn text-xs px-6 py-2.5 flex-shrink-0"
              >
                Request CV
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="md:hidden text-[#D7E2EA] flex-shrink-0"
                aria-label="Menu"
              >
                <div className="w-6 flex flex-col gap-1.5">
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden md:hidden"
                  style={{ background: 'rgba(12,12,12,0.98)' }}
                >
                  <div className="flex flex-col items-center gap-6 py-8 px-6">
                    {links.map(l => (
                      <a
                        key={l.label}
                        href={l.href}
                        onClick={e => scrollTo(e, l.href)}
                        className="text-[#D7E2EA] font-medium uppercase tracking-wider text-lg hover:opacity-60 transition-opacity"
                      >
                        {l.label}
                      </a>
                    ))}
                    <button
                      onClick={() => { setCvOpen(true); setMenuOpen(false); }}
                      className="contact-btn text-sm px-8 py-3 mt-2"
                    >
                      Request CV
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.header>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;