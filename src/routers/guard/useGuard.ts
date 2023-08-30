import { loaclRouter } from '../index'
import { routerWhiteLsit } from '@/config'
import { useUser, useAppData } from '@/store'
import { arrayIsEmpty, useToken } from '@/utils'
import nProgress from '@/plugins/steupNprogress'
import { businessProcess, generateRouterAndAddRouters } from './helper'
import type { Router, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

const { getToken } = useToken()


/** 
 * 注册路由守卫
*/
export function useGuard(router: Router) {

  router.beforeEach(beforeEach)

  router.afterEach((to, form, next) => nProgress.done())

}


const beforeEach = async (to: RouteLocationNormalized, form: RouteLocationNormalized, next: NavigationGuardNext) => {

  nProgress.start()

  // 1看 token
  if (getToken()) {

    const { getRoles } = useUser()
    
    const { getParkSerial } = useAppData()

    // 运行时不存在用户的角色数据 获取用户信息
    if (arrayIsEmpty(getRoles)) {

      await getInitBaseInfo().catch(err => console.log('===='))

      // 地址栏记录当前选中的电站编号
      return next({ ...to, replace: true, query: { ...to.query, stationCode: getParkSerial() } })

    }

    return businessProcess(to, form, next)

  }


  // 2看 是否是白名单路径
  if (routerWhiteLsit.indexOf(to.path) > -1) return next()


  // 3 都不是进入登录页
  next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
}



/** 获取用户信息、菜单、电站列表、电站发布状态、电站运行状态、最新数据时间、添加动态路由 */
const getInitBaseInfo = async () => {

  const { getUserInfo, getRouter } = useUser()
  const { getParkAuthList, getParkAuthLastTime, getStationRuningState } = useAppData()

  await getUserInfo()
  await getRouter()
  generateRouterAndAddRouters(loaclRouter)

  await getParkAuthList()
  getStationRuningState()
  getParkAuthLastTime()

}