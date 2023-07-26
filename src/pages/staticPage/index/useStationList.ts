import { computed, ref, unref } from 'vue'
import { getStationList } from '@/API'
import { useReactiveHttp, useDict, useInterval } from '@/hooks'
import { getArrayLength } from '@/utils'

export const searchCode = ref('')

export const type = ref('')

export const filteredList = computed(() => {
    const parkType = type.value
    const search = searchCode.value

    // 全部数据
    if (parkType == '-1') return search ? stationList.value.filter(item => item.code.includes(search)) : stationList.value

    // 二次筛选
    const result = parkType ? stationList.value.filter(item => item.type.includes(parkType)) : stationList.value
    return search ? result.filter(item => item.code.includes(search)) : result
})

const { getResult, loading, result: stationList } = useReactiveHttp({ 
    initData: [] as ParkMonitorInfo[], 
    request: () => getStationList(), 
    requestCallback: (res) => res.data.stationList,
    Immediately: false
})


const { getResult: getParkType, dictLabel, result: parkType  } = useDict('eos_park_type')

const { getResult: getReleaseStatus, dictLabel: releaseStatusDictLabel, result: releaseStatus  } = useDict('station_release_status')

const deviceStateCount = ref<Record<string, number>>({})

/** 加载电站数据 */
export async function initData () {

    await getParkType()

    await getReleaseStatus()

    await getResult()

    setDeviceStateAndsetParkType()

    parkTypeStatistics()
}


const setDeviceStateAndsetParkType = () => {
    stationList.value.forEach((item, index) => {
        unref(stationList)[index].typeLabel = unref(dictLabel)[ item.type ]
        const state = item.cardList.A_M2 || null
        unref(deviceStateCount)[state] ? unref(deviceStateCount)[state]++ : (unref(deviceStateCount)[state] = 1)
    })
}


function parkTypeStatistics () {
    parkType.value.forEach(item => {
        const { dictLabel, dictValue } = item
        const types = unref(stationList).filter(station => station.type ==  dictValue)
        item.accLabel =  dictValue == '-1' ? `${dictLabel} (${getArrayLength(unref(stationList))})` :`${dictLabel} (${getArrayLength(types)})`
    })
}


export function useStationList() {
    
    return {
        getResult,
        loading,
        filteredList,
        searchCode,
        type,
        stationList,
        deviceStateCount,
        parkType,
        releaseStatusDictLabel
    }

}