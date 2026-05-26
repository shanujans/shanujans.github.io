import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import LiveProjectButton from './LiveProjectButton';
import FadeIn from './FadeIn';

const PROJECTS = [
  {
    num: '01',
    category: 'AI Integration · Full Stack',
    name: 'ARIA Chatbot',
    desc: 'Live AI assistant on my portfolio using Google Gemini API and Cloudflare Workers. Handles CORS, rate limiting, and API key security in production. My most genuine technical proof point.',
    url: 'https://shanujan.is-a.dev',
    github: 'https://github.com/shanujans/shanujans.github.io',
    imgs: [
      'https://opengraph.githubassets.com/1/shanujans/shanujans.github.io',
      'https://skillicons.dev/icons?i=react,ts,tailwind,cloudflare,vite&perline=5',
      'https://opengraph.githubassets.com/1/cloudflare/workers-sdk',
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
      'https://opengraph.githubassets.com/1/shanujans/q-optima',
      'https://skillicons.dev/icons?i=python,gcp,docker,linux,redis&perline=5',
      'https://opengraph.githubassets.com/1/qiskit/qiskit',
    ],
    accent: '#7621B0',
    tag: 'Featured',
  },
  {
    num: '03',
    category: 'Machine Learning · PyPI',
    name: 'Loan Risk Predictor',
    desc: 'End-to-end ML package published on PyPI with CI/CD via GitHub Actions. Decision Tree classifier with 87.5% accuracy. Also built IBM AutoAI version with SnapML, 77% accuracy. Learning projects.',
    url: 'https://pypi.org/project/loan-risk-prediction/',
    github: 'https://github.com/shanujans/loan-risk-prediction',
    imgs: [
      'https://opengraph.githubassets.com/1/shanujans/loan-risk-prediction',
      'https://skillicons.dev/icons?i=py,githubactions,sklearn,postgres&perline=4',
      'https://opengraph.githubassets.com/1/scikit-learn/scikit-learn',
    ],
    accent: '#BE4C00',
    tag: 'Machine Learning',
  },
  {
    num: '04',
    category: 'Desktop App · Coursework',
    name: 'Student Management',
    desc: 'Assessed final year project for ESoft Metro Campus. C# Windows Forms desktop application with SQL Server backend for managing student registrations and course enrollment.',
    url: 'https://github.com/shanujans/Skills-International-Application',
    github: 'https://github.com/shanujans/Skills-International-Application',
    imgs: [
      'https://opengraph.githubassets.com/1/shanujans/Skills-International-Application',
      'https://skillicons.dev/icons?i=cs,dotnet,mysql,visualstudio&perline=4',
      'https://opengraph.githubassets.com/1/microsoft/dotnet',
    ],
    accent: '#0078D4',
    tag: 'Coursework',
  },
  {
    num: '05',
    category: 'Open Source · Google SDK',
    name: 'Python GenAI SDK',
    desc: 'Active open-source contributor to Google\'s official Python GenAI SDK. Identified and reported core REST API bugs affecting Gemini 2.5 models handling CJK inputs. Merged PRs for documentation and codebase fixes.',
    url: 'https://github.com/googleapis/python-genai/issues/2134',
    github: 'https://github.com/googleapis/python-genai',
    imgs: [
      'https://opengraph.githubassets.com/1/googleapis/python-genai',
      'https://skillicons.dev/icons?i=python,gcp,git,github&perline=4',
      'https://opengraph.githubassets.com/1/google/generative-ai-python',
    ],
    accent: '#005CB6',
    tag: 'Contribution',
  },
  {
    num: '06',
    category: 'IT Automation · Telegram API',
    name: 'Revmatrix Hub',
    desc: 'Custom IT Support scripts and AI automation workspace designed to handle repetitive service desk tasks. Operates primarily via a 24/7 accessible Telegram integration for deployment, triaging, and user management.',
    url: 'https://t.me/Revmatrix',
    github: 'https://github.com/shanujans/service-desk-automation',
    imgs: [
      'https://opengraph.githubassets.com/1/shanujans/service-desk-automation',
      'https://skillicons.dev/icons?i=python,docker,bash,linux,aws&perline=5',
      'https://opengraph.githubassets.com/1/python-telegram-bot/python-telegram-bot',
    ],
    accent: '#00A388',
    tag: 'Agent Tooling',
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
    <div className="sticky" style={{ top: '80px' }}>
      <motion.div style={{ scale, transformOrigin: 'top center' }}>
        <div
          className="rounded-3xl md:rounded-[40px] p-6 md:p-10 mx-auto transition-colors duration-500"
          style={{
            maxWidth: '900px',
            background: '#0C0C0C',
            border: '1.5px solid rgba(215,226,234,0.06)', // Matched footer borders
            boxShadow: `0 0 50px ${project.accent}12`,
          }}
        >
          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 mb-5 md:mb-8">
            <div className="flex items-center gap-4 md:gap-6 min-w-0">
              <span
                className="font-black leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)', color: project.accent }}
              >
                {project.num}
              </span>
              <div className="min-w-0">
                <div className="text-[10px] md:text-xs uppercase tracking-widest text-[#D7E2EA]/45 font-light mb-1.5 truncate">
                  {project.category}
                </div>
                <h3
                  className="font-black uppercase text-[#D7E2EA] leading-none mb-2"
                  style={{ fontSize: 'clamp(1.1rem, 3.2vw, 2.2rem)' }}
                >
                  {project.name}
                </h3>
                <span
                  className="inline-block mt-0.5 text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-medium"
                  style={{
                    background: project.accent + '15',
                    color: project.accent,
                    border: `1px solid ${project.accent}30`,
                  }}
                >
                  {project.tag}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <LiveProjectButton href={project.url} label="View Project" />
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#D7E2EA]/12 flex items-center justify-center text-[#D7E2EA]/45 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/50 hover:bg-[#D7E2EA]/5 transition-all duration-300 text-sm"
              >
                <i className="fab fa-github" />
              </a>
            </div>
          </div>

          <p
            className="text-[#D7E2EA]/45 font-light leading-relaxed mb-6 md:mb-8"
            style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.95rem)', maxWidth: '580px' }}
          >
            {project.desc}
          </p>

          {/* Dynamic Image Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 md:mt-8">
            <div className="flex flex-col gap-3 md:gap-4">
              {/* Repository OpenGraph Banner */}
              <div 
                className="aspect-[2/1] w-full rounded-[14px] md:rounded-[24px] overflow-hidden border"
                style={{ borderColor: 'rgba(215,226,234,0.06)', background: 'rgba(0,0,0,0.4)' }}
              >
                <img
                  src={project.imgs[0]}
                  alt={`${project.name} Banner`}
                  className="w-full h-full object-cover scale-105"
                  loading="lazy"
                />
              </div>
              {/* Technology Stack Icons */}
              <div 
                className="aspect-[2/1] w-full rounded-[14px] md:rounded-[24px] overflow-hidden border flex items-center justify-center p-4 md:p-6"
                style={{ borderColor: 'rgba(215,226,234,0.06)', background: 'rgba(255,255,255,0.01)' }}
              >
                <img
                  src={project.imgs[1]}
                  alt="Tech Stack Icons"
                  className="w-full h-full object-contain drop-shadow-xl"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Environment OpenGraph Square-Crop */}
            <div 
              className="aspect-square w-full h-full rounded-[14px] md:rounded-[24px] overflow-hidden border group"
              style={{ borderColor: 'rgba(215,226,234,0.06)', background: 'rgba(0,0,0,0.4)' }}
            >
              <img
                src={project.imgs[2]}
                alt={`${project.name} Environment`}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out"
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
  const stackRef = useRef<HTMLDivElement>(null);

  // Scroll logic for the new larger container holding all 6 items
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start end', 'end start'],
    layoutEffect: false,
  });

  return (
    <section
      id="projects"
      className="rounded-t-[40px] md:rounded-t-[60px] -mt-10 md:-mt-14 relative z-10 px-4 md:px-10 pt-24 md:pt-32 pb-24 md:pb-36"
      style={{ background: '#0C0C0C', borderTop: '1px solid rgba(215,226,234,0.06)' }}
    >
      <FadeIn y={30}>
        <h2
          className="font-black uppercase text-center mb-16 md:mb-24"
          style={{
            fontSize: 'clamp(2.5rem, 10vw, 110px)',
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

      {/* Increased height heavily to accommodate 6 full-screen scrollable sticky cards */}
      <div ref={stackRef} className="h-auto md:h-[450vh]">
        {PROJECTS.map((p, i) => (
          <StickyCard
            key={p.num}
            project={p}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <FadeIn y={20} delay={0.2} className="text-center mt-20 md:mt-28">
        <a
          href="https://github.com/shanujans"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-2xl border transition-all duration-300 text-sm font-medium uppercase tracking-widest px-8 md:px-10 py-4 group"
          style={{
            background: 'rgba(255,255,255,0.02)',
            borderColor: 'rgba(215,226,234,0.08)',
            color: '#D7E2EA',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(215,226,234,0.3)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(215,226,234,0.08)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
          }}
        >
          <i className="fab fa-github text-lg text-[#D7E2EA]/60 group-hover:text-white transition-colors" />
          View All on GitHub
        </a>
      </FadeIn>
    </section>
  );
};

export default Projects;