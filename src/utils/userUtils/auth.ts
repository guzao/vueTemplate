import { USER } from '@/enum'
import Cookies from "js-cookie";
import { convertBoolean } from '../dataUtils';

/** 获取 */
const getToken = () => Cookies.get(USER.TOKEN)

/** 修改 */
const setToken = (token: string) => Cookies.set(USER.TOKEN, token)

/** 删除 */
const removetToken = () => Cookies.remove(USER.TOKEN)

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
const getHasShowI18nSelect = () => convertBoolean(Cookies.get(USER.HAS_SHOW_I18NSCLECT))

const setHasShowI18nSelect = (hasShow: boolean) => Cookies.set(USER.HAS_SHOW_I18NSCLECT, `${hasShow}`)

const removeHasShowI18nSelect = () => Cookies.remove(USER.HAS_SHOW_I18NSCLECT)

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





const getLang = () => Cookies.get(USER.LANG)

const setLang = (lang: string) => Cookies.set(USER.LANG, lang)

const removeLang = () => Cookies.remove(USER.LANG)

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




const getIsCollapse = () => JSON.parse(Cookies.get(USER.IS_COLLAPSE) || 'false')

const setIsCollapse = (isCollapse: boolean) => Cookies.set(USER.IS_COLLAPSE, `${isCollapse}`)

const removeIsCollapse = () => Cookies.remove(USER.IS_COLLAPSE)

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




const setIslocalization = (state: boolean) => Cookies.set(USER.IS_LOCALIZATION, `${state}`)

const getIslocalization = () => JSON.parse(Cookies.get(USER.IS_LOCALIZATION) || 'false')

const removeIslocalization = () => Cookies.remove(USER.IS_LOCALIZATION)


/** 是否本地化部署 添加 获取 删除 状态  Cookies */
export function useIslocalization() {
    return {
        /** 获取 */
        getIslocalization,
        /** 修改 */
        setIslocalization,
        /** 删除 */
        removeIslocalization
    }
}
