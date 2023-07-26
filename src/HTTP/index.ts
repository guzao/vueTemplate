import axios from 'axios'
import { axiosConfig } from '@/config/axios';
import { requestHandle } from './requestHandle'
import { responseHandle, responseErrorHandle } from './responseHandle'


export const axiosInstance = axios.create(axiosConfig);


// 添加请求拦截器
axiosInstance.interceptors.request.use((config) => requestHandle(config), (error) => Promise.reject(error));



// 添加响应拦截器
axiosInstance.interceptors.response.use((response) => responseHandle(response), (error) => responseErrorHandle(error));



export * from './useHttp'