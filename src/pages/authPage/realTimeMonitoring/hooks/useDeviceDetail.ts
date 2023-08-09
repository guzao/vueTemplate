import { useAppData } from '@/store'
import { objectToUrlQuery } from '@/utils'

export function useDeviceDetail() {
/** 设备详细信息 */

    const appData = useAppData()

    /** 设备详情 */
    const checkDeviceDetail = (device: DeviceItem) => {
        const params: DeviceDetailNewTapUrlParam = {
            stationCode: appData.currentParkSerial,
            type: appData.currentParkType,
            unitId: device.id,
            state: device.deviceData.M2
        }
        const urlQuery = objectToUrlQuery(params as any)
        window.open('/monitor/deviceDetail' + urlQuery)
    }

    return {
        /** 设备详情 */
        checkDeviceDetail
    }

}