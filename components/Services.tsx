import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import type { Service } from '../types';

const services: Service[] = [
  {
    icon: 'fas fa-headset',
    title: 'IT Support & Troubleshooting',
    description: 'Hands-on technical support for hardware, software, printers, email, networking basics, and MS Office. 4+ years of real experience keeping small business systems running day-to-day.',
    color: '#00ff9d',
  },
  {
    icon: 'fas fa-robot',
    title: 'AI Tools Implementation',
    description: 'Setting up and integrating AI tools for real tasks — including chatbot deployment using Google Gemini API, prompt engineering, and using AI to automate documentation and workflows. ARIA on this site is a live example.',
    color: '#00b3ff',
  },
  {
    icon: 'fas fa-file-alt',
    title: 'Technical Documentation',
    description: 'Writing clear, accurate technical guides, SOPs, and user manuals. Translating technical processes into plain language for non-technical users. Useful for IT teams, onboarding, and helpdesk knowledge bases.',
    color: '#7700ff',
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

const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const rgba: Record<string, string> = {
    '#00ff9d': 'rgba(0,255,157,',
    '#00b3ff': 'rgba(0,179,255,',
    '#7700ff': 'rgba(119,0,255,',
  };
  const base = rgba[service.color || '#00ff9d'];

  return (
    <AnimFade delay={index * 100}>
      <div
        className="group relative p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full"
        onMouseEnter={e => {
          const el = e.currentTarget;
          el.style.borderColor = `${service.color}50`;
          el.style.boxShadow = `0 20px 50px ${base}0.12)`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget;
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at top left, ${base}0.05) 0%, transparent 60%)` }}
        />

        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-2xl transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${base}0.1)`,
            border: `1px solid ${base}0.3)`,
            color: service.color,
          }}
        >
          <i className={service.icon} />
        </div>

        <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>

        <div
          className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(225deg, ${base}0.15), transparent 70%)`,
            borderTop: `2px solid ${base}0.4)`,
            borderRight: `2px solid ${base}0.4)`,
            borderTopRightRadius: '0.75rem',
          }}
        />
      </div>
    </AnimFade>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimFade>
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">What I Offer</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #00b3ff, #7700ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-4 tracking-widest">// WHAT_I_CAN_DO</p>
          <p className="text-center text-gray-500 text-sm max-w-xl mx-auto mb-16">
            These are the only services I genuinely offer — skills I have real experience with right now.
          </p>
        </AnimFade>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Services;
