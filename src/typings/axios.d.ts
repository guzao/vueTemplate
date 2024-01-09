
/** 接口响应参数 */
type ResponseData<T = any> = {
    code: number;
    rows?: T;
    data: T;
    msg: string;
    [key: string]: any;
} 

/** 接口数据流响应参数 */
type ResponseBlobData<T = any> = {
    disposition: string;
    size: number;
    type: string;
    [key: string]: any;
}

