import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import type { ExperienceItem } from '../types';

const experience: ExperienceItem[] = [
  {
    type: 'work',
    title: 'IT Support Specialist',
    organization: 'Skills International',
    period: '2023 – Present',
    description:
      'Providing technical support and system administration for the organization. Managing student registrations, course enrollments, and maintaining the internal management system. Built a C# desktop application for streamlined student data management with SQL Server backend.',
    skills: ['C#', '.NET', 'SQL Server', 'System Admin', 'Technical Support'],
    icon: 'fas fa-server',
  },
  {
    type: 'work',
    title: 'Python Developer & Bot Engineer',
    organization: 'Freelance',
    period: '2022 – Present',
    description:
      'Developed multiple Telegram bots including an asynchronous file uploader with VirusTotal API integration and an Academic Ally bot for plagiarism detection. Specialized in async Python, API integrations, and automation workflows.',
    skills: ['Python', 'AsyncIO', 'Telegram API', 'VirusTotal API', 'NLP'],
    icon: 'fas fa-robot',
  },
  {
    type: 'education',
    title: 'AI/ML & Quantum Computing',
    organization: 'IBM Training & Self-Study',
    period: '2023 – Present',
    description:
      'Completed IBM Watson Studio and IBM AutoAI courses. Built a Quantum Random Number Generator using IBM Quantum computers and a Loan Risk Predictor using AutoAI with 77% accuracy. Continuously expanding knowledge in AI/ML systems.',
    skills: ['IBM Watson', 'IBM Quantum', 'Machine Learning', 'Python', 'SnapML'],
    icon: 'fas fa-brain',
  },
  {
    type: 'education',
    title: 'Information Technology',
    organization: 'Skills International',
    period: '2021 – 2023',
    description:
      'Studied core IT fundamentals including networking, system administration, cloud computing, and software development. Built foundational knowledge in cybersecurity, web technologies, and database management.',
    skills: ['Networking', 'Cloud Computing', 'Cybersecurity', 'Web Dev', 'Databases'],
    icon: 'fas fa-graduation-cap',
  },
];

const AnimFade: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref, '-60px');
  return (
    <div ref={ref} className={`fade-in-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const TimelineItem: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => {
  const isLeft = index % 2 === 0;
  const color = item.type === 'work' ? '#00ff9d' : '#7700ff';
  const borderColor = item.type === 'work' ? 'border-[#00ff9d]/30' : 'border-[#7700ff]/30';
  const badgeBg = item.type === 'work' ? 'bg-[#00ff9d]/10 text-[#00ff9d]' : 'bg-[#7700ff]/10 text-[#7700ff]';

  return (
    <AnimFade delay={index * 100}>
      <div className={`relative flex items-start gap-0 md:gap-8 mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* Content */}
        <div className={`flex-1 ${isLeft ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} pl-12 md:pl-0`}>
          <div
            className={`p-6 rounded-lg border ${borderColor} bg-white/5 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group`}
            style={{ '--hover-shadow': `0 20px 40px rgba(${item.type === 'work' ? '0,255,157' : '119,0,255'},0.1)` } as React.CSSProperties}
          >
            <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'} flex-wrap`}>
              <span className={`text-xs font-jetbrains-mono px-2 py-1 rounded ${badgeBg}`}>
                {item.type === 'work' ? 'WORK' : 'EDUCATION'}
              </span>
              <span className="text-xs text-gray-500 font-jetbrains-mono">{item.period}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00ff9d] transition-colors">{item.title}</h3>
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

        {/* Timeline dot - center on md */}
        <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-6 flex flex-col items-center z-10">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border-2"
            style={{ borderColor: color, background: '#0a0a14', boxShadow: `0 0 16px ${color}60` }}
          >
            <i className={`${item.icon} text-sm`} style={{ color }} />
          </div>
        </div>

        {/* Right spacer for alternating layout */}
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
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-16 tracking-widest">// JOURNEY</p>
        </AnimFade>

        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
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
