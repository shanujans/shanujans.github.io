import React, { useEffect, useRef } from 'react';

// Floats glowing binary, hex, and code snippets on the RIGHT half of the screen
// Complements the terminal scrolling on the left side

const snippets = [
  '0x1A2B', '0xFF', '01101', '10110', '0xDEAD',
  '#!/usr/bin', '>>> import', 'def main():', 'null', 'true',
  '0b1101', 'SHA256', 'RSA_4096', 'AES-256', 'qrng()',
  '0x7700FF', 'ssh root@', 'git push', 'docker run',
  '11001010', '01010101', '0x00ff9d', 'print()', 'yield',
  'async def', 'await', 'import torch', 'sklearn', 'pandas',
  'class Bot:', 'lambda x:', '{ "ai": true }', 'sudo',
  '0xC0FFEE', 'nmap -sV', 'chmod 777', 'pip install',
];

interface FloatItem {
  id: number;
  text: string;
  x: number;       // % within right half (50%–100%)
  y: number;       // % from top
  size: number;    // font size px
  opacity: number;
  speed: number;   // drift speed
  color: string;
  drift: number;   // horizontal drift px
}

const COLORS = ['#00ff9d', '#00b3ff', '#7700ff', '#ffffff'];

const RightSideEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<FloatItem[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const count = 28;
    itemsRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      text: snippets[Math.floor(Math.random() * snippets.length)],
      x: 52 + Math.random() * 44,          // right half only
      y: Math.random() * 120 - 10,
      size: Math.random() * 6 + 9,
      opacity: Math.random() * 0.18 + 0.04,
      speed: Math.random() * 0.006 + 0.003,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      drift: (Math.random() - 0.5) * 0.015,
    }));

    const container = containerRef.current;
    if (!container) return;

    // Create DOM spans once
    const spans: HTMLSpanElement[] = itemsRef.current.map(item => {
      const el = document.createElement('span');
      el.textContent = item.text;
      el.style.cssText = `
        position: absolute;
        font-family: 'JetBrains Mono', monospace;
        font-size: ${item.size}px;
        color: ${item.color};
        opacity: ${item.opacity};
        left: ${item.x}%;
        top: ${item.y}%;
        white-space: nowrap;
        pointer-events: none;
        user-select: none;
        will-change: transform, opacity;
        transition: none;
      `;
      container.appendChild(el);
      return el;
    });

    const animate = () => {
      itemsRef.current.forEach((item, i) => {
        item.y -= item.speed;
        item.x += item.drift;

        // Reset when off screen top; re-enter from bottom right side
        if (item.y < -5) {
          item.y = 105;
          item.x = 52 + Math.random() * 44;
          item.text = snippets[Math.floor(Math.random() * snippets.length)];
          spans[i].textContent = item.text;
        }
        // Keep within right side bounds
        if (item.x < 52) { item.x = 52; item.drift = Math.abs(item.drift); }
        if (item.x > 97) { item.x = 97; item.drift = -Math.abs(item.drift); }

        spans[i].style.left = `${item.x}%`;
        spans[i].style.top  = `${item.y}%`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      spans.forEach(el => el.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default RightSideEffect;
