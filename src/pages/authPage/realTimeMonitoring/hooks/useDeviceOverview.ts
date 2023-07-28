import { ref } from 'vue'
import { isTrue } from '@/utils'
import { useAppData } from '@/store'
import { useReactiveHttp, useDict } from '@/hooks'
import { getDevicGroupList, getStationInfo } from '@/api'



/** 设备列表数据 */
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
            parkTypeStatistics(unitGroupList)
            return res.data.unitGroupList
        },
        Immediately: false
    })

    /** 统计每个组下的设备的状态 */
    function parkTypeStatistics (deivceGroupList: DeviceGroup []) {
        deivceGroupList.forEach(group => {
            group.stateCount = {}
            group.list.forEach(device => {
                const { M2 = 'null' } = device.deviceData
                isTrue(group.stateCount[ M2 ]) ? group.stateCount[ M2 ]++ : ( group.stateCount[ M2 ] = 1)
            })
        })
    }


    /** 电站运行概览 */
    const { result: parkRuningInfo, getResult } = useReactiveHttp({
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

    const loading = ref(false)

    const getSubParkInfo = async () => {
        loading.value = true
        try {
            await getResult()
            await getDevicGroupListData()
        } catch (error) {
            loading.value = false
        }
        loading.value = false
    }


    return {
        getSubParkInfo,
        parkRuningInfo,
        loading,
        deivceGroupList,
        appData,
    }

}