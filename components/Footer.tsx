import React from 'react';
import { motion } from 'framer-motion';
import FadeIn from './FadeIn';
import CVRequestModal from './CVRequestModal';

const socials = [
  { icon: 'fab fa-github',    url: 'https://github.com/shanujans',                 label: 'GitHub'    },
  { icon: 'fab fa-linkedin',  url: 'https://www.linkedin.com/in/shanujansuresh/', label: 'LinkedIn'  },
  { icon: 'fab fa-telegram',  url: 'https://t.me/Revmatrix',                      label: 'Telegram'  },
  { icon: 'fab fa-instagram', url: 'https://www.instagram.com/shanujan_29/',      label: 'Instagram' },
];

const Footer: React.FC = () => {
  const [cvOpen, setCvOpen] = React.useState(false);

  return (
    <>
      <CVRequestModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />

      <footer
        id="contact"
        className="py-20 md:py-28 px-5 md:px-12 scroll-mt-20"
        style={{ background: '#0C0C0C', borderTop: '1px solid rgba(215,226,234,0.07)' }}
      >
        <div className="max-w-5xl mx-auto">

          {/* Big heading */}
          <FadeIn y={30}>
            <h2
              className="font-black uppercase text-center mb-4 md:mb-6"
              style={{
                fontSize: 'clamp(2.2rem, 8vw, 90px)',
                lineHeight: 1.05,
                background: 'linear-gradient(180deg,#646973 0%,#BBCCD7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Let's Build Together
            </h2>
          </FadeIn>

          <FadeIn y={20} delay={0.1} className="text-center mb-8 md:mb-12">
            <p
              className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
              style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.85rem)' }}
            >
              Available for IT Support · AI Tools · Service Desk · Agent Development
            </p>
          </FadeIn>

          {/* CV Request card — replaces the old contact form */}
          <FadeIn y={24} delay={0.15} className="mb-12 md:mb-16">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 260 }}
              className="rounded-[28px] md:rounded-[40px] p-6 md:p-10 border border-[#B600A8]/20 cursor-pointer"
              style={{ background: 'rgba(182,0,168,0.04)' }}
              onClick={() => setCvOpen(true)}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div
                    className="font-black uppercase mb-2"
                    style={{
                      fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                      background: 'linear-gradient(123deg,#B600A8,#7621B0)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Request My CV
                  </div>
                  <p className="text-[#D7E2EA]/50 font-light text-sm md:text-base max-w-md">
                    HR &amp; recruiters only — work email required. AI-verified delivery with OTP confirmation. Your details sent securely to my Telegram.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                    {['Work Email Required', 'OTP Verified', 'AI Validated', 'Instant Delivery'].map(tag => (
                      <span
                        key={tag}
                        className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-medium"
                        style={{ background: 'rgba(182,0,168,0.12)', color: '#B600A8', border: '1px solid rgba(182,0,168,0.25)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  className="contact-btn flex-shrink-0"
                  onClick={e => { e.stopPropagation(); setCvOpen(true); }}
                >
                  Get My CV
                </button>
              </div>
            </motion.div>
          </FadeIn>

          {/* Divider */}
          <div className="border-t border-[#D7E2EA]/8 mb-8 md:mb-10" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0">

            {/* Status */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span
                className="text-[#D7E2EA]/50 font-light uppercase tracking-widest"
                style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)' }}
              >
                Available for work · Sri Lanka 🇱🇰
              </span>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-[#D7E2EA]/12 flex items-center justify-center text-[#D7E2EA]/45 hover:text-[#D7E2EA] hover:border-[#B600A8]/60 hover:shadow-[0_0_12px_rgba(182,0,168,0.3)] transition-all duration-300 text-sm"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p
              className="text-[#D7E2EA]/25 font-light uppercase tracking-widest"
              style={{ fontSize: 'clamp(0.55rem, 1vw, 0.7rem)' }}
            >
              © {new Date().getFullYear()} Shanujan Suresh
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;