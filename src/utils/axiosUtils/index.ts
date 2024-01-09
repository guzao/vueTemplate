import { HTTPSTATE } from '@/enum'
import { ElMessage } from 'element-plus'


/** 接口是否错误 */
export function hasError(responseData: ResponseData, showTools: boolean = true) {
    const { code, msg } = responseData
    if (code !== HTTPSTATE.SUCCESS) {
        showTools && ElMessage({
            type: 'error',
            message: msg
        })
        return true
    }
    return false
}


type RequestCache = {
    data: any;
    url: string | undefined;
    method: string;
}

/** 保存请求接口 */
function setRequestCatch(params: RequestCache) {
    sessionStorage.setItem(HTTPSTATE.REQUEST_CATCH_KEY, JSON.stringify(params))
}

/** 获取请求接口 */
function getRequestCatch() {
    sessionStorage.getItem(HTTPSTATE.REQUEST_CATCH_KEY)
}

function removeRequestCatch() {
    sessionStorage.removeItem(HTTPSTATE.REQUEST_CATCH_KEY)
}


export function useRequestCatch() {
    return {
        /** 保存请求接口 */
        setRequestCatch,
        /** 获取请求接口 */
        getRequestCatch,
        removeRequestCatch
    }
}

