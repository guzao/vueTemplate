import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { loadEnv, ServerOptions, ResolveOptions, BuildOptions, PluginOption } from 'vite'

type MateEnv = {
  /** 服务器API地址 */ 
  readonly VITE_APP_BASE_URL: string;
  /** 服务器地址 */ 
  readonly VITE_APP_SERVER_URL: string;
}

export function usePlugins(): PluginOption [] {
  return [
    vue()
  ]
}

export function useServer(model: string): ServerOptions {

  const { VITE_APP_BASE_URL, VITE_APP_SERVER_URL } = loadEnv(model, './') as MateEnv

  return {
    open: true,
    host: '0.0.0.0',
    port: 8888,
    proxy: {
      [ VITE_APP_BASE_URL ]: {
        target: VITE_APP_SERVER_URL,
        changeOrigin: true,
        rewrite: (path: string) => {
          path = VITE_APP_BASE_URL == '/dev-api' ? path.replace(VITE_APP_BASE_URL, '') : path
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