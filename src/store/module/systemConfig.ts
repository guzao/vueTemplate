import { USER } from "@/enum";
import { defineStore } from "pinia";
import { commonConfig } from "@/config";
import { useI18nSelectState, useLang, useIslocalization, useIsDynamicHeader, useIsHiddenSubTitle, useThemeColor, useRouterTaransition, useSystemRunningConfig } from '@/utils'


const { getLang, setLang } = useLang()
const { setuseThemeColor, getuseThemeColor } = useThemeColor()
const { getIslocalization, setIslocalization } = useIslocalization()
const { getIsDynamicHeader, setIsDynamicHeader } = useIsDynamicHeader()
const { getIsHiddenSubTitle, setIsHiddenSubTitle } = useIsHiddenSubTitle()
const { getHasShowI18nSelect, setHasShowI18nSelect } = useI18nSelectState()
const { getRouterTaransition, setRouterTaransition } = useRouterTaransition()
const { getSystemRunningConfig, setSystemRunningConfig } = useSystemRunningConfig()

/**
 * 系统配置
*/
export const useSystemConfig = defineStore('useSystemConfig', {

    state() {
        return {

            /** 系统配置抽屉状态 */
            configModelState: false,

            /**  是否动态固定全局 Heder */
            dynamicHeader: getIsDynamicHeader(),

            /**  二级页面标题  */
            hiddenSubTitle: getIsHiddenSubTitle(),

            /**  系统助手  */
            showSystemHelp: !true,

            /** 主题色 */
            themeColor: getuseThemeColor(),

            /** 路由动画 */
            routerTransition: getRouterTaransition(),

            /** 预设主题色 */
            themeColors: commonConfig.themeColors,

            /** 系统基础配置 页面在登录页时加载的基础配置项 */
            baseConfig: {

                /** 禁用验证码 */
                captchaEnabled: true,

                /** 国际化是否开启 */
                internationalization: getHasShowI18nSelect(),

                /** 语言类型 */
                language: getLang(),

                /** 是否是本地化部署 */
                localization: getIslocalization(),

                /** 是否显示注册按钮 */
                register: false,

                /** 重置密码 */
                resetPassword: false,

            } as ServeConfigData,

            /** 系统运行时配置参数 进入系统内部时的运行依赖数据 */
            systemrunningConfig: getSystemRunningConfig()

        }
    },

    actions: {

        /** 系统基本配置 */
        setBaseConfig(config: ServeConfigData) {

            this.baseConfig = config
            const { internationalization, localization, language } = config

            setHasShowI18nSelect(internationalization)
            setIslocalization(localization)

            if (getLang()) return
            setLang(language)

        },

        /** 系统运行时配置参数 */
        setSystemRunningConfig(systemRunningConfig: ReturnType<typeof getSystemRunningConfig>) {
            this.systemrunningConfig = systemRunningConfig
            setSystemRunningConfig(systemRunningConfig)
        },

        /** 主题颜色 */
        setThemeColor(themeColor: string) {
            this.themeColor = themeColor
            setThemeColor(themeColor)
        },

        /** 动态全局导航栏 */
        setIsDynamicHeader(value: boolean) {
            setIsDynamicHeader(value)
        },

        /** 是否显示二级标题 */
        setIsHiddenSubTitle(value: boolean) {
            setIsHiddenSubTitle(value)
        },

        /** 路由过度动画 */
        setRouterTaransition(taransition: string) {
            setRouterTaransition(taransition)
        }


    },

})

/**
 * 设置主题色、存入缓存
*/
export function setThemeColor(themeColor: string) {
    setuseThemeColor(themeColor)
    document.documentElement.style.setProperty(USER.EL_COLOR_PRIMARY, themeColor)
    document.documentElement.style.setProperty(USER.EL_TABLE_HEADER_COLOR_PRIMARY, setRgbaColor(themeColor))
}

/**
 * 初始化主题色
*/
export const initAppThemeColor = () => setThemeColor(getuseThemeColor())

/**
 * 主题色 设置透明度 
*/
export const setRgbaColor = (rgba: string, aph: number = 0.05) => `rgba(${rgbaNum(rgba, 0)}, ${rgbaNum(rgba, 1)}, ${rgbaNum(rgba, 2)}, ${aph})`


/**
 * rgba 转 255
*/
export function rgbaNum(rgba: string, index: number) {
    const val = rgba.match(/(\d(\.\d+)?)+/g)!
    return val[index]
}