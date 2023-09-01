import DayJs from 'dayjs'
import {  } from 'vue'
import { Common } from '@/enum'
import { isDate, isTrue } from '../dataUtils'
import { isFalse } from '../dataUtils'

export const allDayNumber = 24 * 60 * 60 * 1000


export type PaserTimeFormat = 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH' | 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY'
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


/** 
 * 获取当前月前一个月
*/
export function getPrevMonth (baseDate: Date, gapMonth: number) {
    const currentMonth = DayJs(baseDate).get('month')
    const nextMonth = DayJs(baseDate).set('month', currentMonth - gapMonth)
    return nextMonth.toDate()
}


/**
 * 根据 type 得出时间区间
*/
export function getDateCycles (type: string, baseDate: Date) {
    switch (type) {
        case 'D':
            return getPrevMonth(baseDate, 1)
        case 'M':
            return getPrevMonth(baseDate, 6)
        case 'Y':
            return getPrevMonth(baseDate, 24)
    }
    return baseDate
}


/**
 * 根据传入的时间 获取本周的第一天
*/
export function getWeekFirstDay (origin: Date | number) {

    let baseDate = isDate(origin) ? origin as Date : new Date(origin) 

    const day = baseDate.getDay() - 1

    baseDate = isTrue(day == -1) ? new Date(+baseDate - (6 * allDayNumber)) : new Date(+baseDate - (day * allDayNumber))

    const { Y, M, D, } = getYearMonthDayHms(baseDate)

    return new Date(Y, M, D, 0, 0, 0)

}


/**
 * 获取指定日期的年月日时分秒
*/
export function getYearMonthDayHms (origin: Date) {
    const baseDate = DayJs(origin)
    return {
        Y: baseDate.get('years'),
        M: baseDate.get('months'),
        D: baseDate.get('dates'),
        H: baseDate.get('hours'),
        m: baseDate.get('minutes'),
        s: baseDate.get('seconds')
    }
}


/** 获取时间格式化类型 */
export const getFormatter = (type: DateType) => {
    switch (type) {
        case 'D':
            return Common.YYYY_MM_DD
        case 'W':
            return Common.YYYY_MM_DD
        case 'M':
            return Common.YYYY_MM
        default:
            return Common.YYYY
    }
}
