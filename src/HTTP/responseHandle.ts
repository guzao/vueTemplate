import { ElMessage } from 'element-plus'
import type { AxiosResponse, AxiosError } from 'axios'

export function responseHandle (response: AxiosResponse) {
    return response.data
}

export function responseErrorHandle (error: AxiosError) {

    let { message } = error;
    
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }

    ElMessage({
      type: 'error',
      message
    })

}

