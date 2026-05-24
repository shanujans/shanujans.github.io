import React from 'react';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';

const socials = [
  { icon: 'fab fa-github',    url: 'https://github.com/shanujans',                 label: 'GitHub'    },
  { icon: 'fab fa-linkedin',  url: 'https://www.linkedin.com/in/shanujansuresh/', label: 'LinkedIn'  },
  { icon: 'fab fa-telegram',  url: 'https://t.me/Revmatrix',                      label: 'Telegram'  },
  { icon: 'fab fa-instagram', url: 'https://www.instagram.com/shanujan_29/',      label: 'Instagram' },
];

const Footer: React.FC = () => (
  <footer
    id="contact"
    className="py-24 px-6 md:px-12 scroll-mt-20"
    style={{ background: '#0C0C0C', borderTop: '1px solid rgba(215,226,234,0.08)' }}
  >
    <div className="max-w-5xl mx-auto">

      {/* Big CTA */}
      <FadeIn y={30}>
        <h2
          className="hero-heading font-black uppercase text-center mb-6"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 100px)', lineHeight: 1.05 }}
        >
          Let's Build Together
        </h2>
      </FadeIn>

      <FadeIn y={20} delay={0.15} className="text-center mb-10">
        <p className="text-[#D7E2EA]/60 font-light uppercase tracking-widest text-sm">
          Available for IT Support · AI Tools · Service Desk roles
        </p>
      </FadeIn>

      <FadeIn y={20} delay={0.2} className="flex justify-center mb-16">
        <ContactButton label="Contact Me" />
      </FadeIn>

      {/* Divider */}
      <div className="border-t border-[#D7E2EA]/10 mb-10" />

      {/* Bottom row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[#D7E2EA]/60 font-light uppercase tracking-widest text-xs">
            Available for work · Sri Lanka 🇱🇰
          </span>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full border border-[#D7E2EA]/15 flex items-center justify-center text-[#D7E2EA]/50 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/50 transition-all duration-300"
            >
              <i className={s.icon} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-[#D7E2EA]/30 text-xs font-light uppercase tracking-widest">
          © {new Date().getFullYear()} Shanujan Suresh
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
