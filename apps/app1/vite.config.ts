import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    server: {
        host: '0.0.0.0',
        port: 5001,
        strictPort: true,
        watch: {
            usePolling: true,
            interval: 1000
        },
        hmr: {
            host: 'localhost',
            port: 5001
        }
    },
    preview: {
        host: '0.0.0.0',
        port: 5001,
        strictPort: true
    }
});