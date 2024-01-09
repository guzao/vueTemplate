import { useGet, usePost } from '@/HTTP'
import { login, monitor } from '@/ApiMap'


export function userLogin (data: UserLogin) {
    return usePost({
        url: login.login,
        data: data
    })
}

export function userLogout () {
    return usePost({
        url: login.logout
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
        url: monitor.stationList
    })
}

export function getNoticeList (params: any) {
    return useGet({
        url: login.noticeList,
        params
    })
}


export function getNoticeDetail(noticeId: any) {
    return useGet({
      url: login.noticeDetail + noticeId,
    })
  }