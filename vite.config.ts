import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['framer-motion', 'lottie-react', 'lucide-react', 'gsap', '@gsap/react'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react:  ['react', 'react-dom'],
          motion: ['framer-motion'],
          lottie: ['lottie-react'],
        },
      },
    },
  },
});
