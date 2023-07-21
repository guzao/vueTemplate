import type { Ref } from 'vue'
import { ref } from 'vue'




export function useLogin() {

    const form: Ref<UserLogin> = ref({
        code: '',
        password: '',
        username: '',
        uuid: '',
    })

    const handleLogin = () => {
        console.log(form)
    }


    return {
        form,
        handleLogin
    }

}