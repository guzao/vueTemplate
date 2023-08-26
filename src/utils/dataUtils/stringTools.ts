import { isFalse, isTrue } from "./booleanTools"
import { isString } from "./dataTypeTools"

export const stringSplit = (str: string, splitSymbol: string, index?: number | 'all') => {
    if (isFalse(isString(str))) return ''
    return isTrue(index === 'all') ? str.split(splitSymbol) : str.split(splitSymbol)[index as number]
}