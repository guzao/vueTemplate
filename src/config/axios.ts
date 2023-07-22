import { CreateAxiosDefaults } from "axios"
import { login } from '@/ApiMap'

export const axiosConfig: CreateAxiosDefaults = {
    baseURL: '/api',
    timeout: 1000 * 60,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
}


export const whiteList = [ login.login, login.captchaImage ]