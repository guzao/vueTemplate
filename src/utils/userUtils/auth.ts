import { USER } from '@/enum'
import Cookies from "js-cookie";


function getToken () {
    return Cookies.get(USER.TOKEN)
}

function setToken (token: string) {
    Cookies.set(USER.TOKEN, token)
}

function removetToken () {
    Cookies.remove(USER.TOKEN)
}

/** token 添加 修改 删除 */
export function useToken () {

    return {
        getToken,
        setToken,
        removetToken
    }

}





/** 语言选择按钮展示状态的 添加 修改 删除 */
function getHasShowI18nSelect () {
    return Cookies.get(USER.HAS_SHOW_I18NSCLECT)
}

function setHasShowI18nSelect (hasShow: boolean) {
    Cookies.set(USER.HAS_SHOW_I18NSCLECT, `${hasShow}`)
}

function removeHasShowI18nSelect () {
    Cookies.remove(USER.HAS_SHOW_I18NSCLECT)
}


export function useI18n () {
    return {
        getHasShowI18nSelect,
        setHasShowI18nSelect,
        removeHasShowI18nSelect
    }
}



function getLang () {
    return localStorage.getItem(USER.LANG)
}

function setLang (lang: string) {
    localStorage.setItem(USER.LANG, `${lang}`)
}

function removeLang  () {
    localStorage.removeItem(USER.LANG)
}

/** 语言的 添加 修改 删除  存在localStorage中 */
export function useLang () {
    return {
        getLang,
        setLang,
        removeLang
    }
}
