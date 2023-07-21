import { RouteRecordRaw } from "vue-router";

export const staticRouter: RouteRecordRaw[] = [

    {
        path: '/login',
        component: () => import('@/pages/staticPage/login/login.vue'),
    },
    {
        path: '/401',
        component: () => import('@/pages/staticPage/errorPages/404.vue'),
        name: '401',
        meta: {
            title: '页面丢了',
        },
    },
    {
        path: '/:path(.*)*',
        component: () => import('@/pages/staticPage/errorPages/401.vue'),
        name: '404',
        meta: {
            title: '页面丢了',
        },
    }
]