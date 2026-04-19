import React, { useEffect, useRef } from 'react';

const CursorGlow: React.FC = () => {
  const dotRef   = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const mouse    = useRef({ x: 0, y: 0 });
  const trail    = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    // Move dot INSTANTLY — zero lag, no lerp, uses CSS transform directly
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = e.clientX - 6 + 'px';
        dotRef.current.style.top  = e.clientY - 6 + 'px';
      }
    };

    // Trail uses RAF with 0.55 lerp — fast but visually distinct from dot
    let rafId: number;
    const animate = () => {
      const dx = mouse.current.x - trail.current.x;
      const dy = mouse.current.y - trail.current.y;
      trail.current.x += dx * 0.55;
      trail.current.y += dy * 0.55;

      if (trailRef.current) {
        trailRef.current.style.left = trail.current.x - 18 + 'px';
        trailRef.current.style.top  = trail.current.y - 18 + 'px';
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    const onEnter = () => {
      dotRef.current?.classList.add('cursor-hover');
      trailRef.current?.classList.add('trail-hover');
    };
    const onLeave = () => {
      dotRef.current?.classList.remove('cursor-hover');
      trailRef.current?.classList.remove('trail-hover');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}   className="cursor-dot"   style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999, willChange: 'left, top' }} />
      <div ref={trailRef} className="cursor-trail"  style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9998, willChange: 'left, top' }} />
    </>
  );
};

export default CursorGlow;
