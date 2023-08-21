import { describe, test, expect } from 'vitest'
import { convertBoolean, isFalse, isTrue, normIsTrue } from '@/utils/dataUtils/booleanTools'

describe('booleanTools', () => {


    test('convertBoolean', () => {
        expect(convertBoolean([])).toBe(true)
        expect(convertBoolean(0)).toBe(false)
        expect(convertBoolean('')).toBe(false)
        expect(convertBoolean(undefined)).toBe(false)
        expect(convertBoolean(null)).toBe(false)
    })

    test('isFalse', () => {
        expect(isFalse(0)).toBe(true)
        expect(isFalse('')).toBe(true)
        expect(isFalse(undefined)).toBe(true)
        expect(isFalse(null)).toBe(true)
    })

    test('isTrue', () => {
        expect(isTrue(0)).toBe(false)
        expect(isTrue('')).toBe(false)
        expect(isTrue(undefined)).toBe(false)
        expect(isTrue(null)).toBe(false)
    })

    test('normIsTrue', () => {
        expect(normIsTrue(0)).toBe(true)
        expect(normIsTrue(0)).not.toBe(false)
        expect(normIsTrue(1)).not.toBe(false)
    })
    
    
})