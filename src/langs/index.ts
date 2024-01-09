import { Common } from '@/enum'
import { ZH_CN } from './zh_CN'
import { EN_US } from './en_US'
import { KORE_AN } from './kore_AN'
import { GERM_AN } from './germ_AN'
import { useLang } from '@/utils'
import { createI18n } from 'vue-i18n'

const { getLang } = useLang()

/**
 * 语言集合
*/
export const messages = {
    zh_CN: ZH_CN,
    en_US: EN_US,
    kore_AN: KORE_AN,
    germ_AN: GERM_AN
}


/**
 * 国际化实例
*/
export const i18n = createI18n({
    messages,
    locale: getLang(),
    globalInjection: true,
    fallbackLocale: Common.DEFAULT_LANG_KEY as string,
})

/**
 * 国际化映射函数
*/
export const t = i18n.global.t
