import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base 使用相对路径 './'，可同时适配本地预览与 GitHub Pages 子路径部署
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    // Mermaid 体积较大，单独分包，避免阻塞首屏
    rollupOptions: {
      output: {
        manualChunks: {
          mermaid: ['mermaid']
        }
      }
    }
  }
})
