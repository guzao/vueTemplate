import { describe, test, expect } from 'vitest'
import { getFormatter, getWeekFirstDay, paserTime, getRunningDay, getPrevMonth, writeDefaultDate, fillTodayDate  } from '@/utils/dateUtils/common'

describe('common', () => {

    test('writeDefaultDate', () => {
        const time = +new Date()
        expect(writeDefaultDate(time)).toBe(time)
        expect(writeDefaultDate('' as any)).not.toBe('')
        expect(writeDefaultDate(null as any)).not.toBe(null)
    })

    test('getFormatter', () => {

        expect(getFormatter('D')).toBe('YYYY-MM-DD')
        expect(getFormatter('W')).toBe('YYYY-MM-DD')
        expect(getFormatter('M')).toBe('YYYY-MM')
        expect(getFormatter('Y')).toBe('YYYY')

    })

    test('getWeekFirstDay', () => {

        expect(paserTime(getWeekFirstDay(new Date(2023, 7, 26)), 'YYYY-MM-DD')).toBe('2023-08-21')

        expect(paserTime(getWeekFirstDay(new Date(2023, 7, 19)), 'YYYY-MM-DD')).toBe('2023-08-14')

        expect(paserTime(getWeekFirstDay(new Date(2023, 7, 20)), 'YYYY-MM-DD')).toBe('2023-08-14')


    })
    
    test('getRunningDay', () => {
        expect(getRunningDay(+new Date(2023,7, 1))).not.toBe(32)
    })
    
    test('fillTodayDate', () => {
        const exec = fillTodayDate(+new Date())
        expect(fillTodayDate(+new Date())).toEqual(exec)
    })

    test('getPrevMonth', () => {

        expect(paserTime(getPrevMonth(new Date(2023, 7), 1), 'YYYY-MM')).toBe('2023-07')
        expect(paserTime(getPrevMonth(new Date(2023, 7), 2), 'YYYY-MM')).toBe('2023-06')
        expect(paserTime(getPrevMonth(new Date(2023, 7), 3), 'YYYY-MM')).toBe('2023-05')
        expect(paserTime(getPrevMonth(new Date(2023, 7), 12), 'YYYY-MM')).toBe('2022-08')
        expect(paserTime(getPrevMonth(new Date(2023, 7), 24), 'YYYY-MM')).toBe('2021-08')

    })
})