import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const canDoNow = [
  { icon: 'fas fa-headset',        label: 'IT Support & Troubleshooting',  note: '4 years hands-on' },
  { icon: 'fas fa-file-word',      label: 'MS Office Suite',               note: 'Word, Excel, Outlook, Teams' },
  { icon: 'fas fa-robot',          label: 'Gemini API & Google AI Studio', note: 'Deployed ARIA chatbot live' },
  { icon: 'fas fa-network-wired',  label: 'Basic Networking',              note: 'Cable, DNS, connectivity' },
  { icon: 'fas fa-print',          label: 'Hardware & Peripherals',        note: 'Printers, PCs, setup' },
  { icon: 'fab fa-git-alt',        label: 'Git & GitHub',                  note: 'Version control, CI/CD' },
  { icon: 'fas fa-cloud',          label: 'Cloud Platforms (AI-Assisted)', note: 'OCI, AWS basics, IBM Cloud' },
  { icon: 'fas fa-globe',          label: 'AI-Assisted Web Development',   note: 'React + Vite with AI tools' },
];

const learning = [
  { icon: 'fab fa-python',          label: 'Python',              note: 'Beginner — using AI assistance' },
  { icon: 'fab fa-linux',           label: 'Linux',               note: 'Beginner — basic commands' },
  { icon: 'fas fa-vial',            label: 'Manual QA Testing',   note: 'Actively studying' },
  { icon: 'fas fa-server',          label: 'Site Reliability',    note: 'Self-studying fundamentals' },
  { icon: 'fas fa-project-diagram', label: 'n8n Automation',      note: 'Starting from scratch' },
  { icon: 'fas fa-shield-halved',   label: 'Cybersecurity',       note: 'Interest — no practical exp yet' },
];

const stats = [
  { value: '4+', label: 'Years IT Support', icon: 'fas fa-headset',  color: '#00ff9d' },
  { value: '8+', label: 'Projects Built',   icon: 'fas fa-code',      color: '#00b3ff' },
  { value: '1',  label: 'Live AI Chatbot',  icon: 'fas fa-robot',     color: '#7700ff' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const About: React.FC = () => {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const bioRef      = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
    );

    if (statsRowRef.current) {
      gsap.fromTo(
        Array.from(statsRowRef.current.children),
        { opacity: 0, y: 24, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: statsRowRef.current, start: 'top 83%' } }
      );
    }

    gsap.fromTo(bioRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: bioRef.current, start: 'top 82%' } }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div ref={headingRef} style={{ opacity: 0 }}>
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">About Me</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #00ff9d, #00b3ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-16 tracking-widest">// WHO_AM_I</p>
        </div>

        {/* Stat callouts */}
        <div ref={statsRowRef} className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16">
          {stats.map(s => (
            <div
              key={s.label}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center hover:-translate-y-1 transition-all duration-300 group"
              style={{ opacity: 0 }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = s.color + '50';
                (e.currentTarget as HTMLElement).style.boxShadow   = `0 12px 32px ${s.color}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '';
                (e.currentTarget as HTMLElement).style.boxShadow   = '';
              }}
            >
              <i className={`${s.icon} text-2xl mb-3 block`} style={{ color: s.color }} />
              <div className="text-4xl font-bold font-jetbrains-mono" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-1 tracking-wider uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bio card */}
        <div ref={bioRef} className="max-w-3xl mx-auto mb-16" style={{ opacity: 0 }}>
          <div className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-[#00ff9d] font-jetbrains-mono text-lg">01.</span> Who I Am
            </h3>
            <div className="w-12 h-0.5 bg-[#00ff9d] mb-5" />
            <p className="text-gray-400 leading-relaxed mb-4">
              I'm an IT Support professional from Sri Lanka with 4+ years of real-world experience helping
              users with hardware, software, networking, and day-to-day technical issues. I'm currently
              studying BSc Computer Science at University of the People (from 2025) while actively building
              skills in AI tools and automation.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              My strongest emerging skill is working with AI tools — I've deployed a live AI chatbot
              (ARIA, bottom right) using Google Gemini API and Cloudflare Workers. I'm targeting roles in
              IT Support, Service Desk, QA Testing, or AI Tools where I can contribute immediately and keep growing.
            </p>
            <p className="text-gray-400 leading-relaxed">
              I believe in being straightforward: I won't claim skills I don't have. If you're looking for
              someone reliable, honest, and motivated to grow — let's talk.
            </p>

            <div className="mt-6 p-4 rounded-lg border border-[#00ff9d]/30 bg-[#00ff9d]/5 flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <div className="text-[#00ff9d] font-jetbrains-mono text-sm font-bold mb-1">
                  Live AI Implementation — ARIA Chatbot
                </div>
                <div className="text-gray-400 text-sm">
                  Built and deployed using Google Gemini API, Cloudflare Workers for secure API proxying,
                  and React. My most concrete proof of AI tools experience. Click the 🤖 button to try it.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills grid — Framer Motion stagger */}
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* Can Do Now */}
          <div>
            <motion.h3
              className="text-xl font-bold text-white mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#00ff9d] font-jetbrains-mono">✅</span> What I Can Do Now
            </motion.h3>
            <div className="w-12 h-0.5 bg-[#00ff9d] mb-5" />
            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {canDoNow.map(s => (
                <motion.div
                  key={s.label}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:border-[#00ff9d]/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center flex-shrink-0">
                    <i className={`${s.icon} text-[#00ff9d] text-sm`} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{s.label}</div>
                    <div className="text-gray-500 text-xs font-jetbrains-mono">{s.note}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Currently Learning */}
          <div>
            <motion.h3
              className="text-xl font-bold text-white mb-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#00b3ff] font-jetbrains-mono">📚</span> Currently Learning
            </motion.h3>
            <div className="w-12 h-0.5 bg-[#00b3ff] mb-5" />
            <motion.div
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {learning.map(s => (
                <motion.div
                  key={s.label}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:border-[#00b3ff]/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00b3ff]/10 border border-[#00b3ff]/20 flex items-center justify-center flex-shrink-0">
                    <i className={`${s.icon} text-[#00b3ff] text-sm`} />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{s.label}</div>
                    <div className="text-gray-500 text-xs font-jetbrains-mono">{s.note}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;