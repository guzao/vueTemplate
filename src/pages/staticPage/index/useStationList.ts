import { useDicts } from '@/store'
import { getStationList } from '@/API'
import { getArrayLength, isFalse } from '@/utils'
import { computed, ref, unref, } from 'vue'
import { useReactiveHttp, useDict} from '@/hooks'

export const searchCode = ref('')

export const type = ref('')

const dicts = useDicts()

const state = ref(-1)

export const loading = ref(false)

export const filteredList = computed(() => {

    const parkType = type.value
    const search = searchCode.value

    // 全部数据
    if (parkType == '-1') {
        const result = search ? stationList.value.filter(item => item.code.includes(search)) : stationList.value
        return state.value > 0 ? result.filter(item => item.cardList.A_M2 == state.value) : result
    }

    // 二次筛选
    const result = parkType ? stationList.value.filter(item => (item.type as string).includes(parkType)) : stationList.value

    // 状态筛选
    if (state.value > 0) return result.filter(item => item.cardList.A_M2 == state.value)

    return search ? result.filter(item => item.code.includes(search)) : result

})

const { getResult, result: stationList } = useReactiveHttp({
    initData: [] as ParkMonitorInfo[],
    request: () => getStationList(),
    requestCallback: (res) => {
        stationListAddProps(res.data.stationList)
        return res.data.stationList
    },
    Immediately: false
})

function stationListAddProps(stationList: ParkMonitorInfo[]) {
    stationList.forEach(park => {
        park.A_M2 = park.cardList.A_M2
        park.A_M3 = park.cardList.A_M3
        park.A_M5 = park.detailList.A_M5
        park.A_M6 = park.detailList.A_M6
        park.A_M7 = park.detailList.A_M7
        park.A_M8 = park.detailList.A_M8
        park.A_M15 = park.cardList.A_M15
        park.A_M16 = park.cardList.A_M16
        park.A_M17 = park.detailList.A_M17
        park.A_M18 = park.detailList.A_M18
    })
}

const { getResult: getParkType, dictLabel, result: parkType } = useDict('eos_park_type')

const deviceStateCount = ref<Record<string, number>>({})

/** 加载电站数据 */
export async function initData() {

    loading.value = true

    // 如果数据字典未被缓存,获取远端数据 被缓存直接从字典中获取
    isFalse(dicts.parkTypeDict.loaded) ? await getParkType() : (parkType.value = dicts.parkTypeDict.dictValue)

    await getResult()

    loading.value = false

    setDeviceStateAndsetParkType()

    parkTypeStatistics()
}


const setDeviceStateAndsetParkType = () => {
    deviceStateCount.value = {}
    stationList.value.forEach((item, index) => {
        unref(stationList)[index].typeLabel = unref(dictLabel)[item.type]
        const state = item.cardList.A_M2 || null
        unref(deviceStateCount)[state] ? unref(deviceStateCount)[state]++ : (unref(deviceStateCount)[state] = 1)
    })
}


function parkTypeStatistics() {
    parkType.value.forEach(item => {
        const { dictLabel, dictValue } = item
        const types = unref(stationList).filter(station => station.type == dictValue)
        item.accLabel = dictValue == '-1' ? `${dictLabel} (${getArrayLength(unref(stationList))})` : `${dictLabel} (${getArrayLength(types)})`
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
        state
    }

}