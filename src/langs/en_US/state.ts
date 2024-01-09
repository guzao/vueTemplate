const baseState = ['Normal', 'Fail']

const openState = ['Close', 'Open']

const breakerState = ['OFF', 'Close']

const normalOrWarning = [ 'Normal', 'Warning' ]

export const deviceState = {

    neetworkState: [ '', 'Normal', 'Offline' ],

    deviceState: ['', 'Charge', 'Discharge', 'Standby', 'Warning', 'Operations ', 'Offline'],

    statckState: ["", "Normal ", "Full", "Empty ", "Warning ", "Light failure ", "Heavy failure"],

    unitState: ["", "Normal ", "Full", "Empty ", "Warning ", "Light failure ", "Heavy failure", 'Critical failure'],

    bmsState: baseState,

    pcsState: [ 'Standby', 'Running', 'Full' ],

    ioState: baseState,

    arState: [ '', 'Standby', 'Running', 'Full' ],

    /** 温湿度传感器状态 */
    tempState: baseState,

    /** 自用电功率计通信故障 */
    selfPowerMeterState: baseState,

    /** 一次电功率计通信故障 */
    oncePowerMeterState: baseState,
    
    DCBreakerState: breakerState,

    normalOrWarning: normalOrWarning

}