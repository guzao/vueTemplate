
/** 信息监视电站运行信息列表 */
type ParkMonitorInfo = {
    cardList: any;
    code: string;
    detailList: any;
    label: any;
    releaseStatus: string;
    state: string;
    titleInfo: {
        energy: string;
        runTime: number;
        totalPower: string;
    };
}