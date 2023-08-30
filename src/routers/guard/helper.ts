import { router } from '@/routers'
import { State, Common } from '@/enum'
import { useUser, useAppData } from '@/store'
import { ElNotification } from 'element-plus'
import MainLayout from '@/layout/MainLayout/index.vue'
import { getLocalLanMessage, isTrue, deepClone } from '@/utils'
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

const { tipsInfo } = getLocalLanMessage()

const routeAllPathToCompMap = import.meta.glob(`@/pages/**/*.vue`);


/** 需要新开tab的路由 */
let newTabLayOut: RouteRecordRaw[] = []


/** 根据数据生成动态路由 并添加到路由中 */
export function generateAndAddRouters (routers: LoaclRouter[]) {
    newTabLayOut.length = 0
    addRouter(routers)
}


/** 添加路由 */
export function addRouter(routers: LoaclRouter[]) {
    const newRouters = deepClone(routers)
    setDnamicRouterComponents(newRouters)
    newRouters.forEach((_r) => router.addRoute(_r as any))
    newTabLayOut.forEach(_r => router.addRoute(_r))
    addErrorPages()
}


/** 动态添加404 页面 */
function addErrorPages () {
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
        generateNewTabLayOutRoute(routers, item, index)
    })
}


const loadLayout = (router: LoaclRouter) => {
    switch (router.layoutType) {
        case 'MainLayout':
            return MainLayout
        case 'Components' || 'NewTabLayOut' || 'ViewModel':
            return loadComponent(router)
        case 'OutLink':
            return ''
        default:
            return ''
    }
}


const loadComponent = ({ component }: LoaclRouter) => routeAllPathToCompMap[`/src/pages/${component}/index.vue`]


function generateNewTabLayOutRoute (routers: LoaclRouter[], item: LoaclRouter, index: number) {
    if ( item.layoutType == 'NewTabLayOut'  ) {
        newTabLayOut.push(item as any)
        routers.splice(index, 1)
    }
}



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
