import { watch, ref } from 'vue'
import { useAppData } from '@/store'
import { useEcharts, useReactiveHttp } from '@/hooks'

export function useParkIncome () {


    const appData = useAppData()

    watch(() => appData.currentParkSerial, () => {
        console.log('======');
    })

    return {
        appData
    }

}