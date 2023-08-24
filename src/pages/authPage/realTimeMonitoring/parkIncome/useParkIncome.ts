import { watch, ref } from 'vue'
import { useAppData, useDicts } from '@/store'
import { useEcharts, useReactiveHttp } from '@/hooks'

export function useParkIncome () {


    const dicts = useDicts()
    const appData = useAppData()

    watch(() => appData.currentParkSerial, () => {
        console.log('======');
    })

    return {
        appData,
        dicts
    }

}