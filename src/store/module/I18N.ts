import { defineStore } from "pinia";
import { useLang } from '@/utils'
const { getLang, setLang }  = useLang()


const langLableMap: Record<string, any> = {
    zh_CN: '简体中文',
    en_US: 'English',
}

export const useI18nStore = defineStore('useI18nStore', {

    state () {
        return {
            lang: getLang(),
            langLable: langLableMap[ getLang() || 'zh_CN']
        }
    },

    actions: {
        setLang (lang: string) {
            this.lang = lang
            setLang(lang)
            this.langLable = langLableMap[lang]
        }
    }

})