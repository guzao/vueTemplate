import { useUser } from '@/store'
import { HTTPSTATE } from '@/enum'
import { AxiosResponse, AxiosError } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { networkErrorHandle } from '@/systemRuntimeInfoTrack'
import { isFalse, isTrue, getLocalLanMessage } from '@/utils'

let userLogout: () => Promise<void>

const { tipsInfo, common } = getLocalLanMessage()

// 是否显示重新登录
export let isRelogin = { show: false };

export async function responseHandle(response: AxiosResponse) {

  const {  data: { code, msg }, status  } = response

  if (code === HTTPSTATE.UNAUTHORIZED) {
    handleUnauthorized()
    return Promise.reject(tipsInfo.invalidSession)
  }

  if (code === HTTPSTATE.SERVER_ERROR) {
    ElMessage({ message: msg, type: 'error' })
    return Promise.reject(new Error(msg))
  }
  
  return response.data
}

async function handleUnauthorized () {

  if (isTrue(isRelogin.show)) return 
  isRelogin.show = true;

  try {
    await ElMessageBox.confirm(tipsInfo.invalidSessionAndTips, tipsInfo.systemTips,{
      confirmButtonText: tipsInfo.loginAgain, 
      cancelButtonText: common.close, 
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


export function responseErrorHandle(error: AxiosError) {

  let { message } = error;

  networkErrorHandle(error)

  if (message == "Network Error") {
    message = tipsInfo.networkError;
  } else if (message.includes("timeout")) {
    message = tipsInfo.timeout;
  } else if (message.includes("Request failed with status code")) {
    message = "系统接口" + message.substr(message.length - 3) + "异常";
  }

  ElMessage({
    type: 'error',
    message
  })

  return Promise.reject(error)

}



