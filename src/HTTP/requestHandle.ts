import { whiteList } from '@/config'
import type { InternalAxiosRequestConfig } from 'axios'
import { useToken, isFalse, useLang, useRequestCatch } from '@/utils'


const { getLang } = useLang()

const { getToken, removetToken } = useToken()

const { getRequestCatch, setRequestCatch } = useRequestCatch()

export function requestHandle(config: InternalAxiosRequestConfig) {

    configAddProps(config)

    if (checkWhiteList(config.url!)) return config

    if (notToken()) return config

    if (isRepeatRequest(config)) return Promise.reject(new Error('Error'))

    return config
}

/** API 白名单检查  */
const checkWhiteList = (url: string) => whiteList.includes(url)

function notToken() {
    const notToken = isFalse(getToken())
    if (notToken) {
        removetToken()
    }
    return notToken
}

function configAddProps(config: InternalAxiosRequestConfig,) {
    if (getToken()) config.headers['Authorization'] = 'Bearer ' + getToken()
    // 添加语言标识
    const { params = {} } = config
    config.params = Object.assign(params, { lang: getLang(), _time: Date.now() })
}

function isRepeatRequest(config: InternalAxiosRequestConfig) {
    let isRepeat = false
    const { url, data, method } = config
    if (method == 'post' || method == 'put') {
        setRequestCatch({ data, url, method })
    }
    return isRepeat
}

