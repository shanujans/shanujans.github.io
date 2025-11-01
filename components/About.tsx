
import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import type { Skill } from '../types';

const skills: Skill[] = [
  { name: 'IT Support', percentage: 90 },
  { name: 'Python', percentage: 85 },
  { name: 'Web Design', percentage: 80 },
  { name: 'Telegram Bots', percentage: 75 },
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


const SkillBar: React.FC<{ skill: Skill; isVisible: boolean }> = ({ skill, isVisible }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1 font-jetbrains-mono">
        <span className="text-base font-medium text-gray-200">{skill.name}</span>
        <span className="text-sm font-medium text-[#00ff9d]">{skill.percentage}%</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-[#00ff9d] to-[#00b3ff] h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${skill.percentage}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const areSkillsVisible = useOnScreen(skillsRef, '-150px');

  return (
    <section id="about" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedElement>
            <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">About Me</h2>
            <div className="w-20 h-1 bg-[#00ff9d] mx-auto mb-12"></div>
        </AnimatedElement>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatedElement delay={200}>
            <div className="text-left">
              <h3 className="text-3xl font-bold text-white mb-4">IT Support Professional & Developer</h3>
              <p className="text-gray-300 leading-relaxed">
                A motivated IT professional with a strong foundation in technical support, system administration, and cloud platforms. Proven ability to troubleshoot complex issues, automate tasks, and deliver excellent customer service.
              </p>
            </div>
          </AnimatedElement>
          
          <AnimatedElement delay={400}>
            <div ref={skillsRef}>
              {skills.map((skill, index) => (
                <SkillBar key={index} skill={skill} isVisible={areSkillsVisible} />
              ))}
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default About;
