import { reactive, ref } from 'vue'
import { useReactiveHttp } from '@/hooks'
import { updateUserProfile } from '@/API'
import { useUser, useDicts } from '@/store'
import type { FormInstance } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { deepCloe, successMessage } from '@/utils';


export function useEditPerson() {

    const router = useRouter()
    const route = useRoute()
    const userData = useUser()
    const dicts = useDicts()


    const userInfo = deepCloe(userData.userInfo.user)
    const fromInstance = ref<FormInstance>()
    const form = reactive(userInfo)
    const rules = {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
        phonenumber: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
        email: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
        sex: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
    }


    const { loading, getResult: setUserProfile } = useReactiveHttp({
        initData: {} as any,
        request: () => updateUserProfile(form),
        requestCallback: (res) => {
            successMessage(res.msg)
            return res
        },
        Immediately: false
    })


    const confirm = async () => {
        try {
            await fromInstance.value?.validate()
            await setUserProfile()
            userData.getUserInfo()
            router.go(-1)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        confirm,
        loading,
        rules,
        dicts,
        route,
        form,
        router
    }
}