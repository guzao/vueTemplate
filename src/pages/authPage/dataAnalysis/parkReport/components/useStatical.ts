
import { watch } from 'vue'
import { useAppData } from '@/store'
import { getStationInfo } from '@/API'
import { useReactiveHttp, useReactiveHttp_ } from '@/hooks'

export function useStatical() {


    const appData = useAppData()

    const { result: parkOverview, getResult: getParkOverview, loading } = useReactiveHttp({
        initData: {} as ParkRuningInfo,
        request: () => getStationInfo({ stationSerial: appData.parkSerial, type: 'DC' }),
        requestCallback: (res) => {
            parkOverview.value = res.data
            return res.data
        },
    })

    const [PCSData, getPcsData, PCSLoading] = useReactiveHttp_({
        initData: {} as ParkRuningInfo,
        request: () => getStationInfo({ stationSerial: appData.parkSerial, type: 'AC' }),
        requestCallback: (res) => {
            parkOverview.value = res.data
            return res.data
        },
    })

    watch(() => appData.currentParkSerial, () => {
        getPcsData()
        getParkOverview()
    })


    return {
        PCSData,
        PCSLoading,
        parkOverview,
        loading
    }

}