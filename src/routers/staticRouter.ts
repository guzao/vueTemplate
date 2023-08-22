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
        path: '/apperrorlog',
        component: () => import('@/pages/staticPage/errorPages/apperrorlog.vue'),
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
    },

    {
        path: '/',
        component: MainLayout,
        redirect: '/index',
        children: [
            {
                path: '/index',
                component: () => import('@/pages/staticPage/index/index.vue'),
            },
            {
                meta: {
                    title: '编辑个人信息'
                },
                path: '/config/personCenter/editPerson',
                component: () => import('@/pages/constance/editPerson/index.vue'),
            },
            {
                meta: {
                    title: '编辑登录密码'
                },
                path: '/config/personCenter/editPassword',
                component: () => import('@/pages/constance/editPassword/index.vue'),
            },
            {
                meta: {
                    title: '编辑企业信息'
                },
                path: '/config/enterprise/editEnterprise',
                component: () => import('@/pages/constance/editEnterprise/index.vue'),
            },
            {
                meta: {
                    title: '系统配置'
                },
                path: '/config/systemConfig',
                component: () => import('@/pages/constance/systemConfig/index.vue'),
            }
        ]
    },
]