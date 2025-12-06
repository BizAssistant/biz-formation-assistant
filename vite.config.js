import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: "zp2tqg-5173.csb.app"
  },
  build: {
    outDir: 'dist'
  }
});
