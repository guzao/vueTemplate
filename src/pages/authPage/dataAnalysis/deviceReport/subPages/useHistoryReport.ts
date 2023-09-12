import { useAppData } from '@/store'
import { getUnitList, getHistoryReport } from '@/API'
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { dateFormatterType, processTableRowData, renderLine } from '../../parkReport/tools'
import { useEcharts, useReactiveHttp, useLocalPagnation, useHasShowMoreData, useSelectAll } from '@/hooks'
import { getPrevMonth, getDateCycles, paserTime, generateDnamicTableData, arrayIsEmpty, isFalse } from '@/utils'


export function useHistoryReport() {

    const appdate = useAppData()


    const { result: unitList, getResult: _getUnitList, loading: unitListLoading } = useReactiveHttp(
        { initData: [] as UnitListData[], request: () => getUnitList({ stationSerial: appdate.currentParkSerial, pageSize: 1000 }), requestCallback: (res) => res.rows }
    )

    const { checkAll, handleCheckAllChange, handleCheckedIdsChange, checkedIds, isIndeterminate, resetSelectAll } = useSelectAll(unitList, 'assetSerial')

    const { toggleShowMore, showMore, limitDataList } = useHasShowMoreData(unitList, 8)

    const form = reactive({
        dataCycle: 'D',
        date: [getPrevMonth(new Date(), 1), new Date()],
        assetSerials: checkedIds,
    })

    const createParams = () => {
        const { date, dataCycle, assetSerials } = form
        const [startTime, endTime] = date
        let formatterTag = dateFormatterType[dataCycle as any] || 'YYYY-MM-DD'
        return {
            startTime: paserTime(startTime, formatterTag as any),
            endTime: paserTime(endTime, formatterTag as any),
            stationSerial: appdate.currentParkSerial,
            dataCycle: dataCycle as any,
            assetSerials
        }
    }

    const timeType = computed(() => {
        if (form.dataCycle == 'D') return 'daterange'
        if (form.dataCycle == 'M') return 'monthrange'
        if (form.dataCycle == 'D') return 'year'
    })

    const { chartRef, renderChart } = useEcharts()

    const tableHeader = ref<DnamicTableDataHeaderData[]>([])

    const { result, getResult, loading } = useReactiveHttp({
        initData: [] as HistoryReportData[],
        request: () => getHistoryReport(createParams()),
        requestCallback: ({ data }) => {
            nextTick(() => renderLine(data, renderChart))
            const res = generateDnamicTableData(data, { key: 'time', splitSymbol: '$', processTableRowData: processTableRowData })
            tableHeader.value = res.headerData
            return res.tableData
        },
        Immediately: false
    })

    const { currentPageData, pageParams, initArrayChunk } = useLocalPagnation(result, { page: 1, pageSize: 10 })

    const currentChange = (page: number) => pageParams.page = page

    const allChange = (value: boolean) => {
        handleCheckAllChange(value)
        if (isFalse(value)) {
            result.value = []
            tableHeader.value = []
            initArrayChunk()
            return
        }
        getResult()
    }
    
    const assetSerialsChange = (value: any []) => {
        handleCheckedIdsChange(value)
        if (arrayIsEmpty(value)) {
            result.value = []
            tableHeader.value = []
            initArrayChunk()
            return
        }
        getResult()
    }

    const reset = () => {
        result.value = []
        tableHeader.value = []
    }

    watch(() => form.dataCycle, (type) => {
        form.date[0] = getDateCycles(type, new Date())
        reset()
        getResult()
    })

    watch(() => appdate.currentParkSerial, () => {
        reset()
        resetSelectAll()
        form.assetSerials = []
        _getUnitList()
    })

    return {
        form,
        timeType,
        limitDataList,
        showMore,
        toggleShowMore,
        currentPageData,
        tableHeader,
        currentChange,
        pageParams,
        result,
        unitListLoading,
        getResult,
        unitList,
        loading,
        chartRef,
        checkAll, 
        allChange,
        assetSerialsChange,
        checkedIds, 
        isIndeterminate
    }
}