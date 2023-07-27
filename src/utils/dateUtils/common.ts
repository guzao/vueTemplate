import DayJs from 'dayjs'
import { isFalse } from '../dataUtils'

const allDayNumber = 24 * 60 * 60 * 1000


/** 获取运行时长 */
export function getRunningDay(starTime: number) {
    const currentDay = Date.now()
    const diffed = currentDay - starTime
    return Math.ceil(diffed / allDayNumber)
}





type PaserTimeFormat = 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH' | 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY'
/** 格式化时间 */
export const paserTime = (time: Date | number, format: PaserTimeFormat) => isFalse(time) ? '--' : DayJs(time).format(format)
