import type { Ref } from 'vue'
import { isTrue } from '@/utils'
import { ref, computed } from 'vue'


/**
 * 展示更多
 * @param data 元数据
 * @param limit 初始看几条
*/
export function useHasShowMoreData<T>(data: Ref<T[]>, limit: number) {

    const showMore = ref(false)

    const limitDataList = computed(() => isTrue(showMore.value) ? data.value : data.value.slice(0, limit))

    const toggleShowMore = () => showMore.value = !showMore.value

    return {
        /** 是否展示更多 */
        showMore,
        /** 展示的数据 */
        limitDataList,
        /** 切换是否展示更多的状态 */
        toggleShowMore
    }

}