import { ref, onUnmounted } from 'vue'
import type { EChartsOption, ECharts } from 'echarts'
import * as echarts from 'echarts'
import { isTrue } from '@/utils'



/** 使用图表 */
export function useEcharts() {

    const chartRef = ref<any>()

    let chartInstance: ECharts

    const chartResize = () =>  chartInstance.resize()

    function renderChart(oprions: EChartsOption) {
        chartInstance = isTrue(chartInstance) ? chartInstance :  echarts.init(chartRef.value)
        chartInstance.setOption(oprions)
        window.addEventListener('resize', chartResize)
    }

    onUnmounted(() => {
        window.addEventListener('resize', chartResize)
        chartInstance?.dispose()
    })



    return {
        chartRef,
        renderChart,
        chartResize,
        echarts
    }

}