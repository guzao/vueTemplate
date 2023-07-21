import type { App } from "vue"; 
import directives from '@/directives'

/** 注册指令 */
export function useDirective (app: App<Element>) {
    app.use(directives)
}