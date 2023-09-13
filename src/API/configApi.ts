import { useGet, usePost, usePut } from '@/HTTP'
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


/** 更新用户信息 */
export function updateUserProfile (params: any) {
    return usePut({
        url: configApiMap.userProfile,
        params
    })
}

/** 更新用户密码 */
export function updateUserPwd (params: any) {
    return usePut({
        url: configApiMap.userProfileUpdatePwd,
        params: params
    })
}

/** 更新用户密码 */
export function getAddUserProfileInitPwd () {
    return useGet({
        url: configApiMap.addUserProfileInitPwd,
    })
}

/** 企业管理 列表 */
export function getDeptList () {
    return useGet({
        url: configApiMap.deptList,
    })
}

/** 设备单元组  */
export function getUnitGroup (params: any) {
    return useGet({
        url: configApiMap.unitGroupList,
        params
    })
}