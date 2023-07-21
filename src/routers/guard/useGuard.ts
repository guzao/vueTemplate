import type { Router } from 'vue-router'
/** 
 * 注册路由守卫
*/
export function useGuard (router: Router) {

  router.beforeEach((to, form, next) => {
    next()
  })

  router.afterEach((to, form, next) => {
  })

}

