import App from '@/App.vue'
import { createApp } from 'vue'
import { appErrorHandle } from '@/systemRuntimeInfoTrack'
import { useAsset, useRouter, useDirective, useNprogress, useElementPlus, usePinan, setupI18n } from '@/plugins'


import '@/assets/styles/index.scss'

export function setupApp () {

    useAsset()

    useNprogress()

    const appInstance = createApp(App)

    setupI18n(appInstance)

    useDirective(appInstance)

    usePinan(appInstance)

    useElementPlus(appInstance)
    
    useRouter(appInstance)

    appInstance.config.errorHandler = appErrorHandle

    appInstance.mount("#app")

}