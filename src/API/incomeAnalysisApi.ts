import { useGet, usePost } from '@/HTTP'
import { incomeAnalysisMap } from '@/ApiMap'

/** 电站收益参数 */
type IncomeReport = {
    stationSerial: string;
    type: string;
    startTime: string;
    endTime: string;
    device: string | string [];
}

/** 获取指定电站运行电站收益数据 */
export function getIncomeReport(params: IncomeReport) {
    return useGet({
        url: incomeAnalysisMap.incomeReport,
        params
    })
}
