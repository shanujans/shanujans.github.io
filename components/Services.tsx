import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';

const services = [
  {
    num: '01',
    title: 'IT Support',
    desc: 'Hands-on technical troubleshooting, networking, hardware setup and system maintenance for real-world business operations.',
  },
  {
    num: '02',
    title: 'AI Tools Implementation',
    desc: 'Implementing Google Gemini API and automation workflows to integrate AI into real enterprise tasks and daily workflows.',
  },
  {
    num: '03',
    title: 'AI Agent Development',
    desc: 'Building intelligent, multi-step autonomous agent systems using modern AI APIs and robust Cloudflare Worker infrastructure.',
  },
  {
    num: '04',
    title: 'Web Development',
    desc: 'Building secure, high-performance web applications and portfolio sites using React, TypeScript, and modern deployment pipelines.',
  },
];

const Services: React.FC = () => (
  <section
    id="services"
    className="py-24 md:py-32 px-5 md:px-10 rounded-t-[40px] md:rounded-t-[60px] relative z-10"
    style={{ background: '#ffffff' }}
  >
    <FadeIn y={30}>
      <h2
        className="font-black uppercase text-center text-[#0C0C0C] mb-14 md:mb-20"
        style={{ fontSize: 'clamp(2.8rem, 11vw, 130px)', lineHeight: 1 }}
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
          transition={{ duration: 0.55, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-start gap-4 md:gap-8 py-8 md:py-10 group"
          style={{ borderBottom: i < services.length - 1 ? '1px solid rgba(12,12,12,0.12)' : 'none' }}
        >
          {/* Number */}
          <div
            className="font-black text-[#0C0C0C] flex-shrink-0 leading-none group-hover:opacity-40 transition-opacity duration-300"
            style={{ fontSize: 'clamp(2rem, 5.5vw, 5.5rem)' }}
          >
            {s.num}
          </div>

          {/* Text */}
          <div className="pt-1 md:pt-3">
            <h3
              className="font-medium uppercase text-[#0C0C0C] tracking-widest mb-2 md:mb-3"
              style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}
            >
              {s.title}
            </h3>
            <p
              className="font-light text-[#0C0C0C] opacity-55 leading-relaxed"
              style={{ fontSize: 'clamp(0.82rem, 1.4vw, 1.05rem)', maxWidth: '520px' }}
            >
              {s.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Services;