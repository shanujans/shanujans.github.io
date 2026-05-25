import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import Magnet from './Magnet';
import FadeIn from './FadeIn';
import CVRequestModal from './CVRequestModal';

const LOTTIE_URL = 'https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json';

const Hero: React.FC = () => {
  const [animData, setAnimData]   = useState<object | null>(null);
  const [cvOpen, setCvOpen]       = useState(false);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    fetch(LOTTIE_URL).then(r => r.json()).then(d => setAnimData(d)).catch(() => {});
  }, []);

  // Hide scroll indicator after user scrolls
  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 60) setShowScroll(false); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <CVRequestModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />

      <section
        id="home"
        className="relative flex flex-col overflow-x-clip"
        style={{ background: '#0C0C0C', minHeight: '100svh' }}
      >
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 85%, rgba(182,0,168,0.09), transparent)' }} />

        {/* Navbar spacer */}
        <div className="h-24 flex-shrink-0" />

        {/* Hero heading - FIXED: Changed leading-none to leading-[1.15] to prevent mobile clip, added mobile line break */}
        <FadeIn y={40} delay={0.15} className="px-5 md:px-12 flex-shrink-0 relative z-20">
          <h1
            className="font-black uppercase tracking-tight leading-[1.15] w-full"
            style={{
              fontSize: 'clamp(2rem, 12vw, 140px)',
              background: 'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            hi, i'm <br className="block md:hidden" /> shanujan.
          </h1>
        </FadeIn>

        {/* Portrait — FIXED: Changed bottom-16 to bottom-[18%] to lift it above the text on mobile */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[18%] md:bottom-0 z-10 pointer-events-none md:pointer-events-auto"
          style={{ width: 'min(420px, 75vw)' }}
        >
          <FadeIn y={30} delay={0.6}>
            <Magnet strength={0.18}>
              {animData ? (
                <Lottie animationData={animData} loop autoplay style={{ width: '100%' }} />
              ) : (
                <div className="w-full flex items-center justify-center" style={{ aspectRatio: '1' }}>
                  <span style={{ fontSize: 'clamp(4rem, 20vw, 8rem)' }}>👨‍💻</span>
                </div>
              )}
            </Magnet>
          </FadeIn>
        </div>

        {/* Bottom bar */}
        <div className="mt-auto pb-8 px-5 md:px-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 relative z-20">
          
          {/* FIXED: Added a subtle glass background on mobile so text is perfectly readable if it ever overlaps */}
          <FadeIn y={20} delay={0.3}>
            <div className="bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-3 -ml-3 md:p-0 md:m-0 rounded-xl">
              <p
                className="text-[#D7E2EA] font-light uppercase leading-relaxed max-w-[240px] md:max-w-[280px]"
                style={{ fontSize: 'clamp(0.65rem, 1.8vw, 0.9rem)' }}
              >
                an it support &amp; ai developer driven by building autonomous agents and robust systems
              </p>
            </div>
          </FadeIn>

          <FadeIn y={20} delay={0.4}>
            <button className="contact-btn" onClick={() => setCvOpen(true)}>
              Request CV
            </button>
          </FadeIn>
        </div>

        {/* Animated scroll indicator */}
        <AnimatePresence>
          {showScroll && (
            <motion.div
              key="scroll"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: [0, 6, 0], transition: { y: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' }, opacity: { duration: 0.5 } } }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.4 } }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            >
              <span
                className="font-light uppercase tracking-[0.35em] text-[#D7E2EA]/40"
                style={{ fontSize: '0.6rem' }}
              >
                scroll
              </span>
              <div className="flex flex-col items-center gap-0.5">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                    className="w-px rounded-full"
                    style={{ height: i === 1 ? '10px' : '6px', background: '#B600A8' }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Hero;