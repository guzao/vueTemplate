
/** 应用报错信息 */
type AppErrorPool = {
    /** 错误时间 */
    date: number,
    /** 错误元素 */
    tag: string,
    /** 错误元素内容 */
    tagInnerText: string,
    /** 错误信息 */
    info: string,
    /** 错误详细信息 */
    errorInfo: string,
    /** 错误发生页面 */
    page: string,
    /** 错误类型 */
    errorType: string,
    offsetLeft?: any,
    offsetTop?: any,
    width?: any,
    height?: any,
}

type NetworkErrorPool = {
    /** 错误时间 */
    date: number,
    /** 错误信息 */
    mesage: string,
    /** 错误状态码 */
    status: number,
    /** 请求的url */
    apiUrl: string,
    /** 请求方式 */
    method: string,
    /** 请求参数 get 方式参数 */
    params: any,
    /** 请求参数 post put delet */
    data: any
}





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
type DictType = 'eos_park_type' | 'station_release_status' | 'sys_user_sex' | 'eos_status' | 'eos_park_use_type'
    | 'eos_park_run_status' | 'eos_park_use_type' | 'eos_industry_type' | 'eos_grid_status' | 'sys_normal_disable'
    | 'sys_common_status' | 'sys_oper_type' | 'eos_level' | 'eos_device_type' 


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
    id: string
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
    delFlag: number,
    /** 父节点的名称 前端追加的参数 */
    parentName: string
}


/** 单元组 */
type GroupList = {
	createBy?: any;
	createTime: string;
	updateBy?: any;
	updateTime: string;
	remark?: any;
	id: number;
	stationSerial: string;
	name: string;
	sort: number;
	delFlag: number;
	eosUnitList: UnitListData [];
}