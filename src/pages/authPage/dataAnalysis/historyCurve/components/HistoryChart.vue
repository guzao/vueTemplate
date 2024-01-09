<script lang="ts" setup>
import { t } from '@/langs'
import { useEcharts } from '@/hooks'
import { parserTime } from '@/utils';
import { useFullscreen } from '@vueuse/core'
import { FullScreen } from "@element-plus/icons-vue"
import TitleBox from '@/components/common/TitleBox.vue'
const { chartRef, renderChart, chartResize } = useEcharts(680)


const renderer = (data: any[]) => {
    renderChart(
        {
            legend: {
                type: "scroll",
                top: "5%"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    axis: 'auto',
                    lineStyle: {
                        width: 2,
                        color: '#CDE7D6',
                    },
                },
                backgroundColor: 'rgba(26, 27, 28, 0.9);',
                textStyle: {
                    color: '#fff',
                    fontSize: 12
                },
            },
            animation: false,
            grid: {
                left: '2%',
                right: '1%',
                bottom: '4%',
                top: '14%',
                containLabel: true
            },
            xAxis: {
                type: 'time',
                axisLabel: {
                    color: 'rgba(153, 153, 153, 1)',
                    fontSize: 12,
                    formatter: function (value) {
                        let arr = parserTime(value, 'YYYY-MM-DD HH:mm').split(" ").reverse();
                        return [...arr].join("\n");
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#EBECF0'
                    }
                },

                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(205, 231, 214, 0.6)'
                    }
                },
            },
            toolbox: {
                feature: {
                    dataZoom: {},
                }
            },
            axisPointer: {
                lineStyle: {
                    width: 3,
                    type: 'solid',
                }
            },
            yAxis: {
                type: 'value',
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
                min: 'dataMin',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(205, 231, 214, 0.6)'
                    }
                },
            },
            dataZoom: [
                {
                    type: 'inside',
                },
            ],
            series: data.map(({ name, pointList }) => {
                return {
                    name: name,
                    type: 'line',
                    symbol: 'none',
                    showSymbol: false,
                    legendHoverLink: false,
                    data: pointList
                }
            })
        }
    )

}

defineExpose({
    /** 渲染折线图 */
    renderer: renderer
})


const { toggle } = useFullscreen(chartRef)

</script>

<template>
    <div class="mt-[36px]">

        <div class="flex justify-between items-center">

            <TitleBox> {{ t('common.trendChart') }} </TitleBox>

            <div class="flex items-center">
                
                <el-icon title="全屏展示" @click="toggle" class=" cursor-pointer hover:text-[var(--theme-green-bg)] mr-[12px]">
                    <FullScreen />
                </el-icon>

                <slot />
     

            </div>

        </div>

        <div ref="chartRef" class="bg-[var(--theme-white-bg)]"></div>

    </div>
</template>