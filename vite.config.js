import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
          if (id.includes('/modals/TerminalModal')) {
            return 'modal-terminal';
          }
          if (id.includes('/modals/MLSimulatorModal')) {
            return 'modal-ml-simulator';
          }
          if (id.includes('/modals/GitHubTelemetryModal')) {
            return 'modal-github';
          }
          if (id.includes('/modals/DossierModal')) {
            return 'modal-dossier';
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    open: false
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
