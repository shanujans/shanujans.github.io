import React, { useEffect, useRef } from 'react';

const CursorGlow: React.FC = () => {
  const dotRef   = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mouse    = useRef({ x: -100, y: -100 });
  const trail    = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Move dot pixel-perfectly with the mouse — no lerp, no RAF needed
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      const d = dotRef.current;
      if (d) {
        d.style.left = (e.clientX - 5) + 'px';
        d.style.top  = (e.clientY - 5) + 'px';
      }
    };

    // Trail — fast lerp 0.5 so it's visually a tiny bit behind
    let rafId: number;
    const tick = () => {
      trail.current.x += (mouse.current.x - trail.current.x) * 0.5;
      trail.current.y += (mouse.current.y - trail.current.y) * 0.5;
      const t = trailRef.current;
      if (t) {
        t.style.left = (trail.current.x - 16) + 'px';
        t.style.top  = (trail.current.y - 16) + 'px';
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // All styles INLINE — zero CSS class interference, no transitions on position
  const dotStyle: React.CSSProperties = {
    position: 'fixed',
    width: '10px',
    height: '10px',
    background: '#00ff9d',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9999,
    left: '-100px',
    top: '-100px',
    boxShadow: '0 0 8px #00ff9d, 0 0 16px #00ff9d80',
    // NO transition on left/top — only on size/color
    transition: 'width 0.15s, height 0.15s, background 0.15s',
  };

  const trailStyle: React.CSSProperties = {
    position: 'fixed',
    width: '32px',
    height: '32px',
    border: '1px solid rgba(0,255,157,0.35)',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9998,
    left: '-100px',
    top: '-100px',
    // NO transition on left/top
    transition: 'width 0.2s, height 0.2s, border-color 0.2s',
  };

  return (
    <>
      <div ref={dotRef}   style={dotStyle}   />
      <div ref={trailRef} style={trailStyle}  />
    </>
  );
};

export default CursorGlow;
