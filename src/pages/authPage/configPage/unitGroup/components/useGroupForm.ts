import { reactive, ref } from 'vue'
import { useFormInstance } from '@/hooks'


export function useGroupForm() {

    const drawerState = ref(false)

    const drawerOpen = () => drawerState.value = true

    const { formInstance, validate, resetFields } = useFormInstance()

    const groupForm = reactive({
        name: '',
        serial: ''
    })

const addGroup = () => {
    console.log('addGroup');
}

    return {
        validate,
        formInstance,
        groupForm,
        drawerState,
        drawerOpen,
        addGroup
    }

}