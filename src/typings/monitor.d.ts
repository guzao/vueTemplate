
/** 电站运行详情 */
type ParkRuningInfo = {
    A_M2: number,
    A_M3: number,
    A_M5: number,
    A_M6: number,
    A_M7: number,
    A_M8: number,
    A_M15: number,
    A_M16: number,
    A_M17: number,
    A_M18: number,
    A_M19: number,
    A_M20: number,
    type: string,
    code: string,
    typeLabel: string,
}


/*** 设备列表 */
type DeviceItem = {
    id: number,
    ugroupId: number,
    stationSerial: string,
    name: string,
    serial: string,
    assetSerial: string,
    unitType: string,
    sort: number,
    delFlag: number,
    createTime: number,
    updateTime: number,
    params: Params$1Type,
    /** 设备运行参数 */
    deviceData: {
        M2: number
        M3: number
        M4: number
        M5: number
        M6: number
        M7: number
        M20: number
        M8: number
        M22: number
        M9: number
        M11: number
        M10: number
        M13: number
        M23: number
        M12: number
        M26: number
        M15: number
        M25: number
        M14: number
        M17: number
        M16: number
        M19: number
        M18: number
    },
}


/** 电站设备组信息列表 */
type DeviceGroup = {
    id: number,
    /** 单元组名称 */
    name: string,
    status: number,
    soc: number,
    dailyCharge: number,
    dailyDisCharge: number,
    M5: number,
    M6: number,
    /**  有功*/
    activePower: number,
    /**  无功*/
    reactivePower: number,
    M17: number,
    M18: number,
    M19: number,
    M20: number,
    /*** 设备列表 */
    list: DeviceItem []
}
