import { CreateAxiosDefaults } from "axios"


const axiosConfig: CreateAxiosDefaults = {
    baseURL: '',
    timeout: 1000 * 60,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

export default axiosConfig