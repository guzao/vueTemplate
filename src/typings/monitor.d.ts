/** 电站收益信息 */
type ParkIncomeData = {
    accumulateCharge: number,
    lastYearDischarge: number,
    lastYearCharge: number,
    dayIncome: number,
    dayDischarge: number,
    lastWeekIncome: number,
    lastMonthIncome: number,
    lastMonthCharge: number,
    lastDayIncome: number,
    weekDischarge: number,
    lastWeekCharge: number,
    accumulateDischarge: number,
    yearIncome: number,
    yearCharge: number,
    lastDayCharge: number,
    lastMonthDischarge: number,
    yearDischarge: number,
    dayCharge: number,
    lastWeekDischarge: number,
    accumulateIncome: number,
    lastYearIncome: number,
    lastDayDischarge: number,
    monthDischarge: number,
    monthIncome: number,
    weekCharge: number,
    monthCharge: number,
    weekIncome: number
}


type IncomeProfile = {
    times: number,
    charge: number,
    chargeCash: number,
    disCharge: number,
    disChargeCash: number
}

/** 电站设备详情 新窗口地址栏参数 */
type DeviceDetailNewTapUrlParam = {
    /** 场站 */
    stationCode: string;
    /** 电站类型 */
    type: string;
    /** 设备id */
    unitId: string;
    /** 设备状态 */
    state: number;
}


/*** 电站运行详情 */
type ParkRuningInfo = {
    A_M2: number,
    A_M3: number,
    A_M5: number,
    A_M6: number,
    A_M7: number,
    A_M8: number,
    A_M15: number,
    A_M16: number,
    A_M17: number,
    A_M18: number,
    A_M19: number,
    A_M20: number,
    type: string,
    code: string,
    typeLabel: string,
}


/*** 设备列表 */
type DeviceItem = {
    id: number,
    ugroupId: number,
    stationSerial: string,
    name: string,
    serial: string,
    assetSerial: string,
    /** 设备类型 */
    unitType: string,
    sort: number,
    delFlag: number,
    createTime: number,
    updateTime: number,
    params: Params$1Type,
    [key: string]: any,
    /** 设备运行参数 */
    deviceData: {
        M2: number
        M3: number
        M4: number
        M5: number
        M6: number
        M7: number
        M20: number
        M8: number
        M22: number
        M9: number
        M11: number
        M10: number
        M13: number
        M23: number
        M12: number
        M26: number
        M15: number
        M25: number
        M14: number
        M17: number
        M16: number
        M19: number
        M18: number
    },
}


/** 电站设备组信息列表 */
type DeviceGroup = {
    id: number,
    /** 单元组名称 */
    name: string,
    status: number,
    soc: number,
    dailyCharge: number,
    dailyDisCharge: number,
    M5: number,
    M6: number,
    /**  有功*/
    activePower: number,
    /**  无功*/
    reactivePower: number,
    M17: number,
    M18: number,
    M19: number,
    M20: number,
    /*** 设备列表 */
    list: DeviceItem[];
    /*** 设备状态统计列表 */
    stateCount: Record<string, number>
}

/** 电站实时功率曲线 */
type ParkPowerLine = {
    createTime: string
    power: string
}



/** 用户登录日志 */
type Logininfor = {
    createBy: any
    createTime: any
    updateBy: any
    updateTime: any
    remark: any
    infoId: number
    userName: string
    status: string
    ipaddr: string
    loginLocation: string
    browser: string
    os: string
    msg: string
    loginTime: string
    operUserId: number
    deptId: number
}


/** 用户操作日志 */
type Operlog = {
    createBy: any
    createTime: any
    updateBy: any
    updateTime: any
    remark: any
    operId: number
    title: string
    businessType: number
    businessTypes: any
    method: string
    requestMethod: string
    operatorType: number
    operName: string
    operUserId: number
    deptName: any
    deptId: number
    operUrl: string
    operIp: string
    operLocation: string
    operParam: string
    jsonResult: string
    status: number
    errorMsg: any
    operTime: string
}

/** 设备基本信息 */
type DeviceInfoParams = {
    stationSerial: string,
    type: string,
    unitId: string,
    groupId?: string
}


/** 设备基本信息 */
type DeviceInfoData = {
    E: StoreageUnit[]
    deviceMap: DeviceMap
}

/** 储能单元列表 */
interface StoreageUnit {
    id: number
    stationSerial: string
    modelName: string
    name: string
    serial: string
    prefix: string
    sort: number
    params: Params
}


/** 设备基本信息 */
interface DeviceMap {
    M2: number
    M3: number
    M4: number
    M5: number
    M6: number
    M7: number
    M20: number
    M8: number
    M22: number
    M9: number
    M23: number
    M26: number
    M25: number
    M11: number
    M10: number
    M13: number
    M12: number
    M15: number
    M14: number
    M17: number
    M16: number
    M19: number
    M18: number
    [key: string]: any
}

/** PCS 信息 */
type PCSInfo = {
    "P01.X39": boolean
    "P01.X38": boolean
    "P01.C23": number
    "P01.C22": number
    "P01.C21": number
    "P01.C20": number
    "P01.C24": number
    "P01.X40": boolean
    "P01.X44": boolean
    "P01.X43": boolean
    "P01.X42": boolean
    "P01.X41": boolean
    "P01.X45": boolean
    "P01.X29": boolean
    "P01.X9": boolean
    "P01.X28": boolean
    "P01.X8": boolean
    "P01.X27": boolean
    "P01.X7": boolean
    "P01.C12": number
    "P01.X6": boolean
    "P01.C11": number
    "P01.X5": boolean
    "P01.C10": number
    "P01.X4": boolean
    "P01.X3": boolean
    "P01.C16": number
    "P01.X2": boolean
    "P01.C15": number
    "P01.X1": boolean
    "P01.C14": number
    "P01.C13": number
    "P01.C9": number
    "P01.C19": number
    "P01.C8": number
    "P01.C18": number
    "P01.C7": number
    "P01.C17": number
    "P01.C6": number
    "P01.C5": number
    "P01.C4": number
    "P01.C3": number
    "P01.C2": number
    "P01.C1": number
    "P01.X33": boolean
    "P01.X32": boolean
    "P01.X31": boolean
    "P01.X30": boolean
    "P01.X37": boolean
    "P01.X36": boolean
    "P01.X35": boolean
    "P01.X34": boolean
    "P01.X19": boolean
    "P01.X18": boolean
    "P01.X17": boolean
    "P01.X16": boolean
    "P01.X22": boolean
    "P01.X21": boolean
    "P01.X20": boolean
    "P01.X26": boolean
    "P01.X25": boolean
    "P01.X24": boolean
    "P01.X23": boolean
    "P01.X11": boolean
    "P01.X10": boolean
    "P01.X15": boolean
    "P01.X14": boolean
    "P01.X13": boolean
    "P01.X12": boolean
}

/** 设备状态 */
type DeviceState = {
    "Y01.X6": number
    "Y01.C1": number
    "Y01.X7": number
    "Y01.C2": number
    "Y01.X4": number
    "Y01.X5": number
    "Y01.X8": number
    "Y01.C3": number
    "Y01.X9": number
    "Y01.C4": number
    "E01.C1": number
    [key: string]: any
}