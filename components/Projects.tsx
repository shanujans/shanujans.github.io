import React, { useRef, useState } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import type { Project } from '../types';

const projects: Project[] = [
  {
    title: 'Quantum Random Number Generator',
    description: 'A robust QRNG leveraging IBM Quantum computers. Generates truly unpredictable bits by measuring qubits in superposition — ideal for high-security cryptographic applications.',
    tags: ['Python', 'Quantum Computing', 'IBM Quantum', 'Cryptography'],
    githubUrl: 'https://github.com/shanujans/Quantum-Random-Number-Generator',
    featured: true,
  },
  {
    title: 'Loan Risk Predictor — PyPI Package',
    description: 'End-to-end ML package published on PyPI. Structures a Kaggle notebook into a distributable Python package with CI/CD via GitHub Actions. Decision Tree model achieving 87.5% accuracy with full data preprocessing pipeline.',
    tags: ['Python', 'Machine Learning', 'PyPI', 'scikit-learn', 'GitHub Actions', 'CI/CD'],
    githubUrl: 'https://github.com/shanujans/loan-risk-prediction',
    featured: true,
  },
  {
    title: 'Loan Risk Prediction (IBM AutoAI)',
    description: 'Automated ML pipeline in IBM Watson Studio to predict loan risk. GPU-accelerated Snap Boosting Machine Classifier achieving 77% accuracy with full AutoAI pipeline.',
    tags: ['Machine Learning', 'IBM watsonx.ai', 'AutoAI', 'Python', 'SnapML'],
    githubUrl: 'https://github.com/shanujans/AutoAI-Loan-Risk-Predictor',
    featured: true,
  },
  {
    title: 'Telegram File Uploader Bot 🚀',
    description: 'Async Python bot to download large files, split them, and upload to Telegram — bypassing size limits. Features user tiers and VirusTotal API security scanning.',
    tags: ['Python', 'AsyncIO', 'API', 'Telegram'],
    githubUrl: 'https://github.com/shanujans/telegram-uploader',
    featured: true,
  },
  {
    title: 'Academic Ally Telegram Bot 🛡️',
    description: 'A defensive Telegram bot to help students maintain academic integrity by analyzing documents for plagiarism patterns and potential AI-generated content using NLP.',
    tags: ['Python', 'AI/ML', 'NLP', 'Telegram'],
    githubUrl: 'https://github.com/shanujans/Academic-Ally',
  },
  {
    title: 'Student Management System (C#)',
    description: 'C# Windows Forms application for managing student registrations, enrollments, and auth at Skills International. Secure login and CRUD operations with SQL Server backend.',
    tags: ['C#', '.NET', 'SQL Server', 'Desktop App'],
    githubUrl: 'https://github.com/shanujans/Skills-International-Application',
  },
  {
    title: 'Instagram Profile Tracker',
    description: 'Educational tool to track profile visitors and new followers on Instagram, using Tor for anonymity and randomized requests to avoid detection.',
    tags: ['Python', 'Security', 'Tor', 'Automation'],
    githubUrl: 'https://github.com/shanujans/Instagram-Profile-Interaction-Tracker',
  },
  {
    title: 'Student Management System (Java)',
    description: 'Comprehensive JavaFX application for managing student records, course enrollment, and grades. Showcases OOP principles and polished GUI development.',
    tags: ['Java', 'JavaFX', 'OOP', 'Desktop App'],
    githubUrl: 'https://github.com/shanujans/StudentManagementSystem',
  },
];

const allTags = ['All', 'Python', 'Machine Learning', 'Telegram', 'Security', 'Desktop App', 'Quantum Computing', 'PyPI'];

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
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
    card.style.boxShadow = `${(x - cx) / 10}px ${(y - cy) / 10}px 30px rgba(0,255,157,0.15)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    cardRef.current.style.boxShadow = '';
  };

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

        <div className="flex-grow">
          <div className="flex items-start gap-3 mb-3 pr-16">
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
                className="text-xs font-jetbrains-mono px-2 py-0.5 rounded bg-[#00b3ff]/10 text-[#00b3ff] border border-[#00b3ff]/20"
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
              aria-label={`${project.title} on GitHub`}
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

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.tags.some(t => t.toLowerCase().includes(activeFilter.toLowerCase())));

  return (
    <section id="projects" className="py-24 bg-black/20 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimFade>
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">My Projects</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #00ff9d, #7700ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-8 tracking-widest">// PROJECTS</p>
        </AnimFade>

        {/* Filter tabs */}
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
