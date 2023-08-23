import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { loadEnv, ServerOptions, ResolveOptions, BuildOptions, PluginOption } from 'vite'

export function usePlugins(): PluginOption [] {
  return [
    vue()
  ]
}

export function useServer(model: string): ServerOptions {
  const config = loadEnv(model, './')
  return {
    open: true,
    host: '0.0.0.0',
    port: 8888,
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

export function useResolve(): ResolveOptions {
  return {
    alias: {
      "@": resolve(__dirname, 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  } as ResolveOptions
}

export function useBuild (): BuildOptions {
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