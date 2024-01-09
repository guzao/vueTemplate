import { useAppData } from '@/store'
import { getUnitGroup } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { ref, provide, InjectionKey } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import UnitForm from './components//UnitForm.vue'
import GroupForm from './components/GroupForm.vue'


export const GroupUnitContextKey: InjectionKey<{
    groupDrawerOpen: () => boolean | undefined,
    unitDrawerOpen: () => boolean | undefined,
}> = Symbol('GroupUnitContextKey')

export function useUnitGroup() {

    const route = useRoute()
    const router = useRouter()
    const appData = useAppData()

    const groupInstance = ref<InstanceType<typeof GroupForm>>()
    const groupDrawerOpen = () => groupInstance.value?.drawerOpen()

    const unitInstance = ref<InstanceType<typeof UnitForm>>()
    const unitDrawerOpen = () => unitInstance.value?.drawerOpen()

    provide(GroupUnitContextKey, {
        groupDrawerOpen,
        unitDrawerOpen
    })

    const { result: unitGroupList, getResult, loading } = useReactiveHttp({
        initData: [] as UnitGroupData[],
        request: () => getUnitGroup({
            pageNum: 1,
            pageSize: 1000,
            stationSerial: route.query.eidtCode
        }),
        requestCallback: ({ rows }) => rows
    })

    return {
        route,
        router,
        groupInstance,
        groupDrawerOpen,
        unitInstance,
        unitDrawerOpen,
        unitGroupList,
        loading,
        appData,
    }

}