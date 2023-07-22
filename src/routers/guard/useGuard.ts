import type { Router, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import nProgress from '@/plugins/steupNprogress'
import { routerWhiteLsit } from '@/config'
import { arrayIsEmpty, arrayIsNotEmpty, useToken } from '@/utils'
import { useUser } from '@/store'

const { getToken } = useToken()





/** 
 * 注册路由守卫
*/
export function useGuard (router: Router) {


  router.beforeEach(async (to, form, next) => {


    nProgress.start()

    // 1看 token
    if (getToken()) {

      const { getRoles, getUserInfo, getRouter } = useUser()

      // 登录过的在去登录页无意义
      if (to.path === '/login' && arrayIsNotEmpty(getRoles)) {
        console.log('should to be home')
        next()
        return
      }

      // 运行时不存在用户的角色数据 获取用户信息
      if (arrayIsEmpty(getRoles)) {

        try {
          await getUserInfo()
          const routers = await getRouter()
        } catch (error) {
          console.log('======')
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

  })

  router.afterEach((to, form, next) => {
    nProgress.done()
  })

}

