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

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const alpha = Math.random() > 0.5 ? 1 : 0.3;
        ctx.fillStyle = `rgba(0, 255, 157, ${alpha})`;
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    // Progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 8 + 2;
      if (prog >= 100) {
        prog = 100;
        clearInterval(interval);
        setTimeout(() => {
          setPhase('fadeout');
          setTimeout(onComplete, 600);
        }, 400);
      }
      setProgress(Math.min(prog, 100));
    }, 60);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#0a0a14',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: 'opacity 0.6s ease',
        pointerEvents: phase === 'fadeout' ? 'none' : 'all',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="font-jetbrains-mono text-[#00ff9d] text-4xl font-bold glitch-text" data-text="&lt;Shanujan /&gt;">
          &lt;Shanujan /&gt;
        </div>
        <div className="text-gray-400 font-jetbrains-mono text-sm tracking-widest">
          INITIALIZING PORTFOLIO...
        </div>
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00ff9d, #00b3ff)',
              boxShadow: '0 0 10px #00ff9d',
              transition: 'width 0.1s ease',
            }}
          />
        </div>
        <div className="font-jetbrains-mono text-[#00ff9d] text-sm">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
