export const monitor = {

    /** 电站列表 */
    stationList: '/ess/station/list',

    /** 获取指定电站运行信息 */
    stationInfo: '/ess/station/stationInfo',

    /**  获取指定电站设备组运行信息 ?stationSerial=ESCNGXAH02&lang=zh_CN */
    deviceList: '/ess/device/list',

    /**  获取指定电站实施功率曲线 ?stationSerial=ESCNGXAH02&lang=zh_CN */
    stationPowerAll: '/ess/station/powerAll',

    /**  获取指定电站指定设备实施功率曲线 ?stationSerial=ESCNGXAH02&lang=zh_CN */
    stationPowerByUnit: '/ess/station/powerAllByUnit',

    /**  设备基本信息 ess/device/info?stationSerial=ESCNGXAH02&type=E&unitId=58&lang=zh_CN */
    deviceInfo: '/ess/device/info',


    /** 登录日志 */
    logininforList: '/monitor/logininfor/list',
    
    /** 操作日志 */
    operlogList: '/monitor/operlog/list',
}

