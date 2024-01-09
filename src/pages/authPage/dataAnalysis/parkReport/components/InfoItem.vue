<script lang="ts" setup>
import { t } from '@/langs'
import { Common } from '@/enum'
import type { PropType } from 'vue'
import { conversionUnitKWh, getEfficiency } from '@/utils'

import TitleBox from '@/components/common/TitleBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'

defineProps({
    data: {
        type: Object as PropType<ParkRuningInfo>,
        require: true,
        default: {}
    }
})
</script>

<template>
    <div class="flex pl-[30px] mt-[36px]">

        <TitleBox>
            <slot />
        </TitleBox>

        <ul class="grid grid-cols-5 flex-1">

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> {{ t('common.day') }}/{{ t('common.CandD') }}
                </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.charge') }}
                        <template #value> {{ conversionUnitKWh(data.A_M15).size }} </template>
                        <template #unit> {{ conversionUnitKWh(data.A_M15).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.discharge') }}
                        <template #value> {{ conversionUnitKWh(data.A_M16).size }} </template>
                        <template #unit> {{ conversionUnitKWh(data.A_M16).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        {{ t('common.efficiency') }}
                        <template #value> {{ getEfficiency(data.A_M15, data.A_M16) || Common.DEFAULT_SYMBOL }} </template>
                        <template #unit> % </template>
                    </LabelValueUnit>

                </div>

            </li>


            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> {{ t('common.week') }}/{{ t('common.CandD')
                }} </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.charge') }}
                        <template #value> {{ conversionUnitKWh(data.A_M111).size }} </template>
                        <template #unit> {{ conversionUnitKWh(data.A_M111).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.discharge') }}
                        <template #value> {{ conversionUnitKWh(data.A_M112).size }} </template>
                        <template #unit> {{ conversionUnitKWh(data.A_M112).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        {{ t('common.efficiency') }}
                        <template #value> {{ getEfficiency(data.A_M111, data.A_M112) || Common.DEFAULT_SYMBOL }} </template>
                        <template #unit> % </template>
                    </LabelValueUnit>

                </div>

            </li>

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> {{ t('common.month') }}/{{ t('common.CandD')
                }} </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.charge') }}
                        <template #value> {{ conversionUnitKWh(data.A_M17).size }} </template>
                        <template #unit> {{ conversionUnitKWh(data.A_M17).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.discharge') }}
                        <template #value> {{ conversionUnitKWh(data.A_M18).size }} </template>
                        <template #unit> {{ conversionUnitKWh(data.A_M18).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        {{ t('common.efficiency') }}
                        <template #value> {{ getEfficiency(data.A_M17, data.A_M18) || Common.DEFAULT_SYMBOL }} </template>
                        <template #unit> % </template>
                    </LabelValueUnit>

                </div>

            </li>

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> {{ t('common.yaer') }}/{{ t('common.CandD')
                }} </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.charge') }}
                        <template #value> {{ conversionUnitKWh(data.A_M19).size }} </template>
                        <template #unit> {{ conversionUnitKWh(data.A_M19).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.discharge') }}
                        <template #value> {{ conversionUnitKWh(data.A_M20).size }} </template>
                        <template #unit> {{ conversionUnitKWh(data.A_M20).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        {{ t('common.efficiency') }}
                        <template #value> {{ getEfficiency(data.A_M19, data.A_M20) || Common.DEFAULT_SYMBOL }} </template>
                        <template #unit> % </template>
                    </LabelValueUnit>

                </div>

            </li>

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> 累计/{{ t('common.CandD') }} </div>

                <div class="flex flex-col items-center ">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.charge') }}
                        <template #value> {{ conversionUnitKWh(data.A_M5).size }} </template>
                        <template #unit> {{ conversionUnitKWh(data.A_M5).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.discharge') }}
                        <template #value> {{ conversionUnitKWh(data.A_M6).size }} </template>
                        <template #unit> {{ conversionUnitKWh(data.A_M6).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        {{ t('common.efficiency') }}
                        <template #value> {{ getEfficiency(data.A_M5, data.A_M6) || Common.DEFAULT_SYMBOL }} </template>
                        <template #unit> % </template>
                    </LabelValueUnit>

                </div>

            </li>

    </ul>

</div></template>