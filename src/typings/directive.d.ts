
/** 水印指令配置参数 */
type Watermark = {
    /** 是否显示水印 */
    markSatate: boolean,
    /** 水印文本 */
    text: string,
    /** 背景宽度 */
    width?: number,
    /** 背景高度 */
    height?: number,
    /** 水印文本颜色 */
    color?: string;
    /** 水印文本字体大小 */
    fontSize?: number;
}
