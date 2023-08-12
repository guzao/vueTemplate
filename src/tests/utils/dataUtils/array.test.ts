import { expect, it, describe } from 'vitest'
import { 
    getArrayLength, arrayIsEmpty, arrayIsNotEmpty, arrayGroupBy, arrayGroupByMap, arrayChunk,
    getFirstElement, getLastElement, 
} from '../../../utils'




const acc = [{ time: '1010', value: 'xxxx' }, { time: '1010', value: 'xxxx' }, { time: '1010', value: 'xxxx' }, { time: '1011', value: 'xxxx' },]

const expectArr = [
    {
        id: '1010',
        children: [
            { time: '1010', value: 'xxxx' },
            { time: '1010', value: 'xxxx' },
            { time: '1010', value: 'xxxx' }
        ]
    },
    {
        id: '1011',
        children: [
            { time: '1011', value: 'xxxx' },
        ]
    }
]

const expectArrMap = new Map()

expectArrMap.set('1010', [
    { time: '1010', value: 'xxxx' },
    { time: '1010', value: 'xxxx' },
    { time: '1010', value: 'xxxx' }
])

expectArrMap.set('1011', [
    { time: '1011', value: 'xxxx' }
])




describe('test array utils ', () => {

    const arr = [] as any
    const arr1 = [1]

    it('getArrayLength', () => {
        expect(getArrayLength(arr)).toBe(0)
        expect(getArrayLength(arr1)).toBe(1)
    })
    

    it('arrayIsEmpty', () => {
        expect(arrayIsEmpty(arr)).toBe(true)
        expect(arrayIsEmpty(arr1)).toBe(false)
    })


    it('arrayIsNotEmpty', () => {
        expect(arrayIsNotEmpty(arr)).toBe(false)
        expect(arrayIsNotEmpty(arr1)).toBe(true)
    })


    it('arrayGroupBy', () => {
        expect(arrayGroupBy(acc, 'time')).toEqual(expectArr)
    })


    it('arrayGroupByMap', () => {
        expect(arrayGroupByMap(acc, 'time')).toEqual(expectArrMap)
    })

    it('arrayChunk', () => {
        expect(arrayChunk([ 1, 2, 3, 4 ], 2)).toEqual([[1, 2], [3, 4]])
        expect(arrayChunk([ 1, 2, 3, 4 ], 1)).toEqual([[1], [2], [3], [4]])
    })
    
    it('getFirstElement', () => {
        expect(getFirstElement([ 1, 2, 3, 4 ])).toEqual(1)
        expect(getFirstElement([ 2, 2, 3, 4 ])).toEqual(2)
    })
    
    it('getLastElement', () => {
        expect(getLastElement([ 1, 2, 3, 4 ])).toEqual(4)
        expect(getLastElement([ 2, 2, 3, 9 ])).toEqual(9)
    })


})

