<script lang="ts" setup>
import { useParkIncome } from './useParkIncome'

const { appData, dicts } = useParkIncome()

import IncomeInfo from './IncomeInfo.vue'
import IncomeChart from './IncomeChart.vue'
import SubNavBar from '@/components/common/SubNavBar.vue';
</script>

<template>
    <div class="w-full overflow-hidden park_income  flex flex-col flex-1"
        v-watermark="{ markSatate: appData.currentRelease, text: dicts.parkReleaseStatusDict.dictLabel[appData.currentRelease] }">

        <div class="top_bg flex-1 min-h-[580px] box-border flex flex-col ">

            <SubNavBar height="46" class="mb-[16px] bg-transparent" :showDeviceStateDesc="false" />

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