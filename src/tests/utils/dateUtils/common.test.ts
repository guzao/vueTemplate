import { describe, test, expect } from 'vitest'
import { getFormatter, getRunningDay, getWeekFirstDay, paserTime } from '@/utils/dateUtils/common'

describe('common', () => {

    test('getFormatter', () => {

        expect(getRunningDay(+new Date(2022, 7, 26))).toBe(366)
        expect(getRunningDay(+new Date(2023, 7, 26))).toBe(1)
        expect(getRunningDay(+new Date(2023, 7, 25))).toBe(2)

    })

    test('getFormatter', () => {

        expect(getFormatter('D')).toBe('YYYY-MM-DD')
        expect(getFormatter('M')).toBe('YYYY-MM')
        expect(getFormatter('Y')).toBe('YYYY')

    })

    test('getWeekFirstDay', () => {

        expect(paserTime(getWeekFirstDay(new Date()), 'YYYY-MM-DD')).toBe('2023-08-21')

        expect(paserTime(getWeekFirstDay(new Date(2023, 7, 19)), 'YYYY-MM-DD')).toBe('2023-08-14')

    })

})