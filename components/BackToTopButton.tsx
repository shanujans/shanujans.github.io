
import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Go to top"
          className="fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full bg-[#00ff9d]/80 text-[#0a0a14] flex items-center justify-center text-xl shadow-lg shadow-[#00ff9d]/30 hover:bg-[#00ff9d] hover:scale-110 transition-all duration-300 backdrop-blur-sm"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default BackToTopButton;
