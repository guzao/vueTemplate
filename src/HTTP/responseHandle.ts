import { ElMessage, ElMessageBox } from 'element-plus'
import { AxiosResponse, AxiosError } from 'axios'
import { HTTPSTATE } from '@/enum'
import { isFalse, isTrue } from '@/utils';
import { useUser } from '@/store'

let userLogout: () => Promise<void>

// 是否显示重新登录
export let isRelogin = { show: false };

export async function responseHandle(response: AxiosResponse) {

  const {  data: { code, msg }, status  } = response

  if (code === HTTPSTATE.UNAUTHORIZED) {
    handleUnauthorized()
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
  }

  if (code === HTTPSTATE.SERVER_ERROR) {
    ElMessage({ message: msg, type: 'error' })
    return Promise.reject(new Error(msg))
  }
  
  return response.data
}

export function responseErrorHandle(error: AxiosError) {

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

  return Promise.reject(error)

}


async function handleUnauthorized () {

    if (isTrue(isRelogin.show)) return 
    isRelogin.show = true;

    try {
      await ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示',{
        confirmButtonText: '重新登录', 
        cancelButtonText: '取消', 
        type: 'warning',
      })
      if (isFalse(userLogout)) {
        userLogout = useUser().userlogOut
      }
      userLogout().then(() => {
        isRelogin.show = false
      })
    } catch (error) {
      isRelogin.show = false
    }
    
}

