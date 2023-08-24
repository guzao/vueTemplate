import { ZH_CN } from './zh_CN'
import { EN_US } from './en_US'
import { createI18n } from 'vue-i18n'
import { useLang } from '@/utils'

const { getLang } = useLang()
 
export const i18n = createI18n({
    locale: getLang(), 
    fallbackLocale: 'zh_CN', 
    messages: {
        zh_CN: ZH_CN,
        en_US: EN_US
    }, 
    globalInjection: true
})


export const t = i18n.global.t