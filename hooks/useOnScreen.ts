import { useState, useEffect, RefObject } from 'react';

export function useOnScreen(ref: RefObject<Element | null>, rootMargin: string = '0px'): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(element);
        }
      },
      { rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return isIntersecting;
}
