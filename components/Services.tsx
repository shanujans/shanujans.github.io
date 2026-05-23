import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Service } from '../types';

gsap.registerPlugin(ScrollTrigger);

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
    description: 'Setting up and integrating AI tools — chatbot deployment using Google Gemini API, prompt engineering, and using AI to automate documentation and workflows. ARIA on this site is a live example.',
    color: '#00b3ff',
  },
  {
    icon: 'fas fa-brain',
    title: 'AI Agent Development',
    description: 'Building AI agents from scratch to production using modern AI APIs and orchestration tools. From simple task automation to multi-step agentic workflows — using AI assistance throughout.',
    color: '#ff6b35',
  },
  {
    icon: 'fas fa-file-alt',
    title: 'Technical Documentation',
    description: 'Writing clear, accurate technical guides, SOPs, and user manuals. Translating technical processes into plain language — useful for IT teams, onboarding, and helpdesk knowledge bases.',
    color: '#7700ff',
  },
];

const Services: React.FC = () => {
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
    );
  });

  const rgba: Record<string, string> = {
    '#00ff9d': 'rgba(0,255,157,',
    '#00b3ff': 'rgba(0,179,255,',
    '#7700ff': 'rgba(119,0,255,',
    '#ff6b35': 'rgba(255,107,53,',
  };

  return (
    <section id="services" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={headingRef} style={{ opacity: 0 }}>
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">What I Offer</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #00b3ff, #7700ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-4 tracking-widest">// WHAT_I_CAN_DO</p>
          <p className="text-center text-gray-500 text-sm max-w-xl mx-auto mb-16">
            Services I genuinely offer — skills I have real or actively developing experience with.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => {
            const base = rgba[service.color || '#00ff9d'];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="group relative p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden h-full"
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${service.color}50`;
                  el.style.boxShadow   = `0 20px 50px ${base}0.12)`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = '';
                  el.style.boxShadow   = '';
                }}
              >
                {/* Radial glow bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at top left, ${base}0.06) 0%, transparent 60%)` }}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-2xl"
                  style={{ background: `${base}0.1)`, border: `1px solid ${base}0.3)`, color: service.color }}
                >
                  <i className={service.icon} />
                </motion.div>

                <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>

                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(225deg, ${base}0.15), transparent 70%)`,
                    borderTop:  `2px solid ${base}0.4)`,
                    borderRight: `2px solid ${base}0.4)`,
                    borderTopRightRadius: '0.75rem',
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;