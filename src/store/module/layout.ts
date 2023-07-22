import { defineStore } from "pinia";
import { ElScrollbar } from 'element-plus'

export const useLayout = defineStore('useLayout', {
    
    state () {
        return {
            hasShowHeader: true,
            scrollbarRef: null as unknown as InstanceType<typeof ElScrollbar>
        }
    },

    getters: {
        getLayoutMargingTop (state) {
            return {
                marginTop: state.hasShowHeader ? '66px' : 0,
            }
        },
    },

    actions: {

        scrollTop () {
            this.scrollbarRef?.setScrollTop(0)
        },

        setScrollbarRefInstance (scrollbarRefInstance: any) {
            this.scrollbarRef = scrollbarRefInstance
        },

        scrollEvent (evnet: any) {
            this.hasShowHeader = evnet.scrollTop < 120
        }
        
    }
})