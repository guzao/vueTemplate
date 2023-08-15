import { arrayGroupByMap, generateDnamicTableData } from "@/utils"
import { EChartsOption, EChartsType } from "echarts"

type GroupKey = 'subName' | 'subLevel'

export const createLineCharData = (warning: (WarningData | WarningLevel)[], key: GroupKey) => {
    const deviceGroup = arrayGroupByMap(warning, key)
    const series: any[] = []
    deviceGroup.forEach((value, Key) => {
        series.push({
            data: value.map(item => [item.time, item.count]),
            name: Key,
            type: 'line',
            symbol: 'none',
            smooth: true,
            triggerLineEvent: false,
            showSymbol: false,
            showAllSymbol: false,
            animation: false,
        })
    })
    return series
}

export const renderLine = (renderChart: (oprions: EChartsOption) => EChartsType, data:  (WarningData | WarningLevel) [], key: GroupKey) => {
    renderChart({
        animation: false,
        legend: {
          show: true  
        },
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(26, 27, 28, 0.9);',
            textStyle: {
                color: '#fff',
            },
        },
        grid: {
            top: '16%',
            left: '1%',
            right: '2%',
            bottom: '4%',
            containLabel: true
        },
        xAxis: {
            type: 'time',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: 'rgba(153, 153, 153, 1)',
                fontSize: 12,
            },
            axisLine: {
                lineStyle: {
                    color: '#EBECF0',
                },
            },
        },
        yAxis: {
            type: 'value',
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
        series: createLineCharData(data, key)
    })
}

export const createPieCharData = (warning:  (WarningData | WarningLevel)[], key: GroupKey) => {
    const deviceGroup = arrayGroupByMap(warning, key)
    const series: any[] = []
    deviceGroup.forEach((value, Key) => {
        series.push({
            value: value.reduce((acc, cur) => acc + cur.count, 0),
            name: Key,
        })
    })
    return series
}

export const renderPie = (renderChart: (oprions: EChartsOption) => EChartsType, data:  (WarningData | WarningLevel) [], key: GroupKey) => {
    renderChart({
        tooltip: {
            trigger: "item",
            backgroundColor: 'rgba(26, 27, 28, 0.9);',
            textStyle: {
                color: '#fff',
                fontSize: 12
            },
        },
        legend: {
            left: 'center',
            top: '1%',
        },
        grid: {
            bottom: '4%'
        },
        series: [
            {
                type: 'pie',
                radius: ['45%', '60%'],
                avoidLabelOverlap: false,
                label: {
                    formatter: '{d}%\n{b}',
                },
                emphasis: {
                    scaleSize: 2,
                },
                labelLine: {
                    show: true,
                },
                data: createPieCharData(data, key)
            }
        ]
    })
}