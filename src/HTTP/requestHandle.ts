import type { InternalAxiosRequestConfig } from 'axios'
import { whiteList } from '@/config'
import { useToken, isFalse, useLang } from '@/utils';

const { getToken, removetToken } = useToken()
const { getLang } = useLang()


export function requestHandle(config: InternalAxiosRequestConfig) {

    configAddProps(config)

    if (checkWhiteList(config)) return config

    if (isFalse(getToken())) {
        unTokenProcess()
        return config
    }

    return config
}


function checkWhiteList(config: InternalAxiosRequestConfig) {
    const url = config.url!
    return whiteList.indexOf(url) > -1
}

function unTokenProcess() {
    removetToken()
}

function configAddProps(config: InternalAxiosRequestConfig,) {

    if (getToken()) config.headers['Authorization'] = 'Bearer ' + getToken()

    const { params = {} } = config
    config.params = { ...params,  lang: getLang() }

}
