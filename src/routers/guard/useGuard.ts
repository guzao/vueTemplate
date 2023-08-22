import { State } from '@/enum'
import { routerWhiteLsit } from '@/config'
import { useUser, useAppData } from '@/store'
import nProgress from '@/plugins/steupNprogress'
import { arrayIsEmpty, arrayIsNotEmpty, useToken } from '@/utils'
import type { Router, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

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

    const { getRoles, getUserInfo, getRouter, userInfo } = useUser()
    const { getParkAuthList, getParkAuthLastTime, getParkSerial, currentRelease } = useAppData()

    // 登录过的在去登录页无意义
    if (to.path === '/login' && arrayIsNotEmpty(getRoles)) return next('/')

    // 运行时不存在用户的角色数据 获取用户信息
    if (arrayIsEmpty(getRoles)) {

      try {
        await getUserInfo()
        const routers = await getRouter()
        await getParkAuthList()
        await getParkAuthLastTime()
        // 地址栏记录当前选中的电站编号
        return next({ ...to, replace: true, query: { ...to.query, stationCode: getParkSerial() } })

      } catch (error) {
        console.log('====== error =======')
      }

      return next()

    }

    if (to.path !== '/config/personCenter/editPassword') {
      if (userInfo.user.firstLoginFlag == State.FIRST_LOGIN) return next('/config/personCenter/editPassword')
    }

    if (to.path !== '/index') {
      if (currentRelease == State.DE_BUGGER  ) return next('/index')
    }

    return next()

  }


  // 2看 是否是白名单路径
  if (routerWhiteLsit.indexOf(to.path) > -1) return next()


  // 3 都不是进入登录页
  next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
}

