import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

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
        // target: config.VITE_APP_SERVER_URL,
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => {
          console.log(path);
          return path
        },
      },
    },
  }
}

function useResolve() {
  return {
    alias: {
      "@": resolve(__dirname, 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
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