import { ref, watch, } from 'vue'
import { useDicts } from '@/store'
import { useReactiveHttp } from '@/hooks'
import type { FormInstance } from 'element-plus'
import { getUserDeptTree, getUserDetail } from '@/API'
import { deepCloe, arrayIsEmpty, isTrue } from '@/utils';


export function usePersonForm(props: any) {
    
    const dicts = useDicts()

    const posts = ref<Post[]>([])
    const roles = ref<Role[]>([])

    const formInstance = ref<FormInstance>()

    const { result } = useReactiveHttp({
        initData: [] as UserDeptTree[],
        request: () => getUserDeptTree()
    })

    const baseForm = {
        userName: '',
        nickName: '',
        deptId: null,
        phonenumber: '',
        email: '',
        password: '',
        sex: '',
        status: '',
        postIds: [],
        roleIds: [],
        remark: ''
    } as UserListData

    const personForm = ref<UserListData>(deepCloe(baseForm))

    const ruleForm = {
        userName: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
        nickName: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
        password: [{ required: true, message: 'Please input Activity name', trigger: 'blur' },],
    }

    const { result: userDetail, getResult, loading } = useReactiveHttp({
        initData: {} as UserDetailData,
        request: () => getUserDetail(props.personId),
        requestCallback: (res) => {

            if (arrayIsEmpty(posts.value)) posts.value = res.posts
            if (arrayIsEmpty(roles.value)) roles.value = res.roles

            if (isTrue(res.data)) {
                personForm.value = res.data
            }
            personForm.value.roleIds = res.roleIds
            personForm.value.postIds = res.postIds
            return res
        }
    })

    watch(() => props.personId, () => {
        if (isTrue(props.personId)) return getResult()
        personForm.value = deepCloe(baseForm)
    })

    return {
        userDetail,
        loading,
        ruleForm,
        personForm,
        result,
        dicts,
        formInstance,
        roles,
        posts
    }

}