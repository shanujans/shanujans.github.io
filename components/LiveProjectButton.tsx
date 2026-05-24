import React from 'react';

interface LiveProjectButtonProps {
  href?: string;
  label?: string;
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  href = '#projects',
  label = 'Live Project',
}) => (
  <a
    href={href}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 hover:bg-[#D7E2EA]/10 transition-all duration-300 text-sm"
  >
    <span className="w-2 h-2 rounded-full bg-[#D7E2EA] animate-pulse" />
    {label}
  </a>
);

export default LiveProjectButton;
