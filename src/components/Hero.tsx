import React from 'react';

const Hero: React.FC = () => {

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 z-0">
        <div className="glow-orb w-96 h-96 bg-[#00ff9d] top-1/4 left-1/4 animate-pulse"></div>
        <div className="glow-orb w-80 h-80 bg-[#7700ff] bottom-1/4 right-1/4 animate-pulse delay-1000"></div>
        <div className="scanline"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#00ff9d] text-lg md:text-xl mb-4 font-jetbrains-mono hero-fade-in-up" style={{ animationDelay: '100ms' }}>
            Hello, I'm
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 text-white animated-gradient-text hero-fade-in-up" style={{ animationDelay: '300ms' }}>
            Shanujan Suresh
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 hero-fade-in-up" style={{ animationDelay: '500ms' }}>
            A passionate IT professional transitioning into AI/ML with expertise in system operations and data infrastructure. Passionate about Python, Cyber Security, and Blockchain.
          </p>
          <div className="flex flex-wrap justify-center gap-4 hero-fade-in-up" style={{ animationDelay: '700ms' }}>
            <a href="#projects" className="btn-primary" onClick={handleScrollClick}>View My Work</a>
            <a href="#contact" className="btn-secondary" onClick={handleScrollClick}>Contact Me</a>
            <a href="./Shanujan CV.pdf" download className="btn-secondary">Download Resume <i className="fas fa-download ml-2"></i></a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
