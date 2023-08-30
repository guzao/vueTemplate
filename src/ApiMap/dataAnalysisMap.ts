
export const dataAnalysisMap = {

    /** 电站报表 stationSerial=ESCNGXAH02&type=M&startTime=2022-07&endTime=2023-07&lang=zh_CN*/
    runReport: '/ess/report/runReport',

    /** ess/report/dailyReport?stationSerial=ESCNGXAH02&date=2023-08-02&lang=zh_CN */
    dailyReport: '/ess/report/dailyReport',

    /** 获取设备历史充放电数据 */ 
    historyReport: '/ess/report/historyReport',

    /** 设备告警类型 /ess/eos_warning/count.by.device.type */
    warningBydeviceType: '/ess/eos_warning/count.by.device.type',

    /** 设备告警等级  */
    warningByLevel: '/ess/eos_warning/count.by.level'
    
}