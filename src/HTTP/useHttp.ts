import { axiosInstance } from './index'



/**
 * POST
*/
export function usePost <T = any> (config: { url: string, data?: any }) {
    const { url,  data = {}} =  config
    return axiosInstance.post(url, data) as Promise<ResponseData<T>>
}




/**
 * GET
*/
export function useGet <T = any> (config: { url: string, params?: any }) {
    const { url,  params = {}} =  config
    return axiosInstance.get(url, { params: params }) as Promise<ResponseData<T>>
}
