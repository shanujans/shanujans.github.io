import React, { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'fadeout'>('loading');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set exact dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Terminal/Matrix Character set (Japanese + Tech keywords)
    const chars = '01アイウエオカキクケコサシスセソタチツテトNULLVOIDINITIALIZING...SYSTEM';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animId: number;
    const draw = () => {
      // Dark overlay to create the fading "tail" effect
      ctx.fillStyle = 'rgba(12, 12, 12, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Monospace font is CRUCIAL so the matrix lines fall perfectly straight down
      ctx.font = `${fontSize}px 'JetBrains Mono', 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Hacker styling: White heads, Magenta/Purple tails (Theme Colors)
        const isHead = Math.random() > 0.85; 
        if (isHead) {
          ctx.fillStyle = '#FFFFFF'; // Bright head
        } else {
          // Randomly pick between the Purple and Pink from your theme
          ctx.fillStyle = Math.random() > 0.5 ? 'rgba(182, 0, 168, 0.8)' : 'rgba(118, 33, 176, 0.8)'; // #B600A8 & #7621B0
        }

        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset the drop randomly after it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    // Progress bar counter
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 7 + 2;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTimeout(() => {
          setPhase('fadeout');
          setTimeout(onComplete, 600); // Wait for fadeout animation before destroying
        }, 350);
      }
      setProgress(Math.min(prog, 100));
    }, 55);

    return () => { 
      cancelAnimationFrame(animId); 
      clearInterval(interval); 
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#0C0C0C', // Deep dark theme background
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      }}
    >
      {/* Background Matrix Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-25" />

      {/* Front UI */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {/* Logo */}
        <div
          className="font-black uppercase tracking-tight"
          style={{
            fontFamily: "'Kanit', sans-serif",
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          &lt;Shanujan /&gt;
        </div>

        {/* Status */}
        <div className="font-light uppercase tracking-[0.4em] text-[#D7E2EA]/60 text-xs sm:text-sm">
          INITIALIZING PORTFOLIO...
        </div>

        {/* Progress bar container */}
        <div className="w-64 h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(215,226,234,0.1)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)', // Theme gradient
              boxShadow: '0 0 10px #B600A8',
              transition: 'width 0.1s ease',
            }}
          />
        </div>

        {/* Percentage text */}
        <div
          className="font-black"
          style={{
            fontFamily: "'Kanit', sans-serif",
            fontSize: '1.2rem',
            background: 'linear-gradient(123deg, #B600A8, #7621B0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;