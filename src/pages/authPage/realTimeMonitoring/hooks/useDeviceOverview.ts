import { useAppData } from '@/store'
import { useReactiveHttp, useDict } from '@/hooks'
import { getDevicGroupList, getStationInfo } from '@/api'


export function useDeviceOverview() {


    const appData = useAppData()

    /** 电站类型 */
    const { dictLabel, getResult: getParkType } = useDict('eos_park_type')


    /** 子站列表 */
    const { result: deivceGroupList, getResult: getDevicGroupListData } = useReactiveHttp({
        initData: [] as DeviceGroup[],
        request: () => getDevicGroupList(appData.currentParkSerial),
        requestCallback: (res) => {
            const unitGroupList = res.data.unitGroupList
            return unitGroupList
        },
        Immediately: false
    })



    /** 电站运行概览 */
    const { result: parkRuningInfo, getResult, loading } = useReactiveHttp({
        initData: {} as ParkRuningInfo,
        request: () => getStationInfo(appData.parkSerial),
        requestCallback(res) {
            res.data.code = appData.currentParkSerial
            res.data.typeLabel = dictLabel.value[res.data.type]
            return res.data
        },
        Immediately: false
    })

    getParkType().then(() => getSubParkInfo())

    const getSubParkInfo = () => {
        getResult()
        getDevicGroupListData()
    }


    return {
        getSubParkInfo,
        parkRuningInfo,
        loading,
        deivceGroupList,
        appData,
    }

}