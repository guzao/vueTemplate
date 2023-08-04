import type { Router, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import nProgress from '@/plugins/steupNprogress'
import { routerWhiteLsit } from '@/config'
import { arrayIsEmpty, arrayIsNotEmpty, useToken } from '@/utils'
import { useUser, useAppData } from '@/store'

const { getToken } = useToken()




/** 
 * 注册路由守卫
*/
export function useGuard(router: Router) {

  router.beforeEach(beforeEach)

  router.afterEach((to, form, next) => {
    nProgress.done()
  })

}


const beforeEach = async (to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) => {

  nProgress.start()

  // 1看 token
  if (getToken()) {

    const { getRoles, getUserInfo, getRouter } = useUser()
    const { getParkAuthList, getParkAuthLastTime, getParkSerial } = useAppData()

    // 登录过的在去登录页无意义
    if (to.path === '/login' && arrayIsNotEmpty(getRoles)) {
      next('/')
      return
    }

    // 运行时不存在用户的角色数据 获取用户信息
    if (arrayIsEmpty(getRoles)) {

      try {
        await getUserInfo()
        const routers = await getRouter()
        await getParkAuthList()
        await getParkAuthLastTime()
        // 地址栏记录当前选中的电站编号
        next({ ...to, replace: true, query: { ...to.query, stationCode: getParkSerial() } })
        return
      } catch (error) {
        console.log('====== error =======')
      }

      next()
      return

    }

    next()
    return
  }

  // 2看 是否是白名单路径
  if (routerWhiteLsit.indexOf(to.path) > -1) {
    next()
    return
  }

  // 3 都不是进入登录页
  next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
}
