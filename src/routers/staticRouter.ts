import { RouteRecordRaw } from "vue-router";

import MainLayout from '@/layout/MainLayout/index.vue'

export const staticRouter: RouteRecordRaw[] = [

    {
        path: '/login',
        component: () => import('@/pages/staticPage/login/login.vue'),
    },

    {
        path: '/register',
        component: () => import('@/pages/staticPage/register/index.vue'),
    },

    {
        path: '/',
        component: MainLayout,
        redirect: '/index',
        children: [
            {
                path: '/index',
                component: () => import('@/pages/staticPage/index/index.vue'),
            }
        ]
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