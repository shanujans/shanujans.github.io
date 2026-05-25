import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';
import FadeIn from './FadeIn';

const PROJECTS = [
  {
    num: '01',
    category: 'AI Integration',
    name: 'ARIA Chatbot',
    desc: 'Live AI assistant deployed on this portfolio using Google Gemini API and Cloudflare Workers. Handles CORS, rate limiting, and API key security in production.',
    url: 'https://shanujan.is-a.dev',
    github: 'https://github.com/shanujans/shanujans.github.io',
    imgs: [
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1680016961103-5a93e3fd83f3?w=400&h=400&fit=crop',
    ],
    accent: '#B600A8',
  },
  {
    num: '02',
    category: 'Google AI Studio',
    name: 'Quantum Insight Forge',
    desc: 'AI application combining quantum computing concepts with Gemini generative AI. Built on Google AI Studio to analyze and visualize quantum data patterns.',
    url: 'https://github.com/shanujans/Quantum-Insight-Forge',
    github: 'https://github.com/shanujans/Quantum-Insight-Forge',
    imgs: [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=400&h=400&fit=crop',
    ],
    accent: '#7621B0',
  },
  {
    num: '03',
    category: 'Machine Learning',
    name: 'Loan Risk Predictor',
    desc: 'End-to-end ML package published on PyPI with CI/CD via GitHub Actions. Decision Tree model with 87.5% accuracy — learning project using AI assistance.',
    url: 'https://github.com/shanujans/loan-risk-prediction',
    github: 'https://github.com/shanujans/loan-risk-prediction',
    imgs: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=400&fit=crop',
    ],
    accent: '#BE4C00',
  },
];

const TOTAL = PROJECTS.length;

const StickyCard: React.FC<{
  project: typeof PROJECTS[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}> = ({ project, index, scrollYProgress }) => {
  const targetScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (TOTAL - 1 - index) * 0.04]
  );

  return (
    <div
      className="sticky"
      style={{ top: `${80 + index * 28}px` }}
    >
      <motion.div
        style={{
          scale: targetScale,
          transformOrigin: 'top center',
        }}
        className="border-2 border-[#D7E2EA]/20 rounded-[48px] p-8 md:p-10 mx-auto max-w-5xl"
        
      >
        {/* inner bg explicitly */}
        <div
          className="rounded-[40px] p-8 md:p-10"
          style={{
            background: '#0C0C0C',
            border: `2px solid rgba(215,226,234,0.15)`,
            scale: undefined,
          }}
        >
          {/* Top row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-6">
              <span
                className="font-black leading-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: project.accent }}
              >
                {project.num}
              </span>
              <div>
                <div className="text-xs uppercase tracking-widest text-[#D7E2EA]/50 font-light mb-1">
                  {project.category}
                </div>
                <h3
                  className="font-black uppercase text-[#D7E2EA]"
                  style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
                >
                  {project.name}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LiveProjectButton href={project.url} />
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA] hover:border-[#D7E2EA]/60 transition-colors"
              >
                <i className="fab fa-github" />
              </a>
            </div>
          </div>

          <p className="text-[#D7E2EA]/60 font-light max-w-xl mb-8 leading-relaxed">{project.desc}</p>

          {/* Image grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 h-[220px] md:h-[280px]">
            {/* Left col: 2 stacked */}
            <div className="flex flex-col gap-3 md:gap-4">
              {project.imgs.slice(0, 2).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-full flex-1 object-cover rounded-[28px]"
                  style={{ minHeight: 0 }}
                />
              ))}
            </div>
            {/* Right col: tall */}
            <img
              src={project.imgs[2]}
              alt=""
              className="w-full h-full object-cover rounded-[28px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="rounded-t-[60px] -mt-14 relative z-10 px-4 md:px-8 pt-24 pb-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn y={30}>
        <h2
          className="hero-heading font-black uppercase text-center mb-16"
          style={{ fontSize: 'clamp(3rem, 12vw, 140px)', lineHeight: 1 }}
        >
          Projects
        </h2>
      </FadeIn>

      {/* Sticky stacking container — height drives scroll */}
      <div style={{ height: `${TOTAL * 85}vh` }}>
        {PROJECTS.map((p, i) => (
          <StickyCard
            key={p.num}
            project={p}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* More projects link */}
      <FadeIn y={20} delay={0.2} className="text-center mt-20">
        <a
          href="https://github.com/shanujans"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full border-2 border-[#D7E2EA]/30 text-[#D7E2EA] font-medium uppercase tracking-widest px-10 py-4 hover:bg-[#D7E2EA]/5 transition-all duration-300"
        >
          <i className="fab fa-github" />
          View All Projects
        </a>
      </FadeIn>
    </section>
  );
};

export default Projects;