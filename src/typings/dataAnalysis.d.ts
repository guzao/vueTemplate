

/** 电站报表 */
type ParkRunReportParams = {
    stationSerial: string,
    type: DateCycles,
    startTime: string,
    endTime: string,
}


/** 电站报表数据 */
type ParkRunReportData = {
    /** 充放电tag */
    expressions: string[],
    /** 时间数据 */
    timestamps: number[],
    /** 数值数据 */
    values: number[][]
}

/** 电站设备充放电数据 */
type DailyReportParams = {
    stationSerial: string,
    date: string,
}



/** 电站设备充放电数据具体数 */
type DailyReportDataData = {
    charge: string;
    sumDischarge: string;
    dev: string;
    sumCharge: string;
    subName: string;
    discharge: string;
    efficiency: number;
    limit: number
}

/** 电站设备充放电数据 */
type DailyReportData = {
    charge: number,
    discharge: number,
    data: DailyReportDataData [],
    subNum: number []
}

/** 设备历史充放电数据接口参数 */
type HistoryReportParams = {
    startTime: string;
    endTime: string;
    stationSerial: string;
    dataCycle: any;
    assetSerials: string[];
}

/** 设备历史充放电数据 */
type HistoryReportData = {
    charge: string
    name: string
    id: string
    time: string
    disCharge: string
    [ key: string ]: any 
}