import { ref } from 'vue'
import { isTrue } from '@/utils'
import { getUserList } from '@/API'
import { useReactiveHttp, usePagination } from '@/hooks'

import PersonForm from './PersonForm.vue'
import { ElMessageBox } from 'element-plus'



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

    const stateChange = async (value: string, rowData: UserListData) => {
        const prevState = value == '1' ? '0' : '1'
        try {
            await ElMessageBox.confirm('是否确认修改状态?', '提示', { confirmButtonText: 'OK', cancelButtonText: 'close', buttonSize: 'default' })
        } catch (error) {
            rowData.status = prevState
        }
    
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
        pageParams,
        stateChange
    }

}


