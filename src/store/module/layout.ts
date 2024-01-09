import { isFalse } from "@/utils";
import { defineStore } from "pinia";
import { ElScrollbar } from 'element-plus'
import { layoutConfig, gapLimit } from '@/config'
import { useSystemConfig } from './systemConfig'


/**
 * 布局相关 滚动条实例
*/
export const useLayout = defineStore('useLayout', {

    state() {
        return {

            /** 是否显示header */
            hasShowHeader: true,

            scrollbarRef: null as unknown as InstanceType<typeof ElScrollbar>,

            /** 是否显示返回顶部的按钮 */
            showGoTop: layoutConfig.showGoTop,

            /** 文档滚动的距离 */
            scrollNumber: 0

        }
    },

    getters: {
        getLayoutMargingTop(state) {
            return {
                marginTop: state.hasShowHeader ? `${layoutConfig.headerHeight + gapLimit}px` : 0,
            }
        },
    },

    actions: {

        /**
         * 滚动完成后返回一个promise
        */
        scrollTop() {
            this.scrollbarRef?.setScrollTop(0)
            return Promise.resolve({ finish: true })
        },

        setScrollbarRefInstance(scrollbarRefInstance: any) {
            this.scrollbarRef = scrollbarRefInstance
        },

        scrollEvent(evnet: any) {
            this.scrollNumber = evnet.scrollTop
            this.showGoTop = (evnet.scrollTop) < layoutConfig.offset
            if (isFalse(useSystemConfig().dynamicHeader)) return
            this.hasShowHeader = (evnet.scrollTop) < layoutConfig.offset
        }

    }

})