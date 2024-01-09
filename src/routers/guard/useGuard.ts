import { loaclRouter } from '../index'
import { useUser, useAppData } from '@/store'
import nProgress from '@/plugins/setupNprogress'
import { routerWhiteLsit, useDnamicRouter } from '@/config'
import { arrayIsNotEmpty, isFalse, isTrue, useToken } from '@/utils'
import { businessProcess, generateRouterAndAddRouters, addErrorPages } from './helper'
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


  //  是否有 token
  if (getToken()) {

    const { getRoles } = useUser()

    // 用户角色不为空                      业务路由处理： 某些路由需要特殊处理
    if (arrayIsNotEmpty(getRoles)) return businessProcess(to, form, next)

    // 获取数据异常直接放行 避免循环调用
    await getInitBaseInfo().catch(err => {
      console.log(`网络服务异常：`, err)
      return next()
    })

    isFalse(useDnamicRouter) && addErrorPages()

    const { getParkSerial } = useAppData()
    // 地址栏记录当前选中的电站编号
    return next({ ...to, replace: true, query: { ...to.query, stationCode: getParkSerial() } })

  }


  //  是否是白名单路径
  if (routerWhiteLsit.includes(to.path)) return next()



  //  都不是进入登录页
  next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
}


/** 获取用户信息、菜单、电站列表、电站发布状态、电站运行状态、最新数据时间、添加动态路由 */
const getInitBaseInfo = async () => {

  const { getUserInfo, getRouter } = useUser()
  const { getParkAuthList, getParkAuthLastTime, getStationRuningState } = useAppData()

  getStationRuningState()

  getParkAuthLastTime()

  getUserInfo() // 等待用户信息数据

  await getRouter()   // 等待用户路由数据

  // 生成动态路由
  isTrue(useDnamicRouter) && generateRouterAndAddRouters(loaclRouter)

  await getParkAuthList() // 等待用户电站列表

}
