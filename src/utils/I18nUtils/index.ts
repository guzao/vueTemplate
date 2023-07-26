import { langs } from "@/store"
import { useLang } from "../userUtils"

const { getLang }  = useLang()

function gteLangInfo () {
    const lang = getLang() || 'zh_CN'
    return langs.find(item => item.code == lang)!
}

export const getLocalLang  = ()  =>  gteLangInfo().local

export const getLocalLanLabel  = ()  =>  gteLangInfo().label

