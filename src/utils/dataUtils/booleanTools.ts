
export const convertBoolean = (raw: any) => !!raw

export const isTrue = (raw: any) => convertBoolean(raw)

export const isFalse = (raw: any) => !convertBoolean(raw)

/**
 * 数字 0 也认为是true
*/
export const normIsTrue = ( raw: any ) => {
    return isTrue(raw === 0 ) ? true : isTrue(raw) 
}

