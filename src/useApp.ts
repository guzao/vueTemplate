import { IntervalTime } from '@/enum'
import { useI18nStore, useAppData } from "@/store"
import { useInterval, useDocumentTitle } from '@/hooks'

export function useApp () {

    useDocumentTitle()

    const { loopGetParkAuthLastTime, loopGetStationRuningState } = useAppData()
    
    const I18nStore = useI18nStore()
    
    /** 定时获取电站最新数据 */
    useInterval(IntervalTime.FIVE_MILLI_SECOND, () => {
      loopGetParkAuthLastTime()
      loopGetStationRuningState()
    })

    return {
        I18nStore
    }

}