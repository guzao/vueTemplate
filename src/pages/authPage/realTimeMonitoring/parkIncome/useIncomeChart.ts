import DayJs from 'dayjs'
import { useAppData } from '@/store'
import { getParkIncomeProfile } from '@/API'
import { EChartsOption, EChartsType, graphic } from 'echarts'
import { useEcharts, useReactiveHttp } from '@/hooks'
import { computed, Ref, ref, watch, nextTick } from 'vue'
import { isFalse, paserTime, getFormatter, getWeekFirstDay, getArrayLength, getPriceZoomRationAndUnit } from '@/utils'

type ActionType = 'prev' | 'next'


export function useIncomeChart() {

    const appData = useAppData()

    const type = ref<DateType>('D')

    const { chartRef, renderChart } = useEcharts(200)

    const currentTime = ref(appData.currentLastTime)

    const formatType = computed(() => getFormatter(type.value))

    const createParams = () => {
        return {
            stationSerial: appData.currentParkSerial,
            times: paserTime(currentTime.value, formatType.value),
            type: type.value,
        }
    }

    const { getResult, loading } = useReactiveHttp({
        initData: [] as IncomeProfile[],
        request: () => getParkIncomeProfile(createParams()),
        requestCallback: async ({ data }) => {
            await nextTick()
            renderIncomeChart(renderChart, data)
            return data
        }
    })

    const disabled = computed(() => paserTime(currentTime.value, formatType.value) >= paserTime(appData.currentLastTime, formatType.value))

    const prevTime = () => {
        setTime('prev')
        getResult()
    }

    const nextTime = () => {
        if (isFalse(disabled.value)) {
            setTime('next')
            getResult()
        }
    }

    const setTime = setDate(type, currentTime)

    watch(type, async (type) => {
        await nextTick()
        if (type == 'W') {
            currentTime.value = +getWeekFirstDay(appData.currentLastTime)
            getResult()
            return
        }
        currentTime.value = appData.currentLastTime
        getResult()
    })

    watch(() => appData.currentParkSerial, () => {
        currentTime.value = appData.currentLastTime
        getResult()
    })

    return {
        type,
        loading,
        chartRef,
        currentTime,
        prevTime,
        nextTime,
        disabled,
        formatType,
    }

}


const getActionType = (type: DateType) => {
    switch (type) {
        case 'D':
            return 'd'
        case 'W':
            return 'W'
        case 'M':
            return 'M'
        default:
            return 'y'
    }

}


function renderIncomeChart(renderChart: (oprions: EChartsOption) => EChartsType, data: IncomeProfile[]) {

    data.sort((a, b) => a.times - b.times)

    const yData = data.map((item) => item.disChargeCash - item.chargeCash)

    if (getArrayLength(data) >= 24) yData.push(0)

    renderChart({
        title: {
            text: '元',
            left: '1%',
            textStyle: {
                color: 'rgba(153, 153, 153, 1)',
                fontSize: 12,
            }
        },
        animation: false,
        color: ['#14AB49', '#006DB8', '#fac858'],
        grid: {
            left: '4%',
            right: '1%',
            top: '12%',
            bottom: '14%'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: Array.from({ length: 25 }).map((_, index) => index > 9 ? `${index}:00` : `0${index}:00`),
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
            splitArea: {
                show: true,
            }
        },
        series: [
            {
                name: '收益',
                symbol: 'none',
                triggerLineEvent: false,
                type: 'line',
                showSymbol: false,
                data: yData,
                areaStyle: {
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 1,
                            color: 'rgb(199, 255, 218)'
                        },
                        {
                            offset: 0,
                            color: 'rgb(37, 211, 98)'
                        }
                    ]),
                },
                smooth: true,
                showAllSymbol: false,
                animation: false,
                emphasis: {
                    disabled: true
                },
                lineStyle: {
                    width: 1
                },
            }
        ]
    })

}


function setDate(type: Ref<DateType>, currentTime: Ref<number>) {
    return (actionType: ActionType) => {

        let unit = getActionType(type.value) as any

        const actionValue = unit == 'W' ? 7 : 1

        if (unit == 'W') unit = 'd'

        switch (actionType) {
            case 'next':
                currentTime.value = +DayJs(currentTime.value).add(actionValue, unit).toDate()
                break
            case 'prev':
                currentTime.value = +DayJs(currentTime.value).subtract(actionValue, unit).toDate()
                break
        }
    }
}

