import { RouteRecordRaw } from "vue-router";

import MainLayout from '@/layout/MainLayout/index.vue'

export const authRouter: RouteRecordRaw[] = [

    {
        path: '/monitor',
        component: MainLayout,
        redirect: '/monitor/parkOverview',
        children: [
            {
                path: '/monitor/parkOverview',
                component: () => import('@/pages/authPage/realTimeMonitoring/parkOverview/index.vue'),
            },
            {
                path: '/monitor/subParkOverview',
                component: () => import('@/pages/authPage/realTimeMonitoring/subParkOverview/index.vue'),
            },
            {
                path: '/monitor/deviceOverview',
                component: () => import('@/pages/authPage/realTimeMonitoring/deviceOverview/index.vue'),
            },
            {
                path: '/monitor/thumbnailModel',
                component: () => import('@/pages/authPage/realTimeMonitoring/thumbnailModel/index.vue'),
            },
            {
                path: '/monitor/tableModel',
                component: () => import('@/pages/authPage/realTimeMonitoring/tableModel/index.vue'),
            }
        ]
    },

]