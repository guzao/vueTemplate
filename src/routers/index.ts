import { staticRouter } from './staticRouter'
import { authRouter } from './authRouter'
import { createRouter, createWebHistory } from 'vue-router'
export * from './guard/useGuard'


export const router = createRouter({
    history: createWebHistory('/'),
    routes: [...staticRouter, ...authRouter],
})

export const loaclRouter = [
    {
        path: '/monitor',
        redirect: '/monitor/parkOverview',
        hidden: false,
        meta: {
            title: '实时监控'
        },
        children: [
            {
                meta: {
                    title: '电站列表',
                },
                path: '/index',
                hidden: false
            },
            {
                meta: {
                    title: '整站概览',
                },
                path: '/monitor/parkOverview',
                hidden: false
            },
            {
                meta: {
                    title: '整站概览'
                },
                path: '/monitor/subParkOverview',
                hidden: true
            },
            {
                meta: {
                    title: '设备概览'
                },
                path: '/monitor/deviceOverview',
                hidden: true
            },
            {
                meta: {
                    title: '设备概览'
                },
                path: '/monitor/thumbnailModel',
                hidden: true
            },
            {
                meta: {
                    title: '设备监控'
                },
                path: '/monitor/tableModel',
                hidden: true
            }
        ]
    },

    /** 设备监控 */
    {
        path: '/monitor/deviceDetail',
        meta: {
            title: '设备监控'
        },
        hidden: true
    },

    {
        path: '/parkReport',
        meta: {
            title: '数据分析'
        },
        hidden: false,
        children: [
            {
                meta: {
                    title: '电站报表'
                },
                path: '/dataAnalysis/parkReport',
                hidden: false,
            },
            {
                meta: {
                    title: '设备报表'
                },
                path: '/dataAnalysis/deviceReport',
                hidden: false,
            },
        ]
    },

    {
        path: '/config',
        meta: {
            title: '配置管理'
        },
        hidden: false,
        children: [
            {
                meta: {
                    title: '个人中心'
                },
                path: '/config/personCenter',
                hidden: false,
            },
            {
                meta: {
                    title: '成员管理'
                },
                path: '/config/personManagement',
                hidden: false,
            },
            {
                meta: {
                    title: '企业信息'
                },
                path: '/config/enterprise',
                hidden: false,
            },
            {
                meta: {
                    title: '电站管理'
                },
                path: '/config/parkMannagemen',
                hidden: false,
            },
        ]
    },

    {
        path: '/logs',
        meta: {
            title: '日志中心'
        },
        hidden: false,
        children: [
            {
                meta: {
                    title: '登录日志'
                },
                path: '/logs/logininfor',
                hidden: false,
            },
            {
                meta: {
                    title: '操作日志'
                },
                path: '/logs/operlog',
                hidden: false,
            },
        ]
    }

]