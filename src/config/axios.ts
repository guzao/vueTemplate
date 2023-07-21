import { CreateAxiosDefaults } from "axios"


const axiosConfig: CreateAxiosDefaults = {
    baseURL: '/api',
    timeout: 1000 * 60,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export default axiosConfig