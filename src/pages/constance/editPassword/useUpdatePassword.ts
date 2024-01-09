import { useUser } from '@/store'
import { reactive, ref } from 'vue'
import { updateUserPwd } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { successMessage, passwordRep } from '@/utils'


export function useUpdatePassword() {


    const router = useRouter()
    const route = useRoute()
    const userData = useUser()


    const fromInstance = ref<FormInstance>()

    const form = reactive({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const inputTypes = reactive({
        oldPasswordType: true,
        newPasswordType: true,
        confirmPasswordType: true,
    })

    const equalToPassword = (rule: any, value: any, callback: any) => {
        if (form.oldPassword == value) {
            callback(new Error("新旧密码不能相同"));
        } else {
            callback();
        }
    }

    const unEqualToPassword = (rule: any, value: any, callback: any) => {
        if (form.newPassword !== value) {
            callback(new Error("新旧密码不同"));
        } else {
            callback();
        }
    }

    const formatterValid = (rule: any, value: any, callback: any) => {
        if (!passwordRep.test(value)) {
            return callback(new Error('密码格式错误'));
        } else {
            callback();
        }
    }

    const rules = {
        oldPassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' },],
        newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { required: true, validator: equalToPassword, trigger: "blur" },
            { required: true, validator: formatterValid, trigger: "blur" },
        ],
        confirmPassword: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            { required: true, validator: unEqualToPassword, trigger: "blur" },
            { required: true, validator: formatterValid, trigger: "blur" },
        ],
    }


    const { loading, getResult: setUserPwd } = useReactiveHttp({
        initData: {} as any,
        request: () => {
            const { oldPassword, newPassword } = form
            return updateUserPwd({ oldPassword, newPassword })
        },
        requestCallback: (res) => {
            successMessage(res.msg)
        },
        Immediately: false
    })

    const confirm = async () => {
        try {
            await fromInstance.value?.validate()
            await setUserPwd()
            router.push({ path: '/config/personCenter', query: route.query })
        } catch (error) {
            console.log(error)
        }
    }


    return {
        confirm,
        rules,
        inputTypes,
        fromInstance,
        userData,
        route,
        router,
        form,
        loading
    }

}
