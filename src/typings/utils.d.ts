/** 数据分组 */
type ArrayGroupBy<T> = {
    id: any;
    children: T[];
}


type DnamicTableDataHeaderData = { name: string; id: string }

/**
 * 查找数组中的最大元素的回调函数
*/
type MaxElementCallback<T> = (maxEl: T, cur: T) => boolean


type DataRangeResult<T> = {
    start: {
        index: number,
        value: T
    },
    end: {
        index: number,
        value: T
    },
}

type CachePoolData<T> = { index: number, value: T }
