import { Directive } from "vue"
import { onClickOutside } from '@vueuse/core'


export const clickOutset:Directive = {

    mounted (el: HTMLElement, { callback }: any) {
        onClickOutside(el, _ => {
            callback && callback()
        })
    },

}   

