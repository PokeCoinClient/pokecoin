import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePluginFonts } from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    VitePluginFonts({
      google: {
        families: ['Press Start 2P', 'Silkscreen'],
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
