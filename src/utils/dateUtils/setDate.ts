import DayJs from 'dayjs'


export const addDate = (date:number | Date, day: number) =>  DayJs(date).add(day, 'd').toDate()

export const addMonth = (date:number | Date, month: number) =>  DayJs(date).add(month, 'M').toDate()

export const addYear = (date:number | Date, year: number) =>  DayJs(date).add(year, 'y').toDate()



export const subtractDate = (date:number | Date, day: number) =>  DayJs(date).subtract(day, 'd').toDate()

export const subtractMonth = (date:number | Date, month: number) =>  DayJs(date).subtract(month, 'M').toDate()

export const subtractYear = (date:number | Date, year: number) =>  DayJs(date).subtract(year, 'y').toDate()