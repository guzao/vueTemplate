import { getMaxElement, getArrayLength } from '@/utils'
import { useDeviceOverview } from '../hooks/useDeviceOverview'


export function useTableModel() {

    const { appData, getSubParkInfo, parkRuningInfo, deivceGroupList, loading } = useDeviceOverview(markDevice)

    const deviceMarkInfo = (list: DeviceItem[], key: keyof DeviceItem['deviceData']) => getMaxElement(list, (maxEl, cur) => maxEl.deviceData[key] < cur.deviceData[key])

    function markDevice({ list }: DeviceGroup) {
        if (getArrayLength(list) <= 1) return
        deviceMarkInfo(list, 'M15').maxDayCharge = true
        deviceMarkInfo(list, 'M16').maxDayDisCharge = true
        deviceMarkInfo(list, 'M19').maxYearCharge = true
        deviceMarkInfo(list, 'M20').maxYearDisCharge = true
        deviceMarkInfo(list, 'M5').maxAccCharge = true
        deviceMarkInfo(list, 'M6').maxAccDisCharge = true
    }

    return {
        appData, 
        getSubParkInfo, 
        parkRuningInfo, 
        deivceGroupList, 
        loading, 
    }

}

