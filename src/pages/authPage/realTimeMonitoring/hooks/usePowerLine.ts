import { useAppData } from '@/store'
import { nextTick, ref, watch, inject } from 'vue'
import { geStationPowerAll, geStationPowerByUnit } from '@/API'
import { deviceDetailContextKey } from '../deviceDetail/useDevice'
import { useEcharts, useInterval, useReactiveHttp } from '@/hooks'
import { allDayNumber, fillTodayDate, paserTime, writeDefaultDate } from '@/utils'


type UsePowerLineConfig = {
    /** 图表高度 */
    height: number,
    /** 功率曲线的类型 park 电站  device 设备 */
    device: 'park' | 'device'
}

/** 实时功率曲线 */
export function usePowerLine(config: UsePowerLineConfig) {

    const appData = useAppData()

    const hasCurrentDay = () => paserTime(Date.now(), 'YYYY-MM-DD') == paserTime(currentTime.value, 'YYYY-MM-DD')

    const currentTime = ref(writeDefaultDate(appData.currentLastTime))

    const nextDisabled = ref(hasCurrentDay())


    const deviceDetailContext = inject(deviceDetailContextKey, {} as any)
    
    const prevTime = () => {
        currentTime.value = +currentTime.value - allDayNumber
        getResult()
    }

    const nextTime = () => {
        if (hasCurrentDay()) return
        currentTime.value = +currentTime.value + allDayNumber
        getResult()
    }

    const { renderChart, chartRef, echarts } = useEcharts(config.height)

    const gridRight = config.device == 'park' ? '0%' : '1%'

    const render = async (data: ParkPowerLine[]) => {
        await nextTick()
        renderChart({
            animation: false,
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(26, 27, 28, 0.9);',
                textStyle: {
                    color: '#fff',
                },
            },
            grid: {
                top: '6%',
                left: '1%',
                right: gridRight,
                bottom: '4%',
                containLabel: true
            },
            xAxis: {
                type: 'time',
                axisTick: {
                    show: false
                },
                maxInterval: 1000 * 60 * 60,
                axisLabel: {
                    color: 'rgba(153, 153, 153, 1)',
                    fontSize: 12,
                    formatter: (time: any) => {
                        const date = new Date(time)
                        const hours = date.getHours().toString()
                        if (hours == `${0}`) return '24'
                        return hours
                    }
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
                splitArea: {
                    show: true,
                }
            },
            series: [
                {
                    data: (data as ParkPowerLine[]).map(({ createTime, power }) => [+new Date(createTime), power]),
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    color: 'rgb(14, 169, 68)',
                    name: '实时功率',
                    triggerLineEvent: false,
                    showSymbol: false,
                    showAllSymbol: false,
                    animation: false,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 1,
                                color: 'rgb(199, 255, 218)'
                            },
                            {
                                offset: 0,
                                color: 'rgb(37, 211, 98)'
                            }
                        ])
                    },
                    emphasis: {
                        disabled: true
                    },
                    lineStyle: {
                        width: 1
                    },
                },
                {
                    legendHoverLink: false,
                    triggerLineEvent: false,
                    showSymbol: false,
                    name: '辅助线',
                    type: 'line',
                    data: fillTodayDate(+currentTime.value),
                    symbol: 'none',
                    symbolSize: 0,
                    silent: true,
                    lineStyle: {
                        width: 0
                    },
                }
            ]
        })
    }


    const getMetholds = () => {
        if (config.device == 'park') {
            return geStationPowerAll({ stationSerial: appData.currentParkSerial, date: paserTime(currentTime.value, 'YYYY-MM-DD') })
        } else {
            return geStationPowerByUnit({ stationSerial: appData.currentParkSerial, date: paserTime(writeDefaultDate(appData.currentLastTime), 'YYYY-MM-DD'), unitId: deviceDetailContext?.unitId })
        }
    }

    const { getResult, loading } = useReactiveHttp({
        initData: [] as ParkPowerLine[],
        request: () => getMetholds(),
        requestCallback: async ({ data }) => {
            render(data)
            return data
        }
    })


    const { _resetInterval } = useInterval(1000 * 60 * 3, getResult)

    watch(() => config.device == 'park' ? appData.currentParkSerial : deviceDetailContext?.unitId, () => {
        currentTime.value = writeDefaultDate(appData.currentLastTime)
        _resetInterval()
        getResult()
    })

    watch(currentTime, () => nextDisabled.value = hasCurrentDay())

    return {
        hasCurrentDay,
        currentTime,
        prevTime,
        nextDisabled,
        nextTime,
        chartRef,
        loading
    }

}