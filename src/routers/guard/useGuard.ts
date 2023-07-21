import type { Router } from 'vue-router'
import nProgress from '@/plugins/steupNprogress'
/** 
 * 注册路由守卫
*/
export function useGuard (router: Router) {

  router.beforeEach((to, form, next) => {
    next()
    nProgress.start()
  })

  router.afterEach((to, form, next) => {
    nProgress.done()
  })

}

