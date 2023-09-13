
import { ref } from 'vue'
import { describe, test, expect } from 'vitest'
import { useSelectAll } from '@/hooks/useSelectAll'


describe('useSelectAll', () => {


    const devices = ref([
        { id: 1, name: 'PCS' },
        { id: 2, name: 'BMS' },
        { id: 3, name: 'EMS' },
    ])

    const { resetSelectAll, checkAll, checkedIds, isIndeterminate, handleCheckAllChange, handleCheckedIdsChange  } = useSelectAll(devices, 'id')

    test('resetSelectAll', () => {

        handleCheckedIdsChange([1, 2, 3] as any)
        resetSelectAll()
        expect(checkAll.value).toBe(false)
        expect(checkedIds.value).toEqual([])
        expect(isIndeterminate.value).toBe(false)

    })

    test('handleCheckAllChange', () => {
        resetSelectAll()

        handleCheckAllChange(true)
        expect(checkAll.value).toBe(true)
        expect(isIndeterminate.value).toBe(false)
        expect(checkedIds.value).toEqual([1, 2, 3])

        handleCheckAllChange(false)
        expect(checkAll.value).toBe(false)
        expect(checkedIds.value).toEqual([])

    })

    test('handleCheckedIdsChange', () => {
        resetSelectAll()

        handleCheckedIdsChange([1] as any)
        expect(checkAll.value).toBe(false)
        expect(checkedIds.value).toEqual([1])
        expect(isIndeterminate.value).toBe(true)

        resetSelectAll()
        handleCheckedIdsChange([1, 2, 3] as any)
        expect(checkAll.value).toBe(true)
        expect(checkedIds.value).toEqual([1, 2, 3])
        expect(isIndeterminate.value).toBe(false)

    })


})

