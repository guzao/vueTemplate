import { isNull, isString, isStrinNull, isUndefined, stringSplit, } from "../dataUtils";

export const isNegative = (raw: number) => raw < 0

export const toFixed = (raw: number, fractionDigits = 1) => {
    if (raw == 0) return 0
    raw = edgeCaseToFixed(raw) as any
    return raw.toFixed(fractionDigits) + ''
}

export function edgeCaseToFixed(raw: any) {
    if (isNull(raw)) return 0
    if (isNaN(+raw)) return 0
    if (isUndefined(raw)) return 0
    if (isStrinNull(raw)) return 0
    if (isString(raw) && !isNaN(raw)) return +raw
    return raw
}

export const unitConversion = function unitConversion(limit: number, size: number) {
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


export function unitConversionEdgeProcess(raw: number) {

    let symbolTag
    if (isNegative(raw)) {
        symbolTag = '-'
        raw = +stringSplit(`${raw}`, '-', 1)
    }
    const { size, index } = unitConversion(1000, raw)
    return {
        size: symbolTag ? +`${symbolTag}${size}` : size,
        index
    }
}

const writeDefault = (size: string, unit: string) => {
    return {
        size,
        unit
    }
}

const conversionUnit = (raw: number, units: string[], fractionDigits = 2) => {
    if (isNull(raw)) return writeDefault('--', units[0])
    if (isStrinNull(raw)) return writeDefault('--', units[0])
    if (isString(raw)) raw = +raw
    if (isNaN(raw)) return writeDefault('--', units[0])
    let { size, index } = unitConversionEdgeProcess(raw)

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

export const conversionUnitKWh = (raw: number, fractionDigits?: number) => {
    return conversionUnit(raw, KWHUnits, fractionDigits)
}

export const KWUnits = ['kW', 'MW', 'GW', 'TW']
export const conversionUnitKW = (raw: number, fractionDigits?: number) => {
    return conversionUnit(raw, KWUnits, fractionDigits)
}

export const KVARUnits = ['kVar', 'MVar', 'GVar', 'TVar']
export const conversionUnitKVar = (raw: number, fractionDigits?: number) => {
    return conversionUnit(raw, KVARUnits, fractionDigits)
}

/** 找出最大值 并以此为基础 进行缩小 */
export function getZoomRato(numbers: number[], units: string[]) {

    const max = Math.max(...numbers)
    const { index } = unitConversionEdgeProcess(max)
    /** 缩放比 */
    const zoomLimit = Math.pow(1000, index)

    return {
        /** 单位 */
        unit: units[index],
        /** 缩放比 */
        zoomLimit
    }

}

export const getKWHZoomRatioAndUnit = (numbers: number[]) => getZoomRato(numbers, KWHUnits)

export const getKWZoomRatioAndUnit = (numbers: number[]) => getZoomRato(numbers, KWUnits)

export const getKVARZoomRatioAndUnit = (numbers: number[]) => getZoomRato(numbers, KVARUnits)