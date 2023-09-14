import { watch } from 'vue'
import { useAppData } from '@/store'
import { IntervalTime } from '@/enum'
import { getParkIncome } from '@/API'
import { useReactiveHttp_, useInterval } from '@/hooks'

export function useParkIncome () {

    const appData = useAppData()

    const [ parkIncome, getParkIncomeData, loading ] = useReactiveHttp_({
        initData: {} as ParkIncomeData,
        request: () => getParkIncome(appData.currentParkSerial),
    })

    const { _resetInterval } = useInterval(IntervalTime.ONE_HOURS, getParkIncomeData)

    watch(() => appData.currentParkSerial,  () => {
        _resetInterval()
        getParkIncomeData()
    })

    return {
        loading,
        appData,
        parkIncome,
    }

}