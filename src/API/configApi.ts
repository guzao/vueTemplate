import { useGet, usePost } from '@/HTTP'
import { configApiMap } from '@/ApiMap'

/** 用户企业下所拥有的电站 */
export function getParkList (params?: any) {
    return useGet({
        url: configApiMap.parkList,
        params
    })
}

/** 用户企业下的指定电站 */
export function getParkInfo (id: any) {
    return useGet({
        url: configApiMap.parkInfo + '/' + id,
    })
}

/** 用户列表 */
export function getUserList (params?: any) {
    return useGet({
        url: configApiMap.userList,
        params
    })
}

/** 用户信息详情 */
export function getUserDetail (id: any) {
    return useGet({
        url: configApiMap.userInfo + '/' + id
    })
}

/** 用户 部门列表 */
export function getUserDeptTree (params?: any) {
    return useGet({
        url: configApiMap.userDeptTree,
        params
    })
}