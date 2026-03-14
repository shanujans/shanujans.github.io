import React, { useRef, useState, useEffect } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import type { Skill } from '../types';

const skills: Skill[] = [
  { name: 'IT Support & System Ops', percentage: 90 },
  { name: 'Python Development', percentage: 85 },
  { name: 'Web Design & Development', percentage: 80 },
  { name: 'Telegram Bot Development', percentage: 75 },
  { name: 'AI/ML Integration', percentage: 70 },
  { name: 'Cybersecurity', percentage: 72 },
];

const techStack = [
  { icon: 'fab fa-python', label: 'Python' },
  { icon: 'fab fa-js', label: 'JavaScript' },
  { icon: 'fab fa-react', label: 'React' },
  { icon: 'fab fa-linux', label: 'Linux' },
  { icon: 'fab fa-git-alt', label: 'Git' },
  { icon: 'fas fa-database', label: 'SQL' },
  { icon: 'fab fa-docker', label: 'Docker' },
  { icon: 'fas fa-cloud', label: 'IBM Cloud' },
];

function useCounter(target: number, duration = 2000, isActive: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, isActive]);
  return count;
}

const StatCard: React.FC<{ value: number; suffix: string; label: string; icon: string; isActive: boolean }> = ({ value, suffix, label, icon, isActive }) => {
  const count = useCounter(value, 1800, isActive);
  return (
    <div className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm text-center hover:border-[#00ff9d]/40 transition-all duration-300 group">
      <i className={`${icon} text-2xl text-[#00ff9d] mb-3 group-hover:scale-110 transition-transform inline-block`} />
      <div className="text-4xl font-bold font-jetbrains-mono text-white">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-500 mt-1 tracking-wider uppercase">{label}</div>
    </div>
  );
};

const AnimFade: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref, '-80px');
  return (
    <div ref={ref} className={`fade-in-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const About: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsVisible = useOnScreen(statsRef, '-100px');
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillsVisible = useOnScreen(skillsRef, '-100px');

  return (
    <section id="about" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimFade>
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">About Me</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #00ff9d, #00b3ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-16 tracking-widest">// WHO_AM_I</p>
        </AnimFade>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { v: 7, s: '+', l: 'Projects Built', i: 'fas fa-code-branch' },
            { v: 3, s: '+', l: 'Years Experience', i: 'fas fa-calendar-alt' },
            { v: 4, s: '+', l: 'Tech Stacks', i: 'fas fa-layer-group' },
            { v: 100, s: '%', l: 'Passion', i: 'fas fa-fire' },
          ].map(s => (
            <AnimFade key={s.l} delay={100}>
              <StatCard value={s.v} suffix={s.s} label={s.l} icon={s.i} isActive={statsVisible} />
            </AnimFade>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Bio */}
          <AnimFade delay={100}>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                <span className="text-[#00ff9d] font-jetbrains-mono text-lg">01.</span> IT Support Professional &amp; Developer
              </h3>
              <div className="w-12 h-0.5 bg-[#00ff9d] mb-5" />
              <p className="text-gray-400 leading-relaxed mb-4">
                A motivated IT professional with a strong foundation in technical support, system administration, 
                and cloud platforms. Proven ability to troubleshoot complex issues, automate workflows, and 
                deliver high-quality solutions.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Currently transitioning into AI/ML, combining operational expertise with cutting-edge machine 
                learning to build smarter, more resilient systems. Deep interest in quantum computing, 
                cybersecurity, and blockchain.
              </p>

              {/* Tech stack pills */}
              <div className="grid grid-cols-4 gap-3">
                {techStack.map(t => (
                  <div
                    key={t.label}
                    className="flex flex-col items-center gap-1.5 p-3 rounded border border-white/10 bg-white/5 hover:border-[#00b3ff]/50 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <i className={`${t.icon} text-xl text-gray-400 group-hover:text-[#00b3ff] transition-colors`} />
                    <span className="text-xs text-gray-500 font-jetbrains-mono">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimFade>

          {/* Skills */}
          <AnimFade delay={200}>
            <div ref={skillsRef}>
              <h3 className="text-2xl font-bold text-white mb-2">
                <span className="text-[#00b3ff] font-jetbrains-mono text-lg">02.</span> Core Skills
              </h3>
              <div className="w-12 h-0.5 bg-[#00b3ff] mb-5" />
              <div className="space-y-5">
                {skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5 font-jetbrains-mono text-sm">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-[#00ff9d]">{skill.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: skillsVisible ? `${skill.percentage}%` : '0%',
                          transitionDelay: `${i * 100}ms`,
                          background: `linear-gradient(90deg, #00ff9d, #00b3ff)`,
                          boxShadow: '0 0 8px rgba(0,255,157,0.5)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimFade>
        </div>
      </div>
    </section>
  );
};

export default About;
