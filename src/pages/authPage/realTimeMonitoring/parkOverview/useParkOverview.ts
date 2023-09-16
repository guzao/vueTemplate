import { useAppData } from '@/store'
import { useReactiveHttp } from '@/hooks'
import { getStationInfo } from '@/API'




export function useParkOverview() {

    const appData = useAppData()

    const { result: parkOverview, getResult: getParkOverview, loading } = useReactiveHttp({
        initData: {} as ParkRuningInfo,
        request: () => getStationInfo({ stationSerial: appData.parkSerial, type: 'DC' }),
        requestCallback: (res) => {
            parkOverview.value = res.data
            return res.data
        },
    })

    return {
        getParkOverview,
        loading,
        parkOverview,
        appData
    }

}

