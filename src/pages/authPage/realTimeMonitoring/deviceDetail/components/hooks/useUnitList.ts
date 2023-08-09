import { inject } from 'vue'
import { useAppData } from '@/store'
import { useReactiveHttp } from '@/hooks'
import { getUnitGroupList } from '@/API'
import { deviceDetailContextKey } from '../../useDevice'
import { replaceUrlQuery, urlQueryToObject } from '@/utils'


export function useUnitGroup() {

    const appData = useAppData()

    const { result: groupUnitList, loading } = useReactiveHttp({
        initData: [] as GroupList[],
        request: () => getUnitGroupList({ stationSerial: appData.currentParkSerial }),
        requestCallback: ({ data }) => {
            addParentName(data)
            findInitDeviceName(data)
            return data
        },
    })

    const addParentName = (data: GroupList[]) => data.forEach(({ name, eosUnitList }) => eosUnitList.forEach(unit => unit.parentName = name))

    const findInitDeviceName = (data: GroupList[]) => {
        let deviceName = ''
        data.forEach(({ eosUnitList }) => eosUnitList.forEach(({ id, parentName, name }) => {
            if (id == deviceDetail?.unitId) {
                deviceDetail.updateDeviceName( `${parentName}#${name}` )
            }
        }))
        return deviceName
    }

    const deviceDetail = inject(deviceDetailContextKey)

    const groupClick = (unit: UnitListData) => {

        deviceDetail?.updateAssetSerial(unit.assetSerial)

        deviceDetail?.updateUnitId(unit.id + '')

        deviceDetail?.updateDeviceName( `${unit.parentName}#${unit.name}` )

        const oldParams = urlQueryToObject()

        const urlParams = { ...oldParams, unitId: unit.id } as DeviceDetailNewTapUrlParam

        replaceUrlQuery(urlParams)

    }

    return {
        groupUnitList,
        loading,
        deviceDetail,
        groupClick
    }

}

