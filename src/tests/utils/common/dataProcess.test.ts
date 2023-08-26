import { test, describe, expect } from 'vitest'
import { generateDnamicTableData } from '@/utils/common/dataProcess'


describe('dataProcess', () => {

    test('generateDnamicTableData', () => {

        const testData = [{ name: 'test1', time: '1' }, { name: 'test2', time: '1' }]

        const expectData = {
            tableData: [ { 'test1$1': 'test1$1', 'test2$1': 'test2$1' } ],
            headerData: [{ name: 'test1', id: '1' }, { name: 'test2', id: '1' }]
        }

       const text1 =  generateDnamicTableData(testData, {
            key: 'time',
            splitSymbol: '$',
            processTableRowData(item, splitSymbol) {
                const tableDataItem = {} as Record<string, string>
                const {  name, time } = item
                const nameKey = `${name}${splitSymbol}${time}`
                tableDataItem[ nameKey ] = nameKey
                return tableDataItem
            },
        })
        
        expect(text1).toEqual(expectData)

    })

})