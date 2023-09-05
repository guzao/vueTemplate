import type { App } from "vue"; 
import { Router } from "vue-router";
import { router, useGuard } from '@/routers'



/** 注册路由 */
export function useRouter (app: App<Element>): Router {
    app.use(router)
    useGuard(router)
    return router
}