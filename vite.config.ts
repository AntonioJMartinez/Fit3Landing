import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        es: path.resolve(__dirname, 'es/index.html'),
        fr: path.resolve(__dirname, 'fr/index.html'),
        it: path.resolve(__dirname, 'it/index.html'),
        de: path.resolve(__dirname, 'de/index.html'),
        pt: path.resolve(__dirname, 'pt/index.html'),
        zh: path.resolve(__dirname, 'zh/index.html'),
      },
    },
  },
});
