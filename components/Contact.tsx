import React, { useState, useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

const getEmail    = (): string => atob('c2hhbnVqYW5zaEBnbWFpbC5jb20=');
const getEndpoint = (): string => atob('aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi9tcmJhcHp3ZA==');

const socials = [
  { icon: 'fab fa-github',    label: 'GitHub',    url: 'https://github.com/shanujans',                 color: '#ffffff' },
  { icon: 'fab fa-linkedin',  label: 'LinkedIn',  url: 'https://www.linkedin.com/in/shanujansuresh/', color: '#00b3ff' },
  { icon: 'fab fa-telegram',  label: 'Telegram',  url: 'https://t.me/Revmatrix',                      color: '#00b3ff' },
  { icon: 'fab fa-instagram', label: 'Instagram', url: 'https://www.instagram.com/shanujan_29/',      color: '#ff6b35' },
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

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleCopy = () => {
    navigator.clipboard.writeText(getEmail()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    const form = e.currentTarget;
    try {
      await fetch(getEndpoint(), {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      setFormState('sent');
      form.reset();
    } catch {
      setFormState('idle');
    }
  };

  return (
    <section id="contact" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimFade>
          <h2 className="text-4xl font-bold text-center mb-2 animated-gradient-text">Get In Touch</h2>
          <div className="w-20 h-1 mx-auto mb-4" style={{ background: 'linear-gradient(90deg, #00ff9d, #00b3ff)' }} />
          <p className="text-center text-gray-500 font-jetbrains-mono text-sm mb-16 tracking-widest">// CONTACT</p>
        </AnimFade>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">

          {/* Form */}
          <AnimFade delay={100}>
            <div className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-6 font-jetbrains-mono">
                <span className="text-[#00ff9d]">&gt;</span> Send a Message
              </h3>
              {formState === 'sent' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30 flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-check text-2xl text-[#00ff9d]" />
                  </div>
                  <p className="text-white font-bold text-lg mb-2">Message Sent!</p>
                  <p className="text-gray-400 text-sm">I'll get back to you soon.</p>
                  <button onClick={() => setFormState('idle')} className="btn-secondary mt-6 text-sm">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="text" name="_gotcha" style={{ display: 'none' }} />
                  <input type="hidden" name="_subject" value="New message from portfolio" />
                  <div className="relative">
                    <input type="text" name="name" required placeholder=" " className="contact-input peer" />
                    <label className="contact-label">Your Name</label>
                  </div>
                  <div className="relative">
                    <input type="email" name="email" required placeholder=" " className="contact-input peer" />
                    <label className="contact-label">Email Address</label>
                  </div>
                  <div className="relative">
                    <input type="text" name="subject" placeholder=" " className="contact-input peer" />
                    <label className="contact-label">Subject</label>
                  </div>
                  <div className="relative">
                    <textarea name="message" rows={5} required placeholder=" " className="contact-input peer resize-none" />
                    <label className="contact-label">Message</label>
                  </div>
                  <button type="submit" disabled={formState === 'sending'}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60">
                    {formState === 'sending' ? (
                      <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />Sending...</>
                    ) : (
                      <>Send Message <i className="fas fa-paper-plane text-sm" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimFade>

          {/* Info */}
          <AnimFade delay={200}>
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-2 font-jetbrains-mono">
                  <span className="text-[#00b3ff]">&gt;</span> Let's Connect
                </h3>
                <div className="w-12 h-0.5 bg-[#00b3ff] mb-5" />
                <p className="text-gray-400 leading-relaxed">
                  Always open to discussing new projects, creative ideas, or opportunities to
                  collaborate. Whether it's AI, cybersecurity, or web development — let's
                  build something great together.
                </p>
              </div>

              {/* Email button — address NEVER in DOM */}
              <button onClick={handleCopy}
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#00ff9d]/40 transition-all duration-300 group text-left">
                <div className="w-12 h-12 rounded-lg bg-[#00ff9d]/10 border border-[#00ff9d]/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className="fas fa-envelope text-[#00ff9d]" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 font-jetbrains-mono mb-1 tracking-widest uppercase">Email</div>
                  <div className="font-jetbrains-mono text-sm text-white tracking-wider select-none">
                    s••••••••@gmail.com
                  </div>
                  <div className={`text-xs mt-0.5 transition-colors duration-300 ${copied ? 'text-[#00ff9d]' : 'text-gray-600'}`}>
                    {copied ? '✓ Copied to clipboard!' : 'Click to copy'}
                  </div>
                </div>
                <i className={`fas ${copied ? 'fa-check text-[#00ff9d]' : 'fa-copy text-gray-600 group-hover:text-[#00ff9d]'} transition-colors`} />
              </button>

              {/* Socials */}
              <div>
                <div className="text-xs text-gray-500 font-jetbrains-mono mb-3 tracking-widest">FIND ME ON</div>
                <div className="grid grid-cols-2 gap-3">
                  {socials.map(s => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:-translate-y-1 transition-all duration-300 group"
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${s.color}50`; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ''; }}>
                      <i className={`${s.icon} text-lg text-gray-400 group-hover:text-white transition-colors`} />
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors font-jetbrains-mono">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimFade>
        </div>
      </div>
    </section>
  );
};

export default Contact;
