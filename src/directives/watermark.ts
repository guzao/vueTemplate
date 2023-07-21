import { isTrue } from "@/utils"
import { Directive } from "vue"

const getDisplayState = (state: boolean) => isTrue(state) ? 'block' : 'none'

const setDisplayState = (el: HTMLElement, state: boolean) => el.style.display = getDisplayState(state)

function createElement (value: Watermark) {

    const mark = document.createElement('div')
    mark.style.position = 'absolute'
    mark.style.left = '0'
    mark.style.right = '0'
    mark.style.bottom = '0'
    mark.style.top = '0'
    mark.className = 'mark'
    mark.style.pointerEvents = 'none'
    mark.style.background = createWatermark(value)
    return mark

}

function createWatermark ({ text, width, height, color, fontSize }: Watermark) {

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
 * 水印指令
*/
export const watermark: Directive = {

    mounted (el: HTMLElement, { value }: any) {
        el.style.position = 'relative'
        const mark = createElement(value)
        el.appendChild(mark)
        setDisplayState(mark, value.markSatate)
    },

    updated (el: HTMLElement, { value }: any) {
        const mark = el.querySelector('.mark')! as HTMLElement
        setDisplayState(mark, value.markSatate)
    },

}