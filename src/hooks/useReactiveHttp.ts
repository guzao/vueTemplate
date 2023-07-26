import { ref } from 'vue'
import { hasEror } from '@/utils'

interface UseReactiveGetParams <T> {
    /**  初始化参数*/
    initData: T,
    /** 请求接口 */
    request: () => Promise<ResponseData>,
    /** 接口是否立即执行 */
    Immediately?: boolean,
    /** 响应接口手动处理 */
    requestCallback?: (res: ResponseData) => any
}

const defaultRequestCallback =  (res: ResponseData) => res.data

export  function useReactiveHttp <T> (params: UseReactiveGetParams<T>) {
    
    const { initData, request, Immediately = true, requestCallback = defaultRequestCallback } = params

    const result = ref<T>(initData)

    const loading = ref(false)

    const getResult = async () => {
        loading.value = true
        try {
            const res = await request()
            loading.value = false
            if (hasEror(res)) return
            result.value = requestCallback(res)
        } catch (error) {
            loading.value = false
        }
    }

    Immediately && getResult()

    return {
        result,
        loading,
        getResult,
    }

}
