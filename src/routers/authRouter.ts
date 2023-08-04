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

    /** 设备监控 */ 
    {
        path: '/monitor/deviceDetail',
        component: () => import('@/pages/authPage/realTimeMonitoring/deviceDetail/index.vue'),
    },

    {
        path: '/parkReport',
        component: MainLayout,
        children: [
            {
                meta: {
                    title: '电站报表'
                },
                path: '/dataAnalysis/parkReport',
                component: () => import('@/pages/authPage/dataAnalysis/parkReport/index.vue'),
            },
            {
                meta: {
                    title: '设备报表'
                },
                path: '/dataAnalysis/deviceReport',
                component: () => import('@/pages/authPage/dataAnalysis/deviceReport/index.vue'),
            },
        ]
    },
    
    {
        path: '/config',
        component: MainLayout,
        children: [
            {
                meta: {
                    title: '个人中心'
                },
                path: '/config/personCenter',
                component: () => import('@/pages/authPage/configPage/personCenter/index.vue'),
            },
            {
                meta: {
                    title: '成员管理'
                },
                path: '/config/personManagement',
                component: () => import('@/pages/authPage/configPage/personManagement/index.vue'),
            },
            {
                meta: {
                    title: '企业信息'
                },
                path: '/config/enterprise',
                component: () => import('@/pages/authPage/configPage/enterprise/index.vue'),
            },
            {
                meta: {
                    title: '电站管理'
                },
                path: '/config/parkMannagemen',
                component: () => import('@/pages/authPage/configPage/parkMannagemen/index.vue'),
            },
        ]
    }

]