import { watch } from 'vue'
import { useAppData } from '@/store'
import { getParkIncome } from '@/API'
import { useReactiveHttp_ } from '@/hooks'

export function useParkIncome () {

    const appData = useAppData()

    const [ parkIncome, getParkIncomeData, loading ] = useReactiveHttp_({
        initData: {} as ParkIncomeData,
        request: () => getParkIncome(appData.currentParkSerial),
    })

    watch(() => appData.currentParkSerial,  getParkIncomeData)

    return {
        loading,
        appData,
        parkIncome,
    }

}