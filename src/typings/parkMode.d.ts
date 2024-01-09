
/** 测点类型列表 */
type MetricModel =  {
	/** 创建者 */
	createBy?: any;
	/** 创建时间 */
	createTime: string;
	/** 创建者 */
	updateBy?: any;
	/** 更新者 */
	updateTime: string;
	/** 备注 */
	remark: string;
	id: number;
	/** 测点类型列表 */
	category: string;
	/** 中文名称 */
	nameCn: string;
	/** 英文名称 */
	nameEn: string;
	/** 自编号 */
	serial: string;
	/** 变量名 */
	variable: string;
	/** 信号类型 */
	signalType: string;
	/** 事件类型 */
	eventType: string;
	/**  */
	type: string;
	/** 告警等级 */
	level?: any;
	/** 数据类型 */
	dataType: string;
	/** 测点类型列表 */
	unit?: any;
	/** 缩放因子 */
	factor: number;
	/** 偏移量 */
	offset: number;
	/**  */
	precise: string;
	/**  */
	formula?: any;
	/**  */
	formulaParams?: any;
	/**  */
	showUser: string;
	/**  */
	masterName?: any;
	/** 排序 */
	sort: number;
	/** 组标签 */
	groupTags: string;
	/**  */
	oprators?: any;
	/**  */
	statTags?: any;
	/**  */
	componentTags?: any;
	/**  */
	industryTag: string;
	/**  */
	delFlag: number;
	/**  */
	statPeriod?: any;

	[key: string]: any
	
}