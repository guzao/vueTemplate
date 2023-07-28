import { useAppData } from '@/store'
import { getDevicGroupList, getStationInfo } from '@/api'
import { useReactiveHttp, useDict } from '@/hooks'
import { ref } from 'vue'


const appData = useAppData()

/** 电站类型 */
const { dictLabel, getResult: getParkType } = useDict('eos_park_type')


/** 子站列表 */
const { result: deivceGroupList, getResult: getDevicGroupListData } = useReactiveHttp({
    initData: [] as DeviceGroup[],
    request: () => getDevicGroupList(appData.currentParkSerial),
    requestCallback: (res) => res.data.unitGroupList,
    Immediately: false
})

/** 电站运行概览 */
const { result: parkRuningInfo, getResult, } = useReactiveHttp({
    initData: {} as ParkRuningInfo,
    request: () => getStationInfo(appData.parkSerial),
    requestCallback(res) {
        res.data.code = appData.currentParkSerial
        res.data.typeLabel = dictLabel.value[res.data.type]
        return res.data
    },
    Immediately: false
})

const loading = ref(false)

getParkType().then(() => getSubParkInfo())

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


export function useData() {
    return {
        getSubParkInfo,
        deivceGroupList,
        parkRuningInfo,
        loading,
        appData
    }
}