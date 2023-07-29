import { ref, onBeforeMount } from 'vue'
import type { FormInstance } from 'element-plus'
import { getCodeImg as getcode } from '@/API'
import { useRouter } from 'vue-router'
import { useUser } from '@/store'
import { useLang } from '@/utils'


const { getLang, setLang } = useLang()

export function useLogin() {


    const { userLogin } = useUser()

    const form = ref({
        code: '',
        password: 'SmartOps@1234',
        username: 'demo',
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

    const serveConfigData = ref<ServeConfigData>({
        internationalization: false,
        localization: false,
        register: false,
        language: '',
        resetPassword: false,
        captchaEnabled: true,
    })

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
        serveConfigData.value.internationalization = internationalization
        serveConfigData.value.localization = localization
        serveConfigData.value.register = register
        serveConfigData.value.language = language
        serveConfigData.value.resetPassword = resetPassword
        serveConfigData.value.captchaEnabled = captchaEnabled

        if (getLang()) return
        setLang(language)

    }

    const router = useRouter()

    const handleLogin = async () => {
        try {
            loading.value = true
            await fromInstance.value?.validate()
            await userLogin(form.value)
            router.push('/index')
        } catch (error) {
            form.value.code = ''
            getCodeImg()
            loading.value = false
        }
        loading.value = false
    }

    

    onBeforeMount(getCodeImg)

    return {
        form,
        fromInstance,
        rules,
        imgSrc,
        handleLogin,
        getCodeImg,
        serveConfigData,
        loading
    }

}