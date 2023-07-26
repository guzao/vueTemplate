
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
type DictType = 'eos_park_type' | 'station_release_status'

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