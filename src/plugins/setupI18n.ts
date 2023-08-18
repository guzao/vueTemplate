import { i18n } from '@/langs'
import type { App } from "vue"; 

export function setupI18n (app: App<Element>) {
    app.use(i18n)
}