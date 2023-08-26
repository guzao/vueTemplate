import DayJs from 'dayjs'
import { useAppData } from '@/store'
import { computed, Ref, ref, watch } from 'vue'
import { useEcharts, useReactiveHttp } from '@/hooks'
import { isFalse, paserTime, getFormatter, getWeekFirstDay } from '@/utils'

type ActionType = 'prev' | 'next'

export function useIncomeChart() {
    
    const appData = useAppData()

    const type = ref<DateType>('D')

    const { chartRef } = useEcharts(200)

    const currentTime = ref(appData.currentLastTime)

    const formatType = computed(() => getFormatter(type.value))

    const disabled = computed(() => paserTime(currentTime.value, formatType.value) >= paserTime(appData.currentLastTime, formatType.value))

    const prevTime = () => setTime('prev')

    const nextTime = () => isFalse(disabled.value) && setTime('next')

    const setTime = setDate(type, currentTime)

    watch(type, (type) => {
        if (type == 'W') return currentTime.value = +getWeekFirstDay(appData.currentLastTime)
        currentTime.value = appData.currentLastTime
    })

    watch(() => appData.currentParkSerial, () => {
        currentTime.value = appData.currentLastTime
        console.log('get park income price');
    })

    return {
        type,
        chartRef,
        currentTime,
        prevTime,
        nextTime,
        disabled,
        formatType,
    }

}

const getActionType = (type: DateType) => {
    switch (type) {
        case 'D':
            return 'd'
        case 'W':
            return 'W'
        case 'M':
            return 'M'
        default:
            return 'y'
    }
    
}


function setDate(type: Ref<DateType>, currentTime: Ref<number>) {
    return (actionType: ActionType) => {

        let unit = getActionType(type.value) as any

        const actionValue = unit == 'W' ? 7 : 1
        
        if (unit == 'W')  unit = 'd'

        switch (actionType) {
            case 'next':
                currentTime.value = +DayJs(currentTime.value).add(actionValue, unit).toDate()
                break
            case 'prev':
                currentTime.value = +DayJs(currentTime.value).subtract(actionValue, unit).toDate()
                break
        }
    }
}

