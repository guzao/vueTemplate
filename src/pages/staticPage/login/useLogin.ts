import { ref, onBeforeMount } from 'vue'
import { getCodeImg as getcode} from '@/API'


export function useLogin() {

    const form = ref({
        code: '',
        password: '',
        username: '',
        uuid: '',
    })

    const imgSrc= ref('')


    const serveConfigData = ref<ServeConfigData>({
        internationalization: false,
        localization: false,
        register: false,
        language: '',
        resetPassword: false,
        captchaEnabled: false,
    })


    const getCodeImg = () => {
        getcode().then(res => {
            const data = res as any
            setServeConfigData(data)
            imgSrc.value =  "data:image/gif;base64," +  data.img
            form.value.uuid = data.uuid
        })
    }


    /** 设置配置相 */
    const setServeConfigData = (data: CaptchaImageData) => {
        serveConfigData.value.internationalization = data.internationalization
        serveConfigData.value.localization = data.localization
        serveConfigData.value.register = data.register
        serveConfigData.value.language = data.language
        serveConfigData.value.resetPassword = data.resetPassword
        serveConfigData.value.captchaEnabled = data.captchaEnabled
    }

    const handleLogin = () => {
        console.log(form)
    }

    // onBeforeMount(getCodeImg)


    return {
        form,
        handleLogin,
        getCodeImg,
        imgSrc,
        serveConfigData,
    }

}