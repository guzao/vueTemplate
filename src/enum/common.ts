
export const enum Common {

    YYYY = 'YYYY',

    YYYY_MM = 'YYYY-MM',

    YYYY_MM_DD = 'YYYY-MM-DD',

    YYYY_MM_DD_HH = 'YYYY-MM-DD HH',

    YYYY_MM_DD_HH_MM = 'YYYY-MM-DD HH:mm',

    YYYY_MM_DD_HH_MM_SS = 'YYYY-MM-DD HH:mm:ss',

    /** 所有权限 */
    ALL_PERMISSION = "*:*:*",

    /** 根页面 */
    ROOT_PAGE = '/',

    /**  登录页 */
    LOGIN_PAGE = '/login',

    /** 首页 */
    HOME_PAGE = '/index',

    /** 设备详情页 */
    DEVICE_DETAIL_PAGE = '/monitor/deviceDetail',

    /** 电站收益视图 */
    PARK_INCOME = '/monitor/parkIncome',

    /** 修改密码页 */
    EDIT_PASSWORD_PAGE = '/config/personCenter/editPassword',

    /** 系统公告列表页 */
    NOTICE_LIST_PAGE = '/noticeList',

    /** 系统公告详情页 */
    NOTICE_DETAIL_PAGE = '/noticeDetail',

    /** 网络异常页面 */
    NETWORK_ERROR_PAGE = '/networkError',

    /** 默认语言 */
    DEFAULT_LANG_KEY = 'zh_CN',

    /** 数据为空时的占位符 */
    DEFAULT_SYMBOL = '--',

    /** 空字符串 */
    IS_EMPTY_STRIING = '',

    /** 一千 */
    THOUSAND = 1000,

    /** 一万 */
    MYRIAD = 10000,

    /** 字节单位缩放因子 */
    BATE_NUMBER = 1024  


}

