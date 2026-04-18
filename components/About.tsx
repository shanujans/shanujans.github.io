import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

const AnimFade: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref, '-80px');
  return (
    <div ref={ref} className={`fade-in-up ${visible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const canDoNow = [
  { icon: 'fas fa-headset',        label: 'IT Support & Troubleshooting',   note: '4 years hands-on' },
  { icon: 'fas fa-file-word',      label: 'MS Office Suite',                note: 'Word, Excel, Outlook, Teams' },
  { icon: 'fas fa-robot',          label: 'Gemini API & Google AI Studio',  note: 'Deployed real AI chatbot (ARIA)' },
  { icon: 'fas fa-network-wired',  label: 'Basic Networking',               note: 'Cable, DNS, connectivity issues' },
  { icon: 'fas fa-print',          label: 'Hardware & Peripherals',         note: 'Printers, PCs, setup' },
  { icon: 'fas fa-envelope',       label: 'Email & Communication Systems',  note: 'Setup, troubleshooting' },
  { icon: 'fab fa-git-alt',        label: 'Git & GitHub',                   note: 'Version control, deployments' },
  { icon: 'fas fa-globe',          label: 'AI-Assisted Web Development',    note: 'React + Vite with AI tools' },
];

const learning = [
  { icon: 'fab fa-python',         label: 'Python',                         note: 'Beginner — using AI assistance' },
  { icon: 'fab fa-linux',          label: 'Linux',                          note: 'Beginner — basic commands' },
  { icon: 'fas fa-vial',           label: 'Manual QA Testing',              note: 'Actively studying' },
  { icon: 'fas fa-server',         label: 'Site Reliability (SRE)',         note: 'Self-studying fundamentals' },
  { icon: 'fas fa-project-diagram', label: 'n8n Automation',               note: 'Starting from scratch' },
  { icon: 'fas fa-shield-halved',  label: 'Cybersecurity',                  note: 'Interest — no practical experience yet' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <AnimFade>
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">About Me</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #00ff9d, #00b3ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-16 tracking-widest">// WHO_AM_I</p>
        </AnimFade>

        {/* Bio */}
        <AnimFade delay={100}>
          <div className="max-w-3xl mx-auto mb-16 p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-[#00ff9d] font-jetbrains-mono text-lg">01.</span> Who I Am
            </h3>
            <div className="w-12 h-0.5 bg-[#00ff9d] mb-5" />
            <p className="text-gray-400 leading-relaxed mb-4">
              I'm an IT Support professional from Sri Lanka with 4+ years of real-world experience helping users
              with hardware, software, networking, and day-to-day technical issues in a small business environment.
              I'm honest about where I am: my support experience is genuine, and I'm now actively building on it
              by learning AI tools and automation.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              My strongest emerging skill is working with AI tools — I've deployed a live AI chatbot (ARIA, bottom right)
              using Google Gemini API and Cloudflare Workers, and I use AI tools daily to learn faster and solve problems.
              I'm targeting roles in IT Support, Service Desk, QA Testing, or AI Tools where I can contribute immediately
              and keep growing.
            </p>
            <p className="text-gray-400 leading-relaxed">
              I believe in being straightforward: I won't claim skills I don't have, and I'll always tell you
              exactly what I can and cannot do. If you're looking for someone reliable, honest, and motivated to grow — let's talk.
            </p>

            {/* Highlight ARIA */}
            <div className="mt-6 p-4 rounded-lg border border-[#00ff9d]/30 bg-[#00ff9d]/5 flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <div className="text-[#00ff9d] font-jetbrains-mono text-sm font-bold mb-1">Live AI Implementation — ARIA Chatbot</div>
                <div className="text-gray-400 text-sm">
                  I built and deployed ARIA — the AI assistant in the bottom right corner — using Google Gemini API,
                  Cloudflare Workers (for secure API proxying), and React. This is my most concrete proof of AI tools experience.
                  Click the 🤖 button to try it.
                </div>
              </div>
            </div>
          </div>
        </AnimFade>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

          {/* Can Do Now */}
          <AnimFade delay={150}>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                <span className="text-[#00ff9d] font-jetbrains-mono">✅</span> What I Can Do Now
              </h3>
              <div className="w-12 h-0.5 bg-[#00ff9d] mb-5" />
              <div className="space-y-3">
                {canDoNow.map(s => (
                  <div
                    key={s.label}
                    className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:border-[#00ff9d]/30 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center flex-shrink-0">
                      <i className={`${s.icon} text-[#00ff9d] text-sm`} />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{s.label}</div>
                      <div className="text-gray-500 text-xs font-jetbrains-mono">{s.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimFade>

          {/* Currently Learning */}
          <AnimFade delay={250}>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                <span className="text-[#00b3ff] font-jetbrains-mono">📚</span> Currently Learning
              </h3>
              <div className="w-12 h-0.5 bg-[#00b3ff] mb-5" />
              <div className="space-y-3">
                {learning.map(s => (
                  <div
                    key={s.label}
                    className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:border-[#00b3ff]/30 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00b3ff]/10 border border-[#00b3ff]/20 flex items-center justify-center flex-shrink-0">
                      <i className={`${s.icon} text-[#00b3ff] text-sm`} />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">{s.label}</div>
                      <div className="text-gray-500 text-xs font-jetbrains-mono">{s.note}</div>
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
