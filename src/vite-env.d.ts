/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

interface ImportMetaEnv {
  /** 服务器地址 */ 
  readonly VITE_APP_BASE_URL: string;
}