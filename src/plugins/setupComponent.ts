import type { App } from "vue"; 
import mavonEditor from 'mavon-editor'
import ElementPlus   from 'element-plus'

/** 注册组件库 */
export function setupComponent (app: App<Element>) {

    app.use(ElementPlus, { size: 'large', })

    // 编辑器
    app.use(mavonEditor)

}