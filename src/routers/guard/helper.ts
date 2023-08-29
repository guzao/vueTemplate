import { router } from '@/routers'
import { State, Common } from '@/enum'
import { useUser, useAppData } from '@/store'
import { ElNotification } from 'element-plus'
import SubLayout from '@/layout/SubLayout/index.vue'
import MainLayout from '@/layout/MainLayout/index.vue'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { arrayIsNotEmpty, getLocalLanMessage, isTrue, deepClone } from '@/utils'

const { tipsInfo } = getLocalLanMessage()


/** 动态添加路由 */
export function addRouter(routers: UserRouter[]) {
    const newRoiters = deepClone(routers)
    console.log(newRoiters);
    generateDnamicRouter(newRoiters)
}


function generateDnamicRouter (routers: UserRouter[]) {
    
    routers.forEach((item) => {
        const { children } = item
        if ( isTrue(children) ) generateDnamicRouter(children)
    })

}

const loadLayout = (router: UserRouter) => router.component == 'MainLayou' ? MainLayout: SubLayout

const loadComponent = (router: UserRouter) => import(`@/pages/${router.component}index.vue`)




























/** 业务路由处理 */
export function businessProcess(to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) {

    const { userInfo } = useUser()
    const { currentRelease } = useAppData()


    // 首次登录校验
    if (to.path !== Common.EDIT_PASSWORD_PAGE) {
        if (userInfo.user.firstLoginFlag == State.FIRST_LOGIN) {
            ElNotification({ title: tipsInfo.tips, message: tipsInfo.firstLogin, type: 'warning' })
            return next(to.fullPath)
        }
    }

    // 电站未发布的状态处理
    if (to.path !== Common.HOME_PAGE) {
        if (currentRelease == State.DE_BUGGER && to.path.includes('/dataAnalysis')) {
            ElNotification({ title: tipsInfo.tips, message: tipsInfo.parkNotRelease, type: 'warning' })
            return next(Common.HOME_PAGE)
        }
    }

    return next()

}
