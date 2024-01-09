const baseState = ['正常', '故障']

const openState = ['闭合', '正常']

const breakerState = ['断开', '闭合']

const normalOrWarning = [ '正常', '告警' ]

export const deviceState = {

    neetworkState: ['', '正常', '离线'],

    deviceState: ['', '充电', '放电', '待机', '告警', '维护', '离线'],

    statckState: ["", "正常 ", "充满 ", "放空 ", "预警 ", "轻故障 ", "重故障"],

    unitState: ["", "正常 ", "充满 ", "放空 ", "预警 ", "轻故障 ", "重故障", '危急故障'],

    bmsState: baseState,

    pcsState: [ '待机', '运行', '故障' ],

    ioState: baseState,

    arState: [ '', '待机', '运行', '故障' ],

    /** 温湿度传感器状态 */
    tempState: baseState,

    /** 自用电功率计通信故障 */
    selfPowerMeterState: baseState,

    /** 一次电功率计通信故障 */
    oncePowerMeterState: baseState,

    DCBreakerState: breakerState,

    normalOrWarning: normalOrWarning


}