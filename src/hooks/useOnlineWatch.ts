import { watch, ref } from 'vue'
import { useOnline } from '@vueuse/core'

/**
 * 网络状态变化触发的事件
 * @param online 网络状态
*/
type handle = (online: boolean) => void

/**
 * 监视网络状态
 * @param handle 处理函数
*/
export function useOnlineWatch(handle: handle) {

    const online = useOnline()

    const stopHandle = watch(online, () => {
        handle && handle(online.value)
    })

    return {
        /** 网络状态 */
        online,
        /** 停止监听事件 */
        stopHandle
    }

}


type Connection = {
    downlink: number;
    effectiveType: number;
    saveData: number;
    [key: string]: any
}

/**
 * 网络网速监听
*/
export function useNetworkConnection(handle: (e: Connection) => void) {

    // 创建一个新的NetworkInformation对象
    const connection = ref<Connection>((navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection)

    const handleFn = () => {
        console.log("当前网络连接速度为：" + connection.value.downlink)
        handle && handle(connection.value)
    }

    const removeEvent = () => connection.value.removeEventListener('change', handleFn);

    if (connection) {
        // 添加事件侦听器，监测网络状态变化
        connection.value.addEventListener('change', handleFn);
    } else {
        console.error("无法获取到网络连接信息");
    }

    return {
        connection: connection || {},
        removeEvent
    }

}