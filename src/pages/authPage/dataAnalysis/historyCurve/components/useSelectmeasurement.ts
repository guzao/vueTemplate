import { useAppData } from '@/store'
import { useReactiveHttp_ } from '@/hooks'
import { TableInstance } from 'element-plus'
import { Ref, computed, ref, watch, nextTick, unref } from 'vue'
import { arrayIsEmpty, getArrayLength, getFirstElement, getLastElement } from '@/utils'
import { getUnitGroupList, getUnitList, getBindEnergyStorageUnit, getIntanceGroupAndMetric } from '@/API'


export function useSelectmeasurement() {

    const appData = useAppData()

    const searchKey = ref('')

    const parentId = ref<any>()

    const tableData = ref<MetricModel[]>([])

    const filteredTableData = computed(() => searchKey.value ? tableData.value.filter(item => item.nameCn?.includes(searchKey.value)) : tableData)

    const tableRef = ref<TableInstance>()

    const selectedList = ref<MetricModel[]>([])

    const rowClick = (value: MetricModel) => {
        const { toggleRowSelection, getSelectionRows} = tableRef.value!
        const isSlected = !(getSelectionRows() as  MetricModel[]).some(metric => metric.id == value.id)
        toggleRowSelection(value, isSlected)
    }

    const handleSelectionChange = (value: MetricModel[]) => selectedList.value = value

    const forceUpdate = async (value: MetricModel[]) => {
        await nextTick()
        selectedList.value = value
        toggleRowSelection(value)
    }

    const deletMetricModel = (model: MetricModel) => {
        selectedList.value = selectedList.value.filter(item => item.id != model.id)
        toggleRowSelection(selectedList.value)
    }

    const toggleRowSelection = (parentSelectedList: MetricModel[]) => {

        const { clearSelection, getSelectionRows, toggleRowSelection } = tableRef.value!
        if (arrayIsEmpty(parentSelectedList)) return clearSelection()

        // in  notChange   out Togger
        const parentSlectIds = parentSelectedList.map(item => item.id)
        //  selected not in parentList need togger
        const neddToggerList = (getSelectionRows() as MetricModel[]).filter(item => !parentSlectIds.includes(item.id))

        neddToggerList.forEach(item => toggleRowSelection(item, undefined as any))

    }

    /** 子站 */
    const { ugroupId, groupData, getGroupData, groupDataLoading } = useGroupData(appData, (value) => {
        resetAssetSerialData()
        resetUnitData()
        resetStackData()
        resetClusterData()
        resetPackData()
        resetCellData()
        tableData.value.length = 0
        if (getArrayLength(value) > 1) return
        if (arrayIsEmpty(value)) return
        parentId.value = getFirstElement(value)
        getAssetSerialData()
    })


    /** 资产 */
    const { assetSerial, assetSerialData, getAssetSerialData, assetSerialLoading, resetAssetSerialData } = useAssetSerialData(appData, ugroupId, (value) => {
        resetUnitData()
        resetStackData()
        resetClusterData()
        resetPackData()
        resetCellData()
        tableData.value.length = 0
        if (getArrayLength(value) > 1) return
        if (arrayIsEmpty(value)) return
        parentId.value = getFirstElement(value)
        getUnitData()
    })


    /** 储能单元 */
    const { unit, unitData, getUnitData, unitDataLoading, resetUnitData } = useUnitData(appData, assetSerial, (value) => {
        resetStackData()
        resetClusterData()
        resetPackData()
        resetCellData()
        tableData.value.length = 0
        if (getArrayLength(value) > 1) return
        if (arrayIsEmpty(value)) return
        parentId.value = getFirstElement(value)
        getStackData().then(res => addProps())
    })


    /** 电池堆 */
    const { stack, stackData, getStackData, stackDataLoading, resetStackData } = useStackData(parentId, (value) => {
        resetClusterData()
        resetPackData()
        resetCellData()
        tableData.value.length = 0
        if (getArrayLength(value) > 1) return
        if (arrayIsEmpty(value)) return
        parentId.value = getFirstElement(value)
        getClusterData().then(res => addProps())
    }, tableData)


    /** 电池簇 */
    const { cluster, clusterData, getClusterData, resetClusterData, clusterDataLoading } = useClusterData(parentId, (value) => {
        resetPackData()
        resetCellData()
        tableData.value.length = 0
        if (getArrayLength(value) > 1) return
        if (arrayIsEmpty(value)) return
        parentId.value = getFirstElement(value)
        getPackData().then(res => addProps())
    }, tableData)


    /** 插箱 */
    const { pack, packData, packDataLoading, resetPackData, getPackData } = usePackData(parentId, (value) => {
        resetCellData()
        tableData.value.length = 0
        if (getArrayLength(value) > 1) return
        if (arrayIsEmpty(value)) return
        parentId.value = getFirstElement(value)
        getCellData().then(res => addProps())
    }, tableData)


    /** 单体 */
    const { cell, cellData, cellDataLoading, getCellData, resetCellData } = useCellData(parentId, (value) => {
        tableData.value.length = 0
        if (getArrayLength(value) > 1) return
        if (arrayIsEmpty(value)) return
        parentId.value = getFirstElement(value)
        getCellData().then(res => addProps())
    }, tableData)


    watch(() => appData.currentParkSerial, () => {
        getGroupData()
        resetAssetSerialData()
        resetUnitData()
        resetStackData()
        resetClusterData()
        resetPackData()
        resetCellData()
        tableData.value.length = 0
        toggleRowSelection([])
    })


    const fullpath = computed(() => {
        return [
            getFirstElement(assetSerial.value), getFirstElement(unit.value), getFirstElement(stack.value),
            getFirstElement(cluster.value), getFirstElement(pack.value), getFirstElement(cell.value),
        ]
    })

    const getGruopTag = () => {
        return fullpath.value.filter(item => item).map((item, index) => {
            if (index == 0) return item
            if (index == 1) return unitData.value.find(it => it.id == item)!.serial
            if (index == 2) return stackData.value.find(it => it.id == item)!.serial
            if (index == 3) return clusterData.value.find(it => it.id == item)!.serial
            if (index == 4) return packData.value.find(it => it.id == item)!.serial
            if (index == 5) return cellData.value.find(it => it.id == item)!.serial
        }).join('.')
    }

    const getGruopName = () => {
        return fullpath.value.filter(item => item).map((item, index) => {
            if (index == 0) return assetSerialData.value.find(it => it.assetSerial == item)!.name
            if (index == 1) return unitData.value.find(it => it.id == item)!.name
            if (index == 2) return stackData.value.find(it => it.id == item)!.name
            if (index == 3) return clusterData.value.find(it => it.id == item)!.name
            if (index == 4) return packData.value.find(it => it.id == item)!.name
            if (index == 5) return cellData.value.find(it => it.id == item)!.name
        }).join('.')
    }

    const addProps = () => {
        const gruopTag = getGruopTag()
        const gruopName = getGruopName()
        tableData.value.forEach(item => {
            item.gruopTag = gruopTag
            item.gruopTagID = `${gruopTag}.${item.serial}`
            item.gruopName = `${gruopName}.${item.nameCn}`
        })
    }


    const clearSelectList = () => {
        selectedList.value.length = 0
        tableRef.value?.clearSelection()
    }

    const tableDataLoading = computed(() =>{
        return [ groupDataLoading.value, assetSerial.value, unitDataLoading.value, stackDataLoading.value, clusterDataLoading.value, packDataLoading.value, cellDataLoading.value ]
            .some(item => item == true)
    })

    return {
        tableRef,
        rowClick,
        tableData,
        forceUpdate,
        selectedList,
        clearSelectList,
        deletMetricModel,
        tableDataLoading,
        filteredTableData,
        handleSelectionChange,

        searchKey,
        parentId,

        groupData,
        ugroupId,
        groupDataLoading,

        assetSerial,
        assetSerialData,
        assetSerialLoading,

        unit,
        unitData,
        unitDataLoading,

        stack,
        stackData,
        stackDataLoading,

        cluster,
        clusterData,
        clusterDataLoading,

        pack,
        packData,
        packDataLoading,

        cell,
        cellData,
        cellDataLoading
    }

}


/** 子站 */
function useGroupData(appData: ReturnType<typeof useAppData>, changeCallback: (value: number[]) => void) {

    const ugroupId = ref<number[]>([])
    const [groupData, getGroupData, groupDataLoading] = useReactiveHttp_({
        initData: [] as GroupList[],
        request: () => getUnitGroupList({ stationSerial: appData.currentParkSerial }),
        requestCallback: res => res.data
    })

    watch(ugroupId, (newValue) => {
        if (arrayIsEmpty(newValue)) return changeCallback && changeCallback(newValue)
        if (getArrayLength(newValue) > 1) ugroupId.value = [getLastElement(newValue)]
        changeCallback && changeCallback(newValue)
    })

    return {
        ugroupId,
        groupData,
        getGroupData,
        groupDataLoading
    }

}


/** 资产 */
function useAssetSerialData(appData: ReturnType<typeof useAppData>, ugroupId: Ref<number[]>, changeCallback: (value: string[]) => void) {

    const assetSerial = ref<string[]>([])
    const [assetSerialData, getAssetSerialData, assetSerialLoading] = useReactiveHttp_({
        initData: [] as UnitListData[],
        request: () => getUnitList({ stationSerial: appData.currentParkSerial, pageSize: 1000, ugroupId: ugroupId.value.at(0) }),
        requestCallback: res => res.rows,
        Immediately: false
    })

    watch(assetSerial, (newValue) => {
        if (arrayIsEmpty(newValue)) return changeCallback && changeCallback(newValue)
        if (getArrayLength(newValue) > 1) assetSerial.value = [getLastElement(newValue)]
        changeCallback && changeCallback(newValue)
    })

    const resetAssetSerialData = () => {
        assetSerial.value.length = 0
        assetSerialData.value.length = 0
    }

    return {
        assetSerial,
        assetSerialData,
        getAssetSerialData,
        assetSerialLoading,
        resetAssetSerialData
    }

}


/** 单元组 */
function useUnitData(appData: ReturnType<typeof useAppData>, assetSerial: Ref<string[]>, changeCallback: (newValue: number[]) => void) {

    const unit = ref<number[]>([])
    const [unitData, getUnitData, unitDataLoading] = useReactiveHttp_({
        initData: [] as BindEnergyStorageUnit[],
        request: () => getBindEnergyStorageUnit({ stationSerial: appData.currentParkSerial, assetSerial: assetSerial.value.at(0) }),
        requestCallback: res => res.data,
        Immediately: false
    })

    watch(unit, (newValue) => {
        if (arrayIsEmpty(newValue)) return changeCallback && changeCallback(newValue)
        if (getArrayLength(newValue) > 1) unit.value = [getLastElement(newValue)]
        changeCallback && changeCallback(newValue)
    })

    const resetUnitData = () => {
        unit.value.length = 0
        unitData.value.length = 0
    }

    return {
        unit,
        unitData,
        getUnitData,
        unitDataLoading,
        resetUnitData
    }

}


/** 电池堆 */
function useStackData(parentId: Ref<any>, changeCallback: (newValue: number[]) => void, tableData: Ref<MetricModel[]>) {

    const stack = ref<number[]>([])
    const [stackData, getStackData, stackDataLoading] = useReactiveHttp_({
        initData: [] as BindEnergyStorageUnit[],
        request: () => getIntanceGroupAndMetric({ parentId: parentId.value }),
        requestCallback: res => {
            tableData.value = res.data.eosMetricList
            return res.data.eosGroupList
        },
        Immediately: false
    })

    watch(stack, (newValue) => {
        if (arrayIsEmpty(newValue)) return changeCallback && changeCallback(newValue)
        if (getArrayLength(newValue) > 1) stack.value = [getLastElement(newValue)]
        changeCallback && changeCallback(newValue)
    })

    const resetStackData = () => {
        stack.value.length = 0
        stackData.value.length = 0
    }

    return {
        stack,
        stackData,
        getStackData,
        resetStackData,
        stackDataLoading
    }

}


/** 电池簇 */
function useClusterData(parentId: Ref<any>, changeCallback: (newValue: number[]) => void, tableData: Ref<MetricModel[]>) {

    const cluster = ref<number[]>([])
    const [clusterData, getClusterData, clusterDataLoading] = useReactiveHttp_({
        initData: [] as BindEnergyStorageUnit[],
        request: () => getIntanceGroupAndMetric({ parentId: parentId.value }),
        requestCallback: res => {
            tableData.value = res.data.eosMetricList
            return res.data.eosGroupList
        },
        Immediately: false
    })

    watch(cluster, (newValue) => {
        if (arrayIsEmpty(newValue)) return changeCallback && changeCallback(newValue)
        if (getArrayLength(newValue) > 1) cluster.value = [getLastElement(newValue)]
        changeCallback && changeCallback(newValue)
    })

    const resetClusterData = () => {
        cluster.value.length = 0
        clusterData.value.length = 0
    }

    return {
        cluster,
        clusterData,
        getClusterData,
        resetClusterData,
        clusterDataLoading
    }

}


/** 电池簇 */
function usePackData(parentId: Ref<any>, changeCallback: (newValue: number[]) => void, tableData: Ref<MetricModel[]>) {

    const pack = ref<number[]>([])
    const [packData, getPackData, packDataLoading] = useReactiveHttp_({
        initData: [] as BindEnergyStorageUnit[],
        request: () => getIntanceGroupAndMetric({ parentId: parentId.value }),
        requestCallback: res => {
            tableData.value = res.data.eosMetricList
            return res.data.eosGroupList
        },
        Immediately: false
    })

    watch(pack, (newValue) => {
        if (arrayIsEmpty(newValue)) return changeCallback && changeCallback(newValue)
        if (getArrayLength(newValue) > 1) pack.value = [getLastElement(newValue)]
        changeCallback && changeCallback(newValue)
    })

    const resetPackData = () => {
        pack.value.length = 0
        packData.value.length = 0
    }

    return {
        pack,
        packData,
        packDataLoading,
        resetPackData,
        getPackData
    }

}


/** 单体 */
function useCellData(parentId: Ref<any>, changeCallback: (newValue: number[]) => void, tableData: Ref<MetricModel[]>) {

    const cell = ref<number[]>([])
    const [cellData, getCellData, cellDataLoading] = useReactiveHttp_({
        initData: [] as BindEnergyStorageUnit[],
        request: () => getIntanceGroupAndMetric({ parentId: parentId.value }),
        requestCallback: res => {
            tableData.value = res.data.eosMetricList
            return res.data.eosGroupList
        },
        Immediately: false
    })

    watch(cell, (newValue) => {
        if (arrayIsEmpty(newValue)) return changeCallback && changeCallback(newValue)
        if (getArrayLength(newValue) > 1) cell.value = [getLastElement(newValue)]
        changeCallback && changeCallback(newValue)
    })

    const resetCellData = () => {
        cell.value.length = 0
        cellData.value.length = 0
    }

    return {
        cell,
        cellData,
        cellDataLoading,
        resetCellData,
        getCellData
    }

}