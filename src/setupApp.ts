import App from '@/App.vue'
import { createApp } from 'vue'
import { initAppThemeColor } from '@/store'
import { appErrorHandle } from '@/systemRuntimeInfoTrack'
import { useAsset, useRouter, useDirective, useNprogress, setupComponent, usePinan, setupI18n, useSmartOpsBroadcastChannel } from '@/plugins'



/**
 * 启动应用
*/
export async function setupApp() {

    useAsset()

    initAppThemeColor()

    useNprogress()

    const appInstance = createApp(App)

    setupI18n(appInstance)

    useSmartOpsBroadcastChannel(appInstance)

    useDirective(appInstance)

    usePinan(appInstance)

    setupComponent(appInstance)

    // 等待路由挂载完成
    await useRouter(appInstance).isReady()

    appInstance.config.errorHandler = appErrorHandle

    appInstance.mount("#app")






}
