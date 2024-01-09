import { watch, ref, nextTick } from 'vue'
import { useSystemRunningConfig } from '@/utils'
import { CountUp, CountUpOptions } from 'countup.js'

const { getSystemRunningConfig } = useSystemRunningConfig()

/**
 * 数字动画函数
 * @options 动画配置项
*/
export function useCountUp(options?: CountUpOptions, initValue: number = 0) {

    const countUpElRef = ref<HTMLDivElement>()

    const countValue = ref(initValue)
    
    watch([countValue, countUpElRef], () => {
        nextTick(() => {
            new CountUp(countUpElRef.value!, countValue.value, {
                decimalPlaces: getSystemRunningConfig().priceFractionDigits,
                ...options,
            }).start()
        })
    })

    return {
        /**  数字动画挂载元素 */
        countUpElRef,
        /**  数值 */
        countValue
    }
}