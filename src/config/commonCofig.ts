const themeColor = 'rgba(14, 169, 68, 1)'

/**
 * 通用配置
 * @TIPS 此配置只在系统初始化、和清空本地存储时生效
*/
export const commonConfig = {

    /** 是否收集异常信息 */
    trackLog: false,

    /** 默认路由动画效果列表 */
    routerTransitionList: [
        { label: '无动画效果', value: '' },
        { label: '淡入淡出模式', value: 'opacity' },
        { label: '轮播图模式', value: 'slide-fade' },
        { label: '组合模式', value: 'scale-slide' },
    ],

    /** 默认路由动画效果 */
    transition: '',

    /** 默认系统运行时参数配置 */
    systemRunningConfig: {
        /** 布局类型 */
        layoutType: 'horizontal'  as SystemRunningConfigLayoutType,
        /** 收益保留小数位 */
        priceFractionDigits: 2,
        /** 通用保留小数位 */
        commonFractionDigits: 2,
        /** 金额汇率 */
        exchangeRato: 1
    },

    /** 预设主题色 */
    themeColors: [
        themeColor,
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577',
        "rgba(216, 34, 44, 1)"
    ],

}