import { useAppData } from '@/store'
import { EChartsOption, EChartsType } from 'echarts'
import { reactive, computed, watch, nextTick } from 'vue'
import { getIncomeReport, exportIncomeExport } from '@/API'
import { useEcharts, useReactiveHttp, useLocalPagnation, useDownload } from '@/hooks'
import { parserTime, getPrevMonth, getDateCycles, dateFormatterType, getPriceZoomRationAndUnit, pricetoFixed, useThemeColor } from '@/utils'


const { getuseThemeColor }  = useThemeColor()

export function useIncomeParkChart() {

    const appData = useAppData()

    const form = reactive({
        type: 'D',
        startTime: new Date(),
        endTime: new Date(),
        date: [getPrevMonth(new Date(), 1), new Date()],
    })

    const timeType = computed(() => {
        if (form.type == 'D') return 'daterange'
        if (form.type == 'M') return 'monthrange'
        if (form.type == 'D') return 'years'
    })

    const createParams = () => {
        const { type, date: [startTime, endTime] } = form
        let formatterTag = dateFormatterType[type as any]
        return {
            stationSerial: appData.currentParkSerial,
            type,
            startTime: parserTime(startTime, formatterTag as any),
            endTime: parserTime(endTime, formatterTag as any),
            device: ' ',
        }
    }

    const { getResult, result, loading } = useReactiveHttp({
        initData: [] as IncomeReport[],
        request: () => getIncomeReport(createParams()),
        requestCallback({ data }) {
            render(data)
            return data.reverse()
        },
    })

    const { downloadFile, fileLoading } = useDownload({ downloadFn: () => exportIncomeExport(createParams()) })

    const { chartRef, renderChart } = useEcharts()

    const render = renderer(renderChart)

    const { currentPageData, pageParams } = useLocalPagnation(result, { page: 1, pageSize: 10 })

    const currentChange = (page: number) => pageParams.page = page

    watch(() => form.type, (type) => {
        const currentDate = new Date()
        form.date[0] = getDateCycles(type, currentDate)
        getResult()
    })

    watch(() => appData.currentParkSerial, getResult)

    return {
        form,
        timeType,
        result,
        getResult,
        loading,
        currentPageData,
        pageParams,
        chartRef,
        currentChange,
        downloadFile,
        fileLoading
    }
}

function renderer(renderChart: (oprions: EChartsOption) => Promise<EChartsType>) {

    return async (incomeData: IncomeReport[]) => {
        const { zoomLimit, unit } = getPriceZoomRationAndUnit(incomeData.map(item => +item.income))
        const data = incomeData.map(({ income, times }) => [times, pricetoFixed(+income / zoomLimit)])
        await nextTick()
        renderChart({
            color: [getuseThemeColor()],
            title: {
                text: unit,
                top: 0,
                left: '0%',
                textStyle: {
                    color: '#333',
                    fontSize: 14,
                }
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                backgroundColor: 'rgba(26, 27, 28, 0.9);',
                textStyle: {
                    color: '#fff',
                },
            },
            legend: {},
            xAxis: {
                type: 'category'
            },
            yAxis: {
                type: 'value'
            },
            grid: {
                top: '10%',
                left: '1%',
                right: '1%',
                bottom: '4%',
                containLabel: true
            },
            series: [
                {
                    name: '收益',
                    type: 'bar',
                    data,
                    barMaxWidth: 20
                }
            ]
        })
    }
}
