import { Common } from "@/enum"
import { useSystemRunningConfig } from '../userUtils'
import { isEmptyString, isNull, isString, isStringNull, isUndefined, stringSplit } from "../dataUtils"

const { getSystemRunningConfig } = useSystemRunningConfig()

/**
 * 数值是否是负数
*/
export const isNegative = (raw: number) => raw < 0

/**
 * 数值是否是正无穷或负无穷
*/
export const isInfinity = (raw: any) => raw == Infinity || raw == -Infinity

/**
 * @param raw 原数据
 * @param fractionDigits 小数保留位 默认保留1位
*/
export const toFixed = (raw: number, fractionDigits = getCommonFractionDigits()) => {
    if (isNull(raw)) return Common.DEFAULT_SYMBOL
    if (isNaN(+raw)) return Common.DEFAULT_SYMBOL
    if (isUndefined(raw)) return Common.DEFAULT_SYMBOL
    if (isStringNull(raw)) return Common.DEFAULT_SYMBOL
    if (raw == 0) return 0
    raw = edgeCaseToFixed(raw) as any
    return +raw.toFixed(fractionDigits)
}


/**
 * 自动保留小数位
*/
export function autoToFixed(raw: number) {
    const [prev = ''] = `${raw}`.split('.')
    return toFixed(raw, Math.ceil(prev.length / 2))
}


export function edgeCaseToFixed(raw: any) {
    if (isNull(raw)) return 0
    if (isNaN(+raw)) return 0
    if (isUndefined(raw)) return 0
    if (isStringNull(raw)) return 0
    if (isString(raw) && !isNaN(raw)) return +raw
    return raw
}



/**
 * 单位转换函数  
 * @param limit 单位转换比例
 * @param size 需要转换的大小
*/
export const unitConversion = (limit: number, size: number) => {

    var index = 0

    if (size == 0) return {
        index: index,
        size
    }

    while (size >= limit) {
        size = size / limit
        index++
    }

    return {
        index: index,
        size
    }

}

export function unitConversionEdgeProcess(raw: number, limit = 1000) {

    if (isInfinity(raw)) raw = 0

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

const writeDefault = (size: string, unit: string) => ({ size, unit })

const conversionUnit = (raw: number, units: string[], fractionDigits = getCommonFractionDigits(), limit = 1000) => {
    if (isEmptyString(raw)) return writeDefault('--', units[0])
    if (isNull(raw)) return writeDefault('--', units[0])
    if (isStringNull(raw)) return writeDefault('--', units[0])
    if (isString(raw)) raw = +raw
    if (isNaN(raw)) return writeDefault('--', units[0])
    let { size, index } = unitConversionEdgeProcess(raw, limit)

    try {
        size = size.toFixed(fractionDigits) as any
    } catch (error) {
        size = size
    }
    return {
        size: +size,
        unit: units[index]
    }
}



/** 通用保留小数位 */
const getPriceFractionDigits = () => getSystemRunningConfig().priceFractionDigits

/** 收益保留小数位 */
const getCommonFractionDigits = () => getSystemRunningConfig().commonFractionDigits

/** 计算金额汇率 */
const getPriceExchangeRato = (raw: any) => (raw / getSystemRunningConfig().exchangeRato)

export const KWUnits = ['kW', 'MW', 'GW', 'TW']
export const conversionUnitKW = (raw: number, fractionDigits = getCommonFractionDigits()) => conversionUnit(raw, KWUnits, fractionDigits, Common.THOUSAND)

export const KWHUnits = ['kWh', 'MWh', 'GWh', 'TWh']
export const conversionUnitKWh = (raw: number, fractionDigits = getCommonFractionDigits()) => conversionUnit(raw, KWHUnits, fractionDigits, Common.THOUSAND)

export const KVARUnits = ['kVar', 'MVar', 'GVar', 'TVar']
export const conversionUnitKVar = (raw: number, fractionDigits = getCommonFractionDigits()) => conversionUnit(raw, KVARUnits, fractionDigits, Common.THOUSAND)

export const PriceUnits = ['元', '万', '亿', '兆']
export const conversionUnitPrice = (raw: number, fractionDigits = getPriceFractionDigits()) => conversionUnit(getPriceExchangeRato(raw), PriceUnits, fractionDigits, Common.MYRIAD)

export const BytesUnits = ['B', 'KB', 'MB', 'GB', 'TB']
export const conversionUnitBytesUnits = (raw: number, fractionDigits = getCommonFractionDigits()) => conversionUnit(raw, BytesUnits, fractionDigits, Common.BATE_NUMBER)

/**
 *保留金额数值小数位
 @param raw 金额
 @param fractionDigits 保留小数位
*/
export const pricetoFixed = (raw: any, fractionDigits = getPriceFractionDigits()) => toFixed(raw, fractionDigits)




/** 找出最大值 并以此为基础求出行缩放倍率 */
export function getZoomRato(numbers: number[], units: string[], limit: number = 1000) {
    const max = Math.max(...numbers)
    const { index } = unitConversionEdgeProcess(max, limit)
    /** 缩放比 */
    const zoomLimit = Math.pow(limit, index)

    return {
        /** 单位 */
        unit: units[index],
        /** 缩放比 */
        zoomLimit
    }

}


export const getKWZoomRatioAndUnit = (numbers: number[]) => getZoomRato(numbers, KWUnits, Common.THOUSAND)

export const getKWHZoomRatioAndUnit = (numbers: number[]) => getZoomRato(numbers, KWHUnits, Common.THOUSAND)

export const getKVARZoomRatioAndUnit = (numbers: number[]) => getZoomRato(numbers, KVARUnits, Common.THOUSAND)

export const getPriceZoomRationAndUnit = (numbers: number[]) => {
    numbers.forEach(((item, index) => numbers[index] = getPriceExchangeRato(item)))
    return getZoomRato(numbers, PriceUnits, Common.MYRIAD)
}

export const getBateZoomRationAndUnit = (numbers: number[]) => getZoomRato(numbers, BytesUnits, Common.BATE_NUMBER)

