import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: "0.0.0.0",
    hmr: {
      clientPort: parseInt(process.env.PORT_OUTER!, 10),
    },
    port: parseInt(process.env.PORT_INNER!, 10),
    watch: {
      usePolling: true
    },
    /*proxy: {
      '/api': {
        target: 'http://be:8000,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }*/
  }
})
