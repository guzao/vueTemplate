import { defineStore } from "pinia"
import { isFalse, parserTime } from '@/utils'
import { useDict as useDictAction } from '@/hooks'

/**
 * 字典加载信息
*/
const loadedDictsInfo: Record<any, any> = {
    /** 缓存的字典数量 */
    length: 0,
}


/**
 * 使用 getter 中的数据获取对应的字典内部触发缓存
*/
export const useDicts = defineStore('useDict', {

    state() {
        return {

            parkType: createState(),

            parkReleaseStatus: createState(),

            userSexType: createState(),

            parkRunStatusType: createState(),

            parkStatusType: createState(),

            parkUseType: createState(),

            industryType: createState(),

            gridStatus: createState(),

            normalDisable: createState(),

            commonStatus: createState(),

            operType: createState(),

            deviceType: createState(),

            warningLevel: createState(),

            chargeDisChargeType: createState(),

            categoryType: createState(),

            metricGroupTags: createState(),

            signalType: createState(),

            eventType: createState(),

            eosType: createState(),

            dataType: createState(),

            levelType: createState(),

            deviceOrderState: createState(),

            workFaultLevel: createState(),

            eosUnitype: createState(),

        }
    },

    getters: {

        /** 字典加载信息 */
        loadedDictsInfo() {
            return loadedDictsInfo
        },

        /** 电站类型字典 */
        parkTypeDict(state) {
            return createGetter(state, 'parkType', 'eos_park_type')()
        },

        /** 电站发布状态字典 */
        parkReleaseStatusDict(state) {
            return createGetter(state, 'parkReleaseStatus', 'station_release_status')()
        },

        /** 用户性别字典 */
        userSexTyeDict(state) {
            return createGetter(state, 'userSexType', 'sys_user_sex')()
        },

        /** 电站运行状态字典 */
        parkRunStatusDict(state) {
            return createGetter(state, 'parkRunStatusType', 'eos_park_run_status')()
        },

        /** 电站状态字典 */
        parkStatusDict(state) {
            return createGetter(state, 'parkStatusType', 'eos_status')()
        },

        /** 电站使用类型字典 */
        parkUseTypeDict(state) {
            return createGetter(state, 'parkUseType', 'eos_park_use_type')()
        },

        /** 行业标签字典 */
        industryTypeDict(state) {
            return createGetter(state, 'industryType', 'eos_industry_type')()
        },

        /** 建设状态 */
        gridStatusDict(state) {
            return createGetter(state, 'gridStatus', 'eos_grid_status')()
        },

        /** 用户禁用状态 */
        normalDisableDict(state) {
            return createGetter(state, 'normalDisable', 'sys_normal_disable')()
        },

        /** 用户登录状态 */
        commonStatusDict(state) {
            return createGetter(state, 'commonStatus', 'sys_common_status')()
        },

        /** 操作类型字典 */
        operTypeDict(state) {
            return createGetter(state, 'operType', 'sys_oper_type')()
        },

        /** 设备类型 */
        deviceTypeDict(state) {
            return createGetter(state, 'deviceType', 'eos_device_type')()
        },

        /** 设备类型 */
        warningLevelDict(state) {
            return createGetter(state, 'warningLevel', 'eos_level')()
        },

        /** 充放电采集点类型 */
        chargeDisChargeDict(state) {
            return createGetter(state, 'chargeDisChargeType', 'charge_discharge_type')()
        },

        /** 行业类别 */
        categoryTypeDict(state) {
            return createGetter(state, 'categoryType', 'eos_category_type')()
        },

        /** 测点组别标签 */
        metricGroupTagsDict(state) {
            return createGetter(state, 'metricGroupTags', 'eos_metric_group_tags')()
        },

        /** 信号 */
        signalTypeDict(state) {
            return createGetter(state, 'signalType', 'eos_signal_type')()
        },

        /** 事件类型 */
        eventTypeDict(state) {
            return createGetter(state, 'eventType', 'eos_event_type')()
        },

        /** 测点类型 */
        eosTypeDict(state) {
            return createGetter(state, 'eosType', 'eos_type')()
        },

        /** 数据类型 */
        dataTypeDict(state) {
            return createGetter(state, 'dataType', 'eos_data_type')()
        },

        /** 故障类型 */
        levelTypeDict(state) {
            return createGetter(state, 'levelType', 'eos_level')()
        },

        /** 设备工单状态 */
        deviceOrderStateDict(state) {
            return createGetter(state, 'deviceOrderState', 'sys_work_status')()
        },

        /** 工单故障等级 */
        workFaultLevelDict(state) {
            return createGetter(state, 'workFaultLevel', 'sys_work_fault_level')()
        },

        /** 储能单元类型 */
        eosUnitypeDict(state) {
            return createGetter(state, 'eosUnitype', 'eos_unit_type')()
        },


    }

})


/** 创建字典数据 */
function createState() {
    return {
        dictLabel: {} as Record<string, string>,
        dictValue: [] as DictTypeData[],
        /** 数据是否已经被缓存 */
        loaded: false
    }
}



/**
 * 创建store getter数据
 * @param state 数据
 * @param stateKey 字典key
 * @param dictType 字典类型
*/
function createGetter(state: any, key: any, dictType: DictType) {

    let { getResult, dictLabel, result } = useDictAction(dictType)

    return () => {
        if (isFalse(state[key].loaded)) {
            getResult().then((_: any) => {
                state[key].dictLabel = dictLabel.value
                state[key].dictValue = result.value
                state[key].loaded = true
            }).then(_ => {
                ++loadedDictsInfo.length
                loadedDictsInfo[dictType] = parserTime(Date.now(), 'YYYY-MM-DD HH:mm:ss:SSS')
                // 清除闭包内的缓存
                getResult = null as any
                dictLabel = null as any
                result = null as any
            })
        }
        return state[key] as {
            /** 字典map类型 */
            dictLabel: Record<string, string>;
            /** 字典元数据 */
            dictValue: DictTypeData[];
            /** 字典是否已经加载 */
            loaded: boolean;
        }
    }

}
