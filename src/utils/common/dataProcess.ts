import { arrayGroupByMap, getFirstElement, objectForEach } from "../dataUtils"

type GenerateDnamicTableDataParams <T> = {
    /** 以某个字段为类别 */
    key: keyof T, 

    /** 拼接参数 */
    splitSymbol: string, 

    /**
     * 数据处理回调 将同一类型的数据合并到同一行中
     * @param  item 参数
     * @param  splitSymbol  
     * ```ts
     * // 示例===
     *  (item, splitSymbol) => {
        const tableDataItem = {} as Record<string, string>
        const { id, charge, time, name, disCharge } = item as any
        const chargeKey = `charge_${id}`
        const disChargeKey = `discharge_${id}`
        // 表头的 name、和key
        const nameKey = `${name}${splitSymbol}${id}`
        const idKey = `${id}`
        tableDataItem.time = time
        tableDataItem[chargeKey] = charge
        tableDataItem[disChargeKey] = disCharge
        tableDataItem[nameKey] = name
        tableDataItem[idKey] = idKey
        return tableDataItem
      }
     * ```
    */
    processTableRowData: (item: T, splitSymbol: string) => Record<string, string>
}

/**
 * 生成动态表头、表格数据
*/
export function generateDnamicTableData <T> (raw: T [], params: GenerateDnamicTableDataParams<T>) {

    const { key, splitSymbol = "$", processTableRowData } = params

    const tableData = [] as T[]
    const headerData: DnamicTableDataHeaderData [] = [] 

    const group = arrayGroupByMap(raw, key)

    group.forEach((value) => {

        let tableDataItem = {} as Record<string, string>

        value.forEach(_item => {
            tableDataItem = { ...tableDataItem, ...processTableRowData(_item, splitSymbol) }
        })

        tableData.push(tableDataItem as any)
    })

    const firstElement = getFirstElement(tableData) as any
    objectForEach(firstElement, (_, key) => {
        if ( key.includes(splitSymbol) ) {
            const [ name, id ] = key.split(splitSymbol)
            headerData.push({ name, id })
        }
    })

    return {
        tableData,
        headerData
    }

}
