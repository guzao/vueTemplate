import { onMounted, onUnmounted } from 'vue'


/**
 * 注册定时器 组件销毁时自动清除
 * @param time 间隔时间
 * @param callack 回调函数
*/
export function useInterval (time: number, callack: () => any) {

    let id: NodeJS.Timer

    const _clearInterval = () => clearInterval(id)

    const _resetInterval = () => {
        _clearInterval()
        id = setInterval(callack, time)
    }

    onMounted(() => id = setInterval(callack, time))

    onUnmounted(() => _clearInterval())

    return {
        _clearInterval,
        _resetInterval
    }

}