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

    /** 重置定时器 */
    const _resetInterval = () => {
        _clearInterval()
        id = setInterval(callback, time)
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