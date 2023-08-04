import { useDict as useDictAction } from '@/hooks'
import { isFalse } from '@/utils';
import { defineStore } from "pinia";


const { getResult: getParkType, result: parkType, dictLabel: dictParkLabel } = useDictAction('eos_park_type')
const { getResult: getReleaseStatus, dictLabel: releaseStatusDictLabel, result: releaseStatus  } = useDictAction('station_release_status')
const { getResult: getUserSexType, dictLabel: userSexTypeDictLabel, result: userSexType  } = useDictAction('sys_user_sex')


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
            }

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

    },

})

