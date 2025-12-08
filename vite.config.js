import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Add any additional options here
      },
    },
  },
  server: {
    port: 3000,
    open: true,
    allowedHosts: "zp2tqg-5173.csb.app" // If you need this for CodeSandbox, keep it
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  preview: {
    port: 3000,
  },
});
