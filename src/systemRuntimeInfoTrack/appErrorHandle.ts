import { ref } from 'vue'
import { router } from '@/routers'
import { commonConfig } from '@/config'


export const appErrorPool = ref<AppErrorPool []>([])

import type { ComponentPublicInstance } from 'vue'

/**
 * 运行程序异常捕获处理函数
*/
export function appErrorHandle (err: any, instance: ComponentPublicInstance | null, info: string) {

    const error = new Error(err)

    const currentRoute = router.currentRoute.value

    const el = instance?.$el as HTMLElement

    let offsetLeft, offsetTop, width, height

    if (el) {
        offsetLeft = el.offsetLeft
        offsetTop = el.offsetTop
        width = el.offsetWidth
        height = el.offsetHeight
    }

    commonConfig.trackLog && appErrorPool.value.push({
        pageName: currentRoute.meta.title as any,
        date: Date.now(),
        tag: instance?.$el?.type,
        errorInfo: error.message,
        errorType: err.name,
        info: info,
        page: currentRoute.fullPath,
        tagInnerText: instance?.$el?.innerText,
        offsetLeft, 
        offsetTop, 
        width, 
        height
    })
    
    // 输出错误
    console.error(err)

}