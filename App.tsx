import React, { useEffect, useState, useCallback } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import TerminalBackground from './components/TerminalBackground';
import ParticleNetwork from './components/ParticleNetwork';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import AIChatBot from './components/AIChatBot';
import RightSideEffect from './components/RightSideEffect';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadComplete} />}

      <div
        className="bg-[#0a0a14] text-gray-200 font-rajdhani relative overflow-x-hidden"
        style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.4s ease' }}
      >
        <CursorGlow />
        <ScrollProgress />
        <TerminalBackground />
        <ParticleNetwork />
        <RightSideEffect />

        <Header />

        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Services />
          <Projects />
          <Contact />
        </main>

        <Footer />
        <BackToTopButton />
        <AIChatBot />
      </div>
    </>
  );
};

export default App;
