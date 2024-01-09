import { useAppData } from '@/store'
import { ref, reactive, computed, watch, nextTick, Ref } from 'vue'
import { processTableRowData, renderLine } from '../../parkReport/tools'
import { getUnitList, getHistoryReport, exportHistoryReport } from '@/API'
import { useEcharts, useReactiveHttp, useLocalPagnation, useHasShowMoreData, useSelectAll, useDownload } from '@/hooks'
import { getPrevMonth, getDateCycles, parserTime, generateDnamicTableData, arrayIsEmpty, isFalse, sleep, dateFormatterType } from '@/utils'


export function useHistoryReport() {

    const {
        appdate, unitList, _getUnitList, unitListLoading, checkAll, handleCheckAllChange, handleCheckedIdsChange,
        checkedIds, isIndeterminate, resetSelectAll, toggleShowMore, showMore, limitDataList
    } = useUnitData()



    const { createParams, form, timeType } = useFormData(checkedIds)


    const { fileLoading, downloadFile } = useDownload({ downloadFn: () => exportHistoryReport({ ...createParams(), model: 'dc,ac' }) })

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

    const assetSerialsChange = (value: any[]) => {
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

    watch(() => form.dataCycle, async (type) => {
        await sleep()
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
        isIndeterminate,
        fileLoading,
        downloadFile
    }
}

function useUnitData() {

    const appdate = useAppData()

    const { result: unitList, getResult: _getUnitList, loading: unitListLoading } = useReactiveHttp(
        { initData: [] as UnitListData[], request: () => getUnitList({ stationSerial: appdate.currentParkSerial, pageSize: 1000 }), requestCallback: (res) => res.rows }
    )

    const { checkAll, handleCheckAllChange, handleCheckedIdsChange, checkedIds, isIndeterminate, resetSelectAll } = useSelectAll(unitList, 'assetSerial')

    const { toggleShowMore, showMore, limitDataList } = useHasShowMoreData(unitList, 8)

    return {
        unitList,
        _getUnitList,
        unitListLoading,
        checkAll,
        handleCheckAllChange,
        handleCheckedIdsChange,
        checkedIds,
        isIndeterminate,
        resetSelectAll,
        toggleShowMore,
        showMore,
        limitDataList,
        appdate
    }
}

function useFormData(checkedIds: Ref<any[]>) {

    const appdate = useAppData()

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
            startTime: parserTime(startTime, formatterTag as any),
            endTime: parserTime(endTime, formatterTag as any),
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

    return {
        form,
        createParams,
        timeType
    }
}