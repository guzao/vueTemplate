import { router } from '@/routers'
import { State, Common } from '@/enum'
import { useUser, useAppData } from '@/store'
import { ElNotification } from 'element-plus'
import MainLayout from '@/layout/MainLayout/index.vue'
import { getLocalLangMessage, isTrue, deepClone, arrayIsNotEmpty } from '@/utils'
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'

const { tipsInfo  } = getLocalLangMessage()

/** 获取页面组件的资源 */
const routeAllPathToCompMap = import.meta.glob(`@/pages/**/*.vue`);


/** 需要新开页面的路由 */
let newTabLayOut: RouteRecordRaw [] = []


/** 生成添加 动态路由 */
export function generateRouterAndAddRouters(routers: LoaclRouter[]) {
    newTabLayOut.length = 0
    addRouters(routers)
}

/** 动态添加路由 */
function addRouters(routers: LoaclRouter[]) {

    const newRouters = deepClone(routers)

    setDnamicRouterComponents(newRouters)

    addRouter(newTabLayOut)

    addRouter(newRouters as RouteRecordRaw[])

    /**
     * 因为初始化路由时 部分路由还没有加入到router中, 由于404 页面的匹配权限最大 会被首先展示出来，所以需要最后在动态路由添加完成过后 在将 404 加入路由中
    */
    addErrorPages()

}

const addRouter = (routers: RouteRecordRaw[]) => routers.forEach((_r) => router.addRoute(_r))

/** 动态添加 401 页面 */
export function addErrorPages() {
    addRouter([
        {
            path: '/:path(.*)*',
            // @ts-ignore
            component: () => import('@/pages/staticPage/errorPages/401.vue'),
            name: '401',
            meta: {
                title: '页面丢了',
            },
        }
    ])
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

    const { currentRelease } = useAppData()

    const { userInfo, getRoles } = useUser()

    // 登录过的在去登录页无意义
    if (to.path === Common.LOGIN_PAGE && arrayIsNotEmpty(getRoles)) return next(Common.ROOT_PAGE)


    // 首次登录校验
    if (to.path !== Common.EDIT_PASSWORD_PAGE) {
        if (userInfo.user.firstLoginFlag == State.FIRST_LOGIN) {
            ElNotification({ title: tipsInfo.tips, message: tipsInfo.firstLogin, type: 'warning' })
            return  next(to.fullPath)
        }
    }

    // 电站未发布的状态处理
    if (to.path !== Common.HOME_PAGE) {
        if (currentRelease == State.DE_BUGGER && to.path.includes('/dataAnalysis')) {
            ElNotification({ title: tipsInfo.tips, message: tipsInfo.parkNotRelease, type: 'warning' })
            return next(Common.HOME_PAGE)
        }
    }

    // 工商业才显示收益

    return next()

}
