<script lang="ts" setup>
import { PropType } from 'vue';
import { toFixed, conversionUnitKWh } from '@/utils'

import TitleBoxVue from '@/components/common/TitleBox.vue'


defineProps({
    pcsInfo: {
        type: Object as PropType<PCSInfo>,
        required: true,
        defalut: {} 
    }
})
</script>

<template>
    <div class="bg-[var(--theme-white-bg)] p-[20px]">

        <TitleBoxVue class="mb-[16px]"> PCS </TitleBoxVue>

        <ul class="grid grid-cols-5 order-1">

            <li 
                class="h-[84px]  bg-[rgba(14,169,68,.05)] px-[17px] pt-[17px] box-border">
                <div class="text-[--theme-gray107] mb-[10px]"> 运行状态 </div>
                <div class="text-[--theme-black51]"> {{ pcsInfo['P01.C1'] }} </div>
            </li>

            <li  class="h-[84px] bg-[var(--theme-white-bg)] px-[17px] pt-[17px] box-border">
                <div class="text-[--theme-gray107] mb-[10px] "> 直流功率 </div>
                <div class="text-[--theme-black51] f-dinb"> {{ toFixed(pcsInfo['P01.C2']) }} <span class="text-[12px]">kW</span></div>
            </li>

            <li  class="h-[84px] bg-[rgba(14,169,68,.05)]  px-[17px] pt-[17px] box-border">
                <div class="text-[--theme-gray107] mb-[10px] "> 日充 </div>
                <div class="text-[--theme-black51] f-dinb"> {{ conversionUnitKWh(pcsInfo['P01.C22']).size }} <span class="text-[12px]">{{ conversionUnitKWh(pcsInfo['P01.C22']).unit  }}</span></div>
            </li>

            <li  class="h-[84px]bg-[var(--theme-white-bg)] px-[17px] pt-[17px] box-border">
                <div class="text-[--theme-gray107] mb-[10px] "> 直流电压 </div>
                <div class="text-[--theme-black51] f-dinb"> {{ toFixed(pcsInfo['P01.C14']) }} <span class="text-[12px]">V</span></div>
            </li>

            <li 
                class="h-[84px] bg-[rgba(14,169,68,.05)] px-[17px] pt-[17px] box-border">
                <div class="text-[--theme-gray107] mb-[10px]"> 是在输出功率 </div>
                <div class="text-[--theme-black51]"> {{ pcsInfo['P01.C17'] }} <span class="text-[12px]">V</span> </div>
            </li>

            <li  class="h-[84px]bg-[var(--theme-white-bg)] px-[17px] pt-[17px] box-border">
                <div class="text-[--theme-gray107] mb-[10px] "> 并离网状态 </div>
                <div class="text-[--theme-black51] f-dinb"> {{ toFixed(pcsInfo['P01.C22']) }} </div>
            </li>

            <li 
                class="h-[84px] bg-[rgba(14,169,68,.05)] px-[17px] pt-[17px] box-border">
                <div class="text-[--theme-gray107] mb-[10px]"> 直流电流 </div>
                <div class="text-[--theme-black51]"> {{ toFixed(pcsInfo['P01.C15']) }} <span class="text-[12px]">A</span> </div>
            </li>

            <li  class="h-[84px]bg-[var(--theme-white-bg)] px-[17px] pt-[17px] box-border">
                <div class="text-[--theme-gray107] mb-[10px] "> 日放 </div>
                <div class="text-[--theme-black51] f-dinb"> {{ conversionUnitKWh(pcsInfo['P01.C24']).size }} <span class="text-[12px]">{{ conversionUnitKWh(pcsInfo['P01.C24']).unit  }}</span></div>
            </li>

            <li 
                class="h-[84px] bg-[rgba(14,169,68,.05)] px-[17px] pt-[17px] box-border">
                <div class="text-[--theme-gray107] mb-[10px]"> 输出无功功率 </div>
                <div class="text-[--theme-black51]"> {{ toFixed(pcsInfo['P01.C19']) }} <span class="text-[12px]">kVar</span> </div>
            </li>

            <li  class="h-[84px]bg-[var(--theme-white-bg)] px-[17px] pt-[17px] box-border">
                <div class="text-[--theme-gray107] mb-[10px] "> 输出有功功率 </div>
                <div class="text-[--theme-black51] f-dinb"> {{ conversionUnitKWh(pcsInfo['P01.C18']).size }} <span class="text-[12px]">kW</span></div>
            </li>



        </ul>
    </div>
</template>