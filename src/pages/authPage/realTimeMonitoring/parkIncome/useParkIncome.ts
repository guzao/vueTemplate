import { watch, ref } from 'vue'
import { useReactiveHttp } from '@/hooks'
import { useAppData, useDicts } from '@/store'

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