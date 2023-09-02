
const gapLimit = 12

/** Heder 高度 */
const headerHeight = 58

export const layoutConfig = {

    /** Heder 高度 */
    headerHeight,

    /** 是否固定全局 Heder */
    dynamicHeader: true,

    /** 滚动条距离顶部多少时隐藏 Heder的阈值  最小值 = headerHeight + gapLimit  */
    offset: headerHeight + gapLimit,

    /** 返回顶部 */
    showGoTop: true,

    /** footer 文本 */
    footerText: '©上海电气国轩新能源科技有限公司',

    /** 侧边栏布局状态 */
    showSlider: false,

    /** 通用 图表高度 */
    chartHeight: 360,

    /** 二级页面标题 */
    hiddenSubTitle: true,

    /** 使用本地路由 */
    useLocalRouter: true,

    /** 软件版本 */
    version: ' 1.1.1',

    /** 视图模式 */ 
    viewModel: [
        { label: '整站全景视图', code: 1, url: '/monitor/parkOverview' },
        { label: '整站收益视图', code: 2, url: '/monitor/parkIncome' },
        { label: '子站列表视图', code: 3, url: '/monitor/subParkOverview' },
        { label: '设备概览视图', code: 4, url: '/monitor/deviceOverview' },
        { label: '设备缩略视图', code: 5, url: '/monitor/thumbnailModel' },
        { label: '设备列表视图', code: 6, url: '/monitor/tableModel' },
    ]
    
}