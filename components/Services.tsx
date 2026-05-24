import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const services = [
  {
    num: '01',
    title: 'IT Support',
    desc: 'Hands-on technical troubleshooting, networking, and system maintenance for real-world business operations.',
  },
  {
    num: '02',
    title: 'AI Tools Implementation',
    desc: 'Implementing Google Gemini API and automation workflows to integrate AI into real enterprise tasks.',
  },
  {
    num: '03',
    title: 'AI Agent Development',
    desc: 'Building intelligent, multi-step autonomous agent systems using robust Cloudflare Worker infrastructure.',
  },
  {
    num: '04',
    title: 'Technical Documentation',
    desc: 'Crafting clear SOPs, user guides and knowledge-base articles for IT teams and onboarding pipelines.',
  },
];

const Services: React.FC = () => (
  <section
    id="services"
    className="py-32 px-6 md:px-10 rounded-t-[60px] relative z-10"
    style={{ background: '#ffffff' }}
  >
    <FadeIn y={30}>
      <h2
        className="font-black uppercase text-center text-[#0C0C0C] mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 140px)', lineHeight: 1 }}
      >
        Services
      </h2>
    </FadeIn>

    <div className="max-w-5xl mx-auto">
      {services.map((s, i) => (
        <motion.div
          key={s.num}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '40px' }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-start gap-8 py-10 group"
          style={{
            borderBottom: i < services.length - 1 ? '1px solid rgba(12,12,12,0.15)' : 'none',
          }}
        >
          {/* Number */}
          <div
            className="font-black text-[#0C0C0C] flex-shrink-0 leading-none group-hover:opacity-60 transition-opacity"
            style={{ fontSize: 'clamp(3rem, 6vw, 6rem)' }}
          >
            {s.num}
          </div>

          {/* Text */}
          <div className="pt-3">
            <h3 className="font-medium uppercase text-[#0C0C0C] tracking-widest mb-3"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)' }}>
              {s.title}
            </h3>
            <p className="font-light text-[#0C0C0C] opacity-60 max-w-2xl leading-relaxed text-base md:text-lg">
              {s.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Services;
