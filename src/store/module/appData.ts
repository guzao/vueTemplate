import { Common } from '@/enum'
import { useDicts } from '@/store'
import { defineStore } from "pinia"
import { getUserParkListAll, getUserParkLastTime, getStationList } from '@/API'
import { getFirstElement, hasError, isFalse, useIsCollapse, urlQueryToObject, replaceUrlQuery, sleep, arrayIsEmpty, isStringNull, isStringUndefind, isEmptyString, getNeetworkState, has, getDeviceStateInfo } from '@/utils'


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
        
        /** 通过函数获取当前选中的电站信息 */
        getCurrentPark () {
            return this.parkAuthList.find(item => item.serial == this.parkSerial)!
        },

        /** 用户是否拥有此电站 */
        hasOwnProperty(parkSeria: string) {
            return has(this.parkReleaseStatus, parkSeria)
        },

        /** 当前选中电站编号 */
        getParkSerial() {
            return this.parkSerial
        },

        /** 侧边栏状态 */
        changeIsCollapse() {
            this.isCollapse = !this.isCollapse
            setIsCollapse(this.isCollapse)
        },

        setActiveMenu(menu: string) {
            this.activeMenu = menu
        },

        /** 用户受权限控制的电站列表 */
        getParkAuthList() {
            return getUserParkListAll().then(res => {
                if (hasError(res)) return
                const { rows } = res
                this.parkAuthList = rows
                this.parkReleaseStatus = createParkReleaseStatusMap(rows)
                this.parkTypes = createParkTypesMap(rows)
                // 先从地址栏取 在尝试从store中取
                const { stationCode = useAppData().parkSerial } = urlQueryToObject()
                // 电站列表的第一项作为默认选中电站
                const baseParkSerial = getFirstElement(this.parkAuthList)?.serial
                // 默认取地址栏的场站编码   电站code 合法性校验
                const defaultParkSerial = parkSerialValidError(stationCode) ? baseParkSerial : stationCode
                // 检查用户是否拥有这个电站
                const userHasOwnPark = has(this.parkReleaseStatus, defaultParkSerial)
                this.parkSerial = userHasOwnPark ? defaultParkSerial : baseParkSerial
            })
        },

        /** 用户受权限控制的电站数据的最新时间 */
        getParkAuthLastTime() {
            getUserParkLastTime().then(res => {
                if (hasError(res, false)) return
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
                if (hasError(res, false)) return
                const stationList = res.data.stationList as ParkMonitorInfo[]
                this.parkRuningState = createParkRuningStateMap(stationList)
            })
        },

        /** 定时获取用户受权限控制的电站运行状态 根据登录状态判断是否获取 */
        loopGetStationRuningState() {
            if (arrayIsEmpty(this.parkAuthList)) return
            this.getStationRuningState()
        },

        /**
         * 获取当前电站水印配置项
         * @param state 电站的运行状态
        */
        currentParkWatermarkOptions(state: any) {
            const dicts = useDicts()
            return {
                markSatate: state == Common.IS_EMPTY_STRIING ? 0 : this.currentRelease,
                text: state == Common.IS_EMPTY_STRIING ? getNeetworkState(2) : dicts.parkReleaseStatusDict.dictLabel[this.currentRelease] || getDeviceStateInfo(6).text
            }
        },

        /**
         * 获取电站水印配置项
         * @param state 电站的运行状态
         * @param currentRelease 电站的发布状态
        */
        getWatermarkOptions(state: any, currentRelease: any) {
            const dicts = useDicts()
            return {
                markSatate: state == Common.IS_EMPTY_STRIING ? 0 : currentRelease,
                text: state == Common.IS_EMPTY_STRIING ? getNeetworkState(2) : dicts.parkReleaseStatusDict.dictLabel[currentRelease] || getDeviceStateInfo(6).text
            }
        }

    },

})




/** 处理地址栏电站编号为异常值情况 */
function parkSerialValidError(raw: any) {
    if (isStringNull(raw)) return true
    if (isStringUndefind(raw)) return true
    if (isEmptyString(raw)) return true
    return false
}


/** 生成电站类型表 */
function createParkTypesMap(rows: ParkAuth[]) {
    return rows.reduce((acc, cur) => {
        const { type, serial } = cur
        if (isFalse(acc[serial])) acc[serial] = type
        return acc
    }, {} as Record<string, string | any>)
}


/** 生成场站状态对象表 */
function createParkReleaseStatusMap(rows: ParkAuth[]) {
    return rows.reduce((acc, cur) => {
        const { releaseStatus, serial } = cur
        if (isFalse(acc[serial])) acc[serial] = releaseStatus
        return acc
    }, {} as Record<string, number>)
}


/** 生成电站运行状态型表 */
function createParkRuningStateMap(rows: ParkMonitorInfo[]) {
    return rows.reduce((acc, cur) => {
        const { cardList: { A_M2 = '6' }, code } = cur
        if (isFalse(acc[code])) acc[code] = A_M2
        return acc
    }, {} as Record<string, number>)
}
