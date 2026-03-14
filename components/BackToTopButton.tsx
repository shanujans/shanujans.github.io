import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl flex items-center justify-center border border-[#00ff9d]/40 bg-[#0a0a14]/80 backdrop-blur-sm text-[#00ff9d] hover:bg-[#00ff9d] hover:text-[#0a0a14] transition-all duration-300"
      style={{
        boxShadow: '0 0 15px rgba(0,255,157,0.3)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: visible ? 'all' : 'none',
        transition: 'opacity 0.3s, transform 0.3s, background 0.3s, color 0.3s',
      }}
    >
      <i className="fas fa-chevron-up text-sm" />
    </button>
  );
};

export default BackToTopButton;
