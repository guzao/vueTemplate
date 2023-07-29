import { isArray, isDate, isNumber, isObject, isString } from "./dataTypeTools"

type ObjectForEachCallback<T> = (value: T[Extract<keyof T, string>], key: Extract<keyof T, string>, index: number) => void

/**
 * 循环对象
*/
export function objectForEach<T extends Object>(object: T, callback: ObjectForEachCallback<T>) {
    let index = 0;
    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key]
            callback && callback(value, key, index++)
        }
    }
}

/** 对象上是否存在该属性 */
export const has = (target: object, propertyKey: string | number | symbol | any) => Reflect.has(target, propertyKey)

/** 获取对象上的属性 */
export const ownKeys = (target: object) => Reflect.ownKeys(target)

/** 对象为空 */
export const objectIsEmpty = (target = {}) => !ownKeys(target).length

/** 对象不为空 */
export const objectNotEmpty = (target = {}) => !!ownKeys(target).length

/** 对象转数组 */
export function objectToArray<T extends object>(data: T) {
    const array: [Extract<keyof T, string>, T[Extract<keyof T, string>]][] = []
    objectForEach(data, (value, key) => {
        array.push([key, value])
    })
    return array

}

/** 根据条件克隆对象属性 */
export function shallowClone <T extends object> (raw: T, filterKey = [] as string []) {
    const result: Record<any, any> = {}
    Object.keys(raw).forEach((key) => {
        if (filterKey.indexOf(key) > -1) return
        result[key] = raw[key as Extract<keyof T, string>]
    })
    return result
}

/** 对象过滤无效值 */
export function objectFilterInvalidValue(obj: object)  {
    const keys: string [] = []
    objectForEach(obj, (item, key) => (!item) && keys.push(key) )
    return shallowClone(obj, keys)
}

/**
 * 深度克隆
*/
export function deepCloe <T> (object: T): T {

    if ( isNumber(object) ) return object 
    if ( isString(object) ) return object 

    let result: any;
    if (isArray(object)) result = []
    if (isObject(object)) result = {}
    if (isDate(object)) result = new Date(+object)

    for (const key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            const value = object[key];
            result[ key ] = typeof value == "object" ? deepCloe(value) : value;
        }
    }
    return result
}

