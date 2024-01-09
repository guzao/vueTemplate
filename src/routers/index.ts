import { isTrue } from '@/utils'
import { authRouter } from './authRouter'
import { useDnamicRouter } from '@/config'
import { staticRouter } from './staticRouter'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory('/'),
    routes: isTrue(useDnamicRouter) ? [...staticRouter] : [...staticRouter, ...authRouter],
})


export const loaclRouter: LoaclRouter[] = [

    // 监视
    {
        path: '/monitor',
        redirect: '/monitor/parkOverview',
        component: '',
        hidden: false,
        meta: {
            title: '实时监控',
            icon: 'menu_monitor',
            i18nKey: 'realtimeMonitor'
        },
        layoutType: 'MainLayout',
        children: [
            {
                meta: {
                    title: '电站列表',
                    i18nKey: 'parkList'
                },
                path: '/index',
                hidden: false,
                layoutType: 'Components',
                component: 'staticPage/index'
            },
            {
                meta: {
                    title: '电站监视',
                    i18nKey: 'realtimeMonitor'
                },
                path: '/monitor/parkOverview',
                hidden: false,
                layoutType: 'ViewModel',
                component: 'authPage/realTimeMonitoring/parkOverview'
            },
            {
                meta: {
                    title: '整站收益视图',
                    i18nKey: 'parkIncome'
                },
                path: '/monitor/parkIncome',
                hidden: true,
                layoutType: 'ViewModel',
                component: 'authPage/realTimeMonitoring/parkIncome'
            },
            {
                meta: {
                    title: '子站列表视图',
                    i18nKey: 'subParkList'
                },
                path: '/monitor/subParkOverview',
                hidden: true,
                layoutType: 'ViewModel',
                component: 'authPage/realTimeMonitoring/subParkOverview'
            },
            {
                meta: {
                    title: '设备概览视图',
                    i18nKey: 'deviceOverview'
                },
                path: '/monitor/deviceOverview',
                hidden: true,
                layoutType: 'ViewModel',
                component: 'authPage/realTimeMonitoring/deviceOverview'
            },
            {
                meta: {
                    title: '设备缩略视图',
                    i18nKey: 'thumbnailModel'
                },
                path: '/monitor/thumbnailModel',
                hidden: true,
                layoutType: 'ViewModel',
                component: 'authPage/realTimeMonitoring/thumbnailModel'
            },
            {
                meta: {
                    title: '设备列表视图',
                    i18nKey: 'tableModel'
                },
                path: '/monitor/tableModel',
                hidden: true,
                layoutType: 'ViewModel',
                component: 'authPage/realTimeMonitoring/tableModel'
            },

            {
                path: '/monitor/deviceDetail',
                name: 'deviceDetail',
                meta: {
                    title: '设备监控',
                    icon: 'menu_monitor',
                    i18nKey: 'deviceDetail'
                },
                hidden: true,
                layoutType: 'NewTabLayOut',
                component: 'authPage/realTimeMonitoring/deviceDetail'
            },
        ]
    },


    // 数据分析
    {
        path: '/parkReport',
        meta: {
            title: '数据分析',
            icon: 'menu_dataAnalysis',
            i18nKey: 'dataAnalysis'
        },
        component: '',
        hidden: false,
        layoutType: 'MainLayout',
        children: [
            {
                meta: {
                    title: '电站报表',
                    i18nKey: 'parkReport'
                },
                path: '/dataAnalysis/parkReport',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/dataAnalysis/parkReport'
            },
            {
                meta: {
                    title: '设备报表',
                    i18nKey: 'deviceReport'
                },
                path: '/dataAnalysis/deviceReport',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/dataAnalysis/deviceReport'
            },
            {
                meta: {
                    title: '告警统计',
                    i18nKey: 'warning'
                },
                path: '/dataAnalysis/warning',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/dataAnalysis/warning'
            },
            {
                meta: {
                    title: '历史数据',
                    i18nKey: 'historyData'
                },
                path: '/dataAnalysis/historyData',
                hidden: true,
                layoutType: 'Components',
                component: 'authPage/dataAnalysis/historyData'
            },
            {
                meta: {
                    title: '历史曲线',
                    i18nKey: 'historyCurve'
                },
                path: '/dataAnalysis/historyCurve',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/dataAnalysis/historyCurve'
            },
            {
                meta: {
                    title: '温度热场',
                    i18nKey: 'thermalField'
                },
                path: '/dataAnalysis/thermalField',
                hidden: false,
                layoutType: 'NewTabLayOut',
                component: 'authPage/dataAnalysis/thermalField'
            }
        ]
    },


    // 收益分析
    {
        path: '/incomeAnalysis',
        meta: {
            title: '收益分析',
            icon: 'menu_income',
            i18nKey: 'incomeAnalysis'
        },
        hidden: false,
        component: '',
        layoutType: 'MainLayout',
        children: [
            {
                isNew: true,
                meta: {
                    title: '电站收益',
                    i18nKey: 'parkIncomeReport'
                },
                path: '/incomeAnalysis/parkIncomeReport',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/incomeAnalysis/parkIncomeReport'
            },
            {
                isNew: true,
                meta: {
                    title: '设备收益',
                    i18nKey: 'deviceIncomeReport'
                },
                path: '/incomeAnalysis/deviceIncomeReport',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/incomeAnalysis/deviceIncomeReport'
            },
        ]
    },

    // 决策分析
    {
        path: '/intelligentAnalysis',
        meta: {
            title: '决策分析',
            icon: 'menu_jue_ce',
            i18nKey: 'intelligentAnalysis'
        },
        component: '',
        hidden: false,
        layoutType: 'MainLayout',
        children: [
            {
                meta: {
                    title: '一致性散点图',
                    i18nKey: 'consistentScatter'
                },
                path: '/intelligentAnalysis/consistentScatter',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/intelligentAnalysis/consistentScatter',
                isNew: true
            },
            {
                meta: {
                    title: '离群统计分析',
                    i18nKey: 'outlierStatistics'
                },
                path: '/intelligentAnalysis/outlierStatistics',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/intelligentAnalysis/outlierStatistics',
                isNew: true
            },
        ]
    },


    // 配置管理
    {
        path: '/config',
        meta: {
            title: '配置管理',
            icon: 'menu_config',
            i18nKey: 'config'
        },
        hidden: false,
        layoutType: 'MainLayout',
        component: '',
        children: [
            {
                meta: {
                    title: '个人中心',
                    i18nKey: 'personCenter'
                },
                path: '/config/personCenter',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/personCenter'
            },
            {
                meta: {
                    title: '成员管理',
                    i18nKey: 'personManagement'
                },
                path: '/config/personManagement',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/personManagement'
            },
            {
                meta: {
                    title: '企业信息',
                    i18nKey: 'enterprise'
                },
                path: '/config/enterprise',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/enterprise'
            },
            {
                meta: {
                    title: '电站管理',
                    i18nKey: 'parkMannagemen'
                },
                path: '/config/parkMannagemen',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/parkMannagemen'
            },
            {
                meta: {
                    title: '系统通知',
                    i18nKey: 'notice'
                },
                isNew: true,
                path: '/config/notice',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/notice'
            },
            {
                meta: {
                    title: '电价配置',
                    i18nKey: 'parkElectricPrice'
                },
                path: '/config/parkElectricPrice',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/configPage/parkElectricPrice'
            },

            {
                meta: {
                    title: '单元组管理',
                    i18nKey: 'unitGroup'
                },
                name: 'unitGroup',
                path: '/config/unitGroup',
                hidden: true,
                layoutType: 'Components',
                component: 'authPage/configPage/unitGroup'
            },

        ]
    },


    // 模型管理
    {
        path: '/parkModel',
        meta: {
            title: '模型管理',
            icon: 'menu_parkMdle',
            i18nKey: 'parkModel'
        },
        hidden: false,
        layoutType: 'MainLayout',
        component: '',
        children: [
            {
                meta: {
                    title: '模型管理',
                    i18nKey: 'modelTemplate'
                },
                path: '/parkModel/modelTemplate',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/parkModel/modelTemplate'
            },
            {
                meta: {
                    title: '测点配置',
                    i18nKey: 'metric'
                },
                path: '/parkModel/metric',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/parkModel/metric'
            },
        ]
    },


    // 日志中心
    {
        path: '/logs',
        meta: {
            title: '日志中心',
            icon: 'menu_tem',
            i18nKey: 'logs'
        },
        component: '',
        hidden: false,
        layoutType: 'MainLayout',
        children: [
            {
                meta: {
                    title: '登录日志',
                    i18nKey: 'logininfor'
                },
                path: '/logs/logininfor',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/logs/logininfor'
            },
            {
                meta: {
                    title: '操作日志',
                    i18nKey: 'operlog'
                },
                path: '/logs/operlog',
                hidden: false,
                layoutType: 'Components',
                component: 'authPage/logs/operlog'
            },
        ]
    }

]


export * from './guard/useGuard'
