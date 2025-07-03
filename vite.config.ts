import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/typescript-learning-web-app/' : '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          // Monaco Editorを別チャンクに分離（パフォーマンス向上）
          monaco: ['monaco-editor']
        }
      }
    }
  },
  // Monaco Editor用の最適化
  optimizeDeps: {
    include: ['monaco-editor'],
    exclude: ['@vscode/vscode-languagedetection']
  },
  // Worker設定（Monaco Editorが内部で使用）
  worker: {
    format: 'es'
  },
  define: {
    // Monaco Editorのワーカー設定
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  },
  // 開発時のパフォーマンス最適化
  esbuild: {
    target: 'es2020'
  }
})