import { Common } from '@/enum'
import { useUser } from '@/store'
import { Directive, DirectiveBinding } from "vue"
import { arrayIsEmpty, isArray, isFalse, isTrue } from "@/utils"


let catchUserPermissions: string [] = []

/**
 * 是否具有按钮权限
*/
export const hasPermission: Directive = {

    mounted (el: Element, { value }: DirectiveBinding) {

        if ( isFalse(value) ) return el.parentNode && el.parentNode.removeChild(el)

        if ( isTrue(value == Common.ALL_PERMISSION) ) return

        if (arrayIsEmpty(catchUserPermissions)) catchUserPermissions = useUser().getPermissions

        if (!arrayIsEmpty(catchUserPermissions)) return el.parentNode && el.parentNode.removeChild(el)

        if (catchUserPermissions.indexOf(value) > -1) return
        
        el.parentNode &&  el.parentNode.removeChild(el)

    }

}


let catchUserRoles: string [] = []

/**
 * 是否具有角色按钮权限
*/
export const hasRole: Directive = {

    mounted (el: Element, { value }: DirectiveBinding) {

        if ( isFalse(value) ) return el.parentNode && el.parentNode.removeChild(el)

        if ( isTrue(value == Common.ALL_PERMISSION) ) return

        if (arrayIsEmpty(catchUserRoles)) catchUserRoles = useUser().getRoles

        if (!arrayIsEmpty(catchUserRoles)) return el.parentNode && el.parentNode.removeChild(el)

        if (catchUserRoles.indexOf(value) > -1) return
        
        el.parentNode &&  el.parentNode.removeChild(el)

    }

}