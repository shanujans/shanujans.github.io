import React, { useEffect, useState } from 'react';

const TECH_ITEMS = [
  { label: 'Google Gemini API', bg: '#1a1a2e' },
  { label: 'Cloudflare Workers', bg: '#1a1a1a' },
  { label: 'Vercel', bg: '#0d1b2a' },
  { label: 'Android Studio', bg: '#1a1229' },
  { label: 'Python', bg: '#0a1628' },
  { label: 'Claude', bg: '#1a0a1a' },
  { label: 'Google AI Studio', bg: '#0d1f12' },
  { label: 'Telegram Bot API', bg: '#0a1a1f' },
  { label: 'GitHub Actions', bg: '#1a1a0d' },
  { label: 'SQL Server & C#', bg: '#1f0d0d' },
  { label: 'IT Support', bg: '#1a1520' },
  { label: 'IBM Quantum', bg: '#0f1a2e' },
  { label: 'Render', bg: '#1a100a' },
  { label: 'Linux Essentials', bg: '#0a1a0a' },
  { label: 'scikit-learn ML', bg: '#1a1a1a' },
  { label: 'Groq Llama API', bg: '#1a0f0a' },
  { label: 'Node 24 + Vite', bg: '#0d0d1a' },
  { label: 'AMD Dev Cloud', bg: '#1a1a10' },
  { label: 'Cisco Netcad', bg: '#100a1a' },
  { label: 'PyPI Publishing', bg: '#0a1a12' },
  { label: 'OCI & AWS Basics', bg: '#1a120a' },
];

const triple = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

const MarqueeSection: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.3);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const Card: React.FC<{ label: string; bg: string }> = ({ label, bg }) => (
    <div
      className="flex-shrink-0 rounded-2xl flex items-center justify-center border border-white/5"
      style={{
        width: '280px', height: '100px', background: bg,
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      <span className="text-[#D7E2EA] font-medium uppercase tracking-widest text-sm">{label}</span>
    </div>
  );

  return (
    <section className="overflow-hidden py-16" style={{ background: '#0C0C0C' }}>
      <div className="flex flex-col gap-3">
        {/* Row 1 — moves RIGHT with scroll */}
        <div className="flex gap-3" style={{ transform: `translateX(${-600 + offset}px)`, willChange: 'transform' }}>
          {triple.map((item, i) => <Card key={i} {...item} />)}
        </div>
        {/* Row 2 — moves LEFT with scroll */}
        <div className="flex gap-3" style={{ transform: `translateX(${-200 - offset}px)`, willChange: 'transform' }}>
          {triple.slice().reverse().map((item, i) => <Card key={i} {...item} />)}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
