import { Directive } from "vue"


type DebounceEl = HTMLElement & { disabled: boolean, delayTime: number }

const handleFn = (event: Event) => {

    const target = event.target as DebounceEl
    target.disabled = true
    target.style.pointerEvents = 'none'

    setTimeout(() => {
        target.disabled = false
        target.style.pointerEvents = ''
    }, target.delayTime)

}

export const debounce:Directive = {

    mounted (el: DebounceEl, { value }: any) {
        el.delayTime = value
        el.addEventListener('click', handleFn)
    },

    beforeUnmount (el: DebounceEl) {
        el.removeEventListener('click', handleFn)
    }

}   

