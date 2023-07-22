import { useGet, usePost } from '@/HTTP'
import { login, common } from '@/ApiMap'


export function userLogin (data: UserLogin) {
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

export function getUserInfo () {
    return useGet({
        url: login.getInfo
    })
}


export function getRouters () {
    return useGet<UserRouter []>({
        url: login.getRouters
    })
}

export function getStationList () {
    return useGet({
        url: common.stationList
    })
}
