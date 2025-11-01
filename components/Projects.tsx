import React, { useRef } from 'react';
import type { Project } from '../types';
import { useOnScreen } from '../hooks/useOnScreen';

const projects: Project[] = [
  { title: 'Quantum Random Number Generator (QRNG)', description: 'A robust QRNG leveraging IBM Quantum computers. It generates truly unpredictable bits by measuring qubits in superposition, ideal for high-security cryptographic applications.', tags: ['Python', 'Quantum Computing', 'IBM Quantum', 'Cryptography'], githubUrl: 'https://github.com/shanujans/Quantum-Random-Number-Generator' },
  { title: 'Loan Risk Prediction using IBM AutoAI', description: 'Automated ML pipeline in IBM Watson Studio to predict loan risk. Features a GPU-accelerated Snap Boosting Machine Classifier achieving 77% accuracy.', tags: ['Machine Learning', 'IBM watsonx.ai', 'AutoAI', 'Python', 'SnapML'], githubUrl: 'https://github.com/shanujans/AutoAI-Loan-Risk-Predictor' },
  { title: 'Telegram File Uploader Bot 🚀', description: 'Asynchronous Python bot to download large files to a server, split them, and upload to Telegram, bypassing size limits. Features user tiers and VirusTotal API security scanning.', tags: ['Python', 'AsyncIO', 'API', 'Telegram'], githubUrl: 'https://github.com/shanujans/telegram-uploader' },
  { title: 'Academic Ally Telegram Bot 🛡️🤖', description: 'A defensive Telegram bot to help students maintain academic integrity by analyzing documents for plagiarism patterns and potential AI-generated content.', tags: ['Python', 'AI/ML', 'NLP', 'Telegram'], githubUrl: 'https://github.com/shanujans/Academic-Ally' },
  { title: 'Skills Int. Student Management System', description: 'C# Windows Forms desktop application for managing student registrations, enrollments, and auth at Skills International. Features secure login and CRUD operations with a SQL Server backend.', tags: ['C#', '.NET', 'SQL Server', 'Desktop App'], githubUrl: 'https://github.com/shanujans/Skills-International-Application' },
  { title: 'Instagram Profile Tracker', description: 'Educational tool to track profile visitors and new followers on Instagram, using Tor for anonymity and randomized requests to avoid detection. (Educational Use Only)', tags: ['Python', 'Security', 'Tor', 'Automation'], githubUrl: 'https://github.com/shanujans/Instagram-Profile-Interaction-Tracker' },
  { title: 'Student Management System 🎓', description: 'A comprehensive JavaFX application for managing student records, course enrollment, and grades. Demonstrates OOP and GUI development skills.', tags: ['Java', 'JavaFX', 'OOP', 'Desktop App'], githubUrl: 'https://github.com/shanujans/StudentManagementSystem' },
];

const AnimatedElement: React.FC<{children: React.ReactNode; delay?: number}> = ({ children, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, '-100px');
    return (
        <div
            ref={ref}
            className={`fade-in-up ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group bg-white/5 backdrop-blur-md p-6 rounded-lg border border-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00b3ff]/30 flex flex-col h-full">
        <div className="flex-grow">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00ff9d] transition-colors duration-300 pr-2">{project.title}</h3>
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} className="text-2xl text-gray-400 hover:text-[#00ff9d] transition-transform duration-300 hover:scale-110 flex-shrink-0">
                        <i className="fab fa-github"></i>
                    </a>
                )}
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map(tag => (
            <span key={tag} className="bg-[#00b3ff]/20 text-[#00b3ff] text-xs font-jetbrains-mono px-2 py-1 rounded">
                {tag}
            </span>
            ))}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement>
            <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">My Projects</h2>
            <div className="w-20 h-1 bg-[#00ff9d] mx-auto mb-12"></div>
        </AnimatedElement>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <AnimatedElement key={project.title} delay={index * 100}>
                <ProjectCard project={project} />
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;