import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';
import FadeIn from './FadeIn';

const PROJECTS = [
  {
    num: '01',
    category: 'AI Integration',
    name: 'ARIA Chatbot',
    desc: 'Live AI assistant on my portfolio using Google Gemini API and Cloudflare Workers. Handles CORS, rate limiting, and API key security in production. My most genuine technical proof point.',
    url: 'https://shanujan.is-a.dev',
    github: 'https://github.com/shanujans/shanujans.github.io',
    imgs: [
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop&q=80',
    ],
    accent: '#B600A8',
    tag: 'Featured',
  },
  {
    num: '02',
    category: 'Autonomous AI Agent · Quantum',
    name: 'Q-Optima',
    desc: 'Multi-cloud autonomous AI agent for NP-Hard logistics optimisation using Quantum Computing (QAOA). Voice input → Gemini vision → IBM Quantum → Telegram dispatch. Built for Milan AI Week 2026 Agent Olympics. Zero cost stack.',
    url: 'https://github.com/shanujans/q-optima',
    github: 'https://github.com/shanujans/q-optima',
    imgs: [
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=400&h=400&fit=crop&q=80',
    ],
    accent: '#7621B0',
    tag: 'Featured',
  },
  {
    num: '03',
    category: 'Machine Learning · PyPI',
    name: 'Loan Risk Predictor',
    desc: 'End-to-end ML package published on PyPI with CI/CD via GitHub Actions. Decision Tree classifier with 87.5% accuracy. Also built IBM AutoAI version with SnapML, 77% accuracy. Learning projects.',
    url: 'https://github.com/shanujans/loan-risk-prediction',
    github: 'https://github.com/shanujans/loan-risk-prediction',
    imgs: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=400&fit=crop&q=80',
    ],
    accent: '#BE4C00',
    tag: 'Learning Project',
  },
  {
    num: '04',
    category: 'Desktop App · Final Year Project',
    name: 'Student Management System',
    desc: 'Assessed final year project for ESoft Metro Campus. C# Windows Forms desktop application with SQL Server backend for managing student registrations and course enrollment.',
    url: 'https://github.com/shanujans/Skills-International-Application',
    github: 'https://github.com/shanujans/Skills-International-Application',
    imgs: [
      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=400&h=200&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=400&fit=crop&q=80',
    ],
    accent: '#18011F',
    tag: 'Coursework',
  },
];

const TOTAL = PROJECTS.length;

const StickyCard: React.FC<{
  project: (typeof PROJECTS)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}> = ({ project, index, scrollYProgress }) => {
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1 - (TOTAL - 1 - index) * 0.035]
  );

  return (
    <div className="sticky" style={{ top: `${72 + index * 22}px` }}>
      <motion.div style={{ scale, transformOrigin: 'top center' }}>
        <div
          className="rounded-[32px] md:rounded-[48px] p-5 md:p-10 mx-auto"
          style={{
            maxWidth: '900px',
            background: '#0C0C0C',
            border: '1.5px solid rgba(215,226,234,0.1)',
            boxShadow: `0 0 40px ${project.accent}15`,
          }}
        >
          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5 md:mb-8">
            <div className="flex items-center gap-4 md:gap-6 min-w-0">
              <span
                className="font-black leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', color: project.accent }}
              >
                {project.num}
              </span>
              <div className="min-w-0">
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-[#D7E2EA]/45 font-light mb-1 truncate">
                  {project.category}
                </div>
                <h3
                  className="font-black uppercase text-[#D7E2EA] leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2.8vw, 2rem)' }}
                >
                  {project.name}
                </h3>
                <span
                  className="inline-block mt-1 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: project.accent + '20',
                    color: project.accent,
                    border: `1px solid ${project.accent}40`,
                  }}
                >
                  {project.tag}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <LiveProjectButton href={project.url} label="View" />
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#D7E2EA]/20 flex items-center justify-center text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/50 transition-all text-sm"
              >
                <i className="fab fa-github" />
              </a>
            </div>
          </div>

          <p
            className="text-[#D7E2EA]/55 font-light leading-relaxed mb-5 md:mb-8"
            style={{ fontSize: 'clamp(0.78rem, 1.5vw, 1rem)', maxWidth: '520px' }}
          >
            {project.desc}
          </p>

          {/* Image grid — now using aspect-ratio wrappers */}
          <div className="grid grid-cols-2 gap-2 md:gap-4">
            {/* Left: 2 stacked */}
            <div className="flex flex-col gap-2 md:gap-4">
              {project.imgs.slice(0, 2).map((src, i) => (
                <div key={i} className="aspect-[2/1] w-full">
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover rounded-[12px] md:rounded-[28px]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            {/* Right: tall */}
            <div className="aspect-square w-full h-full">
              <img
                src={project.imgs[2]}
                alt=""
                className="w-full h-full object-cover rounded-[12px] md:rounded-[28px]"
                loading="lazy"
              />
            </div>
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
      className="rounded-t-[40px] md:rounded-t-[60px] -mt-10 md:-mt-14 relative z-10 px-3 md:px-8 pt-20 md:pt-24 pb-24 md:pb-32"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn y={30}>
        <h2
          className="font-black uppercase text-center mb-12 md:mb-16"
          style={{
            fontSize: 'clamp(2.8rem, 11vw, 130px)',
            lineHeight: 1,
            background: 'linear-gradient(180deg,#646973 0%,#BBCCD7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Projects
        </h2>
      </FadeIn>

      <div className="h-auto md:[height:calc(4*80vh)]">
        {PROJECTS.map((p, i) => (
          <StickyCard
            key={p.num}
            project={p}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <FadeIn y={20} delay={0.2} className="text-center mt-16 md:mt-20">
        <a
          href="https://github.com/shanujans"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] font-medium uppercase tracking-widest px-8 md:px-10 py-3 md:py-4 hover:bg-[#D7E2EA]/5 transition-all duration-300 text-sm"
        >
          <i className="fab fa-github" />
          View All on GitHub
        </a>
      </FadeIn>
    </section>
  );
};

export default Projects;