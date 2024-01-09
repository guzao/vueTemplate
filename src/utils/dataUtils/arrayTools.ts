import { isTrue } from "./booleanTools"
import { isArray } from "./dataTypeTools"
import { deepClone } from "./objectTools"

export const getArrayLength = <T>(data: T[]) => data.length

/** 数组为空 */
export const arrayIsEmpty = <T>(data: T[]) => getArrayLength(data) == 0

/** 数组不为空 */
export const arrayIsNotEmpty = <T>(data: T[]) => getArrayLength(data) > 0

export const getFirstElement = <T>(data: T[]) => data[0]

export const getLastElement = <T>(data: T[]) => data[getArrayLength(data) - 1]

export function arrayGroupByMap<T>(raw: T[], key: keyof T) {
    if (!isArray(raw)) throw new Error()
    return raw.reduce((acc, cur) => {
        const groupKey = cur[key]
        acc.has(groupKey) ? acc.get(groupKey)?.push(cur) : acc.set(groupKey, [cur])
        return acc
    }, new Map() as Map<any, T[]>)
}


export function arrayGroupBy<T>(raw: T[], key: keyof T) {
    if (!isArray(raw)) throw new Error()

    const groupMap = arrayGroupByMap(raw, key)

    const group: ArrayGroupBy<T>[] = []

    groupMap.forEach((item, key) => {
        group.push({
            id: key,
            children: item
        })
    })

    return group

}

/**
 * 数组分块
*/
export function arrayChunk<T>(data: T[] = [], groupNmber: number) {
    if (!isArray(data)) throw new Error()
    const cloneData = deepClone(data)
    const result: T[][] = []
    while (arrayIsNotEmpty(cloneData)) {
        result.push(cloneData.splice(0, groupNmber))
    }
    return result
}


/**
 * * 查找数组中的最大元素
 * * 使用时注意数据源内的元素不能为空！！！
*/
export const getMaxElement = <T>(data: T[], callback: MaxElementCallback<T>) => data.reduce((maxEl, cur) => callback(maxEl, cur) ? cur : maxEl, data[0])

/**
 * 数据排序 不影响原数据
 *@param data 数据
 *@param callback 处理函数 
*/
export const sorted = <T>(data: T[], callback: (a: T, b: T) => number) => deepClone(data).sort((a, b) => callback(a, b))


/**
 * 统计数组内的元素的区间
 * ```ts
 *  // 返回值
 *  [ { start: { index: number; value: T }, end: { index: number; value: T; } }, { start: { index: number; value: T }, end: { index: number; value: T; } }  ]
 * ```
*/
export function getDataRange<T>(originData: T[], processCallback: (item: T) => boolean) {

    const result: DataRangeResult<T>[] = []

    const cachePool: CachePoolData<T>[] = []

    originData.forEach((item, index) => isTrue(processCallback(item)) ? cachePool.push({ value: item, index: index }) : setDataRangeResult(cachePool, result))

    setDataRangeResult(cachePool, result)

    return result

}

/**
 * 数组之间对比出差异数据
 *@param origin 原始数据
 *@param diff   比对的数据
 *@param processCallback  处理条件
 * ```ts
 *  // 返回值
 *  [ { start: { index: number; value: T }, end: { index: number; value: T; } }, { start: { index: number; value: T }, end: { index: number; value: T; } }  ]
 * ```
*/
export function getDynamicDataRange<T>(origin: T[], diff: T[], processCallback: (o: T, d: T) => boolean) {

    const result: DataRangeResult<T>[] = []

    const cachePool: CachePoolData<T>[] = []

    for (let index = 0; index < origin.length; index++) {
        const o = origin[index]
        const d = diff[index]
        isTrue(processCallback(o, d)) ? cachePool.push({ value: o, index: index }) : setDataRangeResult(cachePool, result)
    }

    setDataRangeResult(cachePool, result)

    return result

}

function setDataRangeResult<T>(cachePool: CachePoolData<T>[], result: DataRangeResult<T>[]) {
    if (arrayIsEmpty(cachePool)) return
    const startEl = getFirstElement(cachePool)
    const endEl = getLastElement(cachePool)
    result.push({
        start: {
            index: startEl.index,
            value: startEl.value
        },
        end: {
            index: endEl.index,
            value: endEl.value
        }
    })
    cachePool.length = 0
}


/**
 * 快排算法
*/
export function quickSort(raw: number[],): number[] {

    const length = getArrayLength(raw)
    if (isTrue(length <= 1)) return raw

    const middleIndex = Math.floor(length / 2)
    const minddleElement = raw.splice(middleIndex, 1).at(0)!

    const leftPoll: number[] = []
    const rightPoll: number[] = []

    for (let index = 0; index < raw.length; index++) isTrue(raw[index] < minddleElement) ? leftPoll.push(raw[index]) : rightPoll.push(raw[index])

    return quickSort(leftPoll).concat([minddleElement], quickSort(rightPoll))
}





/**
 * 递归执行
*/
export function deppEach<T>(raw: T[], key: keyof T, callback: (value: T) => void) {
    raw.forEach(item => {
        callback(item)
        const children = item[key] as T[]
        if (arrayIsNotEmpty(children)) {
            deppEach(children, key, callback)
        }
    })
}