import { staticRouter } from './staticRouter'
import { createRouter, createWebHistory } from 'vue-router'


export const router = createRouter({
    history: createWebHistory('/'),
    routes: [ ...staticRouter ],
}) 

type LoaclRouter = {
    name?: string,
    deviceDetail?: string,
    path: string;
    redirect?: string;
    component?: string;
    hidden: boolean;
    meta: {
        hidden?: boolean;
        title: string;
        icon?: string;
    };
    layoutType: LayoutType;
    children?: LoaclRouter[]
}

export const loaclRouter: LoaclRouter[] = [

    {
        path: '/monitor',
        redirect: '/monitor/parkOverview',
        component: '',
        hidden: false,
        meta: {
            title: '实时监控',
            icon: 'menu_monitor'
        },
        layoutType: 'MainLayout',
        children: [
            {
                meta: {
                    title: '电站列表',
                },
                path: '/index',
                hidden: false,
                layoutType: 'Components',
                component: 'staticPage/index'
            },
            {
                meta: {
                    title: '整站概览',
                },
                path: '/monitor/parkOverview',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/realTimeMonitoring/parkOverview'
            },
            {
                meta: {
                    title: '整站概览'
                },
                path: '/monitor/subParkOverview',
                hidden: true,
                layoutType: 'Components',
                component: 'authPage/realTimeMonitoring/subParkOverview'
            },
            {
                meta: {
                    title: '设备概览'
                },
                path: '/monitor/deviceOverview',
                hidden: true,
                layoutType: 'Components',
                component: 'authPage/realTimeMonitoring/deviceOverview'
            },
            {
                meta: {
                    title: '设备概览'
                },
                path: '/monitor/thumbnailModel',
                hidden: true,
                layoutType: 'Components',
                component: 'authPage/realTimeMonitoring/thumbnailModel'
            },
            {
                meta: {
                    title: '设备监控'
                },
                path: '/monitor/tableModel',
                hidden: true,
                layoutType: 'Components',
                component: 'authPage/realTimeMonitoring/tableModel'
            },
            {
                meta: {
                    title: '电站收益'
                },
                path: '/monitor/parkIncome',
                hidden: true,
                layoutType: 'Components',
                component: 'authPage/realTimeMonitoring/parkIncome'
            },
            {
                path: '/monitor/deviceDetail',
                name: 'deviceDetail',
                meta: {
                    title: '设备监控',
                    icon: 'menu_monitor'
                },
                hidden: true,
                layoutType: 'NewTabLayOut',
                component: 'authPage/realTimeMonitoring/deviceDetail'
            },
        ]
    },

    {
        path: '/parkReport',
        meta: {
            title: '数据分析',
            icon: 'menu_dataAnalysis'
        },
        component: '',
        hidden: false,
        layoutType: 'MainLayout',
        children: [
            {
                meta: {
                    title: '电站报表'
                },
                path: '/dataAnalysis/parkReport',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/dataAnalysis/parkReport'
            },
            {
                meta: {
                    title: '设备报表'
                },
                path: '/dataAnalysis/deviceReport',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/dataAnalysis/deviceReport'
            },
            {
                meta: {
                    title: '告警统计'
                },
                path: '/dataAnalysis/warning',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/dataAnalysis/warning'
            },
            {
                meta: {
                    title: '历史数据'
                },
                path: '/dataAnalysis/historyData',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/dataAnalysis/historyData'
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
        component: '',
        layoutType: 'MainLayout',
        children: [
            {
                meta: {
                    title: '电站收益'
                },
                path: '/incomeAnalysis/parkIncomeReport',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/incomeAnalysis/parkIncomeReport'
            },
            {
                meta: {
                    title: '设备收益'
                },
                path: '/incomeAnalysis/deviceIncomeReport',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/incomeAnalysis/deviceIncomeReport'
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
        layoutType: 'MainLayout',
        component: '',
        children: [
            {
                meta: {
                    title: '个人中心'
                },
                path: '/config/personCenter',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/personCenter'
            },
            {
                meta: {
                    title: '成员管理'
                },
                path: '/config/personManagement',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/personManagement'
            },
            {
                meta: {
                    title: '企业信息'
                },
                path: '/config/enterprise',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/enterprise'
            },
            {
                meta: {
                    title: '电站管理'
                },
                path: '/config/parkMannagemen',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/parkMannagemen'
            },
            {
                meta: {
                    title: '电价配置'
                },
                path: '/config/parkElectricPrice',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/parkElectricPrice'
            },
            {
                meta: {
                    title: '测点配置'
                },
                path: '/config/metric',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/metric'
            },
            {
                meta: {
                    title: '模型管理'
                },
                path: '/config/modelTemplate',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/modelTemplate'
            },
            {
                meta: {
                    title: '单元组管理'
                },
                path: '/config/unitGroup',
                hidden: true,
                layoutType: 'Components',
                component: 'authPage/configPage/unitGroup'
            },
        ]
    },

    {
        path: '/logs',
        meta: {
            title: '日志中心',
            icon: 'menu_tem'
        },
        component: '',
        hidden: false,
        layoutType: 'MainLayout',
        children: [
            {
                meta: {
                    title: '登录日志'
                },
                path: '/logs/logininfor',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/logs/logininfor'
            },
            {
                meta: {
                    title: '操作日志'
                },
                path: '/logs/operlog',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/logs/logininfor'
            },
        ]
    }

]


export * from './guard/useGuard'
