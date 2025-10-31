import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import TerminalBackground from './components/TerminalBackground';

const App: React.FC = () => {
  useEffect(() => {
    // Force scroll to top on page load
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#0a0a14] text-gray-200 font-rajdhani relative overflow-x-hidden">
      <TerminalBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default App;