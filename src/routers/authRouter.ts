import { RouteRecordRaw } from "vue-router";

import MainLayout from '@/layout/MainLayout/index.vue'

export const authRouter: RouteRecordRaw[] = [

    /** 实时监控 */
    {
        path: '/monitor',
        component: MainLayout,
        redirect: '/monitor/parkOverview',
        meta: {
            title: '实时监控'
        },
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
            },
            {
                path: '/monitor/parkIncome',
                component: () => import('@/pages/authPage/realTimeMonitoring/parkIncome/index.vue'),
            }
        ]
    },

    /** 设备监控 */
    {
        path: '/monitor/deviceDetail',
        component: () => import('@/pages/authPage/realTimeMonitoring/deviceDetail/index.vue'),
        meta: {
            layoutType: 'newTab'
        }
    },

    /** 数据分析 */
    {
        path: '/parkReport',
        component: MainLayout,
        meta: {
            title: '数据分析'
        },
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
            {
                meta: {
                    title: '告警统计'
                },
                path: '/dataAnalysis/warning',
                component: () => import('@/pages/authPage/dataAnalysis/warning/index.vue'),
            },
            {
                meta: {
                    title: '历史数据'
                },
                path: '/dataAnalysis/historyData',
                component: () => import('@/pages/authPage/dataAnalysis/historyData/index.vue'),
            },
        ]
    },

    {
        path: '/parkReport',
        component: MainLayout,
        meta: {
            title: '收益分析'
        },
        children: [
            {
                meta: {
                    title: '电站收益'
                },
                path: '/incomeAnalysis/parkIncomeReport',
                component: () => import('@/pages/authPage/incomeAnalysis/parkIncomeReport/index.vue'),
            },
            {
                meta: {
                    title: '设备收益'
                },
                path: '/incomeAnalysis/deviceIncomeReport',
                component: () => import('@/pages/authPage/incomeAnalysis/deviceIncomeReport/index.vue'),
            },
        ]
    },

    /** 配置管理 */
    {
        path: '/config',
        component: MainLayout,
        meta: {
            title: '配置管理'
        },
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
            {
                meta: {
                    title: '电价配置'
                },
                path: '/config/parkElectricPrice',
                component: () => import('@/pages/authPage/configPage/parkElectricPrice/index.vue'),
            },
        ]
    },

    /** 日志中心 */
    {
        path: '/logs',
        component: MainLayout,
        meta: {
            title: '日志中心'
        },
        children: [
            {
                meta: {
                    title: '登录日志'
                },
                path: '/logs/logininfor',
                component: () => import('@/pages/authPage/logs/logininfor/index.vue'),
            },
            {
                meta: {
                    title: '操作日志'
                },
                path: '/logs/operlog',
                component: () => import('@/pages/authPage/logs/operlog/index.vue'),
            },
        ]
    }

]