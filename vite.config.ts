
import { defineConfig } from 'vite'
import { useBuild, usePlugins, useResolve, useServer, useEsBuild, inputLog, useDefine } from "./useViteConfig"


// https://vitejs.dev/config/

export default defineConfig((({ mode }) => {
  inputLog()
  return {
    esbuild: useEsBuild(mode),
    plugins: usePlugins(mode),
    server: useServer(mode),
    resolve: useResolve(),
    build: useBuild(),
    define: useDefine(mode)
  }
}))
