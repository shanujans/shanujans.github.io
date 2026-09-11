import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import CVRequestModal from './CVRequestModal';

const getEmail    = (): string => atob('c2hhbnVqYW5zaEBnbWFpbC5jb20=');
const getEndpoint = (): string => atob('aHR0cHM6Ly9mb3Jtc3ByZWUuaW8vZi9tcmJhcHp3ZA==');

const socials = [
  { icon: 'fab fa-github',    url: 'https://github.com/shanujans',                 label: 'GitHub'    },
  { icon: 'fab fa-linkedin',  url: 'https://www.linkedin.com/in/shanujansuresh/', label: 'LinkedIn'  },
  { icon: 'fab fa-telegram',  url: 'https://t.me/Revmatrix',                      label: 'Telegram'  },
  { icon: 'fab fa-instagram', url: 'https://www.instagram.com/shanujan_29/',      label: 'Instagram' },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: '1.5px solid rgba(182,0,168,0.18)',
  borderRadius: '8px',
  padding: '1.3rem 1rem 0.5rem',
  color: '#D7E2EA',
  fontSize: '0.88rem',
  fontFamily: 'Kanit, sans-serif',
  outline: 'none',
  transition: 'border-color 0.3s',
};

const FloatInput: React.FC<{
  type?: string; label: string; name: string;
  required?: boolean; rows?: number;
}> = ({ type = 'text', label, name, required, rows }) => {
  const [focused, setFocused] = useState(false);
  const [val, setVal]         = useState('');
  const lifted = focused || val.length > 0;
  const Tag: any = rows ? 'textarea' : 'input';
  return (
    <div className="relative">
      <Tag
        type={rows ? undefined : type}
        name={name}
        required={required}
        rows={rows}
        value={val}
        placeholder=" "
        onChange={(e: React.ChangeEvent<any>) => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          resize: rows ? 'none' : undefined,
          borderColor: focused ? '#B600A8' : 'rgba(182,0,168,0.18)',
          boxShadow: focused ? '0 0 0 3px rgba(182,0,168,0.07)' : 'none',
        }}
      />
      <label style={{
        position: 'absolute', top: lifted ? '0.22rem' : '0.9rem', left: '1rem',
        fontSize: lifted ? '0.6rem' : '0.8rem',
        color: lifted ? '#B600A8' : 'rgba(215,226,234,0.35)',
        background: '#0C0C0C', padding: '0 4px', pointerEvents: 'none',
        transition: 'all 0.2s ease', fontFamily: 'Kanit, sans-serif',
        textTransform: 'uppercase', letterSpacing: '0.06em',
      }}>
        {label}
      </label>
    </div>
  );
};

const Footer: React.FC = () => {
  const [cvOpen, setCvOpen]       = useState(false);
  const [copied, setCopied]       = useState(false);
  const [formState, setFormState] = useState<'idle'|'sending'|'sent'>('idle');

  const handleCopy = () => {
    navigator.clipboard.writeText(getEmail()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');
    try {
      await fetch(getEndpoint(), {
        method: 'POST', body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      setFormState('sent');
      (e.target as HTMLFormElement).reset();
    } catch { setFormState('idle'); }
  };

  return (
    <>
      <CVRequestModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />

      <footer id="contact" className="py-20 md:py-28 px-5 md:px-12 scroll-mt-20"
        style={{ background: '#0C0C0C', borderTop: '1px solid rgba(215,226,234,0.06)' }}>
        <div className="max-w-5xl mx-auto">

          {/* Big heading */}
          <FadeIn y={30}>
            <h2 className="font-black uppercase text-center mb-4 md:mb-6"
              style={{
                fontSize: 'clamp(2.2rem,8vw,90px)', lineHeight: 1.05,
                background: 'linear-gradient(180deg,#646973 0%,#BBCCD7 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
              Let's Build Together
            </h2>
          </FadeIn>

          <FadeIn y={20} delay={0.1} className="text-center mb-10 md:mb-14">
            <p className="font-light uppercase tracking-widest text-[#D7E2EA]/45"
              style={{ fontSize: 'clamp(0.6rem,1.3vw,0.78rem)' }}>
              Available for IT Support · AI Tools · Service Desk · Agent Development
            </p>
          </FadeIn>

          {/* Two-col: form + info */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-16">

            {/* ── Contact Form ─────────────────────────────── */}
            <FadeIn y={24} delay={0.1}>
              <div className="rounded-2xl md:rounded-3xl p-6 md:p-8 border"
                style={{ background: 'rgba(182,0,168,0.03)', borderColor: 'rgba(182,0,168,0.12)' }}>
                <h3 className="font-bold uppercase tracking-widest text-[#D7E2EA] mb-1 text-sm">
                  Send a Message
                </h3>
                <div className="w-10 h-[1.5px] mb-5" style={{ background: '#B600A8' }} />

                {formState === 'sent' ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: 'rgba(182,0,168,0.1)', border: '1px solid rgba(182,0,168,0.3)' }}>
                      <i className="fas fa-check text-xl" style={{ color: '#B600A8' }} />
                    </div>
                    <p className="text-white font-bold mb-1">Message Sent!</p>
                    <p className="text-[#D7E2EA]/45 text-sm font-light">I'll get back to you soon.</p>
                    <button onClick={() => setFormState('idle')} className="contact-btn mt-5 text-sm px-6 py-2.5">
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="_gotcha" style={{ display: 'none' }} />
                    <input type="hidden" name="_subject" value="New message from portfolio" />
                    <FloatInput name="name"    label="Your Name"      required />
                    <FloatInput name="email"   label="Email Address"  type="email" required />
                    <FloatInput name="subject" label="Subject" />
                    <FloatInput name="message" label="Message"        required rows={4} />
                    <button type="submit" disabled={formState === 'sending'}
                      className="w-full contact-btn flex items-center justify-center gap-2 disabled:opacity-50">
                      {formState === 'sending'
                        ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</>
                        : <>Send Message <i className="fas fa-paper-plane text-sm" /></>}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* ── Info panel ───────────────────────────────── */}
            <FadeIn y={24} delay={0.2} className="flex flex-col gap-5">

              {/* Request CV card */}
              <motion.div whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 260 }}
                className="rounded-2xl p-5 border cursor-pointer"
                style={{ background: 'rgba(182,0,168,0.04)', borderColor: 'rgba(182,0,168,0.18)' }}
                onClick={() => setCvOpen(true)}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-bold uppercase tracking-widest mb-1"
                      style={{ fontSize: '0.85rem',
                        background: 'linear-gradient(123deg,#B600A8,#7621B0)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                      }}>
                      Request My CV
                    </div>
                    <p className="text-[#D7E2EA]/45 font-light text-xs leading-relaxed">
                      HR &amp; recruiters only — work email + OTP + AI verified delivery.
                    </p>
                  </div>
                  <button className="contact-btn text-xs px-4 py-2 flex-shrink-0"
                    onClick={e => { e.stopPropagation(); setCvOpen(true); }}>
                    Get CV
                  </button>
                </div>
              </motion.div>

              {/* Email copy — hidden but copyable */}
              <button onClick={handleCopy}
                className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: copied ? 'rgba(182,0,168,0.4)' : 'rgba(215,226,234,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(182,0,168,0.1)', border: '1px solid rgba(182,0,168,0.2)' }}>
                  <i className="fas fa-envelope" style={{ color: '#B600A8' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/35 font-light mb-0.5">Email</div>
                  {/* Masked — never rendered as plain text in DOM */}
                  <div className="text-[#D7E2EA] text-sm font-medium tracking-wider select-none">
                    s••••••••@gmail.com
                  </div>
                  <div className="text-[10px] mt-0.5 transition-colors"
                    style={{ color: copied ? '#B600A8' : 'rgba(215,226,234,0.3)' }}>
                    {copied ? '✓ Copied to clipboard!' : 'Click to copy'}
                  </div>
                </div>
                <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} text-sm transition-colors`}
                  style={{ color: copied ? '#B600A8' : 'rgba(215,226,234,0.25)' }} />
              </button>

              {/* Socials */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#D7E2EA]/30 font-light mb-3">Find me on</div>
                <div className="grid grid-cols-2 gap-2">
                  {socials.map(s => (
                    <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(215,226,234,0.07)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(182,0,168,0.3)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(215,226,234,0.07)'; }}>
                      <i className={`${s.icon} text-[#D7E2EA]/40 text-base`} />
                      <span className="text-[#D7E2EA]/50 text-xs font-light uppercase tracking-wider">{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Bottom bar */}
          <div className="border-t mb-7" style={{ borderColor: 'rgba(215,226,234,0.06)' }} />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[#D7E2EA]/40 font-light uppercase tracking-widest"
                style={{ fontSize: 'clamp(0.55rem,1vw,0.68rem)' }}>
                Available for work · Sri Lanka 🇱🇰
              </span>
            </div>
            {/* FlyRank Graduate Badge */}
            <a href="https://internship.flyrank.ai/verify" target="_blank" rel="noopener noreferrer" aria-label="FlyRank AI Internship Graduate"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '6px 10px', borderRadius: '9999px',
                background: '#111', border: '1px solid #333',
                color: '#fff', textDecoration: 'none',
                fontSize: '12px', fontWeight: 600,
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.02em',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#B600A8'; e.currentTarget.style.background = '#1a1a1a'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.background = '#111'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle' }}>
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>FlyRank AI Internship Graduate</span>
            </a>
            <p className="text-[#D7E2EA]/20 font-light uppercase tracking-widest"
              style={{ fontSize: 'clamp(0.5rem,0.9vw,0.65rem)' }}>
              © {new Date().getFullYear()} Shanujan Suresh
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;