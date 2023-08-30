import { router } from '@/routers'
import { State, Common } from '@/enum'
import { useUser, useAppData } from '@/store'
import { ElNotification } from 'element-plus'
import MainLayout from '@/layout/MainLayout/index.vue'
import { getLocalLanMessage, isTrue, deepClone, arrayIsNotEmpty } from '@/utils'
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

const { tipsInfo } = getLocalLanMessage()

const routeAllPathToCompMap = import.meta.glob(`@/pages/**/*.vue`);

let newTabLayOut: RouteRecordRaw[] = []

/** 生成添加 动态路由 */
export function generateRouterAndAddRouters (routers: LoaclRouter[]) {
    newTabLayOut.length = 0
    addRouter(routers)
}

/** 动态添加路由 */
function addRouter(routers: LoaclRouter[]) {
    const newRoiters = deepClone(routers)
    setDnamicRouterComponents(newRoiters)
    newRoiters.forEach((_r) => router.addRoute(_r as any))
    newTabLayOut.forEach(_r => router.addRoute(_r))
    addErrorPages()
}

/** 动态添加404 页面 */
function addErrorPages() {
    router.addRoute(
        {
            path: '/:path(.*)*',
            // @ts-ignore
            component: () => import('@/pages/staticPage/errorPages/401.vue'),
            name: '404',
            meta: {
                title: '页面丢了',
            },
        },
    )
}

function setDnamicRouterComponents(routers: LoaclRouter[]) {
    routers.forEach((item, index) => {
        const { children } = item
        if (isTrue(children)) setDnamicRouterComponents(children!)
        item.component = loadLayout(item) as any
        setNewTabRouter(item, routers, index)
    })
}

const loadLayout = (router: LoaclRouter) => {
    switch (router.layoutType) {
        case 'MainLayout':
            return MainLayout
        case 'Components':
            return loadComponent(router)
        case 'NewTabLayOut':
            return loadComponent(router)
        case 'ViewModel':
            return loadComponent(router)
        case 'OutLink':
            return ''
        default:
            return ''
    }
}

const loadComponent = ({ component }: LoaclRouter) => routeAllPathToCompMap[`/src/pages/${component}/index.vue`]


function setNewTabRouter(item: LoaclRouter, routers: LoaclRouter[], index: number) {
    if (item.layoutType == 'NewTabLayOut') {
        newTabLayOut.push(item as any)
        routers.splice(index, 1)
    }
}




/** 业务路由处理 */
export function businessProcess(to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) {

    const { userInfo, getRoles} = useUser()
    const { currentRelease } = useAppData()

    // 登录过的在去登录页无意义
    if (to.path === Common.LOGIN_PAGE && arrayIsNotEmpty(getRoles)) return next(Common.ROOT_PAGE)


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
