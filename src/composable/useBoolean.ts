import { ref } from 'vue'

export function useBoolean (initState: boolean) {

    const state = ref(initState)

    const toggleState = (value?: boolean) => {
        state.value = value ? value : !state.value
    }

    return [ state, toggleState ]

}