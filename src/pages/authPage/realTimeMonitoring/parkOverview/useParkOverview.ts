import { ref, onMounted, onUnmounted } from 'vue'
import type { EChartsOption, ECharts } from 'echarts'
import * as echarts from 'echarts'
import { useAppData } from '@/store'
import { useReactiveHttp } from '@/hooks'
import { getStationInfo } from '@/API'


const appData = useAppData()


const { result: parkOverview, getResult: getParkOverview, loading } = useReactiveHttp({
    initData: {} as ParkRuningInfo,
    request: () => getStationInfo(appData.parkSerial),
    requestCallback: (res) => {
        parkOverview.value = res.data
        return res.data
    }
})




export function useParkOverview () {

    return {
        getParkOverview,
        loading,
        parkOverview,
        appData
    }

}

export function useEcharts (oprions: EChartsOption) {

    const chartRef = ref<any>()

    let chartInstance: ECharts

    function renderChart () {
        chartInstance = echarts.init(chartRef.value)
        chartInstance.setOption(oprions)
    }

    onMounted(() => {

    })

    onUnmounted(() => {
        window.addEventListener('resize', chartInstance?.resize()!)
    })



    return {
        chartRef,
        renderChart
    }

}