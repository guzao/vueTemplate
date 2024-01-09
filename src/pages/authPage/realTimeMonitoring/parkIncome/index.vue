<script lang="ts" setup>
import { useAppData, useDicts } from '@/store'

import IncomeInfo from './IncomeInfo.vue'
import IncomeChart from './IncomeChart.vue'
import SubNavBar from '@/components/common/SubNavBar.vue'

const dicts = useDicts()
const appData = useAppData()

</script>

<template>
    <div class="w-full overflow-hidden park_income  flex flex-col flex-1"
        v-watermark="appData.currentParkWatermarkOptions(appData.currentRelease)">
        <div class="top_bg flex-1 min-h-[580px] box-border flex flex-col ">

            <SubNavBar height="46" class=" bg-transparent" :showDeviceStateDesc="false" />

            <IncomeInfo />

        </div>

        <IncomeChart />

    </div>
</template>

<style lang="scss" scoped>
.park_income {
    .top_bg {
        background-image: url(../../../.././assets/image/overview/parklOverview_top_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

}
</style>