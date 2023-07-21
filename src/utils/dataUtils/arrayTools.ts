
export const getArrayLength = <T> (data: T []) => data.length

export const arrayIsEmpty = <T> (data: T []) => data.length == 0

export const arrayIsNotEmpty = <T> (data: T []) => data.length > 0


export function arrayGroupByMap <T> (raw: T [], key: keyof T)  {
    const groupMap: Map<any, T []> = new Map()
    raw.forEach(item => {
        const groupKey = item[ key ]
        groupMap.has(groupKey) ?  groupMap.get(groupKey)?.push(item) : groupMap.set(groupKey, [ item ])
    })
    return groupMap
}


export function arrayGroupBy <T> (raw: T [], key: keyof T) {

    const groupMap = arrayGroupByMap(raw, key)

    const group: ArrayGroupBy<T> [] = []

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
export function arrayChunk <T> (data: T[] = [], groupNmber: number) {
    const result: T[][] = []
    let initData = data.splice(0, groupNmber)
    while (arrayIsNotEmpty(initData)) {
        result.push(initData)
        initData = data.splice(0, groupNmber)
    }
    return result
}
