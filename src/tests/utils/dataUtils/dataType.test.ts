import { expect, it, describe } from 'vitest'
import { isArray, isBoolean, isDate, isFunction, isNull, isNumber, isObject, isStrinNull, isString } from '../../../utils'

describe('data Type Tools', () => {

    it('isArray', () => {

        expect(isArray([])).toBe(true)
        expect(isArray({})).toBe(false)

    })

    it('isBoolean', () => {

        expect(isBoolean(false)).toBe(true)
        expect(isBoolean(true)).toBe(true)
        expect(isBoolean([])).toBe(false)

    })

    
    it('isDate', () => {

        expect(isDate(false)).toBe(false)
        expect(isDate(new Date())).toBe(true)

    })

    it('isFunction', () => {

        expect(isFunction(() => {})).toBe(true)
        expect(isFunction(new Date())).toBe(false)

    })

    it('isNull', () => {

        expect(isNull(null)).toBe(true)
        expect(isNull(new Date())).toBe(false)

    })

    it('isNumber', () => {

        expect(isNumber(null)).toBe(false)
        expect(isNumber(new Date())).toBe(false)
        expect(isNumber(1222)).toBe(true)

    })

    it('isObject', () => {

        expect(isObject(null)).toBe(false)
        expect(isObject(new Date())).toBe(false)
        expect(isObject(1222)).toBe(false)
        expect(isObject({})).toBe(true)

    })

    it('isStrinNull', () => {

        expect(isStrinNull(null)).toBe(false)
        expect(isStrinNull('null')).toBe(true)

    })

    it('isString', () => {

        expect(isString(null)).toBe(false)
        expect(isString(1)).toBe(false)
        expect(isString('null')).toBe(true)

    })

})