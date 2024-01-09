import { parkModel } from '@/ApiMap'
import { useGet, usePost } from '@/HTTP'

/** 获取测点类型列表 */
export function getMetricModelList(params: any) {
    return useGet({
        url: parkModel.metricModelList,
        params
    })
}