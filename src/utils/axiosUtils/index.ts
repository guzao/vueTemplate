import { ElMessage } from 'element-plus'
import { HTTPSTATE } from '@/enum'


/** 接口是否错误 */
export function hasEror (responseData: ResponseData) {
    const { code, msg } = responseData
    if ( code !== HTTPSTATE.SUCCESS ) {
        ElMessage({
            type: 'error',
            message: msg
        })
        return true
    }
    return false
}