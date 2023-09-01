import { describe, test, expect } from 'vitest'
import {  getEfficiency, getNormalityEfficiency } from '@/utils/mathUtils/parkRunningInfo'

describe('parkRunningInfo', () => {

    test('getEfficiency', () => {

        expect(getEfficiency(100, 7)).toBe(7)
        expect(getEfficiency(100, 80)).toBe(80)
        expect(getEfficiency(100, 90)).toBe(90)
        expect(getEfficiency(100, 90)).not.toBe(91)
        expect(getEfficiency(100, 100)).toBe(100)
        expect(getEfficiency(100, 110)).toBe(110)

    })

    test('getNormalityEfficiency', () => {

        expect(getNormalityEfficiency(100, 7)).toBe(7)
        expect(getNormalityEfficiency(100, 80)).toBe(80)
        expect(getNormalityEfficiency(100, 90)).toBe(90)
        expect(getNormalityEfficiency(100, 90)).not.toBe(91)
        expect(getNormalityEfficiency(100, 100)).toBe(100)
        expect(getNormalityEfficiency(100, 110)).toBe(100)
        expect(getNormalityEfficiency(100, 200)).toBe(100)

    })

})