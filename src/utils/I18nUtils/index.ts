import { langs } from "@/store"
import { useLang, } from "../userUtils"
import { getLangKey } from "../common/deivceState"
import { messages } from '@/langs'


const { getLang }  = useLang()

/** 获取当前的语言数据对象 */
export const getLocalLangMessage = () => messages[getLangKey()]

function gteLangInfo () {
    const lang = getLang() || 'zh_CN'
    return langs.find(item => item.code == lang)!
}

export const getLocalLang  = ()  =>  gteLangInfo().local

export const getLocalLanLabel  = ()  =>  gteLangInfo().label

