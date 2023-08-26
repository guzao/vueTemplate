import DayJs from 'dayjs'


export const addDate = (date:number | Date, day: number) =>  DayJs(date).add(day, 'd')

export const addMonth = (date:number | Date, month: number) =>  DayJs(date).add(month, 'M')

export const addYear = (date:number | Date, year: number) =>  DayJs(date).add(year, 'y')



export const subtractDate = (date:number | Date, day: number) =>  DayJs(date).subtract(day, 'd')

export const subtractMonth = (date:number | Date, month: number) =>  DayJs(date).subtract(month, 'M')

export const subtractYear = (date:number | Date, year: number) =>  DayJs(date).subtract(year, 'y')