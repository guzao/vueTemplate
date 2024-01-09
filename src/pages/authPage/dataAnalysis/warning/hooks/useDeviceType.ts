import { useAppData, useDicts } from '@/store'
import { getWarningBydeviceType } from '@/API'
import { renderLine, renderPie } from './tools'
import { ref, reactive, watch, nextTick } from 'vue'
import { parserTime, generateDnamicTableData, dateFormatterType, getPrevMonth, sleep } from '@/utils'
import { useSelectAll, useEcharts, useReactiveHttp, useLocalPagnation, useFormInstance } from '@/hooks'

export function useDeviceType() {

    const { dicts, formInstance, isIndeterminate, handleCheckAllChange, handleCheckedIdsChange, checkAll, checkedIds, validate, createParams, rules, appdata, form } = useFormData()

    const { chartRef, pieChartRef, tableHeader, warning, getWarning, loading, currentPageData, currentChange, pageParams } = useTableAndChart(createParams)

    const validateForm = async () => {
        try {
            await validate()
            getWarning()
        } catch (error) {
            console.log('===');
        }
    }

    watch(() => appdata.currentParkSerial, validateForm)

    watch(() => form.warnStatus, validateForm)

    return {
        currentPageData,
        pageParams,
        form,
        rules,
        chartRef,
        pieChartRef,
        handleCheckAllChange,
        handleCheckedIdsChange,
        checkAll,
        checkedIds,
        warning,
        isIndeterminate,
        loading,
        tableHeader,
        currentChange,
        getWarning,
        dicts,
        formInstance,
        validateForm
    }

}

function useFormData() {

    const dicts = useDicts()

    const appdata = useAppData()

    const { formInstance, validate } = useFormInstance()

    const { isIndeterminate, handleCheckAllChange, handleCheckedIdsChange, checkAll, checkedIds } = useSelectAll(dicts.deviceTypeDict.dictValue, 'dictValue')

    const form = reactive({
        warnStatus: '1',
        dataCycle: 'D',
        deviceTypes: checkedIds,
        date: [getPrevMonth(new Date(), 1), new Date()],
    })

    const rules = reactive({
        deviceTypes: [{ required: true, message: 'Please input Activity name', trigger: 'blur' }],
    })

    const createParams = () => {
        const { date, dataCycle, deviceTypes, warnStatus } = form
        const [startTime, endTime] = date
        let formatterTag = dateFormatterType[dataCycle as any] || 'YYYY-MM-DD'
        return {
            startTime: parserTime(startTime, formatterTag as any),
            endTime: parserTime(endTime, formatterTag as any),
            stationSerial: appdata.currentParkSerial,
            dataCycle: dataCycle as any,
            warnStatus,
            deviceTypes
        }
    }
    return {
        dicts,
        formInstance,
        isIndeterminate,
        handleCheckAllChange,
        handleCheckedIdsChange,
        checkAll,
        checkedIds,
        validate,
        createParams,
        rules,
        appdata,
        form
    }
}

function useTableAndChart(createParams: any,) {

    const dicts = useDicts()

    const { chartRef, renderChart, chartResize } = useEcharts()

    const { chartRef: pieChartRef, renderChart: renderPieChart, chartResize: pieChartResize } = useEcharts()

    const tableHeader = ref<DnamicTableDataHeaderData[]>([])

    const { result: warning, getResult: getWarning, loading } = useReactiveHttp({
        initData: [] as WarningData[],
        request: () => getWarningBydeviceType(createParams()),
        requestCallback: (res) => {
            const data = res.data as WarningData[]
            markData(data)
            const { tableData, headerData } = processData(data)
            tableHeader.value = headerData
            nextTick(async () => {
                renderLine(renderChart, data, 'subName')
                renderPie(renderPieChart, data, 'subName')
                await sleep(200)
                chartResize()
                pieChartResize()
            })
            return tableData
        },
        Immediately: false
    })

    const markData = (data: WarningData[]) => {
        data.forEach((warning) => {
            warning.subName = dicts.deviceTypeDict.dictLabel[warning.name]
            warning.subLevel = dicts.warningLevelDict.dictLabel[warning.level]
        })
        data.sort((a, b) => +new Date(a.time) - +new Date(b.time))
    }

    const { currentPageData, pageParams } = useLocalPagnation(warning, { pageSize: 10, page: 1 })

    const currentChange = (page: number) => pageParams.page = page

    return {
        chartRef,
        pieChartRef,
        tableHeader,
        warning,
        getWarning,
        loading,
        currentPageData,
        currentChange,
        pageParams
    }
}

const processData = (warning: WarningData[]) => {
    return generateDnamicTableData(warning, {
        key: 'time',
        splitSymbol: '$',
        processTableRowData(item, splitSymbol) {
            const tableDataItem = {} as Record<string, any>
            const { subName, count, time, name } = item
            const countKey = `count_${name}`
            const nameKey = `${subName}${splitSymbol}${name}`
            tableDataItem[countKey] = count
            tableDataItem[nameKey] = name
            tableDataItem.time = time
            return tableDataItem
        },
    })
}