import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['gsap', '@gsap/react', 'framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react:   ['react', 'react-dom'],
          gsap:    ['gsap', '@gsap/react'],
          motion:  ['framer-motion'],
        },
      },
    },
  },
});