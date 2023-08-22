import { reactive } from 'vue'
import { useDicts } from '@/store'
import { getLogininforList } from '@/API'
import { useReactiveHttp, usePagination } from '@/hooks'



export function useLogininfor () {

    const searchForm = reactive({
        ipaddr: '',
        userName: '',
        status: '',
    }) 

    const dicts = useDicts()

    const { pageParams } = usePagination({ callback: () => getResult(), pageSize: 20 })
    
    const currentChange = (page: number) => pageParams.pageNum = page
    
    const { result, loading, getResult } = useReactiveHttp({
        initData: [] as Logininfor[],
        request: () => getLogininforList({ ...pageParams, ...searchForm }),
        requestCallback: (res) => {
            pageParams.total = res.total
            return res.rows
        }
    })

    return {
        dicts,
        pageParams,
        currentChange,
        result,
        loading,
        getResult,
        searchForm
    }

}