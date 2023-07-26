import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: usePlugins(),
  server: useServer(),
  resolve: useResolve(),
  build: useBuild(),
})


function usePlugins() {
  return [
    vue()
  ]
}


function useServer() {
  return {
    open: true,
    proxy: {
      '/api': {
        target: 'http://124.223.210.24/',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => {
          return path.replace(/^\/api/, '/prod-api')
        },
      },
    },
  }
}


function useResolve() {
  return {
    alias: {
      "@": resolve(__dirname, 'src'),
    },
  }
}


function useBuild () {
  return {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  }
}