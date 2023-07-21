import { isNull, isString, isStrinNull, isUndefined, stringSplit, } from "../dataUtils";

export const isNegative = (raw: number) => raw < 0

export const toFixed = (raw: number, fractionDigits = 1) => {
    if (raw == 0) return 0
    raw = edgeCaseToFixed(raw) as any
    return raw.toFixed(fractionDigits)
}

export function edgeCaseToFixed (raw: any) {
    if (isNaN(+raw)) return 0
    if (isUndefined(raw)) return 0
    if ( isStrinNull(raw) ) return 0
    if ( isString(raw) && !isNaN(raw) ) return +raw
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


function unitConversionEdgeProcess(raw: number) {

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
    if ( isString(raw) ) raw = +raw
    if (isNaN(raw)) return writeDefault('--', units[0])
    const { size, index } = unitConversionEdgeProcess(raw)
    return {
        size: size.toFixed(fractionDigits),
        unit: units[index]
    }
}

export const conversionUnitKWh = (raw: number, fractionDigits?: number) => {
    return conversionUnit(raw, ['kWh', 'MWh', 'GWh', 'TWh'], fractionDigits)
}

export const conversionUnitKW = (raw: number, fractionDigits?: number) => {
    return conversionUnit(raw, ['kW', 'MW', 'GW', 'TW'], fractionDigits)
}

export const conversionUnitKVar = (raw: number, fractionDigits?: number) => {
    return conversionUnit(raw, ['kVar', 'MVar', 'GVar', 'TVar'], fractionDigits)
}
