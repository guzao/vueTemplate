<script lang="ts" setup>
import IconVue from '@/components/common/Icon.vue';
import TitleBox from '@/components/common/TitleBox.vue';
import LastTime from '@/components/common/LastTime.vue';
import { paserTime, getRuningStateInfo, toFixed, conversionUnitKWh, conversionUnitKVar, conversionUnitKW } from '@/utils';
import { useParkOverview } from './useParkOverview'
const { parkOverview, appData } = useParkOverview()

</script>

<template>
    <!--  -->
    <div class="flex justify-between px-[60px] runing_info">


        <div class="w-[380px] mt-[70px]">

            <TitleBox>
                电站基本信息
                <template #right>
                    <LastTime> {{ paserTime(appData.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }} </LastTime>
                </template>
            </TitleBox>

            <div class="h-[2px] bg-[var(--theme-gray235-bg)] my-[12px]"></div>

            <ul class="grid grid-cols-2 gap-y-[35px]">

                <li class="h-[68px] flex">
                    <IconVue :icon="getRuningStateInfo(parkOverview.A_M2).icon" :size="68" />
                    <div class="flex flex-col ml-[8px]">
                        <div class="text-[var(--theme-gray107)] mt-[16px]">运行状态</div>
                        <div :class="getRuningStateInfo(parkOverview.A_M2).color" class="font-semibold text-[20px]">{{
                            getRuningStateInfo(parkOverview.A_M2).text }}</div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">剩余电量</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">{{ toFixed(parkOverview.A_M3) }} <span
                                class="text-[12px] text-[var(--theme-gray107)] font-normal"> % </span> </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="icon_day_charge_green" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">日充</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">
                            {{ conversionUnitKWh(parkOverview.A_M15).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> {{ conversionUnitKWh(parkOverview.A_M15).unit }}
                            </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="icon_day_discharge_green" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">日放</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">
                            {{ conversionUnitKWh(parkOverview.A_M16).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> {{ conversionUnitKWh(parkOverview.A_M16).unit }}
                            </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="icon_active_power_green" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">有功</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">
                            {{ conversionUnitKW(parkOverview.A_M7).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> {{ conversionUnitKW(parkOverview.A_M7).unit }}
                            </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="icon_reactactive_power_green" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">无功</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">
                            {{ conversionUnitKVar(parkOverview.A_M8).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> {{ conversionUnitKVar(parkOverview.A_M8).unit }}
                            </span>
                        </div>
                    </div>
                </li>


            </ul>



        </div>

        <div class="w-[330px] h-[392px] mt-[40px] flex justify-center items-center bg-contain bg-no-repeat static_bg">
            <div class="w-[305px] h-[68px] cnx bg-contain bg-no-repeat"></div>
        </div>

        <div class="w-[380px] mt-[70px]">

            <TitleBox>
                全站详细信息
            </TitleBox>

            <div class="h-[2px] bg-[var(--theme-gray235-bg)] my-[12px]"></div>

            <div class="flex justify-end">

                <ul class="grid grid-cols-2 gap-[20px] w-[350px]">

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">月充</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]"> {{
                            conversionUnitKWh(parkOverview.A_M17).size }} {{ conversionUnitKWh(parkOverview.A_M17).unit }} </div>
                    </li>
                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">月放</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]"> {{
                            conversionUnitKWh(parkOverview.A_M18).size }} {{ conversionUnitKWh(parkOverview.A_M18).unit }} </div>
                    </li>
                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">年充</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]"> {{
                            conversionUnitKWh(parkOverview.A_M19).size }} {{ conversionUnitKWh(parkOverview.A_M19).unit }} </div>
                    </li>
                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">年放</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]"> {{
                            conversionUnitKWh(parkOverview.A_M20).size }} {{ conversionUnitKWh(parkOverview.A_M20).unit }} </div>
                    </li>
                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">累充</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]"> {{
                            conversionUnitKWh(parkOverview.A_M5).size }} {{ conversionUnitKWh(parkOverview.A_M5).unit }} </div>
                    </li>
                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">累放</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]"> {{
                            conversionUnitKWh(parkOverview.A_M6).size }} {{ conversionUnitKWh(parkOverview.A_M6).unit }} </div>
                    </li>

                </ul>

            </div>



        </div>


    </div>
</template>

<style lang="scss" scoped>
.runing_info {

    .split_bg {
        background-image: url(../../../../assets/icons/common/split_green.svg);
    }

    .text_bg_img {
        background: linear-gradient(270deg, rgba(14, 169, 68, 0) 0%, rgba(14, 169, 68, 0.19) 100%);
    }

    .static_bg {
        background-image: url(../../../../assets/image/overview/device_point.png);
    }

    .cnx {
        background-image: url(../../../../assets/image/overview/cnx_device.png);
    }

    .cng {
        background-image: url(../../../../assets/image/overview/cng_device.png);
    }
}
</style>