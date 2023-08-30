import { EChartsOption, EChartsType } from 'echarts'
import { isTrue, getArrayLength, arrayGroupByMap, getFirstElement } from '@/utils'


/** 处理电站设备当日数据 */
export function processDailyData(dailyReportData: DailyReportData) {

    const { data } = dailyReportData

    const groupMap = arrayGroupByMap(data, 'subName')
    groupMap.forEach((value) => {
        const firstElement = getFirstElement(value)
        firstElement.limit = getArrayLength(value)
    })

    return dailyReportData

}

/** 设备日充放 */
export function rendererBard(renderChart: (oprions: EChartsOption) => EChartsType, data: DailyReportDataData[]) {

    const length = isTrue(getArrayLength(data) > 5)
    const yAxisData = data.map(({ dev }: DailyReportDataData) =>  dev)

    const option = {
        legend: {},
        grid: {
            left: '2%',
            right: '1%',
            top: '12%',
            bottom: '4%',
            containLabel: true,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            backgroundColor: 'rgba(26, 27, 28, 0.9);',
            textStyle: {
                color: '#fff',
                fontSize: 12
            },
        },
        xAxis: {
            type: length ? 'category' : 'value',
            boundaryGap: [0, 0.01],
            axisLabel: {
                color: 'rgba(153, 153, 153, 1)',
                fontSize: 12
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#EBECF0'
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#CDE7D6'
                }
            },
        },
        yAxis: {
            type: length ? 'value' : 'category',
            axisLabel: {
                color: 'rgba(153, 153, 153, 1)',
                fontSize: 12
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#EBECF0'
                }
            },
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#CDE7D6'
                }
            },
        },
        series: [
            {
                name: '充电',
                data: data.map(({ charge }: DailyReportDataData) =>  charge),
                type: 'bar',
                barMaxWidth: 20
            },
            {
                name: '放电',
                data: data.map(({ discharge }: DailyReportDataData) => discharge),
                type: 'bar',
                barMaxWidth: 20
            }
        ]
    } as EChartsOption
    
    isTrue(length) ? (option as any).xAxis.data = yAxisData : (option as any).yAxis.data = yAxisData

    const instance = renderChart(option)
    
    instance.on('click', e => {
        console.log(e)
    })

}

/** 合并单元格 */
export function objectSpanMethod(limit: number, { row, column, rowIndex, columnIndex }: any) {
    // 处理子站  处理合计
    if (isTrue(columnIndex === 0) || isTrue(columnIndex === 5)) {
        const limit = row.limit
        return limit && isTrue(rowIndex % limit === 0) ? [limit, 1] : [0, 0]
    }
    // 处理总计
    if (isTrue(columnIndex === 6)) {
        return isTrue(rowIndex % limit === 0) ? [limit, 1] : [0, 0]
    }
}