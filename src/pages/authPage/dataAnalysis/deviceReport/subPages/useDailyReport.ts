import { useAppData } from '@/store'
import { rendererBard } from './tools'
import { reactive, watch, nextTick } from 'vue'
import { getDailyReport, exportDailyReport } from '@/API'
import { useReactiveHttp, useEcharts, useDownload } from '@/hooks'
import { parserTime, arrayGroupByMap, getFirstElement, } from '@/utils'


export function useDailyReport() {

    const form = reactive({ date: new Date() })

    const appData = useAppData()

    const { chartRef, renderChart, } = useEcharts()

    const { result, getResult, loading } = useReactiveHttp({
        initData: {
            charge: 0,
            discharge: 0,
            data: [],
            subNum: [],
            pcsCharge: 0,
            pcsDischarge: 0,
        } as DailyReportData,
        request: () => getDailyReport({ date: parserTime(form.date, 'YYYY-MM-DD'), stationSerial: appData.currentParkSerial }),
        requestCallback: ({ data }) => {
            nextTick(() => rendererBard(renderChart, data.data))
            arrayGroupByMap(data.data, 'subName').forEach((value, key) => {
                const firstElement = getFirstElement(value) as any
                firstElement.limit = value.length
            })
            return data
        }
    })

    const { downloadFile, fileLoading } = useDownload({
        downloadFn: () => {
            const params = {
                stationSerial: appData.currentParkSerial,
                date: parserTime(form.date, 'YYYY-MM-DD'),
                model: 'dc,ac'
            }
            return exportDailyReport(params)
        },
    })


    watch(() => appData.currentParkSerial, getResult)

    watch(() => form.date, getResult)

    return {
        form,
        chartRef,
        result,
        loading,
        downloadFile,
        fileLoading
    }

}