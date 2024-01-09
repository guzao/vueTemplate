import { Common } from '@/enum'
import { login } from '@/ApiMap'


/** 使用动态路由 */
export const useDnamicRouter = true



/** 路由白名单 */
export const routerWhiteLsit = [ login.login, login.register, Common.NOTICE_DETAIL_PAGE, Common.NOTICE_LIST_PAGE, Common.NETWORK_ERROR_PAGE,  ]