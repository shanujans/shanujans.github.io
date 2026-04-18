import React, { useRef, useState } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import type { Project } from '../types';

const projects: Project[] = [
  {
    title: 'ARIA — Live AI Chatbot (Portfolio)',
    description: 'The AI assistant on this site — my most genuine technical achievement. Built using Google Gemini API (now Groq/Llama), Cloudflare Workers for secure API proxying, and React. Handles CORS, rate limiting, and API key security. This is real working code I deployed and maintain.',
    tags: ['Google Gemini API', 'Cloudflare Workers', 'React', 'TypeScript', 'API Integration'],
    githubUrl: 'https://github.com/shanujans/shanujans.github.io',
    featured: true,
  },
  {
    title: 'Loan Risk Predictor — PyPI Package (Learning Project)',
    description: 'A learning project where I packaged a Kaggle ML notebook into a Python package published on PyPI. Built with AI assistance to understand CI/CD via GitHub Actions. Decision Tree model with 87.5% accuracy. This was a learning exercise — not a production tool.',
    tags: ['Python', 'Machine Learning', 'PyPI', 'scikit-learn', 'GitHub Actions', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/loan-risk-prediction',
    featured: true,
  },
  {
    title: 'Quantum Random Number Generator (Learning Project)',
    description: 'A guided learning project using IBM Quantum API to generate random numbers from qubit measurements. Followed IBM tutorials and used AI assistance throughout. Built to understand quantum concepts — not a production cryptography tool.',
    tags: ['IBM Quantum', 'Python', 'API', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/Quantum-Random-Number-Generator',
  },
  {
    title: 'Loan Risk Prediction — IBM AutoAI (Learning Project)',
    description: 'Used IBM Watson Studio\'s AutoAI tool to build a loan risk classifier. Selected the best model (SnapML, 77% accuracy) through the AutoAI interface. This was a guided IBM learning course project — AutoAI does the ML work automatically.',
    tags: ['IBM Watson', 'AutoAI', 'SnapML', 'No-Code ML', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/AutoAI-Loan-Risk-Predictor',
  },
  {
    title: 'Telegram File Uploader Bot (AI-Assisted)',
    description: 'A Telegram bot that downloads and uploads large files, built with significant AI assistance. Includes VirusTotal API integration for basic scanning. This helped me understand async Python and API concepts — though I could not write this independently from scratch.',
    tags: ['Python', 'Telegram API', 'AsyncIO', 'VirusTotal API', 'AI-Assisted'],
    githubUrl: 'https://github.com/shanujans/telegram-uploader',
  },
  {
    title: 'Academic Ally Telegram Bot (AI-Assisted)',
    description: 'A Telegram bot that checks documents for basic plagiarism patterns using NLP libraries. Built with AI assistance as a learning project. Helped me understand bot development and text processing concepts.',
    tags: ['Python', 'NLP', 'Telegram', 'AI-Assisted', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/Academic-Ally',
  },
  {
    title: 'Student Management System — C# (Learning Project)',
    description: 'A Windows Forms desktop application for managing student records at Skills International. Built during my studies with guidance. Uses SQL Server for data storage. My first real desktop application project.',
    tags: ['C#', '.NET', 'SQL Server', 'Windows Forms', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/Skills-International-Application',
  },
  {
    title: 'Student Management System — Java (Learning Project)',
    description: 'A JavaFX desktop application built during studies to practice OOP principles. Course project demonstrating basic CRUD operations and GUI development with Java.',
    tags: ['Java', 'JavaFX', 'OOP', 'Learning Project'],
    githubUrl: 'https://github.com/shanujans/StudentManagementSystem',
  },
];

const allTags = ['All', 'Featured', 'AI Tools', 'Python', 'Learning Project', 'API Integration'];

const AnimFade: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref, '-60px');
  return (
    <div ref={ref} className={`fade-in-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    card.style.transform = `perspective(800px) rotateX(${((y - cy) / cy) * -6}deg) rotateY(${((x - cx) / cx) * 6}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  const isLearning = project.tags.includes('Learning Project') || project.tags.includes('AI-Assisted');

  return (
    <AnimFade delay={index * 70}>
      <div
        ref={cardRef}
        className="group relative bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 flex flex-col h-full"
        style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {project.featured && (
          <div className="absolute top-4 right-4 text-xs font-jetbrains-mono px-2 py-0.5 rounded bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30">
            ★ FEATURED
          </div>
        )}
        {isLearning && !project.featured && (
          <div className="absolute top-4 right-4 text-xs font-jetbrains-mono px-2 py-0.5 rounded bg-[#00b3ff]/10 text-[#00b3ff] border border-[#00b3ff]/30">
            LEARNING
          </div>
        )}

        <div className="flex-grow">
          <div className="flex items-start gap-3 mb-3 pr-20">
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
              <span
                key={tag}
                className={`text-xs font-jetbrains-mono px-2 py-0.5 rounded border ${
                  tag === 'Learning Project' || tag === 'AI-Assisted'
                    ? 'bg-[#00b3ff]/10 text-[#00b3ff] border-[#00b3ff]/20'
                    : 'bg-[#00ff9d]/10 text-[#00ff9d] border-[#00ff9d]/20'
                }`}
              >
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
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#00ff9d] transition-all duration-300 hover:scale-110 ml-2"
            >
              <i className="fab fa-github text-xl" />
            </a>
          )}
        </div>
      </div>
    </AnimFade>
  );
};

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? projects
    : activeFilter === 'Featured' ? projects.filter(p => p.featured)
    : activeFilter === 'AI Tools' ? projects.filter(p => p.tags.some(t => t.includes('API') || t.includes('AI') || t.includes('Gemini') || t.includes('Cloudflare')))
    : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <section id="projects" className="py-24 bg-black/20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimFade>
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">My Projects</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #00ff9d, #7700ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-2 tracking-widest">// PROJECTS</p>
          <p className="text-center text-gray-500 text-sm max-w-xl mx-auto mb-8">
            Honest labels included — <span className="text-[#00ff9d]">Featured</span> = genuinely built by me,&nbsp;
            <span className="text-[#00b3ff]">Learning Project</span> = built with AI assistance or guidance.
          </p>
        </AnimFade>

        <AnimFade delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-jetbrains-mono border transition-all duration-300 ${
                  activeFilter === tag
                    ? 'bg-[#00ff9d] text-[#0a0a14] border-[#00ff9d]'
                    : 'bg-transparent text-gray-400 border-white/10 hover:border-[#00ff9d]/40 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </AnimFade>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <AnimFade delay={200}>
          <div className="text-center mt-12">
            <a
              href="https://github.com/shanujans"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <i className="fab fa-github" />
              View All on GitHub
            </a>
          </div>
        </AnimFade>
      </div>
    </section>
  );
};

export default Projects;
