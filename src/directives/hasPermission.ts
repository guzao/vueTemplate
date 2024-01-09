import { Common } from '@/enum'
import { useUser } from '@/store'
import { arrayIsEmpty, isArray } from "@/utils"
import { Directive, DirectiveBinding } from "vue"


let catchUserPermissions: string[] = []
/**
 * 是否具有按钮权限
*/
export const hasPermission: Directive = {

    mounted(el: Element, { value }: DirectiveBinding) {

        if (!isArray(value)) throw new Error(`请设置操作权限标签值`)

        if (arrayIsEmpty(catchUserPermissions)) catchUserPermissions = useUser().getPermissions

        if (arrayIsEmpty(value)) {
            el.parentNode && el.parentNode.removeChild(el)
            return
        }

        if (catchUserPermissions.includes(Common.ALL_PERMISSION)) return

        if (catchUserPermissions.some(item => value.includes(item))) return

        el.parentNode && el.parentNode.removeChild(el)

    },

}






let catchUserRoles: string[] = []
/**
 * 是否具有角色按钮权限
*/
export const hasRole: Directive = {

    mounted(el: Element, { value }: DirectiveBinding) {

        if (!isArray(value)) throw new Error(`请设置操作权限标签值`)

        if (arrayIsEmpty(catchUserRoles)) catchUserRoles = useUser().getRoles

        if (arrayIsEmpty(value)) {
            el.parentNode && el.parentNode.removeChild(el)
            return
        }

        if (catchUserRoles.includes(Common.ALL_PERMISSION)) return

        if (catchUserRoles.some(item => value.includes(item))) return

        el.parentNode && el.parentNode.removeChild(el)

    }

}
