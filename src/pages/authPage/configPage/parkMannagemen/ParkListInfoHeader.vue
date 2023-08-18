<script lang="ts" setup>
import { PropType } from 'vue'
import { conversionUnitKWh, conversionUnitKW } from '@/utils'

import TitleBox from '@/components/common/TitleBox.vue';

type ParkListInfo = {
    total: number;
    power: number;
    energy: number;
    cnx: number;
    gsy: number;
    byd: number;
}

defineProps({
    parkListInfo: {
        type: Object as PropType<ParkListInfo>,
        default: {}
    }
})


</script>

<template>

    <TitleBox class="my-[16px]" :size="18"> 场站信息统计 </TitleBox>

    <div class="bg-[var(--theme-white-bg)] px-[20px] py-[30px] box-border mb-[16px]">

        <!-- <TitleBox class="mb-[26px]" :size="18"> 场站信息统计 </TitleBox> -->

        <ul class="grid grid-cols-6">

            <li class="flex flex-col items-center " style="border-right: 1px solid #ebf2f0;">
                <div class="text-[15px] mb-[8px]"> 电站总数 </div>
                <div class="text-[28px] font-medium f-dinb"> {{ parkListInfo.total }} </div>
            </li>

            <li class="flex flex-col items-center " style="border-right: 1px solid #ebf2f0;">
                <div class="text-[15px] mb-[8px]"> 电站级储能 </div>
                <div class="text-[28px] font-medium f-dinb"> {{ parkListInfo.cnx }} </div>
            </li>

            <li class="flex flex-col items-center " style="border-right: 1px solid #ebf2f0;">
                <div class="text-[15px] mb-[8px]"> 工商业储能 </div>
                <div class="text-[28px] font-medium f-dinb"> {{ parkListInfo.gsy }} </div>
            </li>

            <li class="flex flex-col items-center " style="border-right: 1px solid #ebf2f0;">
                <div class="text-[15px] mb-[8px]"> 备用储能 </div>
                <div class="text-[28px] font-medium f-dinb"> {{ parkListInfo.byd }} </div>
            </li>

            <li class="flex flex-col items-center " style="border-right: 1px solid #ebf2f0;">
                <div class="text-[15px] mb-[8px]"> 总装机功率({{ conversionUnitKW(parkListInfo.power).unit }}) </div>
                <div class="text-[28px] font-medium f-dinb"> {{ conversionUnitKW(parkListInfo.power).size }} </div>
            </li>

            <li class="flex flex-col items-center ">
                <div class="text-[15px] mb-[8px]"> 总装机能量({{ conversionUnitKWh(parkListInfo.energy).unit }}) </div>
                <div class="text-[28px] font-medium f-dinb"> {{ conversionUnitKWh(parkListInfo.energy).size }} </div>
            </li>

        </ul>

    </div>
</template>