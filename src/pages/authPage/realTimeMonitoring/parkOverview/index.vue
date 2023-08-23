<script lang="ts" setup>
import { useInterval } from '@/hooks'
import { useAppData, useDicts } from '@/store'
import { useParkOverview } from './useParkOverview'

import Bottom from './Bottom.vue'
import RuningInfo from './RuningInfo.vue'
import SubNavBar from '@/components/common/SubNavBar.vue';

const appData = useAppData()
const dicts = useDicts()

const { getParkOverview, loading, parkOverview } = useParkOverview()

const { _resetInterval } = useInterval(1000 * 60 * 3, getParkOverview)

const getParkInfo = () => {
    _resetInterval()
    getParkOverview()
}

</script>

<template>

    <div class="park_overview flex flex-col flex-1 w-full overflow-hidden" v-watermark="{ markSatate: appData.currentRelease, text: dicts.parkReleaseStatusDict.dictLabel[ appData.currentRelease ] }" v-loading="loading">


        <div class="top_bg flex-1 min-h-[580px]  box-border" >

            <SubNavBar height="46" class="mb-[16px] bg-transparent"  @park-change="getParkInfo"></SubNavBar>

            <RuningInfo :park-overview="parkOverview"  />

        </div>

        <div class="bottom_bg h-[27vh] px-[21px] min-h-[250px] ">
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