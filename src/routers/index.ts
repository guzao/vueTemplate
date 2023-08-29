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
            title: '实时监控',
            icon: 'menu_monitor'
        },
        layoutType: 'MainLayou',
        children: [
            {
                meta: {
                    title: '电站列表',
                },
                path: '/index',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '整站概览',
                },
                path: '/monitor/parkOverview',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '整站概览'
                },
                path: '/monitor/subParkOverview',
                hidden: true,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '设备概览'
                },
                path: '/monitor/deviceOverview',
                hidden: true,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '设备概览'
                },
                path: '/monitor/thumbnailModel',
                hidden: true,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '设备监控'
                },
                path: '/monitor/tableModel',
                hidden: true,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '电站首页'
                },
                path: '/monitor/parkIncome',
                hidden: true,
                layoutType: 'Components',
            }
        ]
    },

    /** 设备监控 */
    {
        path: '/monitor/deviceDetail',
        meta: {
            title: '设备监控',
            icon: 'menu_monitor'
        },
        hidden: true,
        layoutType: 'SubLayout',
    },

    {
        path: '/parkReport',
        meta: {
            title: '数据分析',
            icon: 'menu_dataAnalysis'
        },
        hidden: false,
        layoutType: 'MainLayou',
        children: [
            {
                meta: {
                    title: '电站报表'
                },
                path: '/dataAnalysis/parkReport',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '设备报表'
                },
                path: '/dataAnalysis/deviceReport',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '告警统计'
                },
                path: '/dataAnalysis/warning',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '历史数据'
                },
                path: '/dataAnalysis/historyData',
                hidden: false,
                layoutType: 'Components',
            },
        ]
    },

    {
        path: '/incomeAnalysis',
        meta: {
            title: '收益分析',
            icon: 'menu_income'
        },
        hidden: false,
        layoutType: 'MainLayou',
        children: [
            {
                meta: {
                    title: '电站收益'
                },
                path: '/incomeAnalysis/parkIncomeReport',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '设备收益'
                },
                path: '/incomeAnalysis/deviceIncomeReport',
                hidden: false,
                layoutType: 'Components',
            },
        ]
    },

    {
        path: '/config',
        meta: {
            title: '配置管理',
            icon: 'menu_config'
        },
        hidden: false,
        layoutType: 'MainLayou',
        children: [
            {
                meta: {
                    title: '个人中心'
                },
                path: '/config/personCenter',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '成员管理'
                },
                path: '/config/personManagement',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '企业信息'
                },
                path: '/config/enterprise',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '电站管理'
                },
                path: '/config/parkMannagemen',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '电价配置'
                },
                path: '/config/parkElectricPrice',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '测点配置'
                },
                path: '/config/metric',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '模型管理'
                },
                path: '/config/modelTemplate',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '单元组管理'
                },
                path: '/config/unitGroup',
                hidden: true,
                layoutType: 'Components',
            },
        ]
    },

    {
        path: '/logs',
        meta: {
            title: '日志中心',
            icon: 'menu_tem'
        },
        hidden: false,
        layoutType: 'MainLayou',
        children: [
            {
                meta: {
                    title: '登录日志'
                },
                path: '/logs/logininfor',
                hidden: false,
                layoutType: 'Components',
            },
            {
                meta: {
                    title: '操作日志'
                },
                path: '/logs/operlog',
                hidden: false,
                layoutType: 'Components',
            },
        ]
    }

]