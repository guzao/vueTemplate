import { Common } from '@/enum'
import { ZH_CN } from './zh_CN'
import { EN_US } from './en_US'
import { useLang } from '@/utils'
import { createI18n } from 'vue-i18n'

const { getLang } = useLang()

export const messages = {
    zh_CN: ZH_CN,
    en_US: EN_US
}

export const i18n = createI18n({
    messages,
    locale: getLang(), 
    fallbackLocale: Common.DEFAULT_LANG_KEY, 
    globalInjection: true
})

export const t = i18n.global.t
