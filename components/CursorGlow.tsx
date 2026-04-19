import { useEffect } from 'react';

const CursorGlow: React.FC = () => {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Build elements in pure JS — zero React overhead
    const dot = document.createElement('div');
    Object.assign(dot.style, {
      position: 'fixed', top: '0', left: '0',
      width: '10px', height: '10px',
      borderRadius: '50%',
      background: '#00ff9d',
      boxShadow: '0 0 8px #00ff9d, 0 0 20px #00ff9d60',
      pointerEvents: 'none',
      zIndex: '99999',
      willChange: 'transform',
      // NO transition on transform — only size/color transitions
      transition: 'width 0.15s, height 0.15s, background 0.15s, box-shadow 0.15s',
    });

    const ring = document.createElement('div');
    Object.assign(ring.style, {
      position: 'fixed', top: '0', left: '0',
      width: '28px', height: '28px',
      borderRadius: '50%',
      border: '1.5px solid rgba(0,255,157,0.5)',
      pointerEvents: 'none',
      zIndex: '99998',
      willChange: 'transform',
      transition: 'width 0.2s, height 0.2s, border-color 0.2s',
    });

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = -50, my = -50, rx = -50, ry = -50;

    // Dot follows mouse INSTANTLY — transform is GPU layer, no layout reflow
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    };

    // Ring lerps slightly behind for visual depth
    let rafId: number;
    const tick = () => {
      rx += (mx - rx) * 0.45;
      ry += (my - ry) * 0.45;
      ring.style.transform = `translate(${rx - 14}px, ${ry - 14}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onEnter = () => {
      dot.style.width = '14px'; dot.style.height = '14px';
      dot.style.background = '#00b3ff';
      dot.style.boxShadow = '0 0 10px #00b3ff, 0 0 24px #00b3ff60';
      ring.style.width = '44px'; ring.style.height = '44px';
      ring.style.borderColor = 'rgba(0,179,255,0.5)';
    };
    const onLeave = () => {
      dot.style.width = '10px'; dot.style.height = '10px';
      dot.style.background = '#00ff9d';
      dot.style.boxShadow = '0 0 8px #00ff9d, 0 0 20px #00ff9d60';
      ring.style.width = '28px'; ring.style.height = '28px';
      ring.style.borderColor = 'rgba(0,255,157,0.5)';
    };

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      dot.remove();
      ring.remove();
    };
  }, []);

  return null;
};

export default CursorGlow;
