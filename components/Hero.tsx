import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import Magnet from './Magnet';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

// Hacker animation from LottieFiles
const LOTTIE_URL = 'https://assets3.lottiefiles.com/packages/lf20_w51pcehl.json';

const Hero: React.FC = () => {
  const [animData, setAnimData] = React.useState<object | null>(null);

  React.useEffect(() => {
    fetch(LOTTIE_URL)
      .then(r => r.json())
      .then(d => setAnimData(d))
      .catch(() => setAnimData(null));
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col overflow-x-clip"
      style={{ background: '#0C0C0C' }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(182,0,168,0.08), transparent)' }} />

      {/* Navbar spacer */}
      <div className="h-24 flex-shrink-0" />

      {/* Hero heading */}
      <FadeIn y={40} delay={0.15} className="px-6 md:px-12 flex-shrink-0">
        <h1
          className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full"
          style={{ fontSize: 'clamp(2.8rem, 13vw, 160px)' }}
        >
          hi, i'm shanujan.
        </h1>
      </FadeIn>

      {/* Portrait — centered absolutely */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 z-10 w-[min(480px,80vw)]">
        <FadeIn y={30} delay={0.6}>
          <Magnet strength={0.2}>
            {animData ? (
              <Lottie animationData={animData} loop autoplay style={{ width: '100%' }} />
            ) : (
              /* Fallback if Lottie fails to load */
              <div className="w-full aspect-square flex items-center justify-center">
                <div className="text-[8rem]">👨‍💻</div>
              </div>
            )}
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="mt-auto pb-10 px-6 md:px-12 flex items-end justify-between relative z-20">
        <FadeIn y={20} delay={0.3}>
          <p
            className="text-[#D7E2EA] font-light uppercase max-w-[260px] leading-relaxed"
            style={{ fontSize: 'clamp(0.7rem, 1.2vw, 1rem)' }}
          >
            an it support &amp; ai developer driven by building autonomous agents and robust systems
          </p>
        </FadeIn>

        <FadeIn y={20} delay={0.4}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20 opacity-30 pointer-events-none">
        <span className="text-[10px] text-[#D7E2EA] tracking-widest uppercase font-light">scroll</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #D7E2EA, transparent)' }} />
      </div>
    </section>
  );
};

export default Hero;
