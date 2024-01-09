import { useAppData } from '@/store'
import { getDeviceInfo } from '@/API'
import { reactive, provide, ref, computed, InjectionKey, watch } from 'vue'
import { useReactiveHttp, useTitle } from '@/hooks'
import { getFirstElement, urlQueryToObject } from '@/utils'

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
        /** 设备状态 */
        deviceState: urlQueryToObject()?.state as any,
        /** 设备id */
        unitId: urlQueryToObject()?.unitId,
        /** 设备资产id */
        assetSerial: '',
        /** 当前查看的设备名 */
        deviceName: '',
        /** 当前查看的设备下的储能单元id */
        storageUnitId: '',
        
        updateUnitId,
        updateDeviceState,
        updateAssetSerial,
        updateDeviceName,
        updateStorageUnitId
    })

    const documentTitle = computed(() => `${import.meta.env.VITE_APP_TITLE}-${deviceDetialContext.deviceName}`)

    useTitle(documentTitle)

    const appData = useAppData()

    const { result: deviceBaseInfo, getResult: getDeviceBaseInfo, loading } = useReactiveHttp({
        initData: { deviceMap: {}, E: [] as any } as DeviceInfoData,
        request: () => getDeviceInfo({ stationSerial: appData.currentParkSerial, type: 'E', unitId: deviceDetialContext.unitId }),
        requestCallback: (res) => {
            updateDeviceState(res.data.deviceMap.M2)

            const storageUnitId = getFirstElement(res.data.E as StoreageUnit[]).id as any
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
        loading,
        appData
    }

}

