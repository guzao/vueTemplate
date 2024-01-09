import { ref } from 'vue'
import { useReactiveHttp } from '@/hooks'
import { useAppData, useDicts } from '@/store'
import { getDevicGroupList, getStationInfo } from '@/API'




export function useData() {

    const appData = useAppData()


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
        request: () => getStationInfo({ stationSerial: appData.parkSerial, type: 'dc' }),
        requestCallback(res) {
            res.data.code = appData.currentParkSerial
            return res.data
        },
        Immediately: false
    })

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
        deivceGroupList,
        parkRuningInfo,
        loading,
        appData
    }
}