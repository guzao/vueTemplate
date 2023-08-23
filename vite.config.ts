import { defineConfig } from 'vite'
import { useBuild, usePlugins, useResolve, useServer } from "./useViteConfig"


// https://vitejs.dev/config/

export default defineConfig((({ mode }) => {
  return {
    plugins: usePlugins(),
    server: useServer(mode),
    resolve: useResolve(),
    build: useBuild(),
  }
}))
