import type { App } from "vue"; 
import { watermark }  from './watermark'
import { debounce }  from './debounce'


export default {
    install(Vue: App) {
        /** 水印指令 */
        Vue.directive('watermark', watermark)
        Vue.directive('debounce', debounce)
    }
}