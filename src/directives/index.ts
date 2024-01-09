import type { App } from "vue"; 
import { watermark }  from './watermark'
import { debounce }  from './debounce'
import { hasPermission, hasRole }  from './hasPermission'
import { clickOutset, focus }  from './clickOutset'


export default {
    install(Vue: App) {
        /** 水印指令 */
        Vue.directive('watermark', watermark)
        Vue.directive('debounce', debounce)
        Vue.directive('hasRole', hasRole)
        Vue.directive('hasPermission', hasPermission)
        Vue.directive('clickOutset', clickOutset)
        Vue.directive('focus', focus)
    }
}