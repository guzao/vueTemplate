import { getPrevMonth } from '@/utils'
import { getWarningByLevel } from '@/API'
import { useAppData, useDicts } from '@/store'
import { renderLine, renderPie } from './tools'
import { ref, reactive, watch, nextTick } from 'vue'
import { dateFormatterType } from '../../parkReport/tools'
import { paserTime, generateDnamicTableData } from '@/utils'
import { useSelectAll, useEcharts, useReactiveHttp, useLocalPagnation, useFormInstance } from '@/hooks'


export function useWarningLevel() {

    const dicts = useDicts()
    
    const appdata = useAppData()

    const { formInstance, validate } = useFormInstance()

    const { chartRef, renderChart } = useEcharts()

    const { chartRef: pieChartRef, renderChart: renderPieChart } = useEcharts()

    const { isIndeterminate, handleCheckAllChange, handleCheckedIdsChange, checkAll, checkedIds } = useSelectAll(dicts.warningLevelDict.dictValue, 'dictValue')

    const form = reactive({
        warnStatus: '1',
        dataCycle: 'D',
        levels: checkedIds,
        date: [getPrevMonth(new Date(), 1), new Date()],
    })

    const rules = reactive({
        levels: [ { required: true, message: 'Please input Activity name', trigger: 'blur' }],
    })

    const createParams = () => {
        const { date, dataCycle, levels, warnStatus } = form
        const [startTime, endTime] = date
        let formatterTag = dateFormatterType[dataCycle as any] || 'YYYY-MM-DD'
        return {
            startTime: paserTime(startTime, formatterTag as any),
            endTime: paserTime(endTime, formatterTag as any),
            stationSerial: appdata.currentParkSerial,
            dataCycle: dataCycle as any,
            warnStatus,
            levels
        }
    }

    const tableHeader = ref<DnamicTableDataHeaderData[]>([])

    const { result: warning, getResult: getWarning, loading } = useReactiveHttp({
        initData: [] as WarningLevel[],
        request: () => getWarningByLevel(createParams()),
        requestCallback: (res) => {
            const data = res.data as WarningLevel[]
            markData(data)
            const { tableData, headerData } = processData(data)
            tableHeader.value = headerData
            nextTick(() => {
                renderLine(renderChart, data, 'subLevel')
                renderPie(renderPieChart, data, 'subLevel')
            })
            return tableData
        },
        Immediately: false
    })

    const markData = (data: WarningLevel[]) => {
        data.forEach((warning) =>  warning.subLevel = dicts.warningLevelDict.dictLabel[warning.level])
        data.sort((a, b) => +new Date(a.time) - +new Date(b.time))
    }

    const { currentPageData, pageParams } = useLocalPagnation(warning, { pageSize: 10, page: 1 })

    const currentChange = (page: number) => pageParams.page = page

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

const processData = (warning: WarningLevel[]) => {
    return generateDnamicTableData(warning, {
        key: 'time',
        splitSymbol: '$',
        processTableRowData(item, splitSymbol) {
            const tableDataItem = {} as Record<string, any>
            const { count, time, name, level, subLevel } = item
            const countKey = `count_${level}`
            const nameKey = `${subLevel}${splitSymbol}${level}`
            tableDataItem[countKey] = count
            tableDataItem[nameKey] = name
            tableDataItem.time = time
            return tableDataItem
        },
    })
}
