import { expect, it, describe } from 'vitest'
import { conversionUnitKVar, conversionUnitKW, conversionUnitKWh, isNegative, toFixed } from '../../../utils'



describe('unit conversion tools', () => {

    it('conversionUnitKVar', () => {

        expect(conversionUnitKVar(999)).toEqual({ size: '999.00', unit: 'kVar' })
        expect(conversionUnitKVar(1000)).toEqual({ size: '1.00', unit: 'MVar' })
        expect(conversionUnitKVar(10000)).toEqual({ size: '10.00', unit: 'MVar' })
        expect(conversionUnitKVar(1000*1000)).toEqual({ size: '1.00', unit: 'GVar' })
        expect(conversionUnitKVar(1000*1000 * 1000)).toEqual({ size: '1.00', unit: 'TVar' })
        expect(conversionUnitKVar(1000*1000 * 1000 * 100)).toEqual({ size: '100.00', unit: 'TVar' })

    })

    it('conversionUnitKW', () => {

        expect(conversionUnitKW(999)).toEqual({ size: '999.00', unit: 'kW' })
        expect(conversionUnitKW(1000)).toEqual({ size: '1.00', unit: 'MW' })
        expect(conversionUnitKW(10000)).toEqual({ size: '10.00', unit: 'MW' })
        expect(conversionUnitKW(1000*1000)).toEqual({ size: '1.00', unit: 'GW' })
        expect(conversionUnitKW(1000*1000 * 1000)).toEqual({ size: '1.00', unit: 'TW' })
        expect(conversionUnitKW(1000*1000 * 1000 * 100)).toEqual({ size: '100.00', unit: 'TW' })

    })

    it('conversionUnitKWh', () => {

        expect(conversionUnitKWh(999)).toEqual({ size: '999.00', unit: 'kWh' })
        expect(conversionUnitKWh(1000)).toEqual({ size: '1.00', unit: 'MWh' })
        expect(conversionUnitKWh(10000)).toEqual({ size: '10.00', unit: 'MWh' })
        expect(conversionUnitKWh(1000*1000)).toEqual({ size: '1.00', unit: 'GWh' })
        expect(conversionUnitKWh(1000*1000 * 1000)).toEqual({ size: '1.00', unit: 'TWh' })
        expect(conversionUnitKWh(1000*1000 * 1000 * 100)).toEqual({ size: '100.00', unit: 'TWh' })

    })

    it('isNegative', () => {

        expect(isNegative(999)).toBe(false)
        expect(isNegative(-999)).toBe(true)

    })

    it('toFixed', () => {

        expect(toFixed(999.999)).toBe('1000.0')
        expect(toFixed(8.999)).toBe('9.0')

    })



})