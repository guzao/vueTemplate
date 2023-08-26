import {  describe, test, expect} from 'vitest'
import { paserTime } from '@/utils/dateUtils/common'
import { addDate, addMonth, addYear, subtractDate, subtractMonth, subtractYear } from '@/utils/dateUtils/setDate'

describe('setdate', () => {


    test('addDate',  () => {

        let testDate = new Date()

        testDate = addDate(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY-MM-DD')).toBe('2023-08-28')
        
        testDate = addDate(testDate, 1)

        expect(paserTime(testDate, 'YYYY-MM-DD')).toBe('2023-08-29')


    })

    test('addMonth',  () => {

        let testDate = new Date()

        testDate = addMonth(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY-MM')).toBe('2023-10')
        
        testDate = addMonth(testDate, 1)

        expect(paserTime(testDate, 'YYYY-MM')).toBe('2023-11')


    })
    
    test('addYear',  () => {

        let testDate = new Date()

        testDate = addYear(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY')).toBe('2025')
        
        testDate = addYear(testDate, 1)

        expect(paserTime(testDate, 'YYYY')).toBe('2026')


    })

    test('subtractDate',  () => {

        let testDate = new Date()

        testDate = subtractDate(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY-MM-DD')).toBe('2023-08-24')
        
        testDate = subtractDate(testDate, 1)

        expect(paserTime(testDate, 'YYYY-MM-DD')).toBe('2023-08-23')


    })

    test('subtractMonth',  () => {

        let testDate = new Date()

        testDate = subtractMonth(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY-MM')).toBe('2023-06')
        
        testDate = subtractMonth(testDate, 1)

        expect(paserTime(testDate, 'YYYY-MM')).toBe('2023-05')


    })


    test('subtractYear',  () => {

        let testDate = new Date()

        testDate = subtractYear(testDate, 2)
        
        expect(paserTime(testDate, 'YYYY')).toBe('2021')
        
        testDate = subtractYear(testDate, 1)

        expect(paserTime(testDate, 'YYYY')).toBe('2020')


    })

})