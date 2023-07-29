import DayJs from 'dayjs'
import { isFalse } from '../dataUtils'

export const allDayNumber = 24 * 60 * 60 * 1000


type PaserTimeFormat = 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH' | 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY'
/** 格式化时间 */
export const paserTime = (time: Date | number, format: PaserTimeFormat) => isFalse(time) ? '--' : DayJs(time).format(format)



/** 传入的日期不存在 就返回一个当前日期时间戳 */
export const writeDefaultDate = (time: Date | number) => time || +new Date()



/** 获取运行时长 */
export function getRunningDay(starTime: number) {
    const currentDay = Date.now()
    const diffed = currentDay - starTime
    return Math.ceil(diffed / allDayNumber)
}


/** 填充一天的数据点 */
export const fillTodayDate = (date: number) => {
    let startTime = +new Date(paserTime(date, 'YYYY-MM-DD') + ' 00:00:00')
    return Array.from({ length: (12 * 24) + 2 }).map((item, index) => {
        if (index == 0) {
            return [startTime, 0]
        }
        startTime += (1000 * 60) * 5
        return [paserTime(startTime, 'YYYY-MM-DD HH:mm:ss'), 0]
    })
}

