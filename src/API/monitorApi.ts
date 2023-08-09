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
/** 获取指定电站设备组运行信息 */
export function geStationPowerAll (params: { stationSerial: string, date: string }) {
    return useGet<ParkPowerLine []>({
        url: `${monitor.stationPowerAll}`,
        params
    })
}

/** 获取指定设备基本信息 */
export function getDeviceInfo (params: DeviceInfoParams) {
    return useGet({
        url: monitor.deviceInfo,
        params
    })
}


/** 获取用户登录信息 */
export function getLogininforList (params: any) {
    return useGet({
        url: monitor.logininforList,
        params
    })
}

/** 获取用户操作信息 */
export function getOperlogList (params: any) {
    return useGet({
        url: monitor.operlogList,
        params
    })
}