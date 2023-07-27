<script lang="ts" setup>
import { useInterval } from '@/hooks'
import { useAppData } from '@/store'
import { useParkOverview } from './useParkOverview'
import SubNavBar from '@/components/common/SubNavBar.vue';
import RuningInfo from './RuningInfo.vue'
import Bottom from './Bottom.vue'

const appData = useAppData()
const { getParkOverview, loading } = useParkOverview()

const { _resetInterval } = useInterval(1000 * 60, getParkOverview)

const getParkInfo = () => {
    _resetInterval()
    getParkOverview()
}

</script>

<template>
    <div class="flex flex-col flex-1 flex-wrap park_overview" v-watermark="{ markSatate: appData.currentRelease, text: '发布' }">


        <div class="top_bg flex-1 min-h-[580px]  box-border">

            <SubNavBar height="46" class="mb-[16px] bg-transparent"  @park-change="getParkInfo"></SubNavBar>

            <RuningInfo  />

        </div>

        <div class="bottom_bg h-[26vh] px-[21px] min-h-[240px]">
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