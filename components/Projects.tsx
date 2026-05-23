import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    title: 'ARIA — Live AI Chatbot',
    description: 'My most genuine technical achievement. Google Gemini API, Cloudflare Workers for secure proxying, and React. Handles CORS, rate limiting, and API key security — real production deployment.',
    tags: ['Google Gemini API', 'Cloudflare Workers', 'React', 'TypeScript'],
    githubUrl: 'https://github.com/shanujans/shanujans.github.io',
    featured: true,
  },
  {
    title: 'Quantum Insight Forge',
    description: 'AI application on Google AI Studio combining quantum computing concepts with Gemini generative AI to analyze and visualize quantum data patterns.',
    tags: ['Google AI Studio', 'Gemini API', 'Quantum Computing', 'AI Application'],
    githubUrl: 'https://github.com/shanujans/Quantum-Insight-Forge',
    featured: true,
  },
  {
    title: 'Loan Risk Predictor — PyPI',
    description: 'End-to-end ML package published on PyPI with CI/CD via GitHub Actions. Decision Tree model with 87.5% accuracy. Built with AI assistance to understand Python packaging.',
    tags: ['Python', 'Machine Learning', 'PyPI', 'scikit-learn', 'GitHub Actions', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/loan-risk-prediction',
    featured: true,
  },
  {
    title: 'Student Management System — C#',
    description: 'Final year project for ESoft Metro Campus. A C# Windows Forms desktop application with SQL Server backend for managing student registrations and course enrollment.',
    tags: ['C#', '.NET', 'SQL Server', 'Windows Forms', 'Coursework'],
    githubUrl: 'https://github.com/shanujans/Skills-International-Application',
  },
  {
    title: 'Quantum Random Number Generator',
    description: 'Guided learning project using IBM Quantum API to generate random numbers from qubit superposition. Built to understand quantum concepts via IBM tutorial.',
    tags: ['IBM Quantum', 'Python', 'API', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/Quantum-Random-Number-Generator',
  },
  {
    title: 'IBM AutoAI Loan Risk',
    description: 'IBM Watson Studio AutoAI learning project — AutoAI handles the ML pipeline automatically. Selected SnapML model with 77% accuracy. Guided IBM course project.',
    tags: ['IBM Watson', 'AutoAI', 'SnapML', 'No-Code ML', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/AutoAI-Loan-Risk-Predictor',
  },
  {
    title: 'Telegram File Uploader Bot',
    description: 'Async Telegram bot that downloads and uploads large files with VirusTotal API scanning. Built with AI assistance to understand async Python and API concepts.',
    tags: ['Python', 'Telegram API', 'AsyncIO', 'VirusTotal API', 'AI-Assisted'],
    githubUrl: 'https://github.com/shanujans/telegram-uploader',
  },
  {
    title: 'Academic Ally Telegram Bot',
    description: 'Telegram bot that checks documents for plagiarism patterns using NLP libraries. Built with AI assistance to understand bot development and text processing.',
    tags: ['Python', 'NLP', 'Telegram', 'AI-Assisted', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/Academic-Ally',
  },
  {
    title: 'Student Management System — Java',
    description: 'JavaFX desktop application built during studies to practice OOP principles. Demonstrates basic CRUD operations and GUI development with Java.',
    tags: ['Java', 'JavaFX', 'OOP', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/StudentManagementSystem',
  },
];

const allTags = ['All', 'Featured', 'AI Tools', 'Python', 'Learning Project', 'Google AI Studio'];

// ── Framer Motion 3D Tilt Card ──────────────────────────────────
const TiltCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef   = useRef<HTMLDivElement>(null);
  const mouseX    = useMotionValue(0);
  const mouseY    = useMotionValue(0);

  const rotateX   = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]),  { stiffness: 300, damping: 30 });
  const rotateY   = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]),  { stiffness: 300, damping: 30 });
  const glowX     = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY     = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const showFeatured = project.featured;
  const showLearning = !project.featured &&
    (project.tags.includes('Learning Project') || project.tags.includes('AI-Assisted'));

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 flex flex-col h-full"
    >
      {/* Dynamic glow spot following mouse */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(0,255,157,0.07), transparent 60%)`
          ),
        }}
      />

      {/* Badge */}
      {showFeatured && (
        <div className="absolute top-4 right-4 text-xs font-jetbrains-mono px-2 py-0.5 rounded bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30">
          ★ FEATURED
        </div>
      )}
      {showLearning && (
        <div className="absolute top-4 right-4 text-xs font-jetbrains-mono px-2 py-0.5 rounded bg-[#00b3ff]/10 text-[#00b3ff] border border-[#00b3ff]/30">
          LEARNING
        </div>
      )}

      <div className="flex-grow">
        <div className="flex items-start gap-3 mb-3 pr-24">
          <div className="w-8 h-8 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center flex-shrink-0">
            <i className="fas fa-folder-open text-[#00ff9d] text-xs" />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-[#00ff9d] transition-colors duration-300 leading-snug">
            {project.title}
          </h3>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">{project.description}</p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag}
              className={`text-xs font-jetbrains-mono px-2 py-0.5 rounded border ${
                tag === 'Learning Project' || tag === 'AI-Assisted'
                  ? 'bg-[#00b3ff]/10 text-[#00b3ff] border-[#00b3ff]/20'
                  : 'bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/20'
              }`}>
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs font-jetbrains-mono px-2 py-0.5 rounded bg-white/5 text-gray-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00ff9d] transition-all duration-300 hover:scale-110 ml-2">
            <i className="fab fa-github text-xl" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
      }
    );
  });

  const filtered = activeFilter === 'All' ? projects
    : activeFilter === 'Featured' ? projects.filter(p => p.featured)
    : activeFilter === 'Google AI Studio' ? projects.filter(p => p.tags.some(t => t.includes('Google AI Studio') || t.includes('AI Studio')))
    : activeFilter === 'AI Tools' ? projects.filter(p => p.tags.some(t => t.includes('API') || t.includes('AI') || t.includes('Gemini') || t.includes('Cloudflare')))
    : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <section id="projects" className="py-24 bg-black/20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headingRef} style={{ opacity: 0 }}>
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">My Projects</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #00ff9d, #7700ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-2 tracking-widest">// PROJECTS</p>
          <p className="text-center text-gray-500 text-sm max-w-xl mx-auto mb-8">
            Honest labels — <span className="text-[#00ff9d]">Featured</span> = genuinely built &nbsp;·&nbsp;
            <span className="text-[#00b3ff]">Learning</span> = built with AI guidance.
          </p>
        </div>

        {/* Filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {allTags.map(tag => (
            <button key={tag} onClick={() => setActiveFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-jetbrains-mono border transition-all duration-300 ${
                activeFilter === tag
                  ? 'bg-[#00ff9d] text-[#0a0a14] border-[#00ff9d]'
                  : 'bg-transparent text-gray-400 border-white/10 hover:border-[#00ff9d]/40 hover:text-white'
              }`}>
              {tag}
            </button>
          ))}
        </motion.div>

        {/* 3D Tilt Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
          {filtered.map((project, index) => (
            <TiltCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="https://github.com/shanujans" target="_blank" rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2">
            <i className="fab fa-github" />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;