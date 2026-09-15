import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite configuration.
 * Path alias `@/` → `src/` keeps imports stable as the feature tree grows.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  build: {
    sourcemap: true,
    target: 'es2022',
  },
});
