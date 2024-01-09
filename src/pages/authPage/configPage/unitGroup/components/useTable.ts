import { getGroupUnitList } from '@/API'
import { inject, reactive, ref, watch } from 'vue'
import { useReactiveHttp, useReactiveHttp_ } from '@/hooks'
import { GroupUnitContextKey } from '../useUnitGroup'

export function useTable(props: { readonly tableData?: UnitGroupData[] | undefined }) {

    const { getResult, ugroupId, tableDataMap, expandChange } = useTableItemData(props)

    const { editGroup, addGroup, deletGroup, editUint, addUint, deltUint } = useEdit()

    return {
        editGroup,
        addGroup,
        deletGroup,
        editUint,
        addUint,
        deltUint,
        expandChange,
        tableDataMap,
    }

}

function useTableItemData(props: { readonly tableData?: UnitGroupData[] | undefined }) {

    const ugroupId = ref<number>(0)

    const tableDataMap = reactive<Record<number, {
        /** 储能单元组 */
        data: GroupUnitData[],
        /** 储能单元组加载状态 */
        loading: boolean
    }>>({})

    const initData = () => {
        props.tableData?.forEach(item => {
            tableDataMap[item.id] = {
                data: [],
                loading: false
            }
        })
    }

    watch(() => props.tableData, initData)

    const [, getResult] = useReactiveHttp_({
        initData: [] as GroupUnitData[],
        request: () => getGroupUnitList({ ugroupId: ugroupId.value }),
        requestCallback: ({ rows }) => {
            tableDataMap[ugroupId.value].data = rows
            tableDataMap[ugroupId.value].loading = false
        },
        Immediately: false
    })

    const expandChange = (row: UnitGroupData) => {
        ugroupId.value = row.id
        tableDataMap[ugroupId.value].loading = true
        getResult()
    }

    return {
        ugroupId,
        tableDataMap,
        getResult,
        expandChange
    }
}

function useEdit() {

    const groupUnitContext = inject(GroupUnitContextKey)!

    const editGroup = () => {
        console.log('editGroup');
        groupUnitContext.groupDrawerOpen()
    }

    const addGroup = () => { }

    const deletGroup = () => {
        console.log('deletGroup');
    }

    const editUint = () => {
        groupUnitContext.unitDrawerOpen()
    }

    const addUint = () => {
        groupUnitContext.unitDrawerOpen()
    }

    const deltUint = () => { }

    return {
        editGroup,
        addGroup,
        deletGroup,
        editUint,
        addUint,
        deltUint
    }
}