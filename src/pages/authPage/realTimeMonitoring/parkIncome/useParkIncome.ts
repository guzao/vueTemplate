import { watch } from 'vue'
import { useAppData } from '@/store'
import { IntervalTime } from '@/enum'
import { getParkIncome } from '@/API'
import { conversionUnitPrice } from '@/utils'
import { useReactiveHttp_, useInterval, useCountUp } from '@/hooks'

export function useParkIncome() {

    const appData = useAppData()

    const { countUpElRef, countValue } = useCountUp()

    const [parkIncome, getParkIncomeData, loading] = useReactiveHttp_({
        initData: {} as ParkIncomeData,
        request: () => getParkIncome(appData.currentParkSerial),
        requestCallback({ data }) {
            const { size } = conversionUnitPrice(data.accumulateIncome)
            countValue.value = size as number
            return data
        },
    })

    const { _resetInterval } = useInterval(IntervalTime.ONE_HOURS, getParkIncomeData)

    watch(() => appData.currentParkSerial, () => {
        _resetInterval()
        getParkIncomeData()
    })

    return {
        loading,
        appData,
        parkIncome,
        countUpElRef
    }

}