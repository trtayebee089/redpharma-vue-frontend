import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/",
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // proxy: {
  //   '/api': {
  //     target: 'http://127.0.0.1:8000',
  //     changeOrigin: true,
  //     secure: false,
  //   },
  // },
})
