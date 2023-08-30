import { login } from '@/ApiMap'
import { CreateAxiosDefaults } from "axios"

const config = import.meta.env
export const axiosConfig: CreateAxiosDefaults = {
    baseURL: config.VITE_APP_BASE_URL,
    timeout: 1000 * 60,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}

/** 接口调用白名单 */
export const whiteList = [ login.login, login.captchaImage ]