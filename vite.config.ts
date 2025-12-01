import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // We don't need to manually define process.env anymore; we will use import.meta.env
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    build: {
      target: 'esnext',
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-ui': ['lucide-react'],
            'vendor-ai': ['@google/genai']
          }
        }
      }
    }
  };
});