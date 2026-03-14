import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[999] bg-transparent">
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #00ff9d, #00b3ff, #7700ff)',
          boxShadow: '0 0 8px #00ff9d',
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
