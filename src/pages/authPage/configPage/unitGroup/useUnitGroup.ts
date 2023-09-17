import { useAppData } from '@/store'
import { getUnitGroup } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { ref, provide, InjectionKey } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import UnitForm from './components//UnitForm.vue'
import GroupForm from './components/GroupForm.vue'


export const GroupUnitContextKey:InjectionKey<{
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
        initData: [] as UnitGroupData [],
        request: () => getUnitGroup({
            pageNum: 1,
            pageSize: 1000,
            stationSerial: appData.currentParkSerial
        }),
        requestCallback: ( res ) =>  res.rows
    })

    console.log(unitGroupList);

    const tableData = [
        {
            date: '2016-05-03',
            name: 'Tom',
            state: 'California',
            city: 'San Francisco',
            address: '3650 21st St, San Francisco',
            zip: 'CA 94114',
            family: [
                {
                    name: 'Jerry',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Spike',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Tyke',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
            ],
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            state: 'California',
            city: 'San Francisco',
            address: '3650 21st St, San Francisco',
            zip: 'CA 94114',
            family: [
                {
                    name: 'Jerry',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Spike',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Tyke',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
            ],
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            state: 'California',
            city: 'San Francisco',
            address: '3650 21st St, San Francisco',
            zip: 'CA 94114',
            family: [
                {
                    name: 'Jerry',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Spike',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Tyke',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
            ],
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            state: 'California',
            city: 'San Francisco',
            address: '3650 21st St, San Francisco',
            zip: 'CA 94114',
            family: [
                {
                    name: 'Jerry',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Spike',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Tyke',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
            ],
        },
        {
            date: '2016-05-08',
            name: 'Tom',
            state: 'California',
            city: 'San Francisco',
            address: '3650 21st St, San Francisco',
            zip: 'CA 94114',
            family: [
                {
                    name: 'Jerry',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Spike',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Tyke',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
            ],
        },
        {
            date: '2016-05-06',
            name: 'Tom',
            state: 'California',
            city: 'San Francisco',
            address: '3650 21st St, San Francisco',
            zip: 'CA 94114',
            family: [
                {
                    name: 'Jerry',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Spike',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Tyke',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
            ],
        },
        {
            date: '2016-05-07',
            name: 'Tom',
            state: 'California',
            city: 'San Francisco',
            address: '3650 21st St, San Francisco',
            zip: 'CA 94114',
            family: [
                {
                    name: 'Jerry',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Spike',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
                {
                    name: 'Tyke',
                    state: 'California',
                    city: 'San Francisco',
                    address: '3650 21st St, San Francisco',
                    zip: 'CA 94114',
                },
            ],
        },
    ]

    return {
        route,
        router,
        groupInstance,
        groupDrawerOpen,
        unitInstance,
        unitDrawerOpen,
        tableData
    }

}