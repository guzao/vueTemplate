import { Ref, ref, UnwrapRef } from 'vue'
import { hasEror } from '@/utils'

interface UseReactiveGetParams<T> {
    /**  初始化参数*/
    initData: T,
    /** 请求接口 */
    request: () => Promise<ResponseData>,
    /** 接口是否立即执行 */
    Immediately?: boolean,
    /** 响应接口手动处理 */
    requestCallback?: (res: ResponseData) => any,
}

const defaultRequestCallback = (res: ResponseData) => res.data

export function useReactiveHttp<T> (params: UseReactiveGetParams<T>) {

    const { initData, request, Immediately = true, requestCallback = defaultRequestCallback } = params

    const result = ref<T>(initData)

    const loading = ref(false)

    const getResult = () => {
        loading.value = true
        return request().then(res => {
            loading.value = false
            if (hasEror(res)) return
            result.value = requestCallback(res) || res
        }).catch(err => {
            console.warn(err)
        })
    }

    Immediately && getResult()

    return {
        /** 接口返回的数据 */
        result,
        /** 加载状态 */
        loading,
        /** 获取数据的方法 */
        getResult,
    }

}


type UseReactiveHttpReturnTye<T> = [
    /** 接口返回的数据 */ 
    Ref<UnwrapRef<T>>,
    /** 获取数据的方法 */
    () => Promise<void>,
    /** 数据加载状态 */ 
    Ref<boolean>,
]

export function useReactiveHttp_ <T>(params: UseReactiveGetParams<T>): UseReactiveHttpReturnTye<T> {

    const { initData, request, Immediately = true, requestCallback = defaultRequestCallback } = params

    const result = ref<T>(initData)

    const loading = ref(false)

    const getResult = () => {
        loading.value = true
        return request().then(res => {
            loading.value = false
            if (hasEror(res)) return
            result.value = requestCallback(res) || res
        }).catch(err => {
            console.warn(err)
        })
    }

    Immediately && getResult()

    return [
        /** 接口返回的数据 */
        result,
        /** 获取数据的方法 */
        getResult,
        /** 加载状态 */
        loading,
    ]
}