import { isFalse } from "@/utils"
import { Directive } from "vue"

/**
 * 创建水印元素
*/
function createElement (value: Watermark) {

    const mark = document.createElement('div')
    mark.style.position = 'absolute'
    mark.style.left = '0'
    mark.style.right = '0'
    mark.style.bottom = '0'
    mark.style.top = '0'
    mark.className = 'mark'
    mark.style.pointerEvents = 'none'
    mark.style.background = createWatermarkBgc(value)

    return mark

}

/**
 * 创建水印背景图
*/
function createWatermarkBgc ({ text, width, height, color, fontSize }: Watermark) {

    var canvas = document.createElement("canvas")
    canvas.width = width|| 300
    canvas.height = height || 200
    var cans = canvas.getContext("2d")!
    cans.rotate(( -20 * Math.PI) / 180)
    cans.font = `${ fontSize || 18 }px alipuhuitir Microsoft JhengHei `
    cans.fillStyle =  color ||"rgba(0, 0, 0, 0.1)"
    cans.textAlign = "left"
    cans.textBaseline = "middle"
    cans.fillText(text, canvas.width / 3, canvas.height / 2)
    cans.fillText(text, canvas.width / 3, 130)
    return  `url(${canvas.toDataURL("image/png")})`

}

/**
 * 添加角标
*/
function addSubscriptElement(el: Element, { text, markSatate }: Watermark) {
    let subscript = el.querySelector('.subscript') as any
    if (isFalse(subscript)) {
        subscript = document.createElement('div')
        subscript.style.width = '153px'
        subscript.style.position = 'absolute'
        subscript.style.right = '-31px'
        subscript.style.bottom = '28px'
        subscript.className = 'subscript'
        subscript.style.pointerEvents = 'none'
        subscript.style.backgroundColor = 'pink'
        subscript.style.transformOrigin = 'center'
        subscript.style.transform = 'rotate(-45deg)'
        subscript.style.textAlign = 'center'
        subscript.style.fontSize = '18px'
        el.appendChild(subscript)
    }
    subscript.innerText = text
    subscript.style.opacity = getOpacityCount(markSatate)
}


/**
 *获取透明度
*/
const getOpacityCount = (markSatate: number) => markSatate == 1 ? 0 : 1;

/**
 * 水印设置 角标添加
*/
function markAction(value: any, mark: HTMLDivElement, el: HTMLElement) {
    const opacityCount = getOpacityCount(value.markSatate)
    mark.style.opacity = `${opacityCount}`
    opacityCount ? (el.style.filter = 'grayscale(4)') : (el.style.filter = 'none')
    addSubscriptElement(el, value)
}


/**
 * 水印指令
*/
export const watermark: Directive = {

    mounted (el: HTMLElement, { value }: any) {
        el.style.position = 'relative'
        el.style.overflow = 'hidden'
        const mark = createElement(value)
        el.appendChild(mark)
        markAction(value, mark, el)
    },

    updated (el: HTMLElement, { value }: any) {
        const mark = el.querySelector('.mark')! as HTMLDivElement
        markAction(value, mark, el)
    },

}

