import { useGet, usePost } from '@/HTTP'
import { monitor } from '@/ApiMap'

/** 获取指定电站运行信息 */
export function getStationInfo (stationSerial: string) {
    return useGet({
        url: `${monitor.stationInfo}?stationSerial=${stationSerial}`
    })
}
/** 获取指定电站设备组运行信息 */
export function getDevicGroupList (stationSerial: string) {
    return useGet({
        url: `${monitor.deviceList}?stationSerial=${stationSerial}`
    })
}

