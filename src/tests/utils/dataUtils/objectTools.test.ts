import { describe, test, expect } from 'vitest'
import { objectForEach, deepCloe, has, ownKeys, objectIsEmpty, objectNotEmpty, objectToArray, objectSize } from '@/utils/dataUtils/objectTools'

describe('objectTools', () => {


    test('objectForEach', () => {

        const exec = [ [ 'id', 1 ], [ 'name', 2 ] ]

        const origin  = { id: 1, name: 2 }

        const test1: typeof exec = []

        objectForEach(origin, (value, key) => {
            test1.push([  key, value])
        })

        expect(test1).toEqual(exec)

    })


    test('deepCloe', () => {
        const origin  = { id: 1, name: 2 }
        expect(deepCloe(origin)).not.toBe(origin)
    })

    test('has', () => {
        const origin  = { id: 1, name: 2 }
        expect(has(origin, 'id')).toBe(true)
        expect(has(origin, 'name1')).toBe(false)
    })
    
    test('ownKeys', () => {
        const origin  = { id: 1, name: 2 }
        expect(ownKeys(origin)).toEqual([ 'id', 'name' ])
    })
    
    
    test('objectIsEmpty', () => {
        const origin  = { id: 1, name: 2 }
        expect(objectIsEmpty(origin)).toBe(false)
        expect(objectIsEmpty({})).toBe(true)
    })
    
    
    test('objectNotEmpty', () => {
        const origin  = { id: 1, name: 2 }
        expect(objectNotEmpty(origin)).toBe(true)
        expect(objectNotEmpty({})).toBe(false)
    })
    
    test('objectToArray', () => {
        const origin  = { id: 1, name: 2 }
        expect(objectToArray(origin)).toEqual([ [ 'id', 1 ],[ 'name', 2 ]  ])
    })
    
    
    test('objectSize', () => {
        const origin  = { id: 1, name: 2 }
        expect(objectSize(origin)).toBe(2)
        expect(objectSize({})).toBe(0)
    })
    
    
})