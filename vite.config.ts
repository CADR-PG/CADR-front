import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],

  server: {
    https: true as any,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/azurite': {
        target: 'http://localhost:10000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/azurite/, ''),
      },
    },
  },
  base: '/',
});
