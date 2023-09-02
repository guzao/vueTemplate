import * as echarts from 'echarts'
import { layoutConfig } from '@/config'
import { useAppData } from '@/store'
import { isTrue, sleep } from '@/utils'
import type { EChartsOption, ECharts } from 'echarts'
import { ref, onUnmounted, watch, onMounted } from 'vue'



/** 
 * 使用图表 
 * @param chartHeight 图表高度
 * */
export function useEcharts(chartHeight?: number) {

    const appData = useAppData()

    const chartRef = ref<any>()

    let chartInstance: ECharts

    const chartResize = () => chartInstance?.resize()

    watch(() => appData.isCollapse, async () => {
        await sleep(500)
        chartResize()
    })

    function renderChart(oprions: EChartsOption) {
        chartInstance = isTrue(chartInstance) ? chartInstance :  echarts.init(chartRef.value)
        chartInstance.setOption(oprions, true)
        window.addEventListener('resize', chartResize)
        return chartInstance
    }

    onMounted(() => {
        (chartRef.value as HTMLElement).style.height =  chartHeight ? chartHeight + 'px' : layoutConfig.chartHeight + 'px';
    })

    onUnmounted(() => {
        window.removeEventListener('resize', chartResize)
        chartInstance?.dispose()
    })


    return {
        chartRef,
        renderChart,
        chartResize,
        echarts
    }

}