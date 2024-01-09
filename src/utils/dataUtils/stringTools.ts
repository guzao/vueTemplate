import { isString, } from "./dataTypeTools"
import { isFalse, isTrue } from "./booleanTools"

/** 字符分割 */
export const stringSplit = (str: string, splitSymbol: string, index?: number | 'all') => {
    if (isFalse(isString(str))) return ''
    return isTrue(index === 'all') ? str.split(splitSymbol) : str.split(splitSymbol)[index as number]
}

/** 首字母转大写 */
export const capitalize = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

