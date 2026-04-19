import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import type { ExperienceItem } from '../types';

const experience: ExperienceItem[] = [
  {
    type: 'work',
    title: 'IT Support — Office Administrator',
    organization: 'Pravin Construct Works',
    period: '2020 – Present',
    description:
      'Sole IT person for a small construction company. Day-to-day technical support: setting up and maintaining office PCs, troubleshooting hardware and software issues, managing MS Office documents, email and printer support, and basic network connectivity. Also handled company documentation, data entry, and general office administration.',
    skills: ['IT Support', 'Hardware Troubleshooting', 'MS Office', 'Email Systems', 'Networking Basics', 'Printers & Peripherals', 'Documentation'],
    icon: 'fas fa-headset',
  },
  {
    type: 'work',
    title: 'AI Tools & Portfolio Projects',
    organization: 'Self-Directed Learning',
    period: '2023 – Present',
    description:
      'Independently exploring AI tools and building personal projects. Deployed ARIA — a live AI chatbot using Google Gemini API and Cloudflare Workers. Built Quantum Insight Forge on Google AI Studio. Created multiple learning projects including a Loan Risk Predictor (PyPI package) and Telegram bots.',
    skills: ['Google Gemini API', 'Cloudflare Workers', 'React', 'Git & GitHub', 'IBM Watson', 'AI Tools'],
    icon: 'fas fa-robot',
  },
  {
    type: 'education',
    title: 'BSc Computer Science (In Progress)',
    organization: 'University of the People',
    period: '2025 – Present',
    description:
      'Currently studying Bachelor of Science in Computer Science fully online. Covering core CS fundamentals including programming, data structures, algorithms, and software engineering principles.',
    skills: ['Computer Science', 'Programming Fundamentals', 'Data Structures', 'Algorithms'],
    icon: 'fas fa-graduation-cap',
  },
  {
    type: 'education',
    title: 'Diploma in Information Technology',
    organization: 'ESoft Metro Campus',
    period: '2024 – 2025',
    description:
      'Completed an IT diploma covering networking fundamentals, system administration basics, web technologies, and database concepts. Final year project: Student Management System — a C# Windows Forms desktop application with SQL Server backend submitted as graded coursework.',
    skills: ['Networking', 'System Administration', 'Web Technologies', 'SQL Server', 'C#'],
    icon: 'fas fa-school',
  },
  {
    type: 'education',
    title: 'IBM Certifications',
    organization: 'IBM Training & IBM SkillsBuild (Online)',
    period: '2023 – 2025',
    description:
      'IBM Watson Studio, IBM AutoAI, Basics of Quantum Information, Quantum Business Foundations, Artificial Intelligence Fundamentals, IBM Z Day 2025 (AI & Data), IBM Z Day 2025 (Security). Learning certifications — not professional qualifications.',
    skills: ['IBM Watson', 'IBM AutoAI', 'Quantum Information', 'AI Fundamentals', 'IBM Cloud'],
    icon: 'fas fa-certificate',
  },
  {
    type: 'education',
    title: 'Cisco & Google Cloud Certifications',
    organization: 'Cisco NetAcad & Google Cloud',
    period: '2024 – 2026',
    description:
      'Cisco: Data Analytics Essentials, Linux Unhatched, Python Essentials 1, Introduction to Data Science. Google Cloud: AI in Action Badge (2026). Covers data analytics, Linux basics, Python fundamentals, and cloud AI concepts.',
    skills: ['Data Analytics', 'Linux Basics', 'Python Essentials', 'Google Cloud AI', 'Data Science Intro'],
    icon: 'fas fa-network-wired',
  },
];

const badges = [
  {
    icon: 'fas fa-cloud',
    title: 'AI in Action',
    issuer: 'Google Cloud',
    date: 'Mar 2026',
    color: '#4285F4',
    sub: 'Cloud AI Series',
  },
  {
    icon: 'fas fa-atom',
    title: 'Quantum Info',
    issuer: 'IBM',
    date: 'Apr 2025',
    color: '#00ff9d',
    sub: 'Basics of Quantum',
  },
  {
    icon: 'fas fa-brain',
    title: 'AI Fundamentals',
    issuer: 'IBM SkillsBuild',
    date: 'Apr 2025',
    color: '#7700ff',
    sub: 'AI Fundamentals',
  },
  {
    icon: 'fas fa-chart-bar',
    title: 'Data Analytics',
    issuer: 'Cisco',
    date: 'Mar 2025',
    color: '#00b3ff',
    sub: 'Analytics Essentials',
  },
];

const AnimFade: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref, '-60px');
  return (
    <div
      ref={ref}
      className={`fade-in-up ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const TimelineItem: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const isLeft = index % 2 === 0;
  const color = item.type === 'work' ? '#00ff9d' : '#7700ff';
  const borderColor = item.type === 'work' ? 'border-[#00ff9d]/30' : 'border-[#7700ff]/30';
  const badgeStyle = item.type === 'work'
    ? 'bg-[#00ff9d]/10 text-[#00ff9d]'
    : 'bg-[#7700ff]/10 text-[#7700ff]';

  return (
    <AnimFade delay={index * 100}>
      <div className={`relative flex items-start gap-0 md:gap-8 mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-12 md:pl-0`}>
          <div className={`p-6 rounded-lg border ${borderColor} bg-white/5 backdrop-blur-sm hover:-translate-y-1 transition-all duration-300 group`}>
            <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'} flex-wrap`}>
              <span className={`text-xs font-jetbrains-mono px-2 py-1 rounded ${badgeStyle}`}>
                {item.type === 'work' ? 'WORK' : 'EDUCATION'}
              </span>
              <span className="text-xs text-gray-500 font-jetbrains-mono">{item.period}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00ff9d] transition-colors">
              {item.title}
            </h3>
            <p className="text-sm font-jetbrains-mono mb-3" style={{ color }}>{item.organization}</p>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">{item.description}</p>
            <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
              {item.skills?.map(s => (
                <span key={s} className="text-xs font-jetbrains-mono px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-6 flex flex-col items-center z-10">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border-2"
            style={{ borderColor: color, background: '#0a0a14', boxShadow: `0 0 16px ${color}60` }}
          >
            <i className={`${item.icon} text-sm`} style={{ color }} />
          </div>
        </div>

        <div className="hidden md:block flex-1" />
      </div>
    </AnimFade>
  );
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 scroll-mt-20 bg-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <AnimFade>
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">Experience</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #7700ff, #00b3ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-12 tracking-widest">// JOURNEY</p>
        </AnimFade>

        {/* ── Featured Badges ─────────────────────────────── */}
        <AnimFade delay={100}>
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-center text-xs text-gray-500 font-jetbrains-mono tracking-widest mb-6 uppercase">
              🏅 Featured Certifications
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {badges.map((b) => (
                <div
                  key={b.title}
                  className="flex flex-col items-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:-translate-y-1 transition-all duration-300"
                  style={{ borderColor: b.color + '30' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = b.color + '70';
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${b.color}20`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = b.color + '30';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ background: b.color + '18', border: `2px solid ${b.color}50`, color: b.color, fontSize: '20px' }}
                  >
                    <i className={b.icon} />
                  </div>
                  <div className="text-white text-xs font-bold text-center leading-tight mb-1">{b.title}</div>
                  <div className="text-xs font-jetbrains-mono text-center" style={{ color: b.color }}>{b.issuer}</div>
                  <div className="text-gray-600 text-[10px] font-jetbrains-mono mt-0.5">{b.date}</div>
                  <div className="text-gray-600 text-[10px] italic text-center mt-0.5">{b.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimFade>

        {/* ── Timeline ────────────────────────────────────── */}
        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00ff9d]/20 to-transparent" />
          {experience.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;
