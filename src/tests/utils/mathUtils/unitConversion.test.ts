import { describe, test, expect } from 'vitest'
import { 
    unitConversion, edgeCaseToFixed, isNegative, conversionUnitKWh, conversionUnitKW, conversionUnitKVar, conversionUnitPrice, 
    getKWHZoomRatioAndUnit, getKVARZoomRatioAndUnit, getKWZoomRatioAndUnit, getPriceZoomRationAndUnit, toFixed
} from '@/utils/mathUtils/unitConversion'

describe('unitConversion', () => {

    test('toFixed', () => {
        expect(toFixed(0)).toBe(0)
        expect(toFixed(123.123)).toBe('123.1')
        expect(toFixed(123.123, 2)).toBe('123.12')
        expect(toFixed(123.123, 3)).toBe('123.123')
    })

    test('unitConversion', () => {
        expect(unitConversion(1000, 1000)).toEqual({ index: 1, size: 1 })
        expect(unitConversion(1000, 999.999)).toEqual({ index: 0, size: 999.999 })
        expect(unitConversion(1000, 1000 * 1000)).toEqual({ index: 2, size: 1 })
        expect(unitConversion(1000, 1000 * 1000 * 1000)).toEqual({ index: 3, size: 1 })
    })

    test('edgeCaseToFixed', () => {
        expect(edgeCaseToFixed(null)).toBe(0)
        expect(edgeCaseToFixed(0)).toBe(0)
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

        expect(conversionUnitPrice('--' as any)).toEqual({ size: '--', unit: '元' })
        expect(conversionUnitPrice('' as any)).toEqual({ size: '--', unit: '元' })

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

    test('getKVARZoomRatioAndUnit', () => {

        expect(getKVARZoomRatioAndUnit([100, 10, 20, 100])).toEqual({ unit: 'kVar', zoomLimit: 1 })
        expect(getKVARZoomRatioAndUnit([100, 10, 20, 10000])).toEqual({ unit: 'MVar', zoomLimit: 1000 })
        expect(getKVARZoomRatioAndUnit([100, 10, 20, 1000])).toEqual({ unit: 'MVar', zoomLimit: 1000 })

    })

    test('getKWZoomRatioAndUnit', () => {

        expect(getKWZoomRatioAndUnit([100, 10, 20, 100])).toEqual({ unit: 'kW', zoomLimit: 1 })
        expect(getKWZoomRatioAndUnit([100, 10, 20, 10000])).toEqual({ unit: 'MW', zoomLimit: 1000 })
        expect(getKWZoomRatioAndUnit([100, 10, 20, 1000])).toEqual({ unit: 'MW', zoomLimit: 1000 })

    })

    test('getPriceZoomRationAndUnit', () => {

        expect(getPriceZoomRationAndUnit([100, 10, 20, 100])).toEqual({ unit: '元', zoomLimit: 1 })
        expect(getPriceZoomRationAndUnit([100, 10, 20, 1000])).toEqual({ unit: '元', zoomLimit: 1 })
        expect(getPriceZoomRationAndUnit([100, 10, 20, 10000])).toEqual({ unit: '万', zoomLimit: 10000 })
        expect(getPriceZoomRationAndUnit([100, 10, 20, 100000000])).toEqual({ unit: '亿', zoomLimit: 100000000 })

    })
    
    

})