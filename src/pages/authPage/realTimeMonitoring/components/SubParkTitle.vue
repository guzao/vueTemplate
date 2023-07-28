<script lang="ts" setup>
import { conversionUnitKWh, toFixed } from '@/utils'
import TitleBox from '@/components/common/TitleBox.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';
import DeviceStateCountDesc from '@/components/common/DeviceStateCountDesc.vue';
import { PropType } from 'vue';


defineProps({
    data: {
        type: Object as PropType<DeviceGroup>,
        default: {}
    },
    deviceStateCount: {
        type: Object as PropType<Record<string, number>>,
        default: {}
    }
})



</script>

<template>
    <TitleBox class="mb-[17px]">
        {{ data.name }}

        <template #left>

            <div v class="flex items-center">

                <LabelValueUnit class="pl-[16px]" :font-size="16">
                    剩余电量
                    <template #value> {{ toFixed(data.soc) }} </template>
                    <template #unit> % </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[6px]"></div>

                <LabelValueUnit class="pl-[8px]" :font-size="16">
                    日充
                    <template #value> {{ conversionUnitKWh(data.M17).size }} </template>
                    <template #unit> {{ conversionUnitKWh(data.M17).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[6px]"></div>

                <LabelValueUnit class="pl-[8px]" :font-size="16">
                    日放
                    <template #value> {{ conversionUnitKWh(data.M18).size }} </template>
                    <template #unit> {{ conversionUnitKWh(data.M18).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[6px]"></div>

                <LabelValueUnit class="pl-[20px]" :font-size="16">
                    月充
                    <template #value> {{ conversionUnitKWh(data.M17).size }} </template>
                    <template #unit> {{ conversionUnitKWh(data.M17).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[6px]"></div>

                <LabelValueUnit class="pl-[8px]" :font-size="16">
                    月放
                    <template #value> {{ conversionUnitKWh(data.M18).size }} </template>
                    <template #unit> {{ conversionUnitKWh(data.M18).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[6px]"></div>

                <LabelValueUnit class="pl-[8px]" :font-size="16">
                    累充
                    <template #value> {{ conversionUnitKWh(data.M5).size }} </template>
                    <template #unit> {{ conversionUnitKWh(data.M5).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[6px]"></div>

                <LabelValueUnit class="pl-[8px]" :font-size="16">
                    累充
                    <template #value> {{ conversionUnitKWh(data.M6).size }} </template>
                    <template #unit> {{ conversionUnitKWh(data.M6).unit }} </template>
                </LabelValueUnit>

            </div>

        </template>

        <template #right>
            <DeviceStateCountDesc :states="deviceStateCount" />
        </template>

    </TitleBox>
</template>