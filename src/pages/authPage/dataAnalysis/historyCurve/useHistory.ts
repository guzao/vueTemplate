import { useAppData } from '@/store'
import { reactive, ref, nextTick, watch } from 'vue'
import { useDownload, useFormInstance } from "@/hooks"
import { getHistoryChart, historyDataExport } from '@/API'
import { arrayIsNotEmpty, hasError, parserTime, subtractDate } from '@/utils'

import HistoryChart from './components/HistoryChart.vue'
import Selectmeasurement from './components/Selectmeasurement.vue'


export function useHistory() {

    const { form, rules, formInstance, validateForm, loading, HistoryChartRef, isEmpty, reloadChart, createParams } = useForm()

    const openState = ref(false)

    const SelectmeasurementRef = ref<InstanceType<typeof Selectmeasurement>>()

    const forceUpdate = () => {
        openState.value = true
        SelectmeasurementRef.value?.forceUpdate(form.selectedMeasurement)
    }

    const saveMetricModelList = () => {
        openState.value = false
        form.selectedMeasurement = SelectmeasurementRef.value?.selectedList as any
    }

    const deletMetricModel = (model: MetricModel) => form.selectedMeasurement = form.selectedMeasurement.filter(item => item.id != model.id)

    const { downloadFile, fileLoading } = useDownload({ downloadFn: () => historyDataExport(createParams()) })


    return {
        form,
        rules,
        isEmpty,
        loading,
        openState,
        forceUpdate,
        deletMetricModel,
        saveMetricModelList,
        formInstance,
        reloadChart,
        validateForm,
        SelectmeasurementRef,
        HistoryChartRef,
        downloadFile, 
        fileLoading
    }
}


function useForm() {

    const loading = ref(false)

    const isEmpty = ref(false)

    const HistoryChartRef = ref<InstanceType<typeof HistoryChart>>()

    const appData = useAppData()

    const form = reactive({
        date: [subtractDate(appData.currentLastTime, 1), appData.currentLastTime],
        selectedMeasurement: [] as MetricModel[]
    })

    const rules = {
        date: [{ required: true, message: '请选择时间范围', trigger: 'blur' }],
        selectedMeasurement: [{ required: true, message: '请选择测点', trigger: 'blur', type: 'array', }],
    }

    const { formInstance, validate } = useFormInstance()

    const validateForm = async () => {
        await validate()
        loading.value = true
        const params = createParams()
        getHistoryChart(params).then(async res => {
            loading.value = false
            if (hasError(res)) return
            isEmpty.value = arrayIsNotEmpty(res.data)
            await nextTick()
            HistoryChartRef.value?.renderer(res.data)
        }).catch(err => loading.value = false)
    }

    const createParams = () => {
        const { date: [start, end], selectedMeasurement } = form
        const points = selectedMeasurement.map(({ gruopTag, gruopName, serial }) => ({ devCode: gruopTag.replace(`.${serial}`, ''), name: gruopName, point: serial }))
        return {
            startTime: parserTime(start, 'YYYY-MM-DD HH:mm:ss'),
            endTime: parserTime(end, 'YYYY-MM-DD HH:mm:ss'),
            stationSerial: appData.currentParkSerial,
            points
        }
    }

    const reloadChart = () => {
        form.selectedMeasurement.length = 0
        isEmpty.value = false
    }

    watch(() => appData.currentParkSerial, reloadChart)

    return {
        form,
        rules,
        formInstance,
        validateForm,
        reloadChart,
        appData,
        loading,
        isEmpty,
        HistoryChartRef,
        createParams
    }

}