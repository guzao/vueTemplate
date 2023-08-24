import { messages } from '@/langs'
import { useLang } from "../userUtils"
import { getLastElement, } from "../dataUtils"

const { getLang } = useLang()
const getLangKey = () => getLang() as 'zh_CN' | 'en_US'




const runingIcons = ['', 'icon_runing_chager', 'icon_runing_dischager', 'icon_runing_standy', 'icon_runing_alarm', 'icon_runing_weihu', 'icon_runing_offline']
const runingTextColor = ['', 'charge_color', 'discharge_color', 'standby_color', 'alarm_color', 'weihu_color', 'offline_color']

/** 设备运行状态样式信息 */
export function getRuningStateInfo(state: number) {
    const stateText = messages[getLangKey()].deviceState.deviceState
    return {
        icon: runingIcons[state] || getLastElement(runingIcons),
        color: runingTextColor[state] || getLastElement(runingTextColor),
        text: stateText[state] || getLastElement(stateText),
    }
}


const deviceIcons = ['', 'icon_state_charge', 'icon_state_discharge', 'icon_state_standby', 'icon_state_alarm', 'icon_state_weihu', 'icon_state_offline']

/** 设备状态样式信息 */
export function getDeviceStateInfo(state: number) {
    const stateText = messages[getLangKey()].deviceState.deviceState
    return {
        icon: deviceIcons[state] || getLastElement(deviceIcons),
        color: runingTextColor[state] || getLastElement(runingTextColor),
        text: stateText[state] || getLastElement(stateText),
    }
}

const parkRuningBgcColor = ['', 'charge_color_bg', 'discharge_color_bg', 'standby_color_bg', 'alarm_color_bg', 'weihu_color_bg', 'offline_color_bg']
/** 电站运行状态背景色 */
export const getParkRuningBgc = (state: number) => parkRuningBgcColor[state] || getLastElement(parkRuningBgcColor)


/** 根据soc计算出 缩放比 */
export function getCellZoom(value: any) {
    if (isNaN(+value)) return 0
    if (!value) return 0
    if (value == 0) return 0
    if (+value < 10) return 1
    if (+value > 100) return 10
    return ~~(+value / 10)
}



const deviceCNXBatteryMarks = ['', 'charge_mark_cnx', 'discharge_mark_cnx', 'standby_mark_cnx', 'alarm_mark_cnx', 'alarm_mark_cnx', 'standby_mark_cnx']
const deviceCNXBatteryCells = ['', 'charge_cell_cnx', 'discharge_cell_cnx', 'standby_cell_cnx', 'alarm_cell_cnx', 'weihu_cell_cnx', 'offline_cell_cnx']

/** 储能箱设备不同状态电池小节 */
export const getDeviceCNXBatteryMarkInfo = (state: number) => deviceCNXBatteryMarks[state] || getLastElement(deviceCNXBatteryMarks)

const getDeviceCNXBatteryCellInfo = (state: number) => deviceCNXBatteryCells[state] || getLastElement(deviceCNXBatteryCells)

/** 获取储能箱电池小节的背景图 */
export function getCNXBatteryCellBg(value: number, state: number) {

    let initCell = Array.from({ length: 10 }).map(_ => 'base_cell_cnx')

    let cellBG = getDeviceCNXBatteryCellInfo(state)

    for (let index = 0; index < getCellZoom(value); index++) {
        initCell[index] = cellBG
    }

    return initCell
}





const deviceCNGBatteryMarks = ['', 'charge_mark_cng', 'discharge_mark_cng', 'standby_mark_cng', 'standby_mark_cng', 'standby_mark_cng', 'standby_mark_cng']
const deviceCNGBatteryCells = ['', 'charge_cell_cng', 'discharge_cell_cng', 'standby_cell_cng', 'alarm_cell_cng', 'weihu_cell_cng', 'offline_cell_cng']

/** 储能柜设备不同状态遮罩层 电池小节 */
export const getDeviceCNGBatteryMarkInfo = (state: number) => deviceCNGBatteryMarks[state] || getLastElement(deviceCNGBatteryMarks)

const getDeviceCNGBatteryCellInfo = (state: number) => deviceCNGBatteryCells[state] || getLastElement(deviceCNGBatteryCells)

/** 获取储能箱电池小节的背景图 */
export function getCNGBatteryCellBg(value: number, state: number) {

    let initCell = Array.from({ length: 10 }).map(_ => 'base_cell_cng')

    let cellBG = getDeviceCNGBatteryCellInfo(state)

    for (let index = 0; index < getCellZoom(value); index++) {
        initCell[index] = cellBG
    }

    return initCell
}
