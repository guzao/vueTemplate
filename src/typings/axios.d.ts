
/** 接口响应参数 */
type ResponseData <T = any> = {
    code: number;
    data: T;
    msg: string;
    [key: string]: any;
}