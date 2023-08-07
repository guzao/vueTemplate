import { ref } from 'vue'
import {  AxiosError } from 'axios'
import { commonConfig } from '@/config'

export const networkErrorPool = ref<NetworkErrorPool []>([])


/**
 * 网络异常处理函数
*/
export function networkErrorHandle (data: AxiosError) {

    const { message, response, config } = data

    commonConfig.trackLog && networkErrorPool.value.push({
        date: Date.now(),
        mesage:  message,
        status: response?.status!,
        apiUrl: config?.url!,
        method: config?.method!,
        params: config?.params,
        data: config?.data!
    })
    
}