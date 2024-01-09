import { defineStore } from "pinia";
import { isTrue, useLang, getLocalLanLabel, getLocalLang } from '@/utils'
const { getLang, setLang } = useLang()

// @ts-ignore  中文
import zh_CN from 'element-plus/dist/locale/zh-cn.mjs'
// @ts-ignore 英语
import en_US from 'element-plus/dist/locale/en.mjs'
// @ts-ignore 阿塞拜疆
import az from 'element-plus/dist/locale/az.mjs'
// @ts-ignore 德语
import de from 'element-plus/dist/locale/de.mjs'


/** 语言包集合 */
export const langs = [
    { label: '简体中文', code: 'zh_CN', local: zh_CN }, // 简体中文
    { label: 'English', code: 'en_US', local: en_US }, // 英语
    { label: 'germ_AN', code: 'germ_AN', local: de },  // 德语
]

/**
 * 国际化配置
*/
export const useI18nStore = defineStore('useI18nStore', {

    state() {
        return {
            /** 语言标识 */
            lang: getLang(),
            /** 语言名称 */
            langLable: getLocalLanLabel(),
            /** 使用的语言包 */
            local: getLocalLang(),
        }
    },

    actions: {
        /** 语言切换 */
        setLang(lang: string) {
            if (isTrue(lang == this.lang)) return
            setLang(lang)
            this.lang = lang
            location.reload()
        },
    }

})
