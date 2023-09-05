import App from '@/App.vue'
import { createApp } from 'vue'
import { appErrorHandle } from '@/systemRuntimeInfoTrack'
import { useAsset, useRouter, useDirective, useNprogress, useElementPlus, usePinan, setupI18n,  useSmartOpsBroadcastChannel } from '@/plugins'


/**
 * 启动应用
*/
export async function setupApp () {

    useAsset()

    useNprogress()

    const appInstance = createApp(App)

    useSmartOpsBroadcastChannel(appInstance)

    setupI18n(appInstance)

    useDirective(appInstance)

    usePinan(appInstance)

    useElementPlus(appInstance)

    // 等待路由挂载完成
    await useRouter(appInstance).isReady()

    appInstance.config.errorHandler = appErrorHandle

    appInstance.mount("#app")


}