import { reactive, computed, Ref, watch } from 'vue'
import { arrayChunk } from '@/utils'

type LocalPagnationConfig = {
    /** 页数 */
    page: number,
    /** 每页多少条 */
    pageSize: number,
}

/**
 * @param raw 需要分页的数据
 * @param config 分页参数
*/
export function useLocalPagnation<T>(raw: Ref<T[]>, config: LocalPagnationConfig) {

    const { page = 1, pageSize = 10 } = config

    /** 分页参数 */
    const pageParams = reactive({
        page: page,
        pageSize: pageSize
    })

    /** 缓存分页的数据 */
    let chunks: T[][] = []

    /** 分页后的数据 */
    const currentPageData = computed(() => {
        // hack 收集依赖
        raw.value
        return chunks[pageParams.page - 1] || []
    })

    /** 初始化分页 */
    const initArrayChunk = () => {
        pageParams.page = 1
        chunks = arrayChunk(raw.value, pageParams.pageSize)
    }

    const currentChange = (page: number) => pageParams.page = page

    // 数据变化立即初始分组
    watch(() => raw.value, initArrayChunk)

    return {
        /** 分页后的数据 */
        currentPageData,
        /** 分页参数 */
        pageParams,
        /** 初始化分页 */
        initArrayChunk,
        
        currentChange
    }

}

