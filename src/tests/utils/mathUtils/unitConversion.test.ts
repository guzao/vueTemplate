import { describe, test, expect } from 'vitest'
import { unitConversion, edgeCaseToFixed, isNegative, conversionUnitKWh, conversionUnitKW, conversionUnitKVar, conversionUnitPrice, getKWHZoomRatioAndUnit } from '@/utils/mathUtils/unitConversion'

describe('unitConversion', () => {


    test('unitConversion', () => {
        expect(unitConversion(1000, 1000)).toEqual({ index: 1, size: 1 })
        expect(unitConversion(1000, 999.999)).toEqual({ index: 0, size: 999.999 })
        expect(unitConversion(1000, 1000 * 1000)).toEqual({ index: 2, size: 1 })
        expect(unitConversion(1000, 1000 * 1000 * 1000)).toEqual({ index: 3, size: 1 })
    })

    test('edgeCaseToFixed', () => {
        expect(edgeCaseToFixed(null)).toBe(0)
        expect(edgeCaseToFixed(undefined)).toBe(0)
        expect(edgeCaseToFixed('--')).toBe(0)
        expect(edgeCaseToFixed('')).toBe(0)
        expect(edgeCaseToFixed('1000')).toBe(1000)
        expect(edgeCaseToFixed(1000)).toBe(1000)
    })

    test('isNegative', () => {
        expect(isNegative(-1)).toBe(true)
        expect(isNegative(0)).toBe(false)
        expect(isNegative(1)).toBe(false)
    })
    
    test('conversionUnitKWh', () => {

        expect(conversionUnitKWh(-1)).toEqual({ size: '-1.00', unit: 'kWh' })
        expect(conversionUnitKWh(-1000)).toEqual({ size: '-1.00', unit: 'MWh' })
        expect(conversionUnitKWh(-1000 * 1000)).toEqual({ size: '-1.00', unit: 'GWh' })
        expect(conversionUnitKWh(-1000 * 1000 * 10)).toEqual({ size: '-10.00', unit: 'GWh' })
        expect(conversionUnitKWh(-1000 * 1000 * 109)).toEqual({ size: '-109.00', unit: 'GWh' })
        expect(conversionUnitKWh(-1000 * 1000 *1000)).toEqual({ size: '-1.00', unit: 'TWh' })

        expect(conversionUnitKWh(1)).toEqual({ size: '1.00', unit: 'kWh' })
        expect(conversionUnitKWh(1000)).toEqual({ size: '1.00', unit: 'MWh' })
        expect(conversionUnitKWh(1000 * 1000)).toEqual({ size: '1.00', unit: 'GWh' })

    })

    test('conversionUnitKW', () => {

        expect(conversionUnitKW(-1)).toEqual({ size: '-1.00', unit: 'kW' })
        expect(conversionUnitKW(-1000)).toEqual({ size: '-1.00', unit: 'MW' })
        expect(conversionUnitKW(-1000 * 1000)).toEqual({ size: '-1.00', unit: 'GW' })
        expect(conversionUnitKW(-1000 * 1000 * 10)).toEqual({ size: '-10.00', unit: 'GW' })
        expect(conversionUnitKW(-1000 * 1000 * 109)).toEqual({ size: '-109.00', unit: 'GW' })
        expect(conversionUnitKW(-1000 * 1000 *1000)).toEqual({ size: '-1.00', unit: 'TW' })

        expect(conversionUnitKW(1)).toEqual({ size: '1.00', unit: 'kW' })
        expect(conversionUnitKW(1000)).toEqual({ size: '1.00', unit: 'MW' })
        expect(conversionUnitKW(1000 * 1000)).toEqual({ size: '1.00', unit: 'GW' })

    })
    
    test('conversionUnitKVar', () => {

        expect(conversionUnitKVar(-1)).toEqual({ size: '-1.00', unit: 'kVar' })
        expect(conversionUnitKVar(-1000)).toEqual({ size: '-1.00', unit: 'MVar' })
        expect(conversionUnitKVar(-1000 * 1000)).toEqual({ size: '-1.00', unit: 'GVar' })
        expect(conversionUnitKVar(-1000 * 1000 * 10)).toEqual({ size: '-10.00', unit: 'GVar' })
        expect(conversionUnitKVar(-1000 * 1000 * 109)).toEqual({ size: '-109.00', unit: 'GVar' })
        expect(conversionUnitKVar(-1000 * 1000 *1000)).toEqual({ size: '-1.00', unit: 'TVar' })

        expect(conversionUnitKVar(1)).toEqual({ size: '1.00', unit: 'kVar' })
        expect(conversionUnitKVar(1000)).toEqual({ size: '1.00', unit: 'MVar' })
        expect(conversionUnitKVar(1000 * 1000)).toEqual({ size: '1.00', unit: 'GVar' })

    })

    test('conversionUnitPrice', () => {

        expect(conversionUnitPrice(-1)).toEqual({ size: '-1.00', unit: '元' })
        expect(conversionUnitPrice(-1000)).toEqual({ size: '-1000.00', unit: '元' })
        expect(conversionUnitPrice(-10000)).toEqual({ size: '-1.00', unit: '万' })
        expect(conversionUnitPrice(-10000 * 10)).toEqual({ size: '-10.00', unit: '万' })
        expect(conversionUnitPrice(-10000 * 100)).toEqual({ size: '-100.00', unit: '万' })
        expect(conversionUnitPrice(-10000 * 10000)).toEqual({ size: '-1.00', unit: '亿' })
        expect(conversionUnitPrice(-10000 * 10000 * 10)).toEqual({ size: '-10.00', unit: '亿' })

        
        expect(conversionUnitPrice(1)).toEqual({ size: '1.00', unit: '元' })
        expect(conversionUnitPrice(1000)).toEqual({ size: '1000.00', unit: '元' })
        expect(conversionUnitPrice(10000)).toEqual({ size: '1.00', unit: '万' })
        expect(conversionUnitPrice(10000 * 10)).toEqual({ size: '10.00', unit: '万' })
        expect(conversionUnitPrice(10000 * 100)).toEqual({ size: '100.00', unit: '万' })
        expect(conversionUnitPrice(10000 * 10000)).toEqual({ size: '1.00', unit: '亿' })
        expect(conversionUnitPrice(10000 * 10000 * 10)).toEqual({ size: '10.00', unit: '亿' })

    })

    test('getKWHZoomRatioAndUnit', () => {

        expect(getKWHZoomRatioAndUnit([100, 10, 20, 100])).toEqual({ unit: 'kWh', zoomLimit: 1 })
        expect(getKWHZoomRatioAndUnit([100, 10, 20, 10000])).toEqual({ unit: 'MWh', zoomLimit: 1000 })
        expect(getKWHZoomRatioAndUnit([100, 10, 20, 1000])).toEqual({ unit: 'MWh', zoomLimit: 1000 })

    })
    

})