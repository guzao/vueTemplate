import { getDeviceInfo } from '@/API'
import { useAppData } from '@/store'
import { InjectionKey, watch } from 'vue'
import { reactive, provide } from 'vue'
import { getFirstElement, urlQueryToObject } from '@/utils'
import { useReactiveHttp } from '@/hooks'


/** 注入key */
export const deviceDetailContextKey: InjectionKey<{

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

    /** 更新设备id */
    updateUnitId: (id: string) => void,

    /** 更新设备状态 */
    updateDeviceState: (id: number) => void,

    /** 更新设备状态 */
    updateAssetSerial: (id: string) => void,

    /** 更新当前查看的设备名 */
    updateDeviceName: (name: string) => void,

    /** 更新当前查看的设备下的储能单元id */
    updateStorageUnitId: (name: string) => void,

}> = Symbol('deviceDetialContext')




export function useDeviceDetialContext() {

    const updateUnitId = (id: string) => deviceDetialContext.unitId = id

    const updateDeviceState = (state: number) => deviceDetialContext.deviceState = state

    const updateAssetSerial = (assetSerial: string) => deviceDetialContext.assetSerial = assetSerial

    const updateDeviceName = (name: string) => deviceDetialContext.deviceName = name
    
    const updateStorageUnitId = (storageUnitId: string) => deviceDetialContext.storageUnitId = storageUnitId

    const deviceDetialContext = reactive({
        deviceState: urlQueryToObject()?.state as any,
        unitId: urlQueryToObject()?.unitId,
        assetSerial: '',
        deviceName: '',
        storageUnitId: '',
        updateUnitId,
        updateDeviceState,
        updateAssetSerial,
        updateDeviceName,
        updateStorageUnitId
    })


    const appData = useAppData()

    const { result: deviceBaseInfo, getResult: getDeviceBaseInfo, loading } = useReactiveHttp({
        initData: { deviceMap: {}, E: [] as any } as DeviceInfoData,
        request: () => getDeviceInfo({ stationSerial: appData.currentParkSerial, type: 'E', unitId: deviceDetialContext.unitId }),
        requestCallback: (res) => {
            updateDeviceState(res.data.deviceMap.M2)

            const storageUnitId = getFirstElement(res.data.E as StoreageUnit []).id as any
            updateStorageUnitId(storageUnitId)
            return res.data
        }
    })

    watch(() => deviceDetialContext.unitId, () => getDeviceBaseInfo())

    provide(deviceDetailContextKey, deviceDetialContext)

    return {
        deviceDetialContext,
        deviceBaseInfo,
        getDeviceBaseInfo,
        loading
    }

}

