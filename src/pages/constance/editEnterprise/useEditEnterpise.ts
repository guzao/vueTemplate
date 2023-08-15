import { ref } from 'vue'
import { useUser } from '@/store'
import { getDeptList } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { getFirstElement } from '@/utils'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance } from 'element-plus'


export function useEditEnterpise() {

    const router = useRouter()
    const route = useRoute()
    const userData = useUser()

    const { result: detpInfo, loading } = useReactiveHttp({
        initData: {} as Dept,
        request: () => getDeptList(),
        requestCallback: ({ data }) => getFirstElement(data) 
    })

    const fromInstance = ref<FormInstance>()

    const rules = {
        deptName: [{ required: true, message: '请输入企业名称', trigger: 'blur' },],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' },],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },],
        leader: [{ required: true, message: '请输入负责人', trigger: 'blur' },],
    }

    const confirm = async () => {
        try {
            await fromInstance.value?.validate()
            console.log(detpInfo)
        } catch (error) {
            console.log(error)
        }
    }

    return {
        confirm,
        rules,
        router,
        route,
        userData,
        detpInfo
    }
}