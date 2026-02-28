import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/RainbowSea/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') || id.includes('vue-router')) {
              return 'vue-vendor'
            }
            if (id.includes('gsap') || id.includes('swiper')) {
              return 'animation-vendor'
            }
            if (id.includes('howler')) {
              return 'audio-vendor'
            }
            return 'vendor'
          }
        }
      }
    }
  }
})
