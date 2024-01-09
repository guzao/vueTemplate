import { useAppData } from '@/store'
import { EChartsOption, EChartsType } from 'echarts'
import { reactive, computed, watch, nextTick, ref } from 'vue'
import { getIncomeReport, getUnitList, exportIncomeExport } from '@/API'
import { useEcharts, useReactiveHttp, useLocalPagnation, useSelectAll, useHasShowMoreData, useDownload } from '@/hooks'
import { parserTime, getPrevMonth, getDateCycles, dateFormatterType, getPriceZoomRationAndUnit, generateDnamicTableData, arrayGroupByMap, isFalse, arrayIsEmpty } from '@/utils'

export function useIncomeParkChart() {

    const appData = useAppData()

    const { unitNameMap, _getUnitList, unitList, unitListLoading } = useUnitData()

    const { toggleShowMore, showMore, limitDataList } = useHasShowMoreData(unitList, 8)

    const { checkAll, handleCheckAllChange, handleCheckedIdsChange, checkedIds, isIndeterminate, resetSelectAll } = useSelectAll(unitList, 'assetSerial')

    const allChange = (value: boolean) => {
        handleCheckAllChange(value)
        if (isFalse(value)) {
            result.value = []
            tableTitle.value = []
            initArrayChunk()
            render(result.value)
            return
        }
        getResult()
    }

    const assetSerialsChange = (value: any[]) => {
        handleCheckedIdsChange(value)
        if (arrayIsEmpty(value)) {
            result.value = []
            tableTitle.value = []
            initArrayChunk()
            render(result.value)
            return
        }
        getResult()
    }

    const form = reactive({
        type: 'D',
        endTime: new Date(),
        startTime: new Date(),
        assetSerials: checkedIds,
        date: [getPrevMonth(new Date(), 1), new Date()],
    })

    const timeType = computed(() => {
        if (form.type == 'D') return 'daterange'
        if (form.type == 'M') return 'monthrange'
        if (form.type == 'D') return 'years'
    })

    const createParams = () => {
        const { type, date: [startTime, endTime], assetSerials } = form
        let formatterTag = dateFormatterType[type as any]
        return {
            stationSerial: appData.currentParkSerial,
            type,
            startTime: parserTime(startTime, formatterTag as any),
            endTime: parserTime(endTime, formatterTag as any),
            device: assetSerials.join(',')
        }
    }

    const { downloadFile, fileLoading } = useDownload({ downloadFn: () => exportIncomeExport(createParams()) })

    const { chartRef, renderChart } = useEcharts()

    const render = renderer(renderChart)

    const tableTitle = ref<DnamicTableDataHeaderData[]>([])

    const { getResult, result, loading } = useReactiveHttp({
        initData: [] as IncomeReport[],
        request: () => getIncomeReport(createParams()),
        requestCallback({ data }) {
            data.reverse()
            const { tableData, headerData } = processData(data, unitNameMap.value)
            tableTitle.value = headerData
            render(data)
            return tableData
        },
        Immediately: false
    })

    const { currentPageData, pageParams, initArrayChunk, currentChange } = useLocalPagnation(result, { page: 1, pageSize: 10 })

    watch(() => form.type, (type) => {
        const currentDate = new Date()
        form.date[0] = getDateCycles(type, currentDate)
        getResult()
    })

    watch(() => appData.currentParkSerial, () => {
        _getUnitList()
        resetSelectAll()
        result.value = []
        tableTitle.value = []
        render(result.value)
    })

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
        unitList,
        unitListLoading,
        checkAll,
        allChange,
        assetSerialsChange,
        checkedIds,
        isIndeterminate,
        resetSelectAll,
        toggleShowMore,
        showMore,
        limitDataList,
        tableTitle,
        downloadFile,
        fileLoading
    }
}

function useUnitData() {

    const appData = useAppData()

    let unitNameMap = ref<Record<string, string>>({})

    const { result: unitList, getResult: _getUnitList, loading: unitListLoading } = useReactiveHttp(
        {
            initData: [] as UnitListData[], request: () => getUnitList({ stationSerial: appData.currentParkSerial, pageSize: 1000 }), requestCallback: ({ rows }) => {
                unitNameMap.value = {} as any
                (rows as UnitListData[]).forEach(({ assetSerial, name }) => unitNameMap.value[assetSerial] = name)
                return rows
            }
        }
    )
    return {
        unitList, _getUnitList, unitListLoading,
        unitNameMap
    }
}

function processData(incomeData: IncomeReport[], unitNameMap: Record<string, string>) {
    incomeData.forEach(item => item.name = unitNameMap[item.device])
    return generateDnamicTableData(incomeData, {
        splitSymbol: '$',
        key: 'times',
        processTableRowData(item, splitSymbol) {
            const tableDataItem = {} as Record<string, string>
            const { device, charge, disCharge, income, times, name } = item
            const chargeKey = `charge_${device}`
            const disChargeKey = `discharge_${device}`
            const incomeKey = `income_${device}`
            const nameKey = `${name}${splitSymbol}${device}`
            const idKey = `${device}`
            tableDataItem.times = times
            tableDataItem[chargeKey] = charge
            tableDataItem[disChargeKey] = disCharge
            tableDataItem[incomeKey] = income
            tableDataItem[idKey] = idKey
            tableDataItem[nameKey] = device
            return tableDataItem
        },
    })
}

function renderer(renderChart: (oprions: EChartsOption) => Promise<EChartsType>) {
    return async (incomeData: IncomeReport[]) => {
        const { unit, series } = processChartData(incomeData)
        await nextTick()
        renderChart({
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
            series
        })

    }
}

function processChartData(incomeData: IncomeReport[]) {

    incomeData.reverse()
    const group = arrayGroupByMap(incomeData, 'name')
    const incomes: number[] = []
    const series: any[] = []
    group.forEach((value) => incomes.push(...value.map(item => +item.income)))
    const { zoomLimit, unit } = getPriceZoomRationAndUnit(incomes)

    group.forEach((value, key) => {
        const data = value.map(({ income, times }) => [times, +income / zoomLimit])
        series.push({
            name: key,
            type: 'bar',
            data,
            barMaxWidth: 20
        })
    })
    return {
        unit,
        series
    }
}

