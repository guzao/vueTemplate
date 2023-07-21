import { useGet, usePost } from '@/HTTP'
import { login } from '@/ApiMap'


export function useLogin (data: UserLogin) {
    return usePost({
        url: login.login,
        data: data
    })
}

export function getCodeImg () {
    return useGet({
        url: login.captchaImage
    })
}