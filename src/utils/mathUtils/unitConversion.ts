import { isNull, isString, isStringNull, isUndefined, stringSplit, } from "../dataUtils";

export const isNegative = (raw: number) => raw < 0

export const toFixed = (raw: number, fractionDigits = 1) => {
    if (raw == 0) return 0
    raw = edgeCaseToFixed(raw) as any
    const toFixedEd = +raw.toFixed(fractionDigits)
    return `${toFixedEd}`
}

export function edgeCaseToFixed(raw: any) {
    if (isNull(raw)) return 0
    if (isNaN(+raw)) return 0
    if (isUndefined(raw)) return 0
    if (isStringNull(raw)) return 0
    if (isString(raw) && !isNaN(raw)) return +raw
    return raw
}

export const unitConversion = (limit: number, size: number) => {
    var index = 0;
    while (size >= limit) {
        size = size / limit;
        index++;
    }
    return {
        index: index,
        size
    };
}


export function unitConversionEdgeProcess(raw: number, limit = 1000) {

    let symbolTag
    if (isNegative(raw)) {
        symbolTag = '-'
        raw = +stringSplit(`${raw}`, '-', 1)
    }
    const { size, index } = unitConversion(limit, raw)
    return {
        size: symbolTag ? +`${symbolTag}${size}` : size,
        index
    }
}

const writeDefault = (size: string, unit: string) => ( { size, unit } )

const conversionUnit = (raw: number, units: string[], fractionDigits = 2, limit = 1000) => {
    if (isNull(raw)) return writeDefault('--', units[0])
    if (isStringNull(raw)) return writeDefault('--', units[0])
    if (isString(raw)) raw = +raw
    if (isNaN(raw)) return writeDefault('--', units[0])
    let { size, index } = unitConversionEdgeProcess(raw, limit)

    try {
        size = size.toFixed(fractionDigits) as any
    } catch (error) {
        size = '--' as any
    }
    return {
        size,
        unit: units[index]
    }
}

export const KWHUnits = ['kWh', 'MWh', 'GWh', 'TWh']
export const conversionUnitKWh = (raw: number, fractionDigits?: number) => conversionUnit(raw, KWHUnits, fractionDigits, 1000)

export const KWUnits = ['kW', 'MW', 'GW', 'TW']
export const conversionUnitKW = (raw: number, fractionDigits?: number) => conversionUnit(raw, KWUnits, fractionDigits, 1000)

export const KVARUnits = ['kVar', 'MVar', 'GVar', 'TVar']
export const conversionUnitKVar = (raw: number, fractionDigits?: number) => conversionUnit(raw, KVARUnits, fractionDigits, 1000)

export const PriceUnits = ['元', '万', '亿', '兆']
export const conversionUnitPrice = (raw: number, fractionDigits?: number) => conversionUnit(raw, PriceUnits, fractionDigits, 10000)





/** 找出最大值 并以此为基础 进行缩小 */
export function getZoomRato(numbers: number[], units: string[], limit: number = 1000) {

    const max = Math.max(...numbers)
    const { index } = unitConversionEdgeProcess(max)
    /** 缩放比 */
    const zoomLimit = Math.pow(limit, index)

    return {
        /** 单位 */
        unit: units[index],
        /** 缩放比 */
        zoomLimit
    }

}


export const getKWHZoomRatioAndUnit = (numbers: number[]) => getZoomRato(numbers, KWHUnits, 1000)

export const getKWZoomRatioAndUnit = (numbers: number[]) => getZoomRato(numbers, KWUnits, 1000)

export const getKVARZoomRatioAndUnit = (numbers: number[]) => getZoomRato(numbers, KVARUnits, 1000)

export const getPriceZoomRationAndUnit =  (numbers: number[]) => getZoomRato(numbers, PriceUnits, 10000)