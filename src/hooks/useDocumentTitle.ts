import { Ref, watch, ComputedRef } from 'vue'
import { useRoute } from 'vue-router'

export function useDocumentTitle() {

    const route = useRoute()

    const setTitle = (title: string) => document.title = title

    watch(() => route.path, () => route.meta.title && setTitle(route.meta.title! as string))

    return setTitle

}


export function useTitle(title: Ref<string> & ComputedRef<string>) {

    const setTitle = (title: string) => document.title = title

    watch(title, () => setTitle(title.value))

    return setTitle

}

