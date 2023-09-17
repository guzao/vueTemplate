import { isFalse } from '../dataUtils'
import { ElMessage } from 'element-plus'
import { objectForEach } from '../dataUtils/objectTools'

/**
 * 地址栏参数转换为对象
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
export const sleep = (dlayTime: number = 500) => new Promise((resolove, reject) => setTimeout(resolove, dlayTime) )

export const successMessage = (msg: string) => ElMessage.success(msg)

export const errorMessage = (msg: string) => ElMessage.error(msg)
