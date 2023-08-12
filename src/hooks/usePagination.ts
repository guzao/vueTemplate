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
        pageParams.pageNum = 1
        pageParams.pageSize = pageSize
    }

    return {
        pageParams,
        resteParams
    }
    
}