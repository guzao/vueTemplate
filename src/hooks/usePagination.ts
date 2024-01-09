import { pageSizes }  from '@/utils'
import { reactive, watch } from 'vue'

type UsePaginationParams = {
    total?: number;
    pageNum?: number;
    pageSize?: number;
    callback: () => any
}

export function usePagination ({ pageNum = 1, pageSize = 10, callback, total}: UsePaginationParams) {
    
    const pageParams = reactive({
        total: total || 0,
        pageNum: pageNum || 1,
        pageSize: pageSize || 10,
    })

    watch(() => pageParams.pageNum, () => {
        callback && callback()
    })

    watch(() => pageParams.pageSize, () => {
        pageParams.pageNum = 1
        callback && callback()
    })

    const resteParams = () => {
        pageParams.pageNum = pageNum
        pageParams.pageSize = pageSize
    }
        
    const currentChange = (page: number) => pageParams.pageNum = page

    return {
        pageParams,
        resteParams,
        currentChange,
        /** 每一页多少条数据 */
        pageSizes
    }
    
}


type UsePaginationParams_ = {
    total?: number;
    pageNum?: number;
    pageSize?: number;
    callback: () => any,
}

export function usePagination_ (params: UsePaginationParams_) {
    
}