import { createApp } from 'vue'
import App from '@/App.vue'
import { useAsset, useRouter, useDirective, useNprogress, useElementPlus, usePinan } from '@/plugins'
import '@/assets/styles/index.scss'


export function setupApp () {

    useAsset()

    useNprogress()

    const appInstance = createApp(App)

    usePinan(appInstance)

    useDirective(appInstance)

    useElementPlus(appInstance)
    
    useRouter(appInstance)

    appInstance.mount("#app")


}