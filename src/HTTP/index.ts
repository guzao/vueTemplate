import axios from 'axios'
import axiosConfig from '@/config/axios';
import { requestHandle } from './requestHandle'
import { responseHandle } from './responseHandle'



export const axiosInstance = axios.create(axiosConfig);


// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
    return requestHandle(config);
}, function (error) {
    return Promise.reject(error);
});



// 添加响应拦截器
axiosInstance.interceptors.response.use( (response) =>  {
    return responseHandle(response)
}, function (error) {
    return Promise.reject(error);
});

export * from './useHttp'