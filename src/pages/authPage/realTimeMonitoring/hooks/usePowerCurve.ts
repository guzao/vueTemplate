import { IntervalTime } from '@/enum'
import { setRgbaColor, useAppData } from '@/store'
import { nextTick, ref, watch, inject, computed } from 'vue'
import { geStationPowerAll, geStationPowerByUnit } from '@/API'
import { deviceDetailContextKey } from '../deviceDetail/useDevice'
import { useEcharts, useInterval, useReactiveHttp } from '@/hooks'
import { allDayNumber, fillTodayDate, isFalse, isTrue, parserTime, writeDefaultDate, getLocalLangMessage } from '@/utils'


type UsePowerCurveConfig = {
    /** 图表高度 */
    height: number,
    /** 功率曲线的类型 park 电站  device 设备 */
    device: 'park' | 'device'
}

/** 实时功率曲线 */
export function usePowerCurve(config: UsePowerCurveConfig) {

    const appData = useAppData()

    const currentTime = ref(writeDefaultDate(appData.currentLastTime))

    const nextDisabled = computed(() => parserTime(Date.now(), 'YYYY-MM-DD') == parserTime(currentTime.value, 'YYYY-MM-DD'))

    const deviceDetailContext = inject(deviceDetailContextKey, {} as any)

    const { renderChart, chartRef, echarts, systemConfig } = useEcharts(config.height)

    const gridRight = config.device == 'park' ? '0%' : '1%'

    const render = async (data: ParkPowerLine[]) => {

        const lineData = (data as ParkPowerLine[]).map(({ createTime, M7 }) => [+new Date(createTime), M7])
        const { power } = getLocalLangMessage()['common']
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
                    data: lineData,
                    type: 'line',
                    symbol: 'none',
                    smooth: true,
                    name: power,
                    color: systemConfig.themeColor,
                    triggerLineEvent: false,
                    showSymbol: false,
                    showAllSymbol: false,
                    animation: false,
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 1,
                                color: systemConfig.themeColor
                            },
                            {
                                offset: 0,
                                color: setRgbaColor(systemConfig.themeColor, 0.5)
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
        return config.device == 'park'
            ? geStationPowerAll({ stationSerial: appData.currentParkSerial, date: parserTime(currentTime.value, 'YYYY-MM-DD') })
            : geStationPowerByUnit({ stationSerial: appData.currentParkSerial, date: parserTime(writeDefaultDate(currentTime.value), 'YYYY-MM-DD'), unitId: deviceDetailContext?.unitId })
    }

    const { getResult, loading } = useReactiveHttp({
        initData: [] as ParkPowerLine[],
        request: () => getMetholds(),
        requestCallback: async ({ data }) => {
            render(data)
            return data
        }
    })

    const prevTime = () => {
        if (isTrue(loading.value)) return
        currentTime.value = +currentTime.value - allDayNumber
        getResult()
    }

    const nextTime = () => {
        if (isTrue(loading.value)) return
        if (nextDisabled.value) return
        currentTime.value = +currentTime.value + allDayNumber
        getResult()
    }

    const { _resetInterval } = useInterval(IntervalTime.FIVE_MINIUTE, getResult)

    watch(() => config.device == 'park' ? appData.currentParkSerial : deviceDetailContext?.unitId, (value) => {
        if (isFalse(value) && isTrue(config.device == 'park')) return
        currentTime.value = writeDefaultDate(appData.currentLastTime)
        _resetInterval()
        getResult()
    })



    return {
        currentTime,
        prevTime,
        nextDisabled,
        nextTime,
        chartRef,
        loading,
        appData,
        getResult
    }

}


