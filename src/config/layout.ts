
const gapLimit = 12

/** Heder 高度 */
const headerHeight = 58

export const layoutConfig = {

    /** Heder 高度 */
    headerHeight,

    /** 是否固定全局 Heder */
    dynamicHeader: !false,

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
    version: ' 1.1.01'
    
}