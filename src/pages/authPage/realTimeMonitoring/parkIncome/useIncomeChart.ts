import { ref, watch } from 'vue'
import { useAppData } from '@/store'
import { useEcharts } from '@/hooks'


export function useIncomeChart () {

    const appData = useAppData()

    const currentTime = ref(appData.currentLastTime)

    const { chartRef } = useEcharts(200)

    const type = ref<DateType>('D')

    watch(() => appData.currentLastTime, () => currentTime.value = appData.currentLastTime)

    return {
        type,
        chartRef,
        currentTime
    }

}
