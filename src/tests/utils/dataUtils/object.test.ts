import { describe, it, expect } from 'vitest'
import { has, objectForEach, objectIsEmpty, objectNotEmpty, objectToArray, deepCloe, shallowClone } from '../../../utils'



const obj = {
    name: 'name_',
    label: 'label',
    click: 'click',
}

describe('object tools ', () => {

    it('objectForEach', () => {

        const result: (string | number)[][] = []
        objectForEach(obj, (value, key, index) => {
            result.push([value, key, index])
        })
        expect(result).toEqual([
            ['name_', 'name', 0],
            ['label', 'label', 1],
            ['click', 'click', 2],
        ])

    })

    it('has', () => {

        expect(has(obj, 'name')).toBe(true)
        expect(has(obj, 'label')).toBe(true)
        expect(has(obj, 'click')).toBe(true)
        expect(has(obj, 'label_')).toBe(false)

    })

    it('objectIsEmpty', () => {

        expect(objectIsEmpty(obj)).toBe(false)
        expect(objectIsEmpty({})).toBe(true)

    })

    it('objectNotEmpty', () => {

        expect(objectNotEmpty(obj)).toBe(true)
        expect(objectNotEmpty({})).toBe(false)

    })

    it('objectToArray', () => {

        const exec = [
            ['name', 'name_'],
            ['label', 'label'],
            ['click', 'click'],
        ]

        expect(objectToArray(obj)).toEqual(exec)

    })
    
    it('deepCloe', () => {

        expect(deepCloe(obj) !== obj).toBe(true)
        expect(deepCloe(obj) == obj).toBe(false)

    })

    it('shallowClone', () => {

        const test = {
            a: 1,
            c: {
                d: 1
            }
        }

        expect(shallowClone(test).c == test.c).toBe(true)

    })



})

