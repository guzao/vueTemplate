import { defineStore } from "pinia";
import { getUserParkListAll, getUserParkLastTime, getStationList } from '@/API'
import { getFirstElement, hasEror, isFalse, useIsCollapse, urlQueryToObject, replaceUrlQuery, sleep, arrayIsEmpty } from '@/utils'


const { getIsCollapse, setIsCollapse } = useIsCollapse()


/** 应用数据 */
export const useAppData = defineStore('useAppData', {

    state() {
        return {

            /** 侧边栏状态 */
            isCollapse: getIsCollapse(),

            /** 侧边栏选中的菜单 */
            activeMenu: '',

            /** 电站发布状态 */
            parkReleaseStatus: {} as Record<string, number>,

            /** 电站数据最新时间 */
            parkLastTimes: {} as Record<string, number>,

            /** 电站类型 */
            parkTypes: {} as Record<string, string>,

            /** 电站运行状态 */
            parkRuningState: {} as Record<string, number>,

            /** 用户受权限控制的电站列表  */
            parkAuthList: [] as ParkAuth[],

            /** 用户选中的电站 */
            parkSerial: 'null',

        }
    },

    getters: {
        /** 当前选中电站的最新数据时间 */
        currentLastTime(state) {
            return state.parkLastTimes[state.parkSerial]
        },
        /** 当前选中电站的状态 */
        currentRelease(state) {
            return state.parkReleaseStatus[state.parkSerial]
        },
        /** 当前选中电站的类型 */
        currentParkType(state) {
            return state.parkTypes[state.parkSerial]
        },
        /** 当前选中的电站编号 */
        currentParkSerial(state) {
            return state.parkSerial
        },
        /** 当前选中的电站信息 */
        currentPark(state) {
            return state.parkAuthList.find(item => item.serial == state.parkSerial)!
        },
    },

    actions: {

        /** 当前选中电站编号 */
        getParkSerial() {
            return this.parkSerial
        },

        /** 侧边栏状态 */
        chnageIsCollapse() {
            this.isCollapse = !this.isCollapse
            setIsCollapse(this.isCollapse)
        },

        setActiveMenu(menu: string) {
            this.activeMenu = menu
        },

        /** 用户受权限控制的电站列表 */
        getParkAuthList() {
            return getUserParkListAll().then(res => {
                if (hasEror(res)) return
                const { rows } = res
                this.parkAuthList = rows
                this.parkReleaseStatus = createParkReleaseStatusMap(rows)
                this.parkTypes = createParkTypesMap(rows)
                // 默认取地址栏的场站编码 
                this.parkSerial = urlQueryToObject().stationCode || getFirstElement(this.parkAuthList)?.serial
            })
        },

        /** 用户受权限控制的电站数据的最新时间 */
        getParkAuthLastTime() {
            getUserParkLastTime().then(res => {
                if (hasEror(res)) return
                this.parkLastTimes = res.data
            })
        },

        /** 定时获取电站最新数据 根据登录状态判断是否获取电站最新数据时间 */
        loopGetParkAuthLastTime() {
            if (arrayIsEmpty(this.parkAuthList)) return
            this.getParkAuthLastTime()
        },

        /** 用户电站切换 同步地址栏电站编号 */
        async parkCodeChnage(code: string) {
            this.parkSerial = code
            await sleep(200)
            replaceUrlQuery({ stationCode: code })
        },

        /** 用户受权限控制的电站运行状态 */
        getStationRuningState() {
            getStationList().then(res => {
                if (hasEror(res)) return
                const stationList = res.data.stationList as ParkMonitorInfo[]
                this.parkRuningState = createParkRuningStateMap(stationList)
            })
        },

        /** 定时获取用户受权限控制的电站运行状态 根据登录状态判断是否获取 */
        loopGetStationRuningState() {
            if (arrayIsEmpty(this.parkAuthList)) return
            this.getStationRuningState()
        }

    },

})



/** 生成场站状态对象表 */
function createParkReleaseStatusMap(rows: ParkAuth[]) {
    return rows.reduce((acc, cur) => {
        const { releaseStatus, serial } = cur
        if (isFalse(acc[serial])) acc[serial] = releaseStatus
        return acc
    }, {} as Record<string, number>)
}

/** 生成电站类型表 */
function createParkTypesMap(rows: ParkAuth[]) {
    return rows.reduce((acc, cur) => {
        const { type, serial } = cur
        if (isFalse(acc[serial])) acc[serial] = type
        return acc
    }, {} as Record<string, string>)
}

/** 生成电站运行状态型表 */
function createParkRuningStateMap(rows: ParkMonitorInfo[]) {
    return rows.reduce((acc, cur) => {
        const { cardList: { A_M2 = '6' }, code } = cur
        if (isFalse(acc[code])) acc[code] = A_M2
        return acc
    }, {} as Record<string, number>)
}
