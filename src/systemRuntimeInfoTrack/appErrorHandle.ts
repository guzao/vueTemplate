import { ref } from 'vue'
import { router } from '@/routers'
import { commonConfig } from '@/config'


export const appErrorPool = ref<AppErrorPool[]>([])

import type { ComponentPublicInstance } from 'vue'

/**
 * 运行程序异常捕获处理函数
*/
export function appErrorHandle(err: any, instance: ComponentPublicInstance | null, info: string) {

    if (err.status) return

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

    let errorMap: { [key: string]: string } = {
        InternalError: "Javascript引擎内部错误",
        ReferenceError: "未找到对象",
        TypeError: "使用了错误的类型或对象",
        RangeError: "使用内置对象时，参数超范围",
        SyntaxError: "语法错误",
        EvalError: "错误的使用了Eval",
        URIError: "URI错误"
    }

    let errorName = errorMap[error.name] || "未知错误"

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
        height,
        errorName
    })

    console.log(appErrorPool, errorName);

    // 输出错误
    console.error(err)

}