<script lang="ts" setup>
import { watch, nextTick, ref } from 'vue'
import { useAppData } from '@/store'
import { geStationPowerAll } from '@/api'

import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { useReactiveHttp, useInterval, useEcharts } from '@/hooks'
import { paserTime, sleep, allDayNumber, writeDefaultDate, fillTodayDate } from '@/utils';

import TitleBox from '@/components/common/TitleBox.vue';

const appData = useAppData()

const hasCurrentDay = () => paserTime(Date.now(), 'YYYY-MM-DD') == paserTime(currentTime.value, 'YYYY-MM-DD')


const currentTime = ref(writeDefaultDate(appData.currentLastTime))
const nextDisabled = ref(hasCurrentDay())

const prevTime = () => {
    currentTime.value = +currentTime.value - allDayNumber
    getResult()
}

const nextTime = () => {
    if (hasCurrentDay()) return
    currentTime.value = +currentTime.value + allDayNumber
    getResult()
}

const { renderChart, chartRef, chartResize, echarts } = useEcharts()

const { getResult, loading } = useReactiveHttp({
    initData: [] as ParkPowerLine[],
    request: () => geStationPowerAll({ stationSerial: appData.currentParkSerial, date: paserTime(currentTime.value, 'YYYY-MM-DD') }),
    requestCallback: async ({ data }) => {
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
                right: '0%',
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
        return data
    }
})

const { _resetInterval } = useInterval(1000 * 60 * 2, getResult)

watch(() => appData.currentParkSerial, () => {
    currentTime.value = writeDefaultDate(appData.currentLastTime)
    _resetInterval()
    getResult()
})

watch(() => appData.isCollapse, async () => {
    await sleep(500)
    chartResize()
})

watch(currentTime, () => nextDisabled.value = hasCurrentDay())


</script>

<template>
    <div class="overflow-hidden">

        <TitleBox class="my-[10px] ">
            全站实时充放电功率曲线

            <template #right>
                <div class="flex">
                    <div @click="prevTime"
                        class="bg-[var(--theme-white-bg)] w-[20px] flex justify-center items-center rounded-[4px] cursor-pointer">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>
                    </div>
                    <div class="tex-[12px] text-[var(--theme-gray153)] mx-[20px]"> 当前时间：{{ paserTime(currentTime,
                        'YYYY-MM-DD') }} </div>
                    <div @click="nextTime"
                        class="bg-[var(--theme-white-bg)] w-[20px] flex justify-center items-center  rounded-[4px] cursor-pointer">
                        <el-icon>
                            <ArrowRight />
                        </el-icon>
                    </div>
                </div>
            </template>

        </TitleBox>

        <div ref="chartRef" class="h-[206px] overflow-hidden"> </div>

    </div>
</template>