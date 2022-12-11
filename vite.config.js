import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePluginFonts } from 'vite-plugin-fonts';
import { comlink } from 'vite-plugin-comlink';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    comlink(),
    react(),
    VitePluginFonts({ google: { families: ['Silkscreen', 'Inter'] } }),
  ],
  worker: {
    plugins: [comlink()],
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
