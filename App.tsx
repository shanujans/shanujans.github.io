import React, { useEffect, useState, useCallback } from 'react';

// Loading + utilities
import LoadingScreen from './components/LoadingScreen';
import CursorGlow from './components/CursorGlow';
import ScrollProgress from './components/ScrollProgress';
import BackToTopButton from './components/BackToTopButton';
import AIChatBot from './components/AIChatBot';

// Security files — untouched, imported as-is
import VisitorTracker from './components/VisitorTracker';

// New design sections
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeSection from './components/MarqueeSection';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Footer from './components/Footer';

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
        style={{
          background: '#0C0C0C',
          overflowX: 'clip',
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        {/* Global utilities */}
        <CursorGlow />
        <VisitorTracker />
        <ScrollProgress />

        {/* Navigation */}
        <Navbar />

        {/* Page */}
        <main>
          <Hero />
          <MarqueeSection />
          <About />
          <Services />
          <Projects />
          <Footer />
        </main>

        {/* Floating */}
        <BackToTopButton />
        <AIChatBot />
      </div>
    </>
  );
};

export default App;