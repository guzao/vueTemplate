/** 日期格式化格式 */
export const dateFormatterType: Record<string, string> = {
    /** 天 */
    'D': 'YYYY-MM-DD',
    /** 周 */
    'W': 'YYYY-MM-DD',
    /** 月 */
    'M': 'YYYY-MM',
    /** 年 */
    'Y': 'YYYY',
} as const


/** 金额汇率 */
export const exchangeRato: Record<string, number> = {
    "en_US": 7.1488,
    "zh_CN": 1,
} as const



/** 每一页多少条数据 */
export const pageSizes = [10, 20, 50, 100, 200]



/** 数字校验正则 */
export const numberRep = /^-?\d+(\.\d+)?$/

/** 邮箱校验正则 */
export const emaildRep = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


/** 密码校验正则 */
export const passwordRep = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/


/** 手机号校验正则 */
export const phoneRep = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
