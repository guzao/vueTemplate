import { ref, onBeforeMount } from 'vue'
import type { FormInstance } from 'element-plus'
import { getCodeImg as getcode } from '@/API'
import { useRouter, useRoute } from 'vue-router'
import { useUser, useSystemConfig } from '@/store'


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
            { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
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

    /** 设置配置相 */
    const setServeConfigData = (data: CaptchaImageData) => {

        const { internationalization, localization, register, language, resetPassword, captchaEnabled } = data

        systemConfig.setBaseConfig({ internationalization, localization, register, language, resetPassword, captchaEnabled })

    }

    const { query: { redirect = '/index' } } = useRoute()
    const router = useRouter()

    const handleLogin = async () => {
        try {
            loading.value = true
            await fromInstance.value?.validate()
            await userLogin(form.value)
            router.push(`${redirect}`)
        } catch (error) {
            form.value.code = ''
            getCodeImg()
            loading.value = false
        }
        loading.value = false
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