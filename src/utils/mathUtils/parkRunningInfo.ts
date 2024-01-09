import { useSystemRunningConfig } from '../userUtils'
import { toFixed, isInfinity } from "./unitConversion"


const { getSystemRunningConfig } = useSystemRunningConfig()

/** 
 * 计算效率
 * @param charge 充电
 * @param diacharge 放电
 * @param fractionDigits 保留小数位 默认3位
 */
export function getEfficiency(charge: number, diacharge: number, fractionDigits: number = getSystemRunningConfig().commonFractionDigits) {
    const efficiency = diacharge / charge
    if (isInfinity(efficiency)) return 0
    if (isNaN(+efficiency)) return 0
    return +toFixed(efficiency * 100, fractionDigits)
}

/** 
 * 计算效率 数值大于一百替换为一百
 * @param charge 充电
 * @param diacharge 放电
 * @param fractionDigits 保留小数位 默认3位
 */
export function getNormalityEfficiency(charge: number, diacharge: number, fractionDigits: number = getSystemRunningConfig().commonFractionDigits) {
    const result = getEfficiency(charge, diacharge, fractionDigits)
    return result > 100 ? 100 : result
}
