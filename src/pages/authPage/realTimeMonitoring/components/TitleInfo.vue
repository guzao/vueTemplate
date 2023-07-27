<script lang="ts" setup>
import { conversionUnitKWh } from '@/utils'
import TitleBox from '@/components/common/TitleBox.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';
import { PropType } from 'vue';

defineProps({

    /** 电站运行详情 */
    parkInfo: {
        type: Object as PropType<ParkRuningInfo>,
        default: {}
    }

})


</script>

<template>
    <TitleBox>

        全场概览

        <template #left>

            <div class="flex items-center">

                <LabelValueUnit class="pl-[20px]" :font-size="16">
                    月充 
                    <template #value> {{ conversionUnitKWh(parkInfo.A_M17).size }} </template>
                    <template #unit> {{ conversionUnitKWh(parkInfo.A_M17).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit class="pl-[10px]" :font-size="16">
                    月充
                    <template #value> {{ conversionUnitKWh(parkInfo.A_M18).size }} </template>
                    <template #unit> {{ conversionUnitKWh(parkInfo.A_M18).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit class="pl-[10px]" :font-size="16">
                    年充
                    <template #value> {{ conversionUnitKWh(parkInfo.A_M19).size }} </template>
                    <template #unit> {{ conversionUnitKWh(parkInfo.A_M19).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit class="pl-[10px]" :font-size="16">
                    年充
                    <template #value> {{ conversionUnitKWh(parkInfo.A_M20).size }} </template>
                    <template #unit> {{ conversionUnitKWh(parkInfo.A_M20).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit class="pl-[10px]" :font-size="16">
                    累充
                    <template #value> {{ conversionUnitKWh(parkInfo.A_M5).size }} </template>
                    <template #unit> {{ conversionUnitKWh(parkInfo.A_M5).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit class="pl-[10px]" :font-size="16">
                    累充
                    <template #value> {{ conversionUnitKWh(parkInfo.A_M6).size }} </template>
                    <template #unit> {{ conversionUnitKWh(parkInfo.A_M6).unit }} </template>
                </LabelValueUnit>

            </div>



        </template>

    </TitleBox>
</template>
