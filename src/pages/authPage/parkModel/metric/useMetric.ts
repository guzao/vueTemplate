import { convertBoolean } from '@/utils'
import { getMetricModelList } from '@/API'
import { reactive, ref, computed } from 'vue'
import { useReactiveHttp, usePagination } from '@/hooks'

export function useMetric() {


    /** 表单状态 */
    const drawerState = ref(false)

    /** 表单参数 */
    const metricModelForm = ref(initMetricModelForm())

    const isEdit = computed(() => convertBoolean(metricModelForm.value.id))

    const { params, pageParams, resteParams, pageSizes, result, getResult, loading } = useGetMetricModelList()

    const editMetric = (data: MetricModel) => {
        metricModelForm.value = data
        drawerState.value = true
    }

    const addMetric = () => {
        metricModelForm.value = initMetricModelForm()
        drawerState.value = true
    }

    return {
        result,
        getResult,
        loading,
        pageParams,
        resteParams,
        pageSizes,
        metricModelForm,
        params,
        drawerState,
        isEdit,
        editMetric,
        addMetric,
    }

}



function useGetMetricModelList() {

    /** 查询参数 */
    const params = useParams()

    const { pageParams, resteParams, pageSizes } = usePagination({ pageNum: 1, pageSize: 10, callback: () => getResult() })

    const { result, getResult, loading } = useReactiveHttp({
        initData: [] as MetricModel[],
        request: () => getMetricModelList({ ...pageParams, ...params }),
        requestCallback: ({ rows, total }) => {
            pageParams.total = total
            return rows
        }
    })

    return {
        params,
        pageParams,
        resteParams,
        pageSizes,
        result,
        getResult,
        loading
    }
}


function useParams() {
    return reactive({
        category: '',
        nameCn: '',
        nameEn: '',
        serial: '',
        variable: '',
        signalType: '',
        eventType: '',
        type: '',
        dataType: '',
        precise: '',
        groupTags: '',
        industryTag: '',
    }) as MetricModel
}


const initMetricModelForm = () => {
    return {
        createTime: '',
        updateTime: '',
        remark: '',
        id: 0,
        category: '',
        nameCn: '',
        nameEn: '',
        serial: '',
        variable: '',
        signalType: '',
        eventType: '',
        type: '',
        dataType: '',
        factor: 0,
        offset: 0,
        precise: '',
        showUser: '',
        sort: 0,
        groupTags: '',
        industryTag: '',
        delFlag: 0
    }
}
