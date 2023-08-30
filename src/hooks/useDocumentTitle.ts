import { Common } from '@/enum'
import { messages } from '@/langs'
import { watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { isTrue, getLangKey } from '@/utils'

export function useDocumentTitle() {

    const route = useRoute()

    const titleText = messages[getLangKey()].common.deviceDetailTitle
    
    const setTitle = (title: string) => document.title = title

    const isDeviceDetailPage = computed(() => route.path == Common.DEVICE_DETAIL_PAGE)

    watch(() => isDeviceDetailPage.value, (value) => isTrue(value) && setTitle(titleText))

    isTrue(isDeviceDetailPage.value) && setTitle(titleText)

    return setTitle

}