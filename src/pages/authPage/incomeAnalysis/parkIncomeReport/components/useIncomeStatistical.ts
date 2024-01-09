import { watch, nextTick } from 'vue'
import { CountUp } from 'countup.js'
import { getParkIncome } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { conversionUnitPrice } from '@/utils'
import { useAppData, useSystemConfig } from '@/store'

export function useIncomeStatistical() {

    const appData = useAppData()

    const { result, getResult, loading } = useReactiveHttp({
        initData: {} as ParkIncomeData,
        request: () => getParkIncome(appData.currentParkSerial),
        requestCallback: ({ data }) => {
            nextTick(() => initNumber(data))
            return data
        }
    })

    const systemConfig = useSystemConfig()
    
    const initNumber = (data: ParkIncomeData) => {
        const options = { decimalPlaces: systemConfig.systemrunningConfig.priceFractionDigits }
        new CountUp(document.querySelector('.day_income') as HTMLDivElement, conversionUnitPrice(data.dayIncome).size as number, options).start();
        new CountUp(document.querySelector('.week_income') as HTMLDivElement, conversionUnitPrice(data.weekIncome).size as number, options).start();
        new CountUp(document.querySelector('.month_income') as HTMLDivElement, conversionUnitPrice(data.monthIncome).size as number, options).start();
        new CountUp(document.querySelector('.year_income') as HTMLDivElement, conversionUnitPrice(data.yearIncome).size as number, options).start();
        new CountUp(document.querySelector('.total_income') as HTMLDivElement, conversionUnitPrice(data.accumulateIncome).size as number, options).start();
    }

    watch(() => appData.currentParkSerial, getResult)

    return {
        result,
        getResult,
        loading
    }

}