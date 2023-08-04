
/** 时间周期 */
type DateCycles = 'D' | 'M' | 'Y'


/** 信息监视电站运行信息列表 */
type ParkMonitorInfo = {
    cardList: any;
    code: string;
    detailList: any;
    label: any;
    /** 电站是否发布 */
    releaseStatus: string;
    state: string;
    titleInfo: {
        energy: string;
        runTime: number;
        totalPower: string;
    };
    /** 电站类型 */
    type: string;
    /** 电站类型名称 */
    typeLabel: string;
    
    A_M2: number;
    A_M3: number;
    A_M5: number;
    A_M6: number;
    A_M7: number;
    A_M8: number;
    A_M15: number;
    A_M16: number;
    A_M17: number;
    A_M18: number;
    A_M19: number;
    A_M20: number;
    type: string;
}


/** 用户受权限控制的电站 */
type ParkAuth = {
    createBy?: any;
    createTime: string;
    updateBy?: any;
    updateTime?: any;
    remark?: any;
    id: number;
    deptId?: any;
    /** 全称 */
    fullName: string;
    /** 简称 */
    name: string;
    /** 编号 */
    serial: string;
    /** 行业 */
    industryType: string;
    /** 电站类型 */
    type: string;
    /** 电站使用类型 */
    useType: string;
    status: string;
    /** 总功率 */
    totalPower: string;
    /** 总能量 */
    energy: string;
    /** 建造时间 */
    buildTime: string;
    /** 建造状态 */
    buildStatus: string;
    operateTime: string;
    runStatus: string;
    countryId?: any;
    areaId?: any;
    address: string;
    longitude: number;
    latitude: number;
    delFlag: number;
    releaseStatus: number;
    sort: number;
}

/** 字典数据接口url字段 */
type DictType = 'eos_park_type' | 'station_release_status' | 'sys_user_sex' | 'eos_status' | 'eos_park_use_type' | 'eos_park_run_status'

/** 字典数据类型 */
type DictTypeData = {
    createBy: string;
	createTime: string;
	updateBy?: any;
	updateTime?: any;
	remark: string;
	dictCode: number;
	dictSort: number;
    /** 中文类型 */
	dictLabel: string;
    /** 英文类型 */
	dictLabelEn: string;
    /** 类型标识值 */
	dictValue: string;
	dictType: string;
	cssClass?: any;
	listClass: string;
	isDefault: string;
	status: string;
	default: boolean;
    /** 类型标 统计 */
	accLabel: string;
}

/** 设备组列表接口参数 */
type UnitListPrams = {
    stationSerial: string;
    pageSize: number;
}

/** 设备组列表 */
type UnitListData = {
    createBy: any
    createTime: string
    updateBy: any
    updateTime: string
    remark: any
    id: number
    ugroupId: number
    stationSerial: string
    name: string
    serial: string
    assetSerial: string
    unitType: string
    sort: number
    capacity: any
    longitude: any
    latitude: any
    altitude: any
    installTime: any
    acceptTime: any
    gridTime: any
    goinTime: any
    expireTime: any
    templatePowercurvesSerial: any
    delFlag: number
}

