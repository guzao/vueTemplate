import { ref } from 'vue'
import { t } from '@/langs'
import { Common } from '@/enum'
import { useRouter } from 'vue-router'
import { urlQueryToObject } from '@/utils'
import { getCodeImg as getcode } from '@/API'
import type { FormInstance } from 'element-plus'
import { useUser, useSystemConfig, useAppData } from '@/store'


export function useLogin() {

    const { userLogin } = useUser()

    const systemConfig = useSystemConfig()

    const form = ref({
        code: '',
        password: '',
        username: '',
        uuid: '',
    })

    const loading = ref(false)

    const imgSrc = ref('')

    const fromInstance = ref<FormInstance>()

    const rules = {
        username: [
            { required: true, message: `${t('common.placeholder')}${t('login.name')}`, trigger: 'blur' },
        ],
        password: [
            { required: true, message: `${t('common.placeholder')}${t('login.password')}`, trigger: 'blur' },
        ],
        code: [
            { required: true, message: `${t('common.placeholder')}${t('login.imgCode')}`, trigger: 'blur' },
        ],
    }

    const getCodeImg = () => {
        getcode().then(res => {
            const data = res as any
            setServeConfigData(data)
            imgSrc.value = "data:image/gif;base64," + data.img
            form.value.uuid = data.uuid
        })
    }

    /** 设置配置 */
    const setServeConfigData = (data: CaptchaImageData) => {

        const { internationalization, localization, register, language, resetPassword, captchaEnabled } = data

        systemConfig.setBaseConfig({ internationalization, localization, register, language, resetPassword, captchaEnabled })

    }

    const router = useRouter()

    const handleLogin = async () => {
        try {
            await fromInstance.value?.validate()
            loading.value = true
            await userLogin(form.value)
            entrySystem()
        } catch (error) {
            form.value.code = ''
            loading.value = false
            getCodeImg()
        }
        loading.value = false
    }

    /** 进入系统 */
    const entrySystem = () => {
        const { redirect: redirectPath = Common.HOME_PAGE as any } = urlQueryToObject()
        const query = getRedirectUrlStationCode()
        useAppData().parkSerial = query.stationCode || Common.IS_EMPTY_STRIING
        router.push({ path: redirectPath, query: query })
    }

    getCodeImg()

    return {
        form,
        fromInstance,
        rules,
        imgSrc,
        handleLogin,
        getCodeImg,
        loading,
        systemConfig
    }

}


function getRedirectUrlStationCode() {
    let result: Record<string, any> = {}
    const { search } = location
    if (search.includes('stationCode')) {
        return urlQueryToObject(search.split('?')[2])
    }
    return result
}