import React from 'react';
import FadeIn from './FadeIn';
import AnimatedText from './AnimatedText';
import ContactButton from './ContactButton';

const About: React.FC = () => (
  <section
    id="about"
    className="relative min-h-screen flex flex-col items-center justify-center py-20 px-6 md:px-10 overflow-x-clip"
    style={{ background: '#0C0C0C' }}
  >
    {/* Glow */}
    <div className="absolute inset-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(182,0,168,0.05), transparent)' }} />

    {/* Floating decorative blobs */}
    <FadeIn x={-60} delay={0.1} className="absolute left-4 top-24 hidden md:block">
      <div className="w-32 h-32 rounded-3xl opacity-20 border border-[#B600A8]/40"
        style={{ background: 'linear-gradient(135deg, #18011F, #B600A8)' }} />
    </FadeIn>
    <FadeIn x={60} delay={0.15} className="absolute right-4 top-32 hidden md:block">
      <div className="w-24 h-24 rounded-full opacity-15 border border-[#7621B0]/40"
        style={{ background: 'linear-gradient(135deg, #7621B0, #BE4C00)' }} />
    </FadeIn>
    <FadeIn x={-50} delay={0.2} className="absolute left-8 bottom-24 hidden md:block">
      <div className="w-20 h-20 rounded-2xl opacity-15 rotate-12 border border-[#BE4C00]/30"
        style={{ background: 'linear-gradient(135deg, #BE4C00, #B600A8)' }} />
    </FadeIn>
    <FadeIn x={50} delay={0.25} className="absolute right-8 bottom-32 hidden md:block">
      <div className="w-28 h-28 rounded-full opacity-10 border border-[#B600A8]/30"
        style={{ background: 'linear-gradient(135deg, #18011F, #7621B0)' }} />
    </FadeIn>

    {/* Heading */}
    <FadeIn y={30} className="relative z-10 mb-12">
      <h2
        className="hero-heading font-black uppercase text-center"
        style={{ fontSize: 'clamp(3rem, 12vw, 140px)', lineHeight: 1 }}
      >
        About me
      </h2>
    </FadeIn>

    {/* Animated text */}
    <div className="relative z-10 max-w-[560px] mx-auto mb-12 text-center">
      <AnimatedText
        text="With 4+ years of real-world experience, I focus on IT Support, integrating AI tools, and building agentic systems. I truly enjoy solving complex infrastructure problems and bringing projects like ARIA to life. Let's build something robust together!"
        className="text-xl font-medium text-[#D7E2EA] leading-relaxed"
      />
    </div>

    {/* Stats row */}
    <FadeIn y={20} delay={0.2} className="relative z-10 grid grid-cols-3 gap-6 mb-12 w-full max-w-lg">
      {[
        { v: '4+', l: 'Years IT Support' },
        { v: '8+', l: 'Projects Built'   },
        { v: '1',  l: 'Live AI Chatbot'  },
      ].map(s => (
        <div key={s.l} className="text-center border border-white/10 rounded-2xl py-6 px-4"
          style={{ background: 'rgba(255,255,255,0.03)' }}>
          <div className="text-4xl font-black text-[#D7E2EA]">{s.v}</div>
          <div className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 mt-1 font-light">{s.l}</div>
        </div>
      ))}
    </FadeIn>

    <FadeIn y={20} delay={0.3} className="relative z-10">
      <ContactButton label="Let's Connect" />
    </FadeIn>
  </section>
);

export default About;
