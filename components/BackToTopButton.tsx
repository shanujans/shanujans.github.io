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
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0 0 16px rgba(182,0,168,0.4)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: visible ? 'all' : 'none',
        transition: 'opacity 0.3s, transform 0.3s',
      }}
    >
      <i className="fas fa-chevron-up text-sm" />
    </button>
  );
};

export default BackToTopButton;
