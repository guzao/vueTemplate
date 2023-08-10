import { CreateAxiosDefaults } from "axios"
import { login } from '@/ApiMap'
const config = import.meta.env
export const axiosConfig: CreateAxiosDefaults = {
    // baseURL: '/api',
    baseURL: config.VITE_APP_BASE_URL,
    timeout: 1000 * 60,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}

/** 接口调用白名单 */
export const whiteList = [ login.login, login.captchaImage ]