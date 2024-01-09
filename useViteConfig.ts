import dayjs from "dayjs"
// @ts-ignore
import pkg from "./package.json"
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'
import { loadEnv, ServerOptions, ResolveOptions, BuildOptions, PluginOption, ESBuildOptions } from 'vite'

/** vite 环境变量 */
export type MateEnv = {

  /** 服务器API地址 */
  readonly VITE_APP_BASE_URL: string;

  /** 服务器地址 */
  readonly VITE_APP_SERVER_URL: string;

  /** 文档标题 */
  readonly VITE_APP_TITLE: string;

  /** IP */
  readonly VITE_APP_SERVER_HOST: string;

  /** 端口号 */
  readonly VITE_APP_PORT: any;

  /** 项目版本 */
  VITE_APP_VARSION: string;

  /** 项目基础能力提供者 */
  VITE_USER_POWER_BY_SMARTOPS: string;

  /** 打包时是否删除 console debug */
  VITE_DROP_CONSOLE: string;

}



/** 插件注册 */
export function usePlugins(model: string): PluginOption[] {
  const { VITE_APP_TITLE, VITE_APP_VARSION } = loadEnv(model, './') as MateEnv
  return [

    /** 解析vue */
    vue(),

    /** 开发工具 */
    VueDevTools(),

    /** 压缩工具 */
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: true,
      success() {
        inputLog()
        console.log('✨✨✨✨打包成完成✨✨✨✨')
      }
    }),


    createHtmlPlugin({
      minify: false,
      inject: {
        data: {
          title: `${VITE_APP_TITLE}-V${VITE_APP_VARSION}`,   // 出现在模版中的 <%- title %>
        }
      }
    })

  ]
}

export function inputLog() {
  console.log([
    '                   _ooOoo_',
    '                  o8888888o',
    '                  88" . "88',
    '                  (| -_- |)',
    '                  O\\  =  /O',
    "               ____/`---'\\____",
    "             .'  \\\\|     |//  `.",
    '            /  \\\\|||  :  |||//  \\',
    '           /  _||||| -:- |||||-  \\',
    '           |   | \\\\\\  -  /// |   |',
    "           | \\_|  ''\\---/''  |   |",
    '           \\  .-\\__  `-`  ___/-. /',
    "         ___`. .'  /--.--\\  `. . __",
    "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
    '     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |',
    '     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /',
    "======`-.____`-.___\\_____/___.-`____.-'======",
    "                   `=---='",
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    '         佛祖保佑       永无BUG'
  ].join('\n'))
}


enum ServerBaseUrl {
  /** 开发环境 */
  DEV_API = '/dev-api',
  /** 生产环境 */
  PROD_API = '/prod-api'
}


/** 开发服务器代理注册 */
export function useServer(model: string): ServerOptions {

  const { VITE_APP_BASE_URL, VITE_APP_SERVER_URL, VITE_APP_PORT, VITE_APP_SERVER_HOST } = loadEnv(model, './') as MateEnv

  return {
    open: true,
    host: VITE_APP_SERVER_HOST,
    port: VITE_APP_PORT,
    proxy: {
      [VITE_APP_BASE_URL]: {
        target: VITE_APP_SERVER_URL,
        changeOrigin: true,
        rewrite: (path: string) => path.includes(ServerBaseUrl.DEV_API) ? path.replace(VITE_APP_BASE_URL, '') : path
      },
    },
  }

}




/** 路径资源代理 */
export function useResolve(): ResolveOptions {
  return {
    alias: {
      "@": resolve(__dirname, 'src'),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  } as ResolveOptions
}



/** 打包配置 */
export function useBuild(): BuildOptions {
  return {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      },
    }
  }
}



/** EsBuild 打包配置 */
export function useEsBuild(model: string): ESBuildOptions {
  const { VITE_DROP_CONSOLE } = loadEnv(model, './') as MateEnv
  return {
    /** 打包时移除 log debug */
    drop: model == 'development' ? [] : VITE_DROP_CONSOLE ? ["console", "debugger"] : [],
  }
}

/**
 * 定义运行时数据
*/
export function useDefine(model: string) {

  const { VITE_APP_VARSION } = loadEnv(model, './') as MateEnv

  const { dependencies, devDependencies, name } = pkg;
  const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version: VITE_APP_VARSION },
    lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
  }

  return {
    __APP_INFO__
  }
}