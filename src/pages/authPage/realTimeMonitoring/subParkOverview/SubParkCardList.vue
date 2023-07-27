<script lang="ts" setup>
import { conversionUnitKWh, conversionUnitKW, conversionUnitKVar, getRuningStateInfo, toFixed } from '@/utils'
import TitleBox from '@/components/common/TitleBox.vue';
import Icon from '@/components/common/Icon.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';
import { PropType } from 'vue';
defineProps({
    deivceGroupList: {
        type: Array as PropType<DeviceGroup[]>,
        default: () => []
    }
})

</script>

<template>
    <ul>

        <li class="px-[16px] py-[20px] mb-[8px] sub_park_overview_item last:mb-0" v-for="item in deivceGroupList" :key="item.id">

            <div class="sub_park_overview_item_bg">

                <TitleBox>

                    {{ item.name }}

                    <template #left>

                        <div class="flex items-center">

                            <LabelValueUnit class="pl-[20px]">
                                月充
                                <template #value> {{ conversionUnitKWh(item.M17).size }} </template>
                                <template #unit> {{ conversionUnitKWh(item.M17).unit }} </template>
                            </LabelValueUnit>
                            <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                            <LabelValueUnit class="pl-[10px]">
                                月放
                                <template #value> {{ conversionUnitKWh(item.M18).size }} </template>
                                <template #unit> {{ conversionUnitKWh(item.M18).unit }} </template>
                            </LabelValueUnit>
                            <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                            <LabelValueUnit class="pl-[10px]">
                                年充
                                <template #value> {{ conversionUnitKWh(item.M19).size }} </template>
                                <template #unit> {{ conversionUnitKWh(item.M19).unit }} </template>
                            </LabelValueUnit>
                            <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                            <LabelValueUnit class="pl-[10px]">
                                年充
                                <template #value> {{ conversionUnitKWh(item.M20).size }} </template>
                                <template #unit> {{ conversionUnitKWh(item.M20).unit }} </template>
                            </LabelValueUnit>
                            <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                            <LabelValueUnit class="pl-[10px]">
                                累充
                                <template #value> {{ conversionUnitKWh(item.M5).size }} </template>
                                <template #unit> {{ conversionUnitKWh(item.M5).unit }} </template>
                            </LabelValueUnit>
                            <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                            <LabelValueUnit class="pl-[10px]">
                                累充
                                <template #value> {{ conversionUnitKWh(item.M6).size }} </template>
                                <template #unit> {{ conversionUnitKWh(item.M6).unit }} </template>
                            </LabelValueUnit>

                        </div>



                    </template>

                </TitleBox>

                <ul class="grid grid-cols-6 gap-x-[8px] mr-[400px] mt-[20px]">

                    <li
                        class="h-[127px] bg-[var(--theme-white-bg)]  border-[1px] border-cool-[rgba(255,255,255,0.42)] pl-[12px] pt-[10px] relative">

                        <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> 运行状态 </div>

                        <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                        <div class="flex mt-[20px] items-center">
                            <Icon :icon="getRuningStateInfo(item.status).icon" :size="50" class="mr-[4px]" />
                            <div class="text-[14px] text-[var(--theme-black51)] mr-[4px] f-dinb font-semibold"
                                :class="getRuningStateInfo(item.status).color"> {{
                                    getRuningStateInfo(item.status).text }} </div>
                        </div>

                    </li>

                    <li
                        class="h-[127px] bg-[var(--theme-white-bg)]  border-[1px] border-cool-[rgba(255,255,255,0.42)] pl-[12px] pt-[10px] relative">

                        <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> 剩余电量 </div>

                        <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                        <div class="flex mt-[20px] items-center">
                            <Icon icon="ionc_cos" :size="50" class="mr-[4px]" />
                            <div class="text-[18px] text-[var(--charge)] mr-[4px] f-dinb font-bold"> {{ toFixed(item.soc) }}
                            </div>
                            <div class="text-[12px] text-[var(--theme-gray107)]"> % </div>
                        </div>

                    </li>

                    <li
                        class="h-[127px] bg-[var(--theme-white-bg)]  border-[1px] border-cool-[rgba(255,255,255,0.42)] pl-[12px] pt-[10px] relative">

                        <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> 日充 </div>

                        <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                        <div class="flex mt-[20px] items-center">
                            <Icon icon="icon_day_charge_green" :size="50" class="mr-[4px]" />
                            <div class="text-[18px] text-[var(--charge)] mr-[4px] f-dinb font-bold"> {{
                                conversionUnitKWh(item.dailyCharge).size }} </div>
                            <div class="text-[12px] text-[var(--theme-gray107)]"> {{ conversionUnitKWh(item.dailyCharge).unit }}
                            </div>
                        </div>

                    </li>

                    <li
                        class="h-[127px] bg-[var(--theme-white-bg)]  border-[1px] border-cool-[rgba(255,255,255,0.42)] pl-[12px] pt-[10px] relative">

                        <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> 日放 </div>

                        <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                        <div class="flex mt-[20px] items-center">
                            <Icon icon="icon_day_discharge_green" :size="50" class="mr-[4px]" />
                            <div class="text-[18px] text-[var(--charge)] mr-[4px] f-dinb font-bold"> {{
                                conversionUnitKWh(item.dailyDisCharge).size }} </div>
                            <div class="text-[12px] text-[var(--theme-gray107)]"> {{ conversionUnitKWh(item.dailyDisCharge).unit }}
                            </div>
                        </div>

                    </li>

                    <li
                        class="h-[127px] bg-[var(--theme-white-bg)]  border-[1px] border-cool-[rgba(255,255,255,0.42)] pl-[12px] pt-[10px] relative">

                        <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> 有功 </div>

                        <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                        <div class="flex mt-[20px] items-center">
                            <Icon icon="icon_active_power_green" :size="50" class="mr-[4px]" />
                            <div class="text-[18px] text-[var(--charge)] mr-[4px] f-dinb font-bold"> {{
                                conversionUnitKW(item.activePower).size }} </div>
                            <div class="text-[12px] text-[var(--theme-gray107)]"> {{ conversionUnitKW(item.activePower).unit }}
                            </div>
                        </div>

                    </li>

                    <li
                        class="h-[127px] bg-[var(--theme-white-bg)]  border-[1px] border-cool-[rgba(255,255,255,0.42)] pl-[12px] pt-[10px] relative">

                        <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> 无功 </div>

                        <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                        <div class="flex mt-[20px] items-center">
                            <Icon icon="icon_reactactive_power_green" :size="50" class="mr-[4px]" />
                            <div class="text-[18px] text-[var(--charge)] mr-[4px] f-dinb font-bold"> {{
                                conversionUnitKVar(item.reactivePower).size }} </div>
                            <div class="text-[12px] text-[var(--theme-gray107)]"> {{ conversionUnitKVar(item.reactivePower).unit }}
                            </div>
                        </div>

                    </li>

                </ul>

            </div>

        </li>

    </ul>
</template>

<style lang="scss" scoped>
.sub_park_overview_item {
    background: linear-gradient(300deg, #E1F2E8 0%, #F7FAFB 100%);

    .sub_park_overview_item_bg {
        background-size: 100% 100%;
        background-image: url(../../../../assets/image/overview/more_sub_park_overview_bg1.png);

        .slit_bg {
            background-image: url(../../../../assets/icons/common/card_split_bg.svg);
            background-size: contain;
            background-repeat: no-repeat;
        }
    }
}
</style>