
export const dataAnalysisMap = {

    /** 电站报表 */
    runReport: '/ess/report/runReport',

    /** 设备日报  */
    dailyReport: '/ess/report/dailyReport',

    /** 获取设备历史充放电数据 */
    historyReport: '/ess/report/historyReport',

    /** 设备告警类型  */
    warningBydeviceType: '/ess/eos_warning/count.by.device.type',

    /** 设备告警等级  */
    warningByLevel: '/ess/eos_warning/count.by.level',

    /** 历史数据 */
    historyChart: '/ess/history/chart',

    /** 运行曲线 */
    scatterTrendChart: '/ess/scatter/trendChart',

    /** 一致性散点图 */
    scatter: 'ess/scatter/scatter',

    /** 下载电站每日报表   */
    exportDailyReport: 'ess/report/export',

    /** 下载电站每日报表 导出历史报表   */
    exportHistoryReport: 'ess/report/exportHistory',

    /** 下载电站运行报表  stationSerial=ESCNGXAH02&startTime=2022-07&type=M&endTime=2023-07&lang=zn_CH */
    exportRunReport: 'ess/report/exportRunReport',

    /** 电站、设备收益报表 ess/income/incomeExport?stationSerial=ESCNGXAH02&startTime=2023-07-01&type=D&endTime=2023-08-25&device= */
    incomeExport: 'ess/income/incomeExport',

    /** 设备历史数据下载 */
    historyDataExport: 'ess/history/export',

}

