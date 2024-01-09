import { describe, test, expect } from 'vitest'
import { stringSplit } from '@/utils/dataUtils/stringTools'

describe('stringTools', () => {
    
    test('stringSplit', () => {

        expect(stringSplit('1-2-3', '-', 'all')).toEqual(['1', '2', '3'])

        expect(stringSplit('1-2-3', '-', 'all').length).toBe(3)

        expect(stringSplit('1-2-3', '-', 0)).toBe('1')

        expect(stringSplit('1-2-3', '-', 1)).toBe('2')

        expect(stringSplit('1-2-3', '-', 2)).toBe('3')

        expect(stringSplit({} as any, '-')).toBe('')

    })


})


