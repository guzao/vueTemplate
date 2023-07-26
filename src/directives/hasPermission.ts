import { Directive, DirectiveBinding } from "vue"
import { useUser } from '@/store'
import { arrayIsEmpty } from "@/utils"


let catchUserPermissions: string [] = []

export const hasPermission: Directive = {
    mounted (el: Element, { value }: DirectiveBinding) {
        
        if (arrayIsEmpty(catchUserPermissions)) {
            catchUserPermissions = useUser().getPermissions
        }
       
        if (catchUserPermissions.indexOf(value) > -1) return
        
        el.parentNode &&  el.parentNode.removeChild(el)

    }
}