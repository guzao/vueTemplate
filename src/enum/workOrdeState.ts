/**
 * 设备运维工单状态
*/
export const enum OPSWorkOrdeState {

    /** 暂存 */
    DRAFT = 0,

    /** 未分配 */
    UN_DISTRIBUTED = 1,

    /** 待分析  */
    UN_ANALYSED = 2,

    /** 已分析待分配 */
    ANALYSISED = 3,

    /** 待处理 */
    ANALYZED_FORALLOCATION = 4,

    /** 已处理待分配 */
    PROCESSED_FOR_ALLOCATION = 5,

    /** 待审核 */
    UN_AUDIT = 6,

    /** 待归档 */
    UN_PIGEONHOLE = 7,

    /** 已关闭 */
    CLOSED = 8,

    /** 遗留 */
    LEGACY = 9,

}

/**
 * 电芯运维工单状态
*/
export const enum BatWorkOrdeState {

    /** 待分配 */
    DISPATCH = 1,

    /** 待处理 */
    PENDING = 2,

    /** 处理中(暂存) */
    PROCESS_ING = 3,

    /** 已处理待分配 */
    PROCESSED = 4,

    /** 待审核 */
    AUDIT = 5,

    /** 已关闭 */
    CLOSE = 6,

    /** 已关闭 */
    SCRAP = 7


}
