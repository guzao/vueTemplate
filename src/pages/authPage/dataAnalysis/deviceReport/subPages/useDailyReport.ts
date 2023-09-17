import { useAppData } from '@/store'
import { rendererBard } from './tools'
import { getDailyReport } from '@/API'
import { reactive, watch, nextTick } from 'vue'
import { useReactiveHttp, useEcharts } from '@/hooks'
import { paserTime, arrayGroupByMap, getFirstElement } from '@/utils'


export function useDailyReport() {

    const form = reactive({ date: new Date() })

    const appData = useAppData()

    const { chartRef, renderChart, } = useEcharts()

    const { result, getResult, loading } = useReactiveHttp({
        initData: {} as DailyReportData,
        request: () => getDailyReport({ date: paserTime(form.date, 'YYYY-MM-DD'), stationSerial: appData.currentParkSerial }),
        requestCallback: ({ data }) => {
            nextTick(() => rendererBard(renderChart, data.data))
            arrayGroupByMap(data.data, 'subName').forEach((value, key) => {
                const firstElement = getFirstElement(value) as any
                firstElement.limit = value.length
            })
            return data
        }
    })


    watch(() => appData.currentParkSerial, getResult)

    watch(() => form.date, getResult)

    return {
        form,
        chartRef,
        result,
        loading,
    }

}