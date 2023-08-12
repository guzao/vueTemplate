import { isArray } from "./dataTypeTools"
import { deepCloe } from "./objectTools"

export const getArrayLength = <T>(data: T[]) => data.length

export const arrayIsEmpty = <T>(data: T[]) => data.length == 0

export const arrayIsNotEmpty = <T>(data: T[]) => data.length > 0

export const getFirstElement = <T>(data: T[]) => data[0]

export const getLastElement = <T>(data: T[]) => data[getArrayLength(data) - 1]

export function arrayGroupByMap<T>(raw: T[], key: keyof T) {
    if (!isArray(raw)) throw new Error()
    const groupMap: Map<any, T[]> = new Map()
    raw.forEach(item => {
        const groupKey = item[key]
        groupMap.has(groupKey) ? groupMap.get(groupKey)?.push(item) : groupMap.set(groupKey, [item])
    })
    return groupMap
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
    const cloneData = deepCloe(data)
    if (!isArray(cloneData)) throw new Error()
    const result: T[][] = []
    let initData = cloneData.splice(0, groupNmber)
    while (arrayIsNotEmpty(initData)) {
        result.push(initData)
        initData = cloneData.splice(0, groupNmber)
    }
    return result
}


/**
 * 查找数组中的最大元素
*/
export const getMaxElement = <T> (data: T[], callback: MaxElementCallback<T>) => data.reduce((maxEl, cur) => callback(maxEl, cur) ? cur : maxEl, data[0])



type DataRangeResult <T> = {
    start: {
        index: number,
        value: T
    },
    end: {
        index: number,
        value: T
    },
}

type CachePoolData<T> = { index: number, value:T }

/**
 * 统计数组内的元素的区间 [1, 2, 3, 4, 5, 6, 1, 2,3 ] == > [ {}, {} ]
*/
export function getDataRange <T> (originData: T [], processCallback: (item: T) => boolean) {

    const result: DataRangeResult<T> [] = []

    const cachePool: CachePoolData<T>[] = []

    originData.forEach((item, index) => {
        if (processCallback(item)) {
            cachePool.push({ value: item, index: index })
        } else {
            if (arrayIsEmpty(cachePool)) return
            setDataRangeResult(cachePool, result)
        }
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
