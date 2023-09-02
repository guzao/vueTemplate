import { describe, test, expect } from 'vitest'
import { isBoolean, isArray, isDate, isEmptyString, isFunction, isNaN, isNull, isNumber, isObject, isString, isStringNull, isStringUndefind, isUndefined } from '@/utils/dataUtils/dataTypeTools'

describe('dataTypeTools', () => {


    test('isBoolean', () => {

        expect(isBoolean(false)).toBe(true)

        expect(isBoolean(true)).toBe(true)

    })

    test('isUndefined', () => {

        expect(isUndefined(undefined)).toBe(true)

        expect(isUndefined(true)).toBe(false)

    })


    test('isArray', () => {

        expect(isArray([])).toBe(true)

        expect(isArray({})).toBe(false)


    })


    test('isDate', () => {

        expect(isDate(new Date())).toBe(true)

        expect(isDate({})).toBe(false)

        expect(isDate(1)).toBe(false)


    })


    test('isEmptyString', () => {

        expect(isEmptyString('')).toBe(true)

        expect(isEmptyString({})).toBe(false)

    })

    test('isFunction', () => {

        expect(isFunction('')).toBe(false)
        expect(isFunction({})).toBe(false)

        expect(isFunction(() => { })).toBe(true)
        expect(isFunction(function ad() { })).toBe(true)

    })

    test('isNaN', () => {

        expect(isNaN({})).toBe(false)
        expect(isNaN(+'ccc')).toBe(true)

    })

    test('isNull', () => {

        expect(isNull(null)).toBe(true)
        expect(isNull('')).toBe(false)

    })

    test('isNumber', () => {

        expect(isNumber(1)).toBe(true)
        expect(isNumber(1.2)).toBe(true)
        expect(isNumber(-1)).toBe(true)
        expect(isNumber(-1.1)).toBe(true)
        expect(isNumber('')).toBe(false)

    })


    test('isObject', () => {

        expect(isObject({})).toBe(true)
        expect(isObject([])).toBe(false)
        expect(isObject('')).toBe(false)
        expect(isObject(new Date())).toBe(false)

    })

    test('isString', () => {

        expect(isString('')).toBe(true)
        expect(isString({})).toBe(false)
        expect(isString([])).toBe(false)
        expect(isString(new Date())).toBe(false)

    })

    test('isStringNull', () => {

        expect(isStringNull('null')).toBe(true)
        expect(isStringNull({})).toBe(false)
        expect(isStringNull([])).toBe(false)
        expect(isStringNull(new Date())).toBe(false)

    })


    test('isStringUndefind', () => {

        expect(isStringUndefind('undefined')).toBe(true)
        expect(isStringUndefind({})).toBe(false)
        expect(isStringUndefind([])).toBe(false)
        expect(isStringUndefind(new Date())).toBe(false)

    })



})