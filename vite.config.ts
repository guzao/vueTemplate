import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig((({ mode }) => {
  return {
    plugins: usePlugins(),
    server: useServer(mode),
    resolve: useResolve(),
    build: useBuild(),
  }
}))

function usePlugins() {
  return [
    vue()
  ]
}

function useServer(model: string) {
  const config = loadEnv(model, './')
  return {
    open: true,
    proxy: {
      [ config.VITE_APP_BASE_URL ]: {
        target: 'http://124.223.210.24/',
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path,
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