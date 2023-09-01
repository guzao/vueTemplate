import { login } from '@/ApiMap'


/** 使用动态路由 */
export const useDnamicRouter = false

/** 路由模式 */
export const routerType: RouterType = 'WebHistory'

/** 路由白名单 */
export const routerWhiteLsit = [ login.login, login.register  ]