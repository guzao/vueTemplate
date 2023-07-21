/** 用户登录参数 */
type UserLogin = {
    code: string;
    password: string;
    username: string;
    uuid: string;
}

/** 后端返回的系统配置 */
type ServeConfigData = {
    /** 禁用验证码 */
    captchaEnabled: boolean;
    /** 国际化是否开启 */
    internationalization: boolean;
    /** 语言类型 */
    language: string;
    /** 是否是本地化部署 */
    localization: boolean;
    /** 是否显示注册按钮 */
    register: boolean;
    /** 重置密码 */
    resetPassword: boolean;
}

/** 验证码接口 */
type CaptchaImageData = {
    img: string;
    uuid: string;
} & ServeConfigData