import DayJs from 'dayjs'
import { addDate } from './setDate'
import { isFalse } from '../dataUtils'
import { Common, IntervalTime } from '@/enum'
import { isDate, isTrue } from '../dataUtils'

/** 一天的时间 */
export const allDayNumber = 24 * 60 * 60 * 1000

/**
 *                              年月日时分秒毫秒                 年月日时分秒            年月日时分           年月日时           年月日        年月       年       时分
*/
export type parserTimeFormat = 'YYYY-MM-DD HH:mm:ss:SSS' | 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD HH' | 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY' | 'HH:mm'

/** 格式化时间 */
export const parserTime = (time: Date | number, format: parserTimeFormat) => isFalse(time) ? '--' : DayJs(time).format(format)

/**
 * 标准化时间数据
*/
export const normalizeDate = (date: number | string | Date) => (isDate(date) ? date : new Date(date)) as Date


/** 传入的日期不存在 就返回一个当前日期时间戳 */
export const writeDefaultDate = (time: Date | number) => time || +new Date()



/** 获取运行时长 */
export const getRunningDay = (starTime: number) => Math.ceil((Date.now() - starTime) / allDayNumber)


/** 填充一天的数据点 */
export const fillTodayDate = (date: number) => {
    let startTime = +new Date(parserTime(date, 'YYYY-MM-DD') + ' 00:00:00')
    return Array.from({ length: (12 * 24) + 2 }).map((_, index) => {
        if (index !== 0) startTime += (1000 * 60) * 5
        return [parserTime(startTime, 'YYYY-MM-DD HH:mm:ss'), 0]
    })
}


/** 
 * 获取当前月前一个月
*/
export function getPrevMonth(baseDate: Date, gapMonth: number) {
    const currentMonth = DayJs(baseDate).get('month')
    const nextMonth = DayJs(baseDate).set('month', currentMonth - gapMonth)
    return nextMonth.toDate()
}

export const getCurrentMonthFirstDay = (baseDate: Date) => DayJs(baseDate).startOf('month').toDate()

export const getCurrentYearFirstDay = (baseDate: Date) => DayJs(baseDate).startOf('year').toDate()

export function getCurrentMonthLastDay(baseDate: Date | number) {
    const date = normalizeDate(baseDate)
    const prevMonth = DayJs(date).startOf('month').add(1, 'month')
    return DayJs(prevMonth).subtract(1, 'day').toDate()
}


/**
 * 根据传入的时间 获取本周的第一天
*/
export const getWeekFirstDay_ = (baseDate: Date) => DayJs(baseDate).startOf('week').toDate()

/**
 * 根据 type 得出时间区间
*/
export function getDateCycles(type: string, baseDate: Date) {
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
export function getWeekFirstDay(origin: Date | number) {

    let baseDate = normalizeDate(origin)

    const day = baseDate.getDay() - 1

    baseDate = isTrue(day == -1) ? new Date(+baseDate - (6 * allDayNumber)) : new Date(+baseDate - (day * allDayNumber))

    const { Y, M, D, } = getYearMonthDayHms(baseDate)

    return new Date(Y, M, D, 0, 0, 0)

}


/**
 * 获取指定日期的年月日时分秒
*/
export function getYearMonthDayHms(origin: Date) {
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
export const getFormatter = (type: dataType) => {
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

/**
 * 未超出时间范围
*/
export const notExpire = (startDate: number | string | Date, maxTime: number = 5) => !(Date.now() > +addDate(normalizeDate(startDate), maxTime))


enum TimeUnit {
    DAY = '天',
    HOUR = '小时',
    MINUTE = '分钟',
    SECOND = '秒'
}


/**
 * 获取相对时间
*/
export function getRelativeTime(timestamp: number): TimeUnit {
    const now = new Date().getTime();
    const diff = now - timestamp;

    const days = Math.floor(diff / (IntervalTime.ONE_DAY as any));
    const hours = Math.floor((diff % (IntervalTime.ONE_DAY as any)) / (IntervalTime.ONE_HOURS as any));
    const minutes = Math.floor((diff % (IntervalTime.ONE_HOURS as any)) / (IntervalTime.ONE_MINIUTE as any));
    const seconds = Math.floor((diff % (IntervalTime.ONE_MINIUTE as any)) / (IntervalTime.ONE_SECOND as any));

    let relativeTime: TimeUnit;

    if (days > 0) {
        relativeTime = TimeUnit.DAY;
    } else if (hours > 0) {
        relativeTime = TimeUnit.HOUR;
    } else if (minutes > 0) {
        relativeTime = TimeUnit.MINUTE;
    } else if (seconds > 0) {
        relativeTime = TimeUnit.SECOND;
    } else {
        relativeTime = TimeUnit.SECOND;
    }

    return relativeTime;
}