import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePluginFonts } from 'vite-plugin-fonts';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.json';

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
    VitePWA({
      manifest,
      includeAssets: ['icon.svg'],
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
