import { useAppData } from '@/store'
import { reactive, provide } from 'vue'
import { InjectionKey, watch } from 'vue'
import { useReactiveHttp } from '@/hooks'
import { getDeviceInfo, getUnitGroupList } from '@/API'
import { getFirstElement, isFalse, isTrue, replaceUrlQuery, urlQueryToObject } from '@/utils'


type DeviceDetailContextKey = {

    /** 设备id */
    unitId: string,

    /** 设备资产id */
    assetSerial: string,

    /** 设备状态 */
    deviceState: number,

    /** 当前查看的设备名 */
    deviceName: string,

    /** 当前查看的设备下的储能单元id */
    storageUnitId: string,

}

/** 注入key */
export const deviceDetailContextKey: InjectionKey<DeviceDetailContextKey> = Symbol('deviceDetialContext')

const appData = useAppData()


export function useDeviceDetail () {

    const deviceDetialContext = reactive({
        deviceState: urlQueryToObject()?.state as any,
        unitId: urlQueryToObject()?.unitId,
        assetSerial: '',
        deviceName: '',
        storageUnitId: '',
    })

    const { groupUnitList, loading, getGroupUnitList, groupClick } = useUnitList(deviceDetialContext)

    const { deviceBaseInfo, deviceBaseInfoLoading, getDeviceBaseInfo } = useDeviceBaseInfo(deviceDetialContext)
    
    const getDeviceData = async () => {
        await getGroupUnitList()
        getDeviceBaseInfo()
    }

    getDeviceData()

    provide(deviceDetailContextKey, deviceDetialContext)

    watch(() => appData.currentParkSerial, () => {
        deviceDetialContext.unitId = ''
        getDeviceData()
    })

    watch(() => deviceDetialContext.unitId,(value) => {
        isTrue(value) && getDeviceBaseInfo()
    })

    return {
        appData,
        deviceDetialContext,
        groupUnitList,
        deviceBaseInfo,
        deviceBaseInfoLoading,
        loading,
        groupClick,
    }
}



function useUnitList (deviceDetialContext: DeviceDetailContextKey) {

    const { result: groupUnitList, loading, getResult: getGroupUnitList } = useReactiveHttp({
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
            console.log(deviceDetialContext.unitId);
            if ( isFalse(deviceDetialContext.unitId) ) {
                console.log(deviceDetialContext.unitId);
                deviceDetialContext.unitId = id
            }
            if (id == deviceDetialContext.unitId) {
                deviceDetialContext.deviceName = `${parentName}#${name}`
            }
        }))
        return deviceName
    }

    const groupClick = (unit: UnitListData) => {

        deviceDetialContext.assetSerial = unit.assetSerial

        deviceDetialContext.unitId = unit.id + ''

        deviceDetialContext.deviceName = `${unit.parentName}#${unit.name}` 

        const oldParams = urlQueryToObject()

        const urlParams = { ...oldParams, unitId: unit.id, state: deviceDetialContext.deviceState } as DeviceDetailNewTapUrlParam

        replaceUrlQuery(urlParams)

    }


    return {
        getGroupUnitList,
        groupUnitList,
        loading,
        groupClick
    }
}


function useDeviceBaseInfo (deviceDetialContext: DeviceDetailContextKey) {

    const { result: deviceBaseInfo, getResult: getDeviceBaseInfo, loading } = useReactiveHttp({
        initData: { deviceMap: {}, E: [] as any } as DeviceInfoData,
        request: () => getDeviceInfo({ stationSerial: appData.currentParkSerial, type: 'E', unitId: deviceDetialContext.unitId }),
        requestCallback: (res) => {
            deviceDetialContext.deviceState = res.data.deviceMap.M2
            const storageUnitId = getFirstElement(res.data.E as StoreageUnit []).id as any
            deviceDetialContext.storageUnitId = storageUnitId
            return res.data
        }
    })

    return {
        deviceBaseInfo,
        getDeviceBaseInfo,
        deviceBaseInfoLoading: loading,
    }
}