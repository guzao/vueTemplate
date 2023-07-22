import { onMounted, ref } from 'vue'
import { getStationList } from '@/API'
import { hasEror } from '@/utils'

export const stationList = ref<ParkMonitorInfo []>([])


export function useStationList () {

    const getData = async () => {
        try {
            const res = await getStationList()
            if (hasEror(res)) return
            stationList.value = res.data.stationList
        } catch (error) {

        }
    }

    return {
        getData
    }

}