import { getLastElement } from "../dataUtils"

const runingIcons = [ '', 'icon_runing_chager', 'icon_runing_dischager', 'icon_runing_standy', 'icon_runing_alarm', 'icon_runing_weihu', 'icon_runing_offline' ]
const runingText = [ '', '充电', '放电', '待机', '告警', '维护', '离线' ]
const runingTextColor = [ '', 'charge_color', 'discharge_color', 'standby_color', 'alarm_color', 'weihu_color', 'offline_color' ]
/** 设备运行状态样式信息 */
export function getRuningStateInfo (state: number) {
    return {
        icon: runingIcons[state] || getLastElement(runingIcons),
        color: runingTextColor[state] || getLastElement(runingTextColor),
        text: runingText[state] || getLastElement(runingText),
    }
}