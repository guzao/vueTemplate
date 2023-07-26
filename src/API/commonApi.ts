import { useGet, usePost } from '@/HTTP'
import { common } from '@/ApiMap'

/** 用户受权限控制的电站列表 */
export function getUserParkListAll () {
    return useGet({
        url: common.parkListAll
    })
}

/** 电站数据最新时间 */
export function getUserParkLastTime () {
    return useGet({
        url: common.parkLastTime
    })
}


/** 电站字典表 */
export function getDictType (type: string) {
    return useGet({
        url: `${common.dictType}/${type}`
    })
}


