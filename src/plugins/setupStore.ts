import { createPinia } from 'pinia'
import { App } from 'vue';

const Pinan = createPinia()

/**
 * 注册全局数据
*/
export function usePinan (app: App<Element>) {
    app.use(Pinan)
}