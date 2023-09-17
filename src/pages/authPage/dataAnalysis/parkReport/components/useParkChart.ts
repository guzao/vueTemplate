import { useAppData } from '@/store'
import { getParkRunReport } from '@/API'
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { paserTime, getPrevMonth, getDateCycles, sorted } from '@/utils'
import { TableData, processData, render, dateFormatterType } from '../tools'
import { useEcharts, useReactiveHttp, useLocalPagnation, useSelectAll, useDict } from '@/hooks'

export function useParkChart() {

    const appdate = useAppData()

    const { result: dictValue  } = useDict('charge_discharge_type', true)

    const { checkAll, checkedIds, handleCheckAllChange, handleCheckedIdsChange, resetSelectAll, isIndeterminate } = useSelectAll(dictValue, 'dictValue')

    handleCheckedIdsChange([ 'dc' ]as any)

    const form = reactive({
        type: 'D',
        startTime: new Date(),
        endTime: new Date(),
        date: [getPrevMonth(new Date(), 1), new Date()],
        types: checkedIds
    })

    const timeType = computed(() => {
        if (form.type == 'D') return 'daterange'
        if (form.type == 'M') return 'monthrange'
        if (form.type == 'D') return 'year'
    })

    const { chartRef, renderChart } = useEcharts()

    const createParams = () => {
        const { date, type } = form
        const [startTime, endTime] = date
        let formatterTag = dateFormatterType[type as any] || 'YYYY-MM-DD'
        return {
            startTime: paserTime(startTime, formatterTag as any),
            endTime: paserTime(endTime, formatterTag as any),
            stationSerial: appdate.currentParkSerial,
            type: form.type as any
        }

    }

    const tableData = ref<TableData[]>([])

    const { currentPageData, pageParams } = useLocalPagnation(tableData, { page: 1, pageSize: 10 })

    const { getResult, loading } = useReactiveHttp({
        initData: {} as ParkRunReportData,
        request: () => getParkRunReport(createParams()),
        requestCallback: async ({ data }) => {
            tableData.value = sorted(processData(data), (a, b) => +a.time - +b.time) as any
            await nextTick()
            render(tableData.value, renderChart)
            return data
        }
    })


    const currentChange = (page: number) => pageParams.page = page

    watch(() => appdate.currentParkSerial, getResult)

    watch(() => form.type, (type) => {
        const currentDate = new Date()
        form.date[0] = getDateCycles(type, currentDate)
        getResult()
    })

    return {
        dictValue,
        getResult,
        pageParams,
        tableData,
        timeType,
        currentChange,
        currentPageData,
        loading,
        chartRef,
        form,
        checkAll, 
        checkedIds, 
        isIndeterminate,
        handleCheckAllChange, 
        handleCheckedIdsChange, 
        resetSelectAll 
    }

}