import { useUser } from '@/store'
import { HTTPSTATE } from '@/enum'
import { AxiosResponse, AxiosError } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { routerWhiteLsit, ignoreErrorUrls } from '@/config'
import { networkErrorHandle } from '@/systemRuntimeInfoTrack'
import { isFalse, isTrue, getLocalLangMessage } from '@/utils'

let userLogout: () => Promise<void>


/**
 * 标记是否是需要重新登陆
*/
export let isRelogin = { show: false };

export function responseHandle(response: AxiosResponse) {

  const { data: { code } } = response

  const errorHandle = responseCodeInvalidErrorHandleMap[code]

  if (isTrue(errorHandle)) return errorHandle(response)

  addResponseProps(response)

  return response.data

}

/**
 * 接口异常状态码对应处理函数 函数必须返回promise
*/
const responseCodeInvalidErrorHandleMap: Record<any, (response: AxiosResponse) => Promise<any>> = {


  /**
   * 权限异常处理函数
  */
  [HTTPSTATE.UN_AUTHORIZED]: (_: AxiosResponse) => {
    const { tipsInfo } = getLocalLangMessage()
    handleUnAuthorized()
    return Promise.reject(tipsInfo.invalidSession)
  },

  /**
   * 服务异常处理函数
  */
  [HTTPSTATE.SERVER_ERROR]: (response: AxiosResponse) => {
    const { data: { msg }, config: { url } } = response
    const showErroeMessage = !ignoreErrorUrls.includes(url!)
    // Tips 接口 不提示错误信息
    showErroeMessage && ElMessage({ message: msg, type: 'error' })
    return Promise.reject(new Error(msg))
  },

}



/**
 * 用户权限问题处理
*/
async function handleUnAuthorized() {

  // 非系统内部页面不弹出提示框
  if (notInsideSystemPage()) return

  const { tipsInfo, common } = getLocalLangMessage()
  if (isTrue(isRelogin.show)) return
  isRelogin.show = true;

  try {

    await ElMessageBox.confirm(tipsInfo.invalidSessionAndTips, tipsInfo.systemTips, {
      confirmButtonText: tipsInfo.loginAgain,
      cancelButtonText: common.close,
      type: 'warning',
    })

    if (isFalse(userLogout)) userLogout = useUser().userlogOut

    userLogout().then(() => isRelogin.show = false)

  } catch (error) {
    isRelogin.show = false
  }

}

/**
 * 接口返回值添加属性
*/
function addResponseProps(response: AxiosResponse) {
  const { request } = response
  const responseTypeS = ['blob', 'arraybuffer']
  if (responseTypeS.includes(request.responseType)) {
    response.data.disposition = response.headers['content-disposition']
  }
}






/**
 * 服务异常处理
*/
export function responseErrorHandle(error: AxiosError) {

  networkErrorHandle(error)

  ElMessage({ type: 'error', message: getErrorMessageText(error) })

  return Promise.reject(error)

}

function getErrorMessageText(error: AxiosError) {

  let { message } = error;

  const { tipsInfo } = getLocalLangMessage()

  if (message == "Network Error") {
    message = tipsInfo.networkError;
  } else if (message.includes("timeout")) {
    message = tipsInfo.timeout;
  } else if (message.includes("Request failed with status code")) {
    message = "网络服务异常,请检查网络";
  }

  return message

}


/**
 * 非系统内部页面
*/
export const notInsideSystemPage = () => routerWhiteLsit.some(item => location.href.includes(item as any))