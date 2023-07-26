import { staticRouter } from './staticRouter'
import { authRouter } from './authRouter'
import { createRouter, createWebHistory,  } from 'vue-router'
export * from './guard/useGuard'


export const router = createRouter({
    history: createWebHistory('/'),
    routes: [ ...staticRouter, ...authRouter ],
})