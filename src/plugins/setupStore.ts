import { createPinia } from 'pinia'
import { App } from 'vue';

const Pinan = createPinia()
export function usePinan (app: App<Element>) {
    app.use(Pinan)
}