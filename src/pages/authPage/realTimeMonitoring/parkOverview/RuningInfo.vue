<script lang="ts" setup>
import {  t } from '@/langs'
import { useAppData } from '@/store'
import { State, Type, Common } from '@/enum'
import { onClickOutside } from '@vueuse/core'
import { PropType, computed, ref } from 'vue';
import { paserTime, getRuningStateInfo, toFixed, conversionUnitKWh, conversionUnitKVar, conversionUnitKW } from '@/utils';

import { InfoFilled } from "@element-plus/icons-vue"
import IconVue from '@/components/common/Icon.vue';
import TitleBox from '@/components/common/TitleBox.vue';
import LastTime from '@/components/common/LastTime.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';


const show = ref(false)

const target = ref(null)

onClickOutside(target, _ => show.value = false)

const appData = useAppData()

const props = defineProps({
    parkOverview: {
        type: Object as PropType<ParkRuningInfo>,
        default: {}
    }
})

const parkStateBg = computed(() => {
    const { A_M2 } = props.parkOverview
    if (A_M2 == State.OUT_LINE || '') return '' 
    if (A_M2 == State.STANDBY) return ''
    return A_M2 == State.CHARGE ? 'charge' : 'discharge'
})

</script>

<template>
    <!--  -->
    <div class="flex justify-between px-[60px] runing_info">


        <div class="w-[380px] mt-[4%]">

            <TitleBox>
                {{ t('parkOverview.baseInfo') }}
                <template #right>
                    <LastTime> {{ paserTime(appData.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }} </LastTime>
                </template>
            </TitleBox>

            <div class="h-[2px] bg-[var(--theme-gray235-bg)] my-[12px]"></div>

            <ul class="grid grid-cols-2 gap-y-[35px]">

                <li class="h-[68px] flex">
                    <IconVue :icon="getRuningStateInfo(parkOverview.A_M2).icon" :size="68" />
                    <div class="flex flex-col ml-[8px]">
                        <div class="text-[var(--theme-gray107)] mt-[16px]">{{ t('common.operationTime') }}</div>
                        <div :class="getRuningStateInfo(parkOverview.A_M2).color" class="font-semibold text-[20px]">{{
                            getRuningStateInfo(parkOverview.A_M2).text }}</div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{ t('common.soc') }}</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">{{ toFixed(parkOverview.A_M3) }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> % </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="icon_day_charge_green" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{  t('common.dayCharge')}}</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">
                            {{ conversionUnitKWh(parkOverview.A_M15).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> {{
                                conversionUnitKWh(parkOverview.A_M15).unit }}
                            </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="icon_day_discharge_green" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{ t('common.dayCharge') }}</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">
                            {{ conversionUnitKWh(parkOverview.A_M16).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> {{
                                conversionUnitKWh(parkOverview.A_M16).unit }}
                            </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="icon_active_power_green" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{ t('common.activePower')   }}</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">
                            {{ conversionUnitKW(parkOverview.A_M7).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> {{
                                conversionUnitKW(parkOverview.A_M7).unit }}
                            </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="icon_reactactive_power_green" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{ t('common.reactivePower') }}</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">
                            {{ conversionUnitKVar(parkOverview.A_M8).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> {{
                                conversionUnitKVar(parkOverview.A_M8).unit }}
                            </span>
                        </div>
                    </div>
                </li>


            </ul>



        </div>

        <div :class="parkStateBg"
            class="w-[300px] h-[392px] mt-[3%] flex justify-center items-center bg-contain bg-no-repeat static_bg">
            <div class="w-[305px] h-[68px] bg-contain bg-no-repeat"
                :class="appData.currentParkType == `${Type.NUMBER_CABINET}` ? 'cng' : 'cnx'"></div>
            <div class="absolute right-[-265px] w-[255px] h-[121px] house_bg bottom-[10px]"></div>
        </div>

        <div class="w-[380px] mt-[4%]">

            <TitleBox>
                {{ t('parkOverview.detail') }}
                <template #right>
                    <div class="relative">
                        <span @click="show = true" class="cursor-pointer">
                            <el-icon>
                                <InfoFilled />
                            </el-icon>
                        </span>
                        <el-collapse-transition class="absolute top-[20px] right-0 bg-[var(--theme-white-bg)]">
                            <div ref="target" v-show="show" class="min-w-[380px] px-[10px] py-[20px]">

                                <LabelValueUnit>
                                    {{ t('parkOverview.addres') }} <template #value> {{ appData.currentPark.address }} </template>
                                </LabelValueUnit>

                                <div class="h-[1px] bg-[var(--theme-gray235-bg)] w-full my-[8px]"></div>

                                <LabelValueUnit>
                                    {{ t('common.totalPower') }}
                                    <template #value> {{ conversionUnitKW(+appData.currentPark.totalPower).size  }} </template>
                                    <template #unit> {{ conversionUnitKW(+appData.currentPark.totalPower).unit  }} </template>
                                </LabelValueUnit>

                                <div class="h-[1px] bg-[var(--theme-gray235-bg)] w-full my-[8px]"></div>

                                <LabelValueUnit>
                                    {{ t('common.totalEnergy') }}
                                    <template #value> {{ conversionUnitKWh(+appData.currentPark.energy).size  }} </template>
                                    <template #unit> {{ conversionUnitKWh(+appData.currentPark.energy).unit  }} </template>
                                </LabelValueUnit>

                                <div class="h-[1px] bg-[var(--theme-gray235-bg)] w-full my-[8px]"></div>

                                <LabelValueUnit>
                                    投运时间 <template #value> {{ appData.currentPark.operateTime }} </template>
                                </LabelValueUnit>

                            </div>
                        </el-collapse-transition>
                    </div>
                </template>
            </TitleBox>

            <div class="h-[2px] bg-[var(--theme-gray235-bg)] my-[12px]"></div>

            <div class="flex justify-end">

                <ul class="grid grid-cols-2 gap-[20px] w-[350px]">

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">{{ t('common.monthCharge') }}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{
                                conversionUnitKWh(parkOverview.A_M17).size }} {{ conversionUnitKWh(parkOverview.A_M17).unit }}
                        </div>
                    </li>
                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">{{ t('common.monthDischarge') }}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{
                                conversionUnitKWh(parkOverview.A_M18).size }} {{ conversionUnitKWh(parkOverview.A_M18).unit }}
                        </div>
                    </li>
                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">{{ t('common.yearCharge') }}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{
                                conversionUnitKWh(parkOverview.A_M19).size }} {{ conversionUnitKWh(parkOverview.A_M19).unit }}
                        </div>
                    </li>
                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">{{  t('common.yaerDischarge')}}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{
                                conversionUnitKWh(parkOverview.A_M20).size }} {{ conversionUnitKWh(parkOverview.A_M20).unit }}
                        </div>
                    </li>
                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">{{ t('common.totalCharge') }}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{
                                conversionUnitKWh(parkOverview.A_M5).size }} {{ conversionUnitKWh(parkOverview.A_M5).unit }}
                        </div>
                    </li>
                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">{{ t('common.totalDischarge') }}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{
                                conversionUnitKWh(parkOverview.A_M6).size }} {{ conversionUnitKWh(parkOverview.A_M6).unit }}
                        </div>
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
        position: relative;

        .house_bg {
            background-size: contain;
            background-repeat: no-repeat;
            background-image: url(../../../../assets/image/overview/house.png);
        }
    }

    .charge {
        background-image: url(../../../../assets/image/common/point.webp);
    }

    .discharge {
        background-image: url(../../../../assets/image/common/point.webp);
    }

    .cnx {
        background-image: url(../../../../assets/image/overview/cnx_device.png);
    }

    .cng {
        background-image: url(../../../../assets/image/overview/cng_device.png);
    }
}
</style>