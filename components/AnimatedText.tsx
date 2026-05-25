import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

// Safe: one motion.span per word (not per char) — avoids hooks-in-loop violation
const WordSpan: React.FC<{
  word: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}> = ({ word, index, total, scrollYProgress }) => {
  const start   = index / total;
  const end     = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  return (
    <motion.span style={{ opacity, color: '#D7E2EA' }}>
      {word}
    </motion.span>
  );
};

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  });

  const words = text.split(' ');

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.3em' }}
    >
      {words.map((word, i) => (
        <WordSpan
          key={i}
          word={word}
          index={i}
          total={words.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
};

export default AnimatedText;
