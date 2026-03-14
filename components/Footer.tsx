import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="relative bg-black/50 border-t border-white/5 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #00ff9d40, transparent)' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="font-jetbrains-mono text-xl font-bold text-white mb-3">
              <span className="text-[#00ff9d]">&lt;</span>Shanujan<span className="text-[#7700ff]"> /</span><span className="text-[#00ff9d]">&gt;</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              IT Professional & Developer passionate about AI/ML, Cybersecurity, and Quantum Computing.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-xs text-gray-500 font-jetbrains-mono tracking-widest mb-3">NAVIGATE</div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {['#home', '#about', '#experience', '#services', '#projects', '#contact'].map(href => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="text-sm text-gray-400 hover:text-[#00ff9d] transition-colors font-jetbrains-mono capitalize"
                >
                  {href.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <div className="text-xs text-gray-500 font-jetbrains-mono tracking-widest mb-3">STATUS</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff9d] animate-pulse" />
              <span className="text-sm text-gray-400">Available for work</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00b3ff]" />
              <span className="text-sm text-gray-400">Based in Sri Lanka 🇱🇰</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-jetbrains-mono text-xs text-gray-600">
            © {year} Shanujan Suresh. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-600 font-jetbrains-mono">
            Built with <span className="text-[#00ff9d]">React</span> + <span className="text-[#00b3ff]">TypeScript</span> + <span className="text-[#7700ff]">Vite</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
