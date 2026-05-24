import { useEffect } from 'react';

const CursorGlow: React.FC = () => {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = document.createElement('div');
    Object.assign(dot.style, {
      position: 'fixed', top: '0', left: '0',
      width: '10px', height: '10px',
      borderRadius: '50%',
      background: '#B600A8',
      boxShadow: '0 0 8px #B600A8, 0 0 20px #B600A880',
      pointerEvents: 'none',
      zIndex: '99999',
      willChange: 'transform',
      transition: 'width 0.15s, height 0.15s, background 0.15s, box-shadow 0.15s',
    });

    const ring = document.createElement('div');
    Object.assign(ring.style, {
      position: 'fixed', top: '0', left: '0',
      width: '30px', height: '30px',
      borderRadius: '50%',
      border: '1.5px solid rgba(182,0,168,0.45)',
      pointerEvents: 'none',
      zIndex: '99998',
      willChange: 'transform',
      transition: 'width 0.2s, height 0.2s, border-color 0.2s',
    });

    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = -50, my = -50, rx = -50, ry = -50;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    };

    let rafId: number;
    const tick = () => {
      rx += (mx - rx) * 0.45;
      ry += (my - ry) * 0.45;
      ring.style.transform = `translate(${rx - 15}px, ${ry - 15}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onEnter = () => {
      dot.style.width = '14px'; dot.style.height = '14px';
      dot.style.background = '#7621B0';
      dot.style.boxShadow = '0 0 12px #7621B0, 0 0 28px #7621B080';
      ring.style.width = '46px'; ring.style.height = '46px';
      ring.style.borderColor = 'rgba(118,33,176,0.5)';
    };
    const onLeave = () => {
      dot.style.width = '10px'; dot.style.height = '10px';
      dot.style.background = '#B600A8';
      dot.style.boxShadow = '0 0 8px #B600A8, 0 0 20px #B600A880';
      ring.style.width = '30px'; ring.style.height = '30px';
      ring.style.borderColor = 'rgba(182,0,168,0.45)';
    };

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      dot.remove(); ring.remove();
    };
  }, []);

  return null;
};

export default CursorGlow;
