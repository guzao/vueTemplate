import { isTrue } from './utils'
import { IntervalTime } from '@/enum'
import { ElNotification } from 'element-plus'
import { useEventListener } from '@vueuse/core'
import { useInterval, useOnlineWatch } from '@/hooks'
import { notInsideSystemPage } from './HTTP/responseHandle'
import { useI18nStore, useAppData, useLayout, useSystemConfig } from "@/store"

export function useApp() {

  const I18nStore = useI18nStore()

  const systemConfig = useSystemConfig()

  useLoopEvent()

  useEvent()

  return {
    I18nStore,
    systemConfig
  }

}


/** 定时获取数据 */
function useLoopEvent() {

  const { loopGetParkAuthLastTime, loopGetStationRuningState } = useAppData()

  /** 定时获取电站最新数据 */
  useInterval(IntervalTime.FIVE_MINIUTE, loopGetParkAuthLastTime)

  /** 定时获取电站最新运行状态 */
  useInterval(IntervalTime.TEN_MINIUTE, loopGetStationRuningState)

}


/** 事件监听 */
function useEvent() {

  const layout = useLayout()

  // 快捷键 返回顶部、底部
  useEventListener('keyup', (evnet) => {
    if (notInsideSystemPage()) return
    if (evnet.key.toLowerCase() === 't') return layout?.scrollTop()
    if (evnet.key.toLowerCase() === 'b') return layout?.scrollbarRef?.setScrollTop(999999999)
  })


  useOnlineWatch((online) => {
    if (isTrue(online)) return
    ElNotification({
      title: 'Error',
      message: '网络异常,请检查网络',
      type: 'error',
    })
  })

}