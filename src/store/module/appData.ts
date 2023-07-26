import { defineStore } from "pinia";
import { getFirstElement, hasEror, isFalse, useIsCollapse } from '@/utils'
import { getUserParkListAll, getUserParkLastTime } from '@/API'

const { getIsCollapse, setIsCollapse } = useIsCollapse()

export const useAppData = defineStore('useAppData', {

    state() {
        return {

            /** 侧边栏状态 */ 
            isCollapse: getIsCollapse(),
            
            /** 电站发布状态 */
            parkReleaseStatus: {} as Record<string, number>,

            /** 电站数据最新时间 */
            parkLastTimes: {} as Record<string, number>,

            /** 用户受权限控制的电站列表  */
            parkAuthList: []  as ParkAuth [],

            /** 初始化用户默认选中的电站 */ 
            parkSerial: 'null'
            
        }
    },

    getters: {
      
    },

    actions: {

        /** 侧边栏状态 */ 
        chnageIsCollapse () {
            this.isCollapse = !this.isCollapse
            setIsCollapse(this.isCollapse)
        },

        /** 用户受权限控制的电站列表 */ 
        getParkAuthList () {
            return getUserParkListAll().then(res => {
                if ( hasEror(res) ) return
                const { rows } = res
                this.parkAuthList = rows 
                this.parkReleaseStatus = createParkReleaseStatusMap(rows)
                this.parkSerial =  getFirstElement(this.parkAuthList)?.serial
            })
        },

        /** 用户受权限控制的电站数据的最新时间 */ 
        getParkAuthLastTime () {
            return getUserParkLastTime().then(res => {
                if ( hasEror(res) ) return
                this.parkLastTimes = res.data
            })
        },

    },

})



/** 生成场站状态对象表 */
function createParkReleaseStatusMap (rows: ParkAuth[]) {
    return rows.reduce((acc, cur) => {
        const { releaseStatus, serial } = cur
        if (isFalse(acc[serial])) {
            acc[ serial ] = releaseStatus
        }
        return acc
    }, {} as Record<string, number>)
}