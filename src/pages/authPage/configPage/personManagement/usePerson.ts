import { ref } from 'vue'
import { isTrue } from '@/utils'
import { getUserList } from '@/API'
import { useReactiveHttp, usePagination } from '@/hooks'
import PersonForm from './PersonForm.vue'



export function usePerson() {


    const userName = ref('')

    const personId = ref('')

    const drawerState = ref(false)

    const { pageParams, resteParams } = usePagination({
        total: 0,
        callback() {
            getResult()
        },
    })

    const { result, getResult, loading } = useReactiveHttp({
        initData: [] as UserListData[],
        request: () => getUserList({ ...pageParams, userName: userName.value }),
        requestCallback: (res) => {
            pageParams.total = res.total
            return res.rows
        }
    })

    const currentChange = (page: number) => pageParams.pageNum = page

    const personFormRef = ref<InstanceType<typeof PersonForm>>()

    const addPerson = () => {
        drawerState.value = true
        personId.value = ''
    }

    const editPerson = (person: UserListData) => {
        drawerState.value = true
        personId.value = person.userId as any
    }


    const confirm = () => isTrue(personId.value) ? confirmEidt() : confirmAdd()

    const confirmAdd = async () => {
        try {
            await personFormRef.value?.formInstance?.validate()
            console.log('===== confirmAdd ====')
        } catch (error) {
            console.log('==== error =====')
        }
    }

    const confirmEidt = async () => {
        try {
            await personFormRef.value?.formInstance?.validate()
            console.log('==== confirmEidt =====')
        } catch (error) {
            console.log('==== error =====')
        }
    }

    const confirmDelet = (row: UserListData) => {
        console.log('===', row)
    }

    return {
        userName,
        personId,
        drawerState,
        result, 
        getResult, 
        loading,
        currentChange,
        personFormRef,
        addPerson,
        editPerson,
        confirm,
        confirmDelet,
        pageParams
    }

}


