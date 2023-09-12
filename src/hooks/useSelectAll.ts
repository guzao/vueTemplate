import { ref, unref } from "vue";
import type { MaybeRef, Ref } from "vue";


export function useSelectAll<T>(raw: MaybeRef<T[]>, key: keyof T) {

    type SelectIdKey = typeof key

    const checkAll = ref(false)

    const isIndeterminate = ref(false)

    const checkedIds = ref<SelectIdKey[]>([])

    const handleCheckAllChange = (val: boolean) => {
        checkedIds.value = val ? unref(raw).map(item => item[key]) : [] as any
        isIndeterminate.value = false
    }

    const handleCheckedIdsChange = (value: SelectIdKey[]) => {
        const checkedCount = value.length
        checkAll.value = checkedCount === unref(raw).length
        isIndeterminate.value = checkedCount > 0 && checkedCount < unref(raw).length
    }

    const resetSelectAll = () => {
        checkAll.value = false
        isIndeterminate.value = false
        checkedIds.value = []
    }

    return {
        /** 全选状态 */
        checkAll,
        /** 选中的id */
        checkedIds,
        /** 是否是半选状态 */
        isIndeterminate,
        /** 全选状态事件 */
        handleCheckAllChange,
        /** 选中的id事件 */
        handleCheckedIdsChange,
        /** 重置选中状态 */
        resetSelectAll
    }

}


export function useSelectAll_ <T> (raw: Ref<T[]>,  key: keyof T) {

    type SelectIdKey = typeof key

    const checkAll = ref(false)

    const isIndeterminate = ref(false)

    const checkedIds = ref<SelectIdKey[]>([])

    const handleCheckAllChange = (val: boolean) => {
        checkedIds.value = val ? unref(raw).map(item => item[key]) : [] as any
        isIndeterminate.value = false
    }

    const handleCheckedIdsChange = (value: SelectIdKey[]) => {
        const checkedCount = value.length
        checkAll.value = checkedCount === unref(raw).length
        isIndeterminate.value = checkedCount > 0 && checkedCount < unref(raw).length
    }

    const resetSelectAll = () => {
        checkAll.value = false
        isIndeterminate.value = false
        checkedIds.value = []
    }

    return {
        checkAll,
        checkedIds,
        isIndeterminate,
        
        resetSelectAll,
        handleCheckAllChange,
        handleCheckedIdsChange
    }


}