import { isFalse } from '../dataUtils'
import { ElMessage } from 'element-plus'
import { objectForEach } from '../dataUtils/objectTools'

/**
 * 地址栏参数转换为对象
 * @param urlSearch 地址栏传参格式字符串 默认去地址栏url
 * @example 'http://localhost:4000/monitor/deviceDetail?unitId=58&state=3&stationCode=ESCNGXAH02'
*/
export function urlQueryToObject(urlSearch = location.search) {
    const search = urlSearch.replace('?', '')
    if (isFalse(search)) return {}
    const searchSplited = search.split('&')
    return searchSplited.reduce((acc, cur) => {
        const [key, value] = cur.split('=')
        acc[key] = value
        return acc
    }, {} as Record<string, string>)
}

/**
 * 对象转换为地址栏参数
*/
export function objectToUrlQuery(params: Record<string, string>) {
    let result = ''
    objectForEach(params, (value, key, index) => {
        result += index == 0 ? `?${key}=${value}` : `&${key}=${value}`
    })
    return result
}

/**
 * 添加修改浏览器地址栏参数 不刷新页面
 * @params newParams 新的地址栏参数
 * @BUG BUG 会导致获取不到 路由的 query参数
*/
export function replaceUrlQuery(newParams: Record<any, any>) {

    const { search, origin, pathname } = location

    let params = urlQueryToObject(search)

    params = { ...params, ...newParams }

    const newSearch = objectToUrlQuery(params)

    // 地址栏参数同步变化
    window.history.replaceState({ ...params }, '', `${origin}${pathname}${newSearch}`)

}

/** 延时执行 */
export const sleep = (dlayTime: number = 500) => new Promise((resolove, reject) => setTimeout(resolove, dlayTime))

export const successMessage = (msg: string) => ElMessage.success(msg)

export const errorMessage = (msg: string) => ElMessage.error(msg)

/**
 * 写入默认值 
 * @params raw 需要检测的数据
 * @params value 默认值
*/
export const writeDefault = <T>(raw: any, value: T) => raw || value


/**
 * 获取css 类中的 class名称 
 * @params IconClass 需要检测的数据
*/
export const passerClass = (IconClass: string) => IconClass.replace(/\{([^}]+)\}/g, '').replace(/\n/g, '').replaceAll('.', '').split(' ').filter(item => item != 'icon')


/**
 * 获取下载文件的文件名
 * @params str 接口返回的 disposition值
*/
export function getDownloadFileName(str: string) {
    try {
        str = str.replace('attachment; ', '')
        const [fileNameArgs] = str.split(';')
        const [, fileName] = fileNameArgs.split('=')
        return decodeURI(fileName)
    } catch (error) {
        return ''
    }
}

