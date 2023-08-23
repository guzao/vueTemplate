import { defineStore } from "pinia";
import { layoutConfig } from '@/config'
import { useI18nSelectState, useLang, useIslocalization } from '@/utils'

/**
 * * 功率类型
 * * @param DC 直流
 * * @param DC 交流
*/
type ElectricPowerType = 'DC' | 'AC'



const { getLang, setLang } = useLang()
const { getIslocalization, setIslocalization } = useIslocalization()
const { getHasShowI18nSelect, setHasShowI18nSelect } = useI18nSelectState()

/**
 * 系统配置
*/
export const useSystemConfig = defineStore('useSystemConfig', {
    state() {
        return {

            /**  是否固定全局 Heder */
            dynamicHeader: layoutConfig.dynamicHeader,

            /**  二级页面标题  */
            hiddenSubTitle: layoutConfig.hiddenSubTitle,

            /** 功率类型 */
            electricPowerType: 'DC' as ElectricPowerType,

            baseConfig: {

                /** 禁用验证码 */
                captchaEnabled: false,

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

            } as ServeConfigData

        }
    },

    getters: {

    },

    actions: {

        setBaseConfig (config: ServeConfigData) {
            
            this.baseConfig = config
            const { internationalization, localization, language } = config
          
            setHasShowI18nSelect(internationalization)
            setIslocalization(localization)

            if (getLang()) return
            setLang(language)

        }
    },
})