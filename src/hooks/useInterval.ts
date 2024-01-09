import { IntervalTime } from '@/enum'
import { onMounted, onUnmounted } from 'vue'


/**
 * 注册定时器 组件销毁时自动清除
 * @param time 间隔时间
 * @param callback 回调函数
*/
export function useInterval(time: number, callback: () => any) {

    let id: NodeJS.Timer

    /** 清除定时器 */
    const _clearInterval = () => clearInterval(id)

    /**
     * @BUG 偶发性出现time 数值丢失问题 使用闭包缓存这个间隔时间
    */
    const _time = time

    /** 重置定时器 */
    const _resetInterval = () => {
        _clearInterval()
        id = setInterval(callback, _time || IntervalTime.ONE_MINIUTE)
    }

    onMounted(() => id = setInterval(callback, time))

    onUnmounted(() => _clearInterval())

    return {
        /** 清除定时器 */
        _clearInterval,
        /** 重置定时器 */
        _resetInterval
    }

}