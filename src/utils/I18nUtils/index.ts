import { Common } from '@/enum'
import { langs } from "@/store"
import { messages } from '@/langs'
import { useLang, } from "../userUtils"
import { getLangKey } from "../common/deivceState"


const { getLang } = useLang()

/** 获取当前的语言数据对象 */
export const getLocalLangMessage = () => {
    try {
        return messages[getLangKey() || Common.DEFAULT_LANG_KEY]
    } catch (error) {
        return messages[Common.DEFAULT_LANG_KEY]
    }
}

function gteLangInfo() {
    const lang = getLang() || Common.DEFAULT_LANG_KEY
    return langs.find(item => item.code == lang)!
}

/** 获取当前的语言标识 */
export const getLocalLang = () => gteLangInfo().local

/** 获取当前的语言名称 */
export const getLocalLanLabel = () => gteLangInfo().label

