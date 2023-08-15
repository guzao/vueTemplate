import { watch, reactive } from 'vue'
import { useAppData } from '@/store'
import { getUnitGroupList } from '@/API'
import { useReactiveHttp } from '@/hooks'


export function useRunningData () {

    const appData = useAppData()

    const form = reactive<ParkDeviceRunningData>({
        stationSerial: appData.currentParkSerial,
        step: 15,
        sTime: '',
        eTime: '',
        page: '1',
        unitId: '1'
    })

    const { result: groupList, getResult: getGroupListResult } = useReactiveHttp({ initData: [] as GroupList[], request: () => getUnitGroupList({ stationSerial: appData.currentParkSerial }) })
    
    watch(() => appData.currentParkSerial, () => {
        getGroupListResult()
        console.log(groupList)
    })

    return {
        appData,
    }
    
}