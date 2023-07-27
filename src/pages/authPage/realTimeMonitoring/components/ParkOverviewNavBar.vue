<script lang="ts" setup>
import type { PropType } from 'vue'
import { useAppData } from '@/store'
import TitleInfo from './TitleInfo.vue'
import StationBaseInfoCard from '@/components/common/StationBaseInfoCard.vue';
const appData = useAppData()

defineProps({
    /** 电站运行详情 */
    parkRuningInfo: {
        type: Object as PropType<ParkRuningInfo>,
        default: {}
    }
})

</script>

<template>
    <div class="bg-[var(--theme-white-bg)] px-[16px] pt-[24px] pb-[40px] box-border park_type mb-[16px]"
        :class="appData.currentParkType == '0' ? 'cnx' : 'cng'">

        <TitleInfo :park-info="parkRuningInfo" />

        <StationBaseInfoCard :sub-info-top="0" :data="parkRuningInfo" class="mt-[20px]" />

    </div>
</template>


<style lang="scss" scoped>
.park_type {
    background-size: 314px 100%;
    background-repeat: no-repeat;

    &.cnx {
        background-image: url(../../../../assets/image/common/list_item-bg.png);
    }


    &.cng {
        background-image: url(../../../../assets/image/common/list_item-bg_cng.png);
    }
}
</style>