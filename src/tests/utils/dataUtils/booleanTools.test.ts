import { expect, it, describe } from 'vitest'
import { convertBoolean, isTrue, isFalse, normIsTrue } from '@/utils'

describe('booleanTools', () => {

    it('convertBoolean', () => {
        expect(convertBoolean('')).toBe(false)
        expect(convertBoolean(0)).toBe(false)
        expect(convertBoolean(undefined)).toBe(false)
        expect(convertBoolean(null)).toBe(false)
        expect(convertBoolean(1)).toBe(true)
        expect(convertBoolean([])).toBe(true)
        expect(convertBoolean({})).toBe(true)
        expect(convertBoolean(new Map())).toBe(true)
    })

    it('isTrue', () => {
        expect(isTrue('')).toBe(false)
        expect(isTrue(0)).toBe(false)
        expect(isTrue(undefined)).toBe(false)
        expect(isTrue(null)).toBe(false)
        expect(isTrue(1)).toBe(true)
        expect(isTrue([])).toBe(true)
        expect(isTrue({})).toBe(true)
        expect(isTrue(new Map())).toBe(true)
    })

    it('isFalse', () => {
        expect(isFalse('')).toBe(true)
        expect(isFalse(0)).toBe(true)
        expect(isFalse(undefined)).toBe(true)
        expect(isFalse(null)).toBe(true)
        expect(isFalse(1)).toBe(false)
        expect(isFalse([])).toBe(false)
        expect(isFalse({})).toBe(false)
        expect(isFalse(new Map())).toBe(false)
    })

    it('normIsTrue', () => {
        expect(normIsTrue(0)).toBe(true)
        expect(normIsTrue(false)).toBe(false)
    })

})