import React, { useEffect, useRef } from 'react';

const CursorGlow: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const trailPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
      }
    };

    let rafId: number;
    const animateTrail = () => {
      trailPosRef.current.x += (posRef.current.x - trailPosRef.current.x) * 0.12;
      trailPosRef.current.y += (posRef.current.y - trailPosRef.current.y) * 0.12;
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPosRef.current.x - 20}px, ${trailPosRef.current.y - 20}px)`;
      }
      rafId = requestAnimationFrame(animateTrail);
    };
    animateTrail();

    const onEnterLink = () => {
      cursorRef.current?.classList.add('cursor-hover');
      trailRef.current?.classList.add('trail-hover');
    };
    const onLeaveLink = () => {
      cursorRef.current?.classList.remove('cursor-hover');
      trailRef.current?.classList.remove('trail-hover');
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor-dot" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
};

export default CursorGlow;
