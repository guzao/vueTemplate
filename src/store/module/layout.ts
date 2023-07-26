import { defineStore } from "pinia";
import { ElScrollbar } from 'element-plus'
import { layoutConfig } from '@/config'
import { isFalse } from "@/utils";

export const useLayout = defineStore('useLayout', {

    state() {
        return {
            hasShowHeader: true,
            scrollbarRef: null as unknown as InstanceType<typeof ElScrollbar>
        }
    },

    getters: {
        getLayoutMargingTop(state) {
            return {
                marginTop: state.hasShowHeader ? '66px' : 0,
            }
        },
    },

    actions: {

        scrollTop() {
            this.scrollbarRef?.setScrollTop(0)
        },

        setScrollbarRefInstance(scrollbarRefInstance: any) {
            if ( isFalse(layoutConfig.dynamicHeader) ) return
            this.scrollbarRef = scrollbarRefInstance
        },

        scrollEvent(evnet: any) {
            if ( isFalse(layoutConfig.dynamicHeader) ) return
            this.hasShowHeader = evnet.scrollTop < 120
        }

    }
})