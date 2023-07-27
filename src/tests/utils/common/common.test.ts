import { expect, it, describe } from 'vitest'
import { urlQueryToObject, objectToUrlQuery } from '@/utils'


describe('common utils ', () => {


    it('urlQueryToObject', () => {
        expect(urlQueryToObject('?stationCode=ESCNGXAH02')).toEqual({ stationCode: 'ESCNGXAH02' })
    })

    it('objectToUrlQuery', () => {
        expect(objectToUrlQuery({ stationCode: 'ESCNGXAH02' })).toBe('?stationCode=ESCNGXAH02')
        expect(objectToUrlQuery({ stationCode: 'ESCNGXAH02' })).not.toBe('?stationCode=ESCNGXAH09')
    })


})

