import { inject } from 'vue'
import { SmartOpsBroadcastChannelConextKey } from '@/plugins'

/**
 * 全局广播实例
*/
export function useSmartOpsBroadcastChannel () {
    const smartOpsBroadcastChannel = inject(SmartOpsBroadcastChannelConextKey)!
    return smartOpsBroadcastChannel
}
