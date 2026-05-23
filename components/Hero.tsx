import React, { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import CVRequestModal from './CVRequestModal';

const roles = [
  'IT Support Specialist',
  'AI Tools Implementer',
  'BSc CS Student',
  'Service Desk Analyst',
  'Junior SRE Intern',
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex]   = useState(0);
  const [displayed, setDisplayed]   = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused]     = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef   = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const subtitleRef  = useRef<HTMLDivElement>(null);
  const descRef      = useRef<HTMLParagraphElement>(null);
  const btnsRef      = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(eyebrowRef.current,
      { opacity: 0, filter: 'blur(12px)', y: -10 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.9 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1 },
      '-=0.5'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.6'
    )
    .fromTo(descRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.5'
    )
    .fromTo(btnsRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    )
    .fromTo(
      statsRef.current ? Array.from(statsRef.current.children) : [],
      { opacity: 0, y: 20, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
      '-=0.3'
    );
  }, { scope: containerRef });

  // Typewriter
  useEffect(() => {
    if (isPaused) return;
    const current = roles[roleIndex];
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75);
      } else {
        setIsPaused(true);
        t = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 2400);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
      } else {
        setIsDeleting(false);
        setRoleIndex(i => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, isDeleting, isPaused, roleIndex]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const stats = [
    { value: '4+',  label: 'Years IT Support' },
    { value: '8+',  label: 'Projects Built' },
    { value: '10+', label: 'Integrations\nLive AI Chatbot' },
    { value: '🇱🇰',  label: 'Based in Sri Lanka' },
  ];

  return (
    <>
      <CVRequestModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />

      <section
        id="home"
        ref={containerRef}
        className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden scroll-mt-20"
      >
        {/* Glow orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="glow-orb w-[32rem] h-[32rem] bg-[#00ff9d] top-1/3 left-1/4 opacity-[0.14]"
            style={{ animation: 'orbFloat1 9s ease-in-out infinite' }} />
          <div className="glow-orb w-[28rem] h-[28rem] bg-[#7700ff] bottom-1/4 right-1/4 opacity-[0.14]"
            style={{ animation: 'orbFloat2 11s ease-in-out infinite' }} />
          <div className="glow-orb w-48 h-48 bg-[#00b3ff] top-1/4 right-1/3 opacity-[0.08]"
            style={{ animation: 'orbFloat1 14s ease-in-out infinite reverse' }} />
          <div className="scanline" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">

            {/* Eyebrow — GSAP blur-in */}
            <div ref={eyebrowRef} style={{ opacity: 0 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff9d]/30 bg-[#00ff9d]/5 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
                <span className="font-jetbrains-mono text-[#00ff9d] text-xs tracking-widest">
                  OPEN TO WORK — IT SUPPORT & AI TOOLS &nbsp;|&nbsp; BASED IN SRI LANKA 🇱🇰
                </span>
              </div>
            </div>

            {/* Title — display font + glitch */}
            <h1
              ref={titleRef}
              className="glitch-text mb-4"
              data-text="Shanujan Suresh"
              style={{
                opacity: 0,
                fontFamily: '"Instrument Serif", "Georgia", serif',
                fontSize: 'clamp(3.5rem, 10vw, 7rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#fff',
                fontStyle: 'italic',
              }}
            >
              Shanujan Suresh
            </h1>

            {/* Typewriter */}
            <div ref={subtitleRef} className="h-12 flex items-center justify-center mb-6" style={{ opacity: 0 }}>
              <span className="font-jetbrains-mono text-xl md:text-2xl text-[#00b3ff]">
                {displayed}
                <span className="inline-block w-0.5 h-6 bg-[#00b3ff] ml-0.5 animate-pulse align-middle" />
              </span>
            </div>

            {/* Description */}
            <p
              ref={descRef}
              className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ opacity: 0 }}
            >
              IT Support professional with 4+ years of hands-on experience, actively building skills in
              AI tools, automation, and agentic systems. Currently studying BSc Computer Science at
              University of the People.
            </p>

            {/* Buttons */}
            <div ref={btnsRef} className="flex flex-wrap justify-center gap-4 mb-16" style={{ opacity: 0 }}>
              <a href="#projects" onClick={e => scrollTo(e, '#projects')} className="btn-primary">
                <span>View My Work</span>
                <i className="fas fa-arrow-right ml-2" />
              </a>
              <button
                onClick={() => setCvModalOpen(true)}
                className="btn-tertiary"
              >
                <i className="fas fa-file-user mr-2 text-sm" />
                <span>Request CV</span>
              </button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {stats.map(s => (
                <div
                  key={s.label}
                  className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-[#00ff9d]/30 hover:-translate-y-1 transition-all duration-300"
                  style={{ opacity: 0 }}
                >
                  <div className="text-3xl font-bold text-[#00ff9d] font-jetbrains-mono">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1 tracking-wider uppercase leading-tight whitespace-pre-line">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none" style={{ opacity: 0.3 }}>
          <span className="font-jetbrains-mono text-[10px] text-gray-600 tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#00ff9d] to-transparent" style={{ animation: 'scrollPulse 2s ease-in-out infinite' }} />
        </div>
      </section>
    </>
  );
};

export default Hero;