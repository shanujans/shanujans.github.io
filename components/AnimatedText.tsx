import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 0.25em' }}>
      {words.map((word, wi) => {
        const chars = word.split('');
        const wordStart = wi / words.length;
        const wordEnd   = (wi + 1) / words.length;
        return (
          <span key={wi} style={{ display: 'inline-flex' }}>
            {chars.map((char, ci) => {
              const charStart = wordStart + (ci / chars.length) * (wordEnd - wordStart);
              const charEnd   = wordStart + ((ci + 1) / chars.length) * (wordEnd - wordStart);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const opacity = useTransform(scrollYProgress, [charStart, charEnd], [0.15, 1]);
              return (
                <motion.span key={ci} style={{ opacity }}>
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
