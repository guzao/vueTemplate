import { useAppData } from '@/store'
import { objectToUrlQuery } from '@/utils'

/** 设备详细信息 */
export function useDeviceDetail() {

    const appData = useAppData()

    /** 设备详情 */
    const checkDeviceDetail = (device: DeviceItem) => {
        const params = {
            stationCode: appData.currentParkSerial,
            type: appData.currentParkType,
            name: appData.parkAuthList.find(park => park.serial == appData.currentParkSerial)?.name,
            id: device.id
        }
        const urlQuery = objectToUrlQuery(params as any)
        window.open('/monitor/deviceDetail' + urlQuery)
    }

    return {
        /** 设备详情 */
        checkDeviceDetail
    }

}