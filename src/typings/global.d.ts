/* __APP_INFO__ */
declare const __APP_INFO__: {
    /** 依赖包 */
    pkg: {
        /** 项目名称 */
        name: string;
        /** 项目版本 */
        version: string;
        /**  项目依赖包 */
        dependencies: Recordable<string>;
        /** 开发依赖包 */
        devDependencies: Recordable<string>;
    };
    /** 最后打包的时间 */
    lastBuildTime: string;
}
