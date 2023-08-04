import { useGet, usePost } from '@/HTTP'
import { dataAnalysisMap } from '@/ApiMap'

/** 获取指定电站运行电站报表数据 */
export function getParkRunReport (params: ParkRunReportParams) {
    return useGet({
        url: dataAnalysisMap.runReport,
        params
    })
}

/** 获取指定电站设备运行报表数据 */
export function getDailyReport (params: DailyReportParams) {
    return useGet({
        url: dataAnalysisMap.dailyReport,
        params
    })
}

/** 获取设备历史充放电数据 */
export function getHistoryReport (data: HistoryReportParams) {
    return usePost({
        url: dataAnalysisMap.historyReport,
        data
    })
}