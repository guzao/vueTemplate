import { DataType } from '@/enum/index'

export const toString = (data: any) => Object.prototype.toString.call(data)

export const getToStrigResult = (data: any) => toString(data).replace('[object ', '').replace(']', '')

export const isObject = (data: any) => getToStrigResult(data) == DataType.OBJECT

export const isArray = (data: any) => getToStrigResult(data) == DataType.ARRAY

export const isNumber = (data: any) => getToStrigResult(data) == DataType.NUMBER

export const isNaN = Number.isNaN

export const isString = (data: any) => getToStrigResult(data) == DataType.STRING

export const isUndefined = (data: any) => getToStrigResult(data) == DataType.UNDEFIND  

export const isBoolean   = (data: any) => getToStrigResult(data) == DataType.BOOLEAN

export const isNull = (data: any) => getToStrigResult(data) == DataType.NUll

export const isFunction = (data: any) => getToStrigResult(data) == DataType.FUNCTION

export const isDate = (data: any) => getToStrigResult(data) == DataType.Date

/** 数值是否是字符串类型的null */
export const isStringNull = (data: any) => data === 'null'