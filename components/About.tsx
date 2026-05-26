import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './FadeIn';

/* ── Fixed AnimatedText with correct colour timing ───────────── */
const TEXT = "With 4+ years of real-world IT Support experience, I focus on integrating AI tools and building agentic systems. I deployed ARIA — a live AI chatbot using Google Gemini API and Cloudflare Workers. Let's build something robust together!";

const AnimatedParagraph: React.FC = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = TEXT.split(' ');

  return (
    <p
      ref={ref}
      className="font-medium text-center leading-relaxed"
      style={{
        fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '0 0.3em',
        maxWidth: '560px',
        margin: '0 auto',
      }}
    >
      {words.map((word, wi) => {
        const start = wi / words.length;
        const end   = (wi + 1) / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
        return (
          <motion.span key={wi} style={{ opacity, color: '#D7E2EA' }}>
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

const About: React.FC = () => {
  // ✅ Smoothly scroll to the contact form in the footer
  const handleConnectClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-center py-20 px-5 md:px-10 overflow-x-clip"
      style={{ background: '#0C0C0C', minHeight: '100svh' }}
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(182,0,168,0.05), transparent)' }} />

      {/* Floating blobs — hidden on small screens */}
      <FadeIn x={-60} delay={0.1} className="absolute left-4 top-24 hidden lg:block">
        <div className="w-28 h-28 rounded-3xl opacity-20 border border-[#B600A8]/40"
          style={{ background: 'linear-gradient(135deg,#18011F,#B600A8)' }} />
      </FadeIn>
      <FadeIn x={60} delay={0.15} className="absolute right-4 top-32 hidden lg:block">
        <div className="w-20 h-20 rounded-full opacity-15 border border-[#7621B0]/40"
          style={{ background: 'linear-gradient(135deg,#7621B0,#BE4C00)' }} />
      </FadeIn>
      <FadeIn x={-50} delay={0.2} className="absolute left-8 bottom-24 hidden lg:block">
        <div className="w-16 h-16 rounded-2xl opacity-15 rotate-12 border border-[#BE4C00]/30"
          style={{ background: 'linear-gradient(135deg,#BE4C00,#B600A8)' }} />
      </FadeIn>
      <FadeIn x={50} delay={0.25} className="absolute right-8 bottom-32 hidden lg:block">
        <div className="w-24 h-24 rounded-full opacity-10 border border-[#B600A8]/30"
          style={{ background: 'linear-gradient(135deg,#18011F,#7621B0)' }} />
      </FadeIn>

      {/* Heading */}
      <FadeIn y={30} className="relative z-10 mb-10 md:mb-14">
        <h2
          className="font-black uppercase text-center"
          style={{
            fontSize: 'clamp(2.8rem, 11vw, 130px)',
            lineHeight: 1,
            background: 'linear-gradient(180deg,#646973 0%,#BBCCD7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          About me
        </h2>
      </FadeIn>

      {/* Animated text — per-word colour reveal */}
      <div className="relative z-10 mb-10 md:mb-12 w-full px-2">
        <AnimatedParagraph />
      </div>

      {/* Stats row */}
      <FadeIn y={20} delay={0.2} className="relative z-10 w-full max-w-lg mb-10 md:mb-12 px-2">
        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {[
            { v: '4+', l: 'Years IT Support' },
            { v: '8+', l: 'Projects Built'   },
            { v: '4+',  l: 'Live AI Chatbot'  },
          ].map(s => (
            <div
              key={s.l}
              className="text-center rounded-2xl py-5 px-2 md:px-4 border border-white/8"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <div
                className="font-black"
                style={{
                  fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
                  background: 'linear-gradient(123deg,#B600A8,#7621B0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.v}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-[#D7E2EA]/50 mt-1 font-light leading-tight">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* ✅ Now calls handleConnectClick instead of opening the CV Request Modal */}
      <FadeIn y={20} delay={0.3} className="relative z-10">
        <button className="contact-btn" onClick={handleConnectClick}>
          Let's Connect
        </button>
      </FadeIn>
    </section>
  );
};

export default About;