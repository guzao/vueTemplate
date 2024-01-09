import { test, describe, expect } from 'vitest'
import { getDownloadFileName } from '@/utils/common/tools'


describe('tools', () => {

    test('getDownloadFileName', () => {
        
        const str = "attachment; filename=%E8%AE%BE%E5%A4%87%E6%8A%A5%E8%A1%A8-2024-01-05.xls;filename*=utf-8''%E8%AE%BE%E5%A4%87%E6%8A%A5%E8%A1%A8-2024-01-05.xls"
        expect(getDownloadFileName(str)).toBe('设备报表-2024-01-05.xls')

    })

})