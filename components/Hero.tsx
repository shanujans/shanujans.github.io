import React, { useState, useEffect, useRef } from 'react';

const roles = [
  'IT Professional',
  'Python Junior Developer',
  'Cybersecurity Enthusiast',
  'AI/ML Enthusiast',
  'Quantum Computing Explorer',
];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Typewriter
  useEffect(() => {
    if (isPaused) return;
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
      } else {
        setIsPaused(true);
        timeout = setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
      } else {
        setIsDeleting(false);
        setRoleIndex(i => (i + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, isPaused, roleIndex]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const stats = [
    { value: '7+', label: 'Projects' },
    { value: '4+', label: 'Years Exp.' },
    { value: '4+', label: 'Tech Stacks' },
    { value: '∞', label: 'Curiosity' },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden scroll-mt-20"
    >
      {/* Glow orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="glow-orb w-[32rem] h-[32rem] bg-[#00ff9d] top-1/3 left-1/4 opacity-20" style={{ animation: 'orbFloat1 8s ease-in-out infinite' }} />
        <div className="glow-orb w-[28rem] h-[28rem] bg-[#7700ff] bottom-1/4 right-1/4 opacity-20" style={{ animation: 'orbFloat2 10s ease-in-out infinite' }} />
        <div className="glow-orb w-64 h-64 bg-[#00b3ff] top-1/4 right-1/3 opacity-10" style={{ animation: 'orbFloat1 12s ease-in-out infinite reverse' }} />
        <div className="scanline" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff9d]/30 bg-[#00ff9d]/5 mb-6 hero-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
            <span className="font-jetbrains-mono text-[#00ff9d] text-xs tracking-widest">AVAILABLE FOR WORK</span>
          </div>

          {/* Name with glitch */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 glitch-text hero-fade-in-up"
            data-text="Shanujan Suresh"
            style={{ animationDelay: '150ms' }}
          >
            Shanujan Suresh
          </h1>

          {/* Typewriter role */}
          <div className="h-12 flex items-center justify-center mb-6 hero-fade-in-up" style={{ animationDelay: '300ms' }}>
            <span className="font-jetbrains-mono text-xl md:text-2xl text-[#00b3ff]">
              {displayed}
              <span className="inline-block w-0.5 h-6 bg-[#00b3ff] ml-0.5 animate-pulse align-middle" />
            </span>
          </div>

          <p
            className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed hero-fade-in-up"
            style={{ animationDelay: '450ms' }}
          >
            Passionate IT professional transitioning into AI/ML, Cybersecurity, and Python automation. Building tomorrow's solutions today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-16 hero-fade-in-up" style={{ animationDelay: '600ms' }}>
            <a href="#projects" onClick={e => scrollTo(e, '#projects')} className="btn-primary magnetic-btn">
              <span>View My Work</span>
              <i className="fas fa-arrow-right ml-2" />
            </a>
            <a href="#contact" onClick={e => scrollTo(e, '#contact')} className="btn-secondary magnetic-btn">
              <span>Contact Me</span>
            </a>
            <a href="/Shanujan-CV.pdf" download="Shanujan-Suresh-CV.pdf" className="btn-tertiary magnetic-btn">
              <span>Download CV</span>
              <i className="fas fa-download ml-2" />
            </a>
          </div>

          {/* Stats strip */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto hero-fade-in-up"
            style={{ animationDelay: '750ms' }}
          >
            {stats.map(s => (
              <div
                key={s.label}
                className="p-4 rounded border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="text-3xl font-bold text-[#00ff9d] font-jetbrains-mono">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1 tracking-wider uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hero-fade-in-up" style={{ animationDelay: '900ms' }}>
        <span className="font-jetbrains-mono text-xs text-gray-500 tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#00ff9d] to-transparent" style={{ animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
};

export default Hero;
