import { USER } from '@/enum'
import Cookies from "js-cookie";
import { commonConfig, layoutConfig, sliderConfig } from '@/config'
import { convertBoolean, isFalse, isTrue, isUndefined } from '../dataUtils';



// *********************************************** ------------ *********************************************** //
// ***********************************************              *********************************************** //
// ***********************************************     Cooke    *********************************************** //
// ***********************************************              *********************************************** //
// *********************************************** ------------ *********************************************** //



/** 获取 */
const getToken = () => Cookies.get(USER.TOKEN)

/** 修改 */
const setToken = (token: string) => Cookies.set(USER.TOKEN, token)

/** 删除 */
const removetToken = () => Cookies.remove(USER.TOKEN)

/** token 添加 获取 删除 */
export function useToken() {

    return {
        /** 获取 token */
        getToken,
        /** 修改 token */
        setToken,
        /** 删除 token */
        removetToken
    }

}





/** 语言选择按钮展示状态的 添加 获取 删除 */
const getHasShowI18nSelect = () => convertBoolean(Cookies.get(USER.HAS_SHOW_I18NSCLECT))

const setHasShowI18nSelect = (hasShow: boolean) => isFalse(isUndefined(hasShow)) && Cookies.set(USER.HAS_SHOW_I18NSCLECT, `${hasShow}`)

const removeHasShowI18nSelect = () => Cookies.remove(USER.HAS_SHOW_I18NSCLECT)

/** 用户语言切换按钮 */
export function useI18nSelectState() {
    return {
        /** 获取 语言选择按钮展示状态的 */
        getHasShowI18nSelect,
        /** 修改 语言选择按钮展示状态的 */
        setHasShowI18nSelect,
        /** 删除 语言选择按钮展示状态的 */
        removeHasShowI18nSelect
    }
}




const getLang = () => Cookies.get(USER.LANG)

const setLang = (lang: string) => isTrue(lang) && Cookies.set(USER.LANG, lang)

const removeLang = () => Cookies.remove(USER.LANG)

/** 语言的 添加 获取 删除  存在Cookies中 */
export function useLang() {
    return {
        /** 获取 语言 */
        getLang,
        /** 修改 语言 */
        setLang,
        /** 删除 语言 */
        removeLang
    }
}



const getIsCollapse = () => JSON.parse(Cookies.get(USER.IS_COLLAPSE) || 'false')

const setIsCollapse = (isCollapse: boolean) => isFalse(isUndefined(isCollapse)) && Cookies.set(USER.IS_COLLAPSE, `${isCollapse}`)

const removeIsCollapse = () => Cookies.remove(USER.IS_COLLAPSE)

/** 侧边栏的 添加 获取 删除 状态  Cookies */
export function useIsCollapse() {
    return {
        /** 获取 侧边栏的状态 */
        getIsCollapse,
        /** 修改 侧边栏的状态 */
        setIsCollapse,
        /** 删除 侧边栏的状态 */
        removeIsCollapse
    }
}




const setIslocalization = (state: boolean) => isFalse(isUndefined(state)) && Cookies.set(USER.IS_LOCALIZATION, `${state}`)

const getIslocalization = () => JSON.parse(Cookies.get(USER.IS_LOCALIZATION) || 'false')

const removeIslocalization = () => Cookies.remove(USER.IS_LOCALIZATION)


/** 是否本地化部署 添加 获取 删除 状态  Cookies */
export function useIslocalization() {
    return {
        /** 获取  是否本地化部署 */
        getIslocalization,
        /** 修改 是否本地化部署 */
        setIslocalization,
        /** 删除 是否本地化部署 */
        removeIslocalization
    }
}











// *********************************************** ------------ *********************************************** //
// ***********************************************              *********************************************** //
// *********************************************** localStorage *********************************************** //
// ***********************************************              *********************************************** //
// *********************************************** ------------ *********************************************** //

/**
 * 工厂函数创建 localStorage
*/
function factoryLocalStorage<T>(key: string, defaultValue: T) {

    const get = () => {
        const value = localStorage.getItem(key) || JSON.stringify(defaultValue)
        return JSON.parse(value) as T
    }

    const set = (value: T) => {
        if (isUndefined(value)) return
        localStorage.setItem(key, JSON.stringify(value))
    }

    const remove = () => localStorage.removeItem(key)

    return {
        get,
        set,
        remove
    }

}


const { get: getuseThemeColor, set: setuseThemeColor, remove: removeuseThemeColor } = factoryLocalStorage(USER.THEME_COLOR, sliderConfig.themeColor)
/**
 * 主题色设置
*/
export function useThemeColor() {
    return {
        getuseThemeColor,
        setuseThemeColor,
        removeuseThemeColor
    }
}


const { get: getIsHiddenSubTitle, set: setIsHiddenSubTitle, remove: removeIsHiddenSubTitle } = factoryLocalStorage(USER.IS_SHOW_SUB_TITLE, layoutConfig.showSuntitle)
/**
 * 是否开启二级标题
*/
export function useIsHiddenSubTitle() {
    return {
        getIsHiddenSubTitle,
        setIsHiddenSubTitle,
        removeIsHiddenSubTitle
    }
}


const { get: getIsDynamicHeader, set: setIsDynamicHeader, remove: removeIsDynamicHeader } = factoryLocalStorage(USER.IS_DYNAMIC_HEADER, layoutConfig.dynamicHeader)
/**
 * 是否开启全局动态导航栏
*/
export function useIsDynamicHeader() {
    return {
        getIsDynamicHeader,
        setIsDynamicHeader,
        removeIsDynamicHeader
    }
}


const { get: getRouterTaransition, set: setRouterTaransition, remove: removeRouterTaransition } = factoryLocalStorage(USER.ROUTER_TARANSITION, commonConfig.transition)
/**
 * 路由过度动画
*/
export function useRouterTaransition() {
    return {
        getRouterTaransition,
        setRouterTaransition,
        removeRouterTaransition
    }
}



const { get: getSystemRunningConfig, set: setSystemRunningConfig, remove: removeSystemRunningConfig } = factoryLocalStorage(USER.SYSTEM_RUNNING_CONFIG, commonConfig.systemRunningConfig)
/**
 * 系统运行时参数配置
 * 收益保留小数位
 * 通用保留小数位
*/
export function useSystemRunningConfig() {
    return {
        /** 获取系统运行时参数配置 */
        getSystemRunningConfig,
        /** 设置系统运行时参数配置 */
        setSystemRunningConfig,
        /** 删除系统运行时参数配置 */
        removeSystemRunningConfig
    }
}
