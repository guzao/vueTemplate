import { defineStore } from "pinia";
import { ElScrollbar } from 'element-plus'
import { layoutConfig } from '@/config'
import { isFalse } from "@/utils";

const gapLimit = 12

export const useLayout = defineStore('useLayout', {

    state() {
        return {
            hasShowHeader: true,
            scrollbarRef: null as unknown as InstanceType<typeof ElScrollbar>,
            showGoTop: layoutConfig.showGoTop,
        }
    },

    getters: {
        getLayoutMargingTop(state) {
            return {
                // 12 
                // marginTop: state.hasShowHeader ? '66px' : 0,
                marginTop: state.hasShowHeader ? `${ layoutConfig.headerHeight + gapLimit }px` : 0,
            }
        },
    },

    actions: {
        
        scrollTop() {
            this.scrollbarRef?.setScrollTop(0)
        },

        setScrollbarRefInstance(scrollbarRefInstance: any) {
            this.scrollbarRef = scrollbarRefInstance
        },

        scrollEvent(evnet: any) {
            if ( isFalse(layoutConfig.dynamicHeader) ) return
            this.hasShowHeader = (evnet.scrollTop) < layoutConfig.offset
        }

    }
})