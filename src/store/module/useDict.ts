import { useDict as useDictAction } from '@/hooks'
import { isFalse } from '@/utils';
import { defineStore } from "pinia";


const { getResult: getParkType, result: parkType, dictLabel: dictParkLabel } = useDictAction('eos_park_type')

const { getResult: getReleaseStatus, dictLabel: releaseStatusDictLabel, result: releaseStatus  } = useDictAction('station_release_status')

const { getResult: getUserSexType, dictLabel: userSexTypeDictLabel, result: userSexType  } = useDictAction('sys_user_sex')

const { getResult: getParkRunStatus, dictLabel: parkRunStatusDictLabel, result: parkRunStatus  } = useDictAction('eos_park_run_status')

const { getResult: getParkStatus, dictLabel: parkStatusDictLabel, result: parkStatus  } = useDictAction('eos_status')

const { getResult: getParkUseType, dictLabel: parkUseTypeDictLabel, result: parkUseType  } = useDictAction('eos_park_use_type')

const { getResult: getIndustryType, dictLabel: industryTypeDictLabel, result: industryType  } = useDictAction('eos_industry_type')

const { getResult: getGridStatus, dictLabel: gridStatusDictLabel, result: gridStatus  } = useDictAction('eos_grid_status')

const { getResult: getNormalDisable, dictLabel: normalDisableDictLabel, result: normalDisable  } = useDictAction('sys_normal_disable')


/**
 * 使用getters 中的数据获取对应的字典内部触发缓存
*/
export const useDicts = defineStore('useDict', {

    state() {
        return {

            parkType: {
                dictLabel: {} as Record<string, string>,
                dictValue: [] as DictTypeData [],
                /** 数据是否已经被缓存 */
                loaded: false
            },

            parkReleaseStatus: {
                dictLabel: {} as Record<string, string>,
                dictValue: [] as DictTypeData [],
                /** 数据是否已经被缓存 */
                loaded: false
            },

            userSexType: {
                dictLabel: {} as Record<string, string>,
                dictValue: [] as DictTypeData [],
                /** 数据是否已经被缓存 */
                loaded: false
            },

            parkRunStatusType: {
                dictLabel: {} as Record<string, string>,
                dictValue: [] as DictTypeData [],
                /** 数据是否已经被缓存 */
                loaded: false
            },

            parkStatusType: {
                dictLabel: {} as Record<string, string>,
                dictValue: [] as DictTypeData [],
                /** 数据是否已经被缓存 */
                loaded: false
            },

            parkUseType: {
                dictLabel: {} as Record<string, string>,
                dictValue: [] as DictTypeData [],
                /** 数据是否已经被缓存 */
                loaded: false
            },

            industryType: {
                dictLabel: {} as Record<string, string>,
                dictValue: [] as DictTypeData [],
                /** 数据是否已经被缓存 */
                loaded: false
            },

            gridStatus: {
                dictLabel: {} as Record<string, string>,
                dictValue: [] as DictTypeData [],
                /** 数据是否已经被缓存 */
                loaded: false
            },

            normalDisable: {
                dictLabel: {} as Record<string, string>,
                dictValue: [] as DictTypeData [],
                /** 数据是否已经被缓存 */
                loaded: false
            },

        }
    },

    getters: {

        /** 电站类型字典 */ 
        parkTypeDict (state) {
            if ( isFalse(state.parkType.loaded) ) {
                getParkType().then(res => {
                    state.parkType.dictLabel = dictParkLabel.value
                    state.parkType.dictValue = parkType.value
                    state.parkType.loaded = true
                })
            }
            return state.parkType
        },
        
        /** 电站发布状态字典 */ 
        parkReleaseStatusDict (state) {
            if ( isFalse(state.parkReleaseStatus.loaded) ) {
                getReleaseStatus().then(res => {
                    state.parkReleaseStatus.dictLabel = releaseStatusDictLabel.value
                    state.parkReleaseStatus.dictValue = releaseStatus.value
                    state.parkReleaseStatus.loaded = true
                })
            }
            return state.parkReleaseStatus
        },
        
        /** 用户性别字典 */ 
        userSexTyeDict (state) {
            if ( isFalse(state.userSexType.loaded) ) {
                getUserSexType().then(res => {
                    state.userSexType.dictLabel = userSexTypeDictLabel.value
                    state.userSexType.dictValue = userSexType.value
                    state.userSexType.loaded = true
                })
            }
            return state.userSexType
        },

        /** 电站运行状态字典 */ 
        parkRunStatusDict (state) {
            if ( isFalse(state.parkRunStatusType.loaded) ) {
                getParkRunStatus().then(res => {
                    state.parkRunStatusType.dictLabel = parkRunStatusDictLabel.value
                    state.parkRunStatusType.dictValue = parkRunStatus.value
                    state.parkRunStatusType.loaded = true
                })
            }
            return state.parkRunStatusType
        },

        /** 电站状态字典 */ 
        parkStatusDict (state) {
            if ( isFalse(state.parkStatusType.loaded) ) {
                getParkStatus().then(res => {
                    state.parkStatusType.dictLabel = parkStatusDictLabel.value
                    state.parkStatusType.dictValue = parkStatus.value
                    state.parkStatusType.loaded = true
                })
            }
            return state.parkStatusType
        },

        /** 电站使用类型字典 */ 
        parkUseTypeDict (state) {
            if ( isFalse(state.parkUseType.loaded) ) {
                getParkUseType().then(res => {
                    state.parkUseType.dictLabel = parkUseTypeDictLabel.value
                    state.parkUseType.dictValue = parkUseType.value
                    state.parkUseType.loaded = true
                })
            }
            return state.parkUseType
        },

        /** 电站行业类型字典 */ 
        industryTypeDict (state) {
            if ( isFalse(state.industryType.loaded) ) {
                getIndustryType().then(res => {
                    state.industryType.dictLabel = industryTypeDictLabel.value
                    state.industryType.dictValue = industryType.value
                    state.industryType.loaded = true
                })
            }
            return state.industryType
        },

        /** 建设状态 */ 
        gridStatusDict (state) {
            if ( isFalse(state.gridStatus.loaded) ) {
                getGridStatus().then(res => {
                    state.gridStatus.dictLabel = gridStatusDictLabel.value
                    state.gridStatus.dictValue = gridStatus.value
                    state.gridStatus.loaded = true
                })
            }
            return state.gridStatus
        },

        /** 用户禁用状态 */ 
        normalDisableDict (state) {
            if ( isFalse(state.normalDisable.loaded) ) {
                getNormalDisable().then(res => {
                    state.normalDisable.dictLabel = normalDisableDictLabel.value
                    state.normalDisable.dictValue = normalDisable.value
                    state.normalDisable.loaded = true
                })
            }
            return state.normalDisable
        },

    },

})

