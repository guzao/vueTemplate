import { USER } from '@/enum'
import Cookies from "js-cookie";

/** 获取 */
function getToken() {
    return Cookies.get(USER.TOKEN)
}

/** 修改 */
function setToken(token: string) {
    Cookies.set(USER.TOKEN, token)
}

/** 删除 */
function removetToken() {
    Cookies.remove(USER.TOKEN)
}

/** token 添加 获取 删除 */
export function useToken() {

    return {
        /** 获取 */
        getToken,
        /** 修改 */
        setToken,
        /** 删除 */
        removetToken
    }

}





/** 语言选择按钮展示状态的 添加 获取 删除 */
function getHasShowI18nSelect() {
    return Cookies.get(USER.HAS_SHOW_I18NSCLECT)
}

function setHasShowI18nSelect(hasShow: boolean) {
    Cookies.set(USER.HAS_SHOW_I18NSCLECT, `${hasShow}`)
}

function removeHasShowI18nSelect() {
    Cookies.remove(USER.HAS_SHOW_I18NSCLECT)
}

/** 用户语言切换按钮 */
export function useI18nSelectState() {
    return {
        /** 获取 */
        getHasShowI18nSelect,
        /** 修改 */
        setHasShowI18nSelect,
        /** 删除 */
        removeHasShowI18nSelect
    }
}



function getLang() {
    return localStorage.getItem(USER.LANG)
}

function setLang(lang: string) {
    localStorage.setItem(USER.LANG, `${lang}`)
}

function removeLang() {
    localStorage.removeItem(USER.LANG)
}

/** 语言的 添加 获取 删除  存在localStorage中 */
export function useLang() {
    return {
        /** 获取 */
        getLang,
        /** 修改 */
        setLang,
        /** 删除 */
        removeLang
    }
}






function getIsCollapse() {
    return JSON.parse(Cookies.get(USER.IS_COLLAPSE) || 'false')
}

function setIsCollapse(isCollapse: boolean) {
    Cookies.set(USER.IS_COLLAPSE, `${isCollapse}`)
}

function removeIsCollapse() {
    Cookies.remove(USER.IS_COLLAPSE)
}

/** 侧边栏的 添加 获取 删除 状态  Cookies */
export function useIsCollapse() {
    return {
        /** 获取 */
        getIsCollapse,
        /** 修改 */
        setIsCollapse,
        /** 删除 */
        removeIsCollapse
    }
}

