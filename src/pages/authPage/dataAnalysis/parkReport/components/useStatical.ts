
import { watch } from 'vue'
import { useAppData } from '@/store'
import { getStationInfo } from '@/API'
import { useReactiveHttp, useReactiveHttp_ } from '@/hooks'

export function useStatical() {


    const appData = useAppData()

    const { result: parkOverview, getResult: getParkOverview, loading } = useReactiveHttp({
        initData: {} as ParkRuningInfo,
        request: () => getStationInfo({ stationSerial: appData.parkSerial, type: 'dc' }),
        requestCallback: (res) => {
            return res.data
        },
    })

    const [PCSData, getPcsData, PCSLoading] = useReactiveHttp_({
        initData: {} as ParkRuningInfo,
        request: () => getStationInfo({ stationSerial: appData.parkSerial, type: 'ac' }),
        requestCallback: (res) => {
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