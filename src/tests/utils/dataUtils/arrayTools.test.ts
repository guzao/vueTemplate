import { describe, test, expect } from 'vitest'
import { 
    arrayIsEmpty, arrayIsNotEmpty, getArrayLength, getFirstElement, getLastElement, arrayChunk, arrayGroupBy, arrayGroupByMap, getDataRange, getMaxElement,
    sorted
} from '@/utils/dataUtils/arrayTools'

describe('arrayTools', () => {


    test('arrayIsEmpty', () => {
        expect(arrayIsEmpty([])).toBe(true)
        expect(arrayIsEmpty([1, 2])).not.toBe(true)
    })

    test('arrayIsNotEmpty', () => {
        expect(arrayIsNotEmpty([])).toBe(false)
        expect(arrayIsNotEmpty([1, 2, 3])).not.toBe(false)
        expect(arrayIsNotEmpty([1, 2, 3])).toBe(true)
    })

    
    test('getFirstElement', () => {
        expect(getFirstElement([])).toBe(undefined)
        expect(getFirstElement([1, 2])).toBe(1)
    })
    
    test('getFirstElement', () => {
        expect(getLastElement([])).toBe(undefined)
        expect(getLastElement([1, 2])).toBe(2)
        expect(getLastElement([1, 2, 3])).toBe(3)
    })
    
    test('getArrayLength', () => {
        expect(getArrayLength([])).toBe(0)
        expect(getArrayLength([1, 2])).toBe(2)
        expect(getArrayLength([1, 2, 3])).toBe(3)
    })

    test('arrayChunk', () => {
        expect(arrayChunk([1, 2, 3 , 4], 2)).toEqual([ [1, 2], [ 3, 4 ] ])
        expect(arrayChunk([1, 2, 3 , 4], 1)).toEqual([ [1],  [2],  [3],  [4] ])
    })

    test('arrayGroupBy', () => {
        expect(arrayGroupBy([{ type: 'c', name: 'test' }], 'type')).toEqual([ { id: 'c', children: [ { type: 'c', name: 'test' } ] } ])
        expect(arrayGroupBy([{ type: 'c', name: 'test' }], 'type')).not.toEqual([ { id: 'c', children: [ { type: 'c', name: 'test' } ] }, [] ])
    })
    
    test('arrayGroupByMap', () => {
        const res: Map<any, any []> = new Map()
        res.set('c', [ { type: 'c', name: 'test' } ])

        let test = res.get('c')

        expect(arrayGroupByMap([{ type: 'c', name: 'test' }], 'type')).toEqual(res)
    })

    test('getDataRange', () => {
        const res = [ { start: { index: 1, value: 2 }, end: { index: 2, value: 3 } } ]
        expect(getDataRange([1, 2, 3], item => item > 1)).toEqual(res)
    })
    
    test('getMaxElement', () => {
        const res = [1, 2, 3]
        expect(getMaxElement(res, item => item > 1)).toBe(1)
    })

    test('sorted', () => {
        const res = [1, 2, 3]
        expect(sorted(res, (a, b) => a- b)).toEqual(res)
        expect(sorted(res, (a, b) => b - a)).not.toBe(res)
        expect(sorted(res, (a, b) => b - a)).toEqual([3, 2, 1])
    })
    
    
})