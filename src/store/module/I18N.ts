import { defineStore } from "pinia";
import { isTrue, useLang, getLocalLanLabel, getLocalLang } from '@/utils'
const { getLang, setLang }  = useLang()

// @ts-ignore
import zh_CN from 'element-plus/dist/locale/zh-cn.mjs'
// @ts-ignore
import en_US from 'element-plus/dist/locale/en.mjs'
// @ts-ignore
import az from 'element-plus/dist/locale/az.mjs'

/** 语言包集合 */
export const langs = [
    { label: '简体中文', code: 'zh_CN', local: zh_CN,  },
    { label: 'English', code: 'en_US', local: en_US },
]


export const useI18nStore = defineStore('useI18nStore', {

    state () {
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
        setLang (lang: string) {
            if (isTrue(lang == this.lang)) return
            setLang(lang)
            this.lang = lang
            location.reload()
        },
    }

})
