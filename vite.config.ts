import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  build: {
    outDir: 'dist/client',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        es: path.resolve(import.meta.dirname, 'es/index.html'),
        fr: path.resolve(import.meta.dirname, 'fr/index.html'),
        it: path.resolve(import.meta.dirname, 'it/index.html'),
        de: path.resolve(import.meta.dirname, 'de/index.html'),
        pt: path.resolve(import.meta.dirname, 'pt/index.html'),
        zh: path.resolve(import.meta.dirname, 'zh/index.html'),
      },
    },
  },
});
