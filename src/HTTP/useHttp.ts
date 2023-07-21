import { axiosInstance } from './index'



/**
 * POST
*/
export function usePost (config: { url: string, data?: any }) {
    const { url,  data = {}} =  config
    return axiosInstance.post(url, data) as Promise<ResponseData>
}




/**
 * GET
*/
export function useGet (config: { url: string, params?: any }) {
    const { url,  params = {}} =  config
    return axiosInstance.get(url, { params: params }) as Promise<ResponseData>
}
