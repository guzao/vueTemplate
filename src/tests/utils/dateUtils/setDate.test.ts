import {  describe, test, expect} from 'vitest'
import { paserTime } from '@/utils/dateUtils/common'
import { addDate, addMonth, addYear, subtractDate, subtractMonth, subtractYear } from '@/utils/dateUtils/setDate'

describe('setdate', () => {


    test('addDate',  () => {

        let testDate = new Date(2023, 7, 26)

        testDate = addDate(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY-MM-DD')).toBe('2023-08-28')
        
        testDate = addDate(testDate, 1)

        expect(paserTime(testDate, 'YYYY-MM-DD')).toBe('2023-08-29')


    })

    test('addMonth',  () => {

        let testDate = new Date(2023, 7)

        testDate = addMonth(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY-MM')).toBe('2023-10')
        
        testDate = addMonth(testDate, 1)

        expect(paserTime(testDate, 'YYYY-MM')).toBe('2023-11')


    })
    
    test('addYear',  () => {

        let testDate = new Date(2023, 0, 0, 0, 0, 0)

        testDate = addYear(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY')).toBe('2024')
        
        testDate = addYear(testDate, 1)

        expect(paserTime(testDate, 'YYYY')).toBe('2025')


    })

    test('subtractDate',  () => {

        let testDate = new Date(2023, 7, 26)

        testDate = subtractDate(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY-MM-DD')).toBe('2023-08-24')
        
        testDate = subtractDate(testDate, 1)

        expect(paserTime(testDate, 'YYYY-MM-DD')).toBe('2023-08-23')


    })

    test('subtractMonth',  () => {

        let testDate = new Date(2023, 7)

        testDate = subtractMonth(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY-MM')).toBe('2023-06')
        
        testDate = subtractMonth(testDate, 1)

        expect(paserTime(testDate, 'YYYY-MM')).toBe('2023-05')


    })


    test('subtractYear',  () => {

        let testDate = new Date(2023)

        testDate = subtractYear(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY')).toBe('1968')
        
        testDate = subtractYear(testDate, 1)

        expect(paserTime(testDate, 'YYYY')).toBe('1967')


    })

})