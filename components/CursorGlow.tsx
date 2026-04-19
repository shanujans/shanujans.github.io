import React, { useEffect, useRef } from 'react';

const CursorGlow: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef  = useRef<HTMLDivElement>(null);
  const posRef    = useRef({ x: 0, y: 0 });
  const trailPos  = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      // Dot follows instantly — zero lag
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
      }
    };

    let rafId: number;
    const animateTrail = () => {
      // Lerp factor 0.75 = very fast trail, almost instant
      trailPos.current.x += (posRef.current.x - trailPos.current.x) * 0.75;
      trailPos.current.y += (posRef.current.y - trailPos.current.y) * 0.75;
      if (trailRef.current) {
        trailRef.current.style.transform =
          `translate(${trailPos.current.x - 20}px, ${trailPos.current.y - 20}px)`;
      }
      rafId = requestAnimationFrame(animateTrail);
    };
    animateTrail();

    const onEnter = () => {
      cursorRef.current?.classList.add('cursor-hover');
      trailRef.current?.classList.add('trail-hover');
    };
    const onLeave = () => {
      cursorRef.current?.classList.remove('cursor-hover');
      trailRef.current?.classList.remove('trail-hover');
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={trailRef}  className="cursor-trail" />
    </>
  );
};

export default CursorGlow;
