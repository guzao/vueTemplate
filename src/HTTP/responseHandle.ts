import { useUser } from '@/store'
import { HTTPSTATE } from '@/enum'
import { AxiosResponse, AxiosError } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { networkErrorHandle } from '@/systemRuntimeInfoTrack'
import { isFalse, isTrue, getLocalLangMessage } from '@/utils'

let userLogout: () => Promise<void>

const { tipsInfo, common } = getLocalLangMessage()

/**
 * 标记是否是需要重新登陆
*/
export let isRelogin = { show: false };

export async function responseHandle(response: AxiosResponse) {

  const {  data: { code, msg }, request } = response

  if (code === HTTPSTATE.UNAUTHORIZED) {
    handleUnauthorized()
    return Promise.reject(tipsInfo.invalidSession)
  }

  if (code === HTTPSTATE.SERVER_ERROR) {
    ElMessage({ message: msg, type: 'error' })
    return Promise.reject(new Error(msg))
  }
  
  if (request.responseType == 'blob' || request.responseType == 'arraybuffer' ) {
    response.data.disposition = response.headers['content-disposition']
  }

  return response.data
}

/**
 * 用户权限问题处理
*/
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



