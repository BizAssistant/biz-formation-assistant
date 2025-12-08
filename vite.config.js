import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  server: {
    port: 5173,
    allowedHosts: "zp2tqg-5173.csb.app"
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
  },
});
