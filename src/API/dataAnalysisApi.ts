import { useGet, usePost } from '@/HTTP'
import { dataAnalysisMap } from '@/ApiMap'

/** 获取指定电站运行电站报表数据 */
export function getParkRunReport(params: ParkRunReportParams) {
    return useGet({
        url: dataAnalysisMap.runReport,
        params
    })
}

/** 获取指定电站设备运行报表数据 */
export function getDailyReport(params: DailyReportParams) {
    return useGet({
        url: dataAnalysisMap.dailyReport,
        params
    })
}

/** 获取设备历史充放电数据 */
export function getHistoryReport(data: HistoryReportParams) {
    return usePost({
        url: dataAnalysisMap.historyReport,
        data
    })
}

/** 设备告警类型 */
export function getWarningBydeviceType(data: any) {
    return usePost({
        url: dataAnalysisMap.warningBydeviceType,
        data
    })
}

/** 设备告警等级 */
export function getWarningByLevel(data: any) {
    return usePost({
        url: dataAnalysisMap.warningByLevel,
        data
    })
}

/** 获取测点历史曲线 */
export function getHistoryChart(data: any) {
    return usePost({
        url: dataAnalysisMap.historyChart,
        data
    })
}

/** 获取运行曲线 */
export function getScatterTrendChart(data: any) {
    return usePost({
        url: dataAnalysisMap.scatterTrendChart,
        data
    })
}

/** 获取一致性散点图 */
export function getScatter(data: any) {
    return usePost({
        url: dataAnalysisMap.scatter,
        data
    })
}

/** 下载电站每日报表 */
export function exportDailyReport(params: any) {
    return useGet({
        params,
        url: dataAnalysisMap.exportDailyReport,
        responseType: 'blob',
    })
}



/** 下载电站每日报表 导出历史报表 */
export function exportHistoryReport(data: any) {
    return usePost({
        data,
        url: dataAnalysisMap.exportHistoryReport,
        responseType: 'blob',
    })
}



/** 下载电站运行报表  */
export function exportRunReport(params: any) {
    return useGet({
        params,
        url: dataAnalysisMap.exportRunReport,
        responseType: 'blob',
    })
}



/** 电站、设备收益报表 ess/income/incomeExport?stationSerial=ESCNGXAH02&startTime=2023-07-01&type=D&endTime=2023-08-25&device= */
  export function exportIncomeExport(params: any) {
    return useGet({
        params,
        url: dataAnalysisMap.incomeExport,
        responseType: 'blob',
    })
}

/** 设备历史数据下载 */
  export function historyDataExport(data: any) {
    return usePost({
        data,
        url: dataAnalysisMap.historyDataExport,
        responseType: 'blob',
    })
}
