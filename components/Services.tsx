import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';
import type { Service } from '../types';

const services: Service[] = [
  {
    icon: 'fas fa-shield-halved',
    title: 'Cyber Security',
    description: 'Robust security solutions, threat analysis, vulnerability assessments, and ethical hacking to protect digital assets from evolving cyber threats.',
    color: '#00ff9d',
  },
  {
    icon: 'fas fa-code',
    title: 'Web & Bot Development',
    description: 'High-performance websites and intelligent Telegram bots using modern frameworks. From static sites to full-stack async applications.',
    color: '#00b3ff',
  },
  {
    icon: 'fas fa-server',
    title: 'System Operations',
    description: 'Managing complex IT systems, cloud platforms, and data infrastructure. Ensuring high availability, performance, and seamless automation.',
    color: '#7700ff',
  },
  {
    icon: 'fas fa-brain',
    title: 'AI/ML Integration',
    description: 'Developing intelligent systems powered by IBM Watson, AutoAI, and custom ML models. From data pipelines to production-grade deployments.',
    color: '#ff6b35',
  },
  {
    icon: 'fas fa-atom',
    title: 'Quantum Computing',
    description: 'Exploring quantum algorithms using IBM Quantum computers. Building solutions that leverage quantum superposition for cryptographic applications.',
    color: '#00ff9d',
  },
  {
    icon: 'fas fa-cubes',
    title: 'Blockchain & Crypto',
    description: 'Understanding blockchain fundamentals, smart contract concepts, and cryptographic protocols for decentralized application architectures.',
    color: '#00b3ff',
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
  const colors: Record<string, string> = {
    '#00ff9d': 'rgba(0,255,157,',
    '#00b3ff': 'rgba(0,179,255,',
    '#7700ff': 'rgba(119,0,255,',
    '#ff6b35': 'rgba(255,107,53,',
  };
  const rgba = colors[service.color || '#00ff9d'];

  return (
    <AnimFade delay={index * 80}>
      <div
        className="group relative p-7 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 h-full"
        style={{
          ['--service-color' as string]: service.color,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget;
          el.style.borderColor = `${service.color}50`;
          el.style.boxShadow = `0 20px 50px ${rgba}0.15)`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget;
          el.style.borderColor = '';
          el.style.boxShadow = '';
        }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at top left, ${rgba}0.05) 0%, transparent 60%)` }}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-2xl transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${rgba}0.1)`,
            border: `1px solid ${rgba}0.3)`,
            color: service.color,
          }}
        >
          <i className={service.icon} />
        </div>

        <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">{service.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(225deg, ${rgba}0.15), transparent 70%)`,
            borderTop: `2px solid ${rgba}0.4)`,
            borderRight: `2px solid ${rgba}0.4)`,
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
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">My Services</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #00b3ff, #7700ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-16 tracking-widest">// WHAT_I_DO</p>
        </AnimFade>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => <ServiceCard key={s.title} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default Services;
