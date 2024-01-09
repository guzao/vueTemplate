import { useAppData } from '@/store'
import { inject, computed, ref } from 'vue'
import { arrayGroupByMap, arrayIsEmpty } from '@/utils'
import { deviceDetailContextKey } from '../../useDevice'




export function useCommandSend() {


    const appData = useAppData()

    const deviceDetialContext = inject(deviceDetailContextKey)

    const parkName = computed(() => appData.parkAuthList.find(item => item.serial == appData.currentParkSerial)?.name)

    const drawerState = ref(false)

    /** 打开指令界面 */
    const openDrawer = () => drawerState.value = !drawerState.value


    return {
        appData,
        deviceDetialContext,
        parkName,
        drawerState,
        openDrawer
    }

}


