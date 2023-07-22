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


/** 路由参数 */
type UserRouterMata = {
    icon: string;
    link: string;
    noCache: string;
    title: string;
    titleEn: string;
}

/** 用户菜单 */
type UserRouter = {
    
    /** 是否总是展示 */
    alwaysShow: boolean;
    /** 子集 */
    children: UserRouter[];
    /** 组件路径 | 组件类型 */
    component: string;
    /** 菜单上是否不显示此路由s */
    hidden: boolean;
    meta: UserRouterMata;
    /** 路由名称 */
    name: string;
    /** 地址栏路径 */
    path: string;
    /** 是否重定向 */
    redirect: string;
}