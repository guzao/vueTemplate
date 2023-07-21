import { staticRouter } from './staticRouter'
import { createRouter, createWebHistory,  } from 'vue-router'
export * from './guard/useGuard'


export const router = createRouter({
    history: createWebHistory('/'),
    routes: staticRouter,
})