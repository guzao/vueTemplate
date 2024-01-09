<script lang="ts" setup>
import { useAppData } from '@/store'
import { IntervalTime } from '@/enum'
import { useInterval } from '@/hooks'
import { useParkOverview } from './useParkOverview'

import Bottom from './Bottom.vue'
import RuningInfo from './RuningInfo.vue'
import SubNavBar from '@/components/common/SubNavBar.vue';

const appData = useAppData()

const { getParkOverview, loading, parkOverview } = useParkOverview()

const { _resetInterval } = useInterval(IntervalTime.THREE_MINIUTE, getParkOverview)

const getParkInfo = () => {
    _resetInterval()
    getParkOverview()
}


</script>

<template>
    <div class="park_overview flex flex-col flex-1 w-full overflow-hidden"
        v-watermark="appData.currentParkWatermarkOptions(parkOverview.A_M2)">

        <div class="top_bg flex min-h-[580px]  box-border flex-col flex-1" >

            <SubNavBar height="46" class="bg-transparent" @park-change="getParkInfo"></SubNavBar>

            <RuningInfo v-loading="loading" :park-overview="parkOverview" />

        </div>

        <div v-loading="loading" class="bottom_bg h-[27vh] px-[21px] min-h-[250px] ">
            <Bottom />
        </div>

    </div>
</template>

<style lang="scss" scoped>
.park_overview {
    .top_bg {
        background-image: url(../../../.././assets/image/overview/parklOverview_top_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .bottom_bg {
        background-image: url(../../../.././assets/image/overview/parklOverview_bottom_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

}
</style>