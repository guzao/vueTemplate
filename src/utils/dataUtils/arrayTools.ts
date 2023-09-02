import { isArray } from "./dataTypeTools"
import { deepClone } from "./objectTools"

export const getArrayLength = <T>(data: T[]) => data.length

export const arrayIsEmpty = <T>(data: T[]) => data.length == 0

export const arrayIsNotEmpty = <T>(data: T[]) => data.length > 0

export const getFirstElement = <T>(data: T[]) => data[0]

export const getLastElement = <T>(data: T[]) => data[ getArrayLength(data) - 1 ]

export function arrayGroupByMap<T>(raw: T[], key: keyof T) {
    if (!isArray(raw)) throw new Error()
    return raw.reduce((acc, cur) => {
        const groupKey = cur[key]
        acc.has(groupKey) ? acc.get(groupKey)?.push(cur) : acc.set(groupKey, [cur])
        return acc
    }, new Map() as  Map<any, T[]>)
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
        result.push( cloneData.splice(0, groupNmber) )
    }
    return result
}


/**
 * 查找数组中的最大元素
*/
export const getMaxElement = <T> (data: T[], callback: MaxElementCallback<T>) => data.reduce((maxEl, cur) => callback(maxEl, cur) ? cur : maxEl, data[0])


/**
 * 统计数组内的元素的区间 [1, 2, 3, 4, 5, 6, 1, 2,3 ] == > [ {}, {} ]
*/
export function getDataRange <T> (originData: T [], processCallback: (item: T) => boolean) {

    const result: DataRangeResult<T> [] = []

    const cachePool: CachePoolData<T>[] = []

    originData.forEach((item, index) => {

        if (processCallback(item)) return cachePool.push({ value: item, index: index })

        arrayIsNotEmpty(cachePool) && setDataRangeResult(cachePool, result)

    })
    
    setDataRangeResult(cachePool, result)

    return result

}

function setDataRangeResult <T> (cachePool: CachePoolData<T>[], result: DataRangeResult<T> []) {
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
