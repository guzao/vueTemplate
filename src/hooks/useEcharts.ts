import * as echarts from 'echarts'
import { layoutConfig } from '@/config'
import { isTrue, sleep } from '@/utils'
import { useAppData, useSystemConfig } from '@/store'
import type { EChartsOption, ECharts } from 'echarts'
import { ref, onBeforeUnmount, watch, onMounted, nextTick, shallowRef } from 'vue'



/** 
 * 使用图表 
 * @param chartHeight 图表高度
 * */
export function useEcharts(chartHeight?: number) {

    const systemConfig = useSystemConfig()

    const appData = useAppData()

    const chartRef = ref<HTMLElement>()
    
    let chartInstance = shallowRef<ECharts>()

    const chartResize = () => chartInstance.value?.resize()

    watch(() => appData.isCollapse, async () => {
        await sleep(500)
        chartResize()
    })

    async function renderChart(oprions: EChartsOption) {
        await nextTick()
        chartInstance.value = isTrue(chartInstance.value) ? chartInstance.value : echarts.init(chartRef.value)
        chartInstance.value!.setOption(oprions, true)
        window.addEventListener('resize', chartResize)
        chartResize()
        return chartInstance.value!
    }

    onMounted(() => {
        (chartRef.value as HTMLElement).style.height = chartHeight ? chartHeight + 'px' : layoutConfig.chartHeight + 'px';
    })

    onBeforeUnmount(() => {
        window.removeEventListener('resize', chartResize)
        chartInstance?.value?.dispose()
    })


    return {
        chartInstance,
        chartRef,
        renderChart,
        chartResize,
        echarts,
        systemConfig
    }

}