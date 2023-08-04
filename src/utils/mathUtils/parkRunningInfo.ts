import { toFixed } from "./unitConversion";

/** 计算效率 */
export function getEfficiency ( charge: number, diacharge: number, fractionDigits: number = 3) {
    if (charge == 0) charge = 1
    const efficiency = diacharge / charge
    if (isNaN(+efficiency)) return 0
    return +toFixed(efficiency * 100, 3) 
}

/** 计算效率 数值大于一百替换为一百 */
export function getNormalityEfficiency ( charge: number, diacharge: number, fractionDigits: number = 3) {
    const result = getEfficiency(charge, diacharge, fractionDigits)
    return result > 100 ? 100 : result
}
