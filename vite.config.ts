import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: usePlugins(),
  server: useServer(),
  resolve: useResolve(),
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
        target: 'http://localhost:8080/',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
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
