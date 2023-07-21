import type { App } from "vue"; 
import ElementPlus   from 'element-plus'


/** 注册路由 */
export function useElementPlus (app: App<Element>) {
    app.use(ElementPlus, {
        size: 'large'
    })
}