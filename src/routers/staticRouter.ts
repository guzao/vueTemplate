import { RouteRecordRaw } from "vue-router"
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
        path: '/401',
        component: () => import('@/pages/staticPage/errorPages/404.vue'),
        name: '401',
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
            }
        ]
    },

]