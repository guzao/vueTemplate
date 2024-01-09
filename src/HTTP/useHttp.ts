import { axiosInstance } from './index'
import type { AxiosRequestConfig } from 'axios'


/**
 * POST
*/
export function usePost<T = any>(config: AxiosRequestConfig) {
    const { url, data = {}, ...res } = config
    return axiosInstance.post(url!, data, { ...res }) as Promise<ResponseData<T>>
}


/**
 * GET
*/
export function useGet<T = any>(config: AxiosRequestConfig) {
    const { url, params = {}, ...res } = config
    return axiosInstance.get(url!, { params: params, ...res }) as Promise<ResponseData<T>>
}



/**
 * PUT
*/
export function usePut<T = any>(config: AxiosRequestConfig) {
    const { url, data = {},  params = {}, ...res } = config
    return axiosInstance.put(url!, data, { params: params, ...res },) as Promise<ResponseData<T>>
}



/**
 * DELETE
*/
export function useDelet<T = any>(config: AxiosRequestConfig) {
    const { url, data = {},  params = {}, ...res } = config
    return axiosInstance.delete(url!, { params, ...res }) as Promise<ResponseData<T>>
}
