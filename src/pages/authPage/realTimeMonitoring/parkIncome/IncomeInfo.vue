<script lang="ts" setup>
import { t } from '@/langs'
import { useParkIncome } from './useParkIncome'
import { paserTime, conversionUnitPrice } from '@/utils'

import IconVue from '@/components/common/Icon.vue';
import TitleBox from '@/components/common/TitleBox.vue';
import LastTime from '@/components/common/LastTime.vue';

const { appData, parkIncome, loading } = useParkIncome()
</script>

<template>
    <div class="flex justify-between px-[60px] runing_info" v-loading="loading">


        <div class="w-[430px] mt-[4%]">

            <TitleBox>
                {{ t('parkIncome.income') }}
                <template #right>
                    <LastTime> {{ paserTime(appData.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }} </LastTime>
                </template>
            </TitleBox>

            <div class="h-[2px] bg-[var(--theme-gray235-bg)] my-[12px]"></div>

            <ul class="grid grid-cols-2 gap-y-[35px]">

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{ t('parkIncome.daycharge') }}</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> {{ conversionUnitPrice(parkIncome.dayCharge).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal">  {{ conversionUnitPrice(parkIncome.dayCharge).unit }} </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{ t('parkIncome.latDaycharge') }}</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">  {{ conversionUnitPrice(parkIncome.lastDayCharge).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal">  {{ conversionUnitPrice(parkIncome.lastDayCharge).unit }}  </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{ t('parkIncome.dayDischarge') }} </div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--discharge)]"> {{ conversionUnitPrice(parkIncome.dayCharge).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> {{ conversionUnitPrice(parkIncome.dayCharge).unit }} </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{t('parkIncome.latDayDischarge') }}</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--discharge)]">  {{ conversionUnitPrice(parkIncome.lastDayDischarge).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal">  {{ conversionUnitPrice(parkIncome.lastDayDischarge).unit }} </span>
                        </div>
                    </div>
                </li>


                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{ t('parkIncome.dayIncome') }}</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]">  {{ conversionUnitPrice(parkIncome.dayIncome).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal">   {{ conversionUnitPrice(parkIncome.dayIncome).unit }} </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">{{ t('parkIncome.latDayIncome') }}</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> {{ conversionUnitPrice(parkIncome.lastDayIncome).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal">  {{ conversionUnitPrice(parkIncome.lastDayIncome).unit }} </span>
                        </div>
                    </div>
                </li>

            </ul>


        </div>

        <div class="h-[392px] mt-[3%] flex justify-center  flex-col items-center bg-contain bg-no-repeat">

            <div>
                <div class="text-center  font-semibold text-[24px] f-dinb text-[var(--charge)]"> {{ conversionUnitPrice(parkIncome.accumulateIncome).size }} </div>
                <div class="text-center  text-[var(--theme-gray107)]"> {{  t('parkIncome.totalIncome') }}({{ conversionUnitPrice(parkIncome.accumulateIncome).unit }}) </div>
            </div>

            <ul class="flex mt-[20px]">

                <li class="mx-[20px]">
                    <div class="text-center font-semibold text-[24px] f-dinb text-[var(--charge)]"> {{ conversionUnitPrice(parkIncome.accumulateCharge).size }} </div>
                    <div class="text-center text-[var(--theme-gray107)]"> {{ t('parkIncome.totalChargeIncome') }}({{ conversionUnitPrice(parkIncome.accumulateCharge).unit }}) </div>
                </li>

                <li class="mx-[20px]">
                    <div class="text-center font-semibold text-[24px] f-dinb text-[var(--discharge)]"> {{ conversionUnitPrice(parkIncome.accumulateDischarge).size }} </div>
                    <div class="text-center text-[var(--theme-gray107)]"> {{ t('parkIncome.totaDischargeIncome') }}({{ conversionUnitPrice(parkIncome.accumulateDischarge).unit }}) </div>
                </li>

            </ul>

        </div>

        <div class="w-[430px] mt-[4%]">

            <TitleBox> {{ t('parkIncome.totalIncome') }} </TitleBox>

            <div class="h-[2px] bg-[var(--theme-gray235-bg)] my-[12px]"></div>

            <div class="flex justify-end">

                <ul class="grid grid-cols-2 gap-[20px] w-[390px]">

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]"> {{ t('parkIncome.weekIncome') }} {{`(${ conversionUnitPrice(parkIncome.weekIncome).unit })`}}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{ conversionUnitPrice(parkIncome.weekIncome).size }}
                        </div>
                    </li>

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">{{ t('parkIncome.latWeekIncome') }} {{`(${ conversionUnitPrice(parkIncome.lastWeekIncome).unit })`}}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{ conversionUnitPrice(parkIncome.lastWeekIncome).size }}
                        </div>
                    </li>

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]"> {{ t('parkIncome.monthIncome') }} {{`(${ conversionUnitPrice(parkIncome.monthIncome).unit })`}}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{ conversionUnitPrice(parkIncome.monthIncome).size }}
                        </div>
                    </li>

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">{{ t('parkIncome.latMonthIncome') }} {{`(${ conversionUnitPrice(parkIncome.lastMonthIncome).unit })`}}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{ conversionUnitPrice(parkIncome.lastMonthIncome).size }}
                        </div>
                    </li>

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">{{ t('parkIncome.yearIncome') }} {{`(${ conversionUnitPrice(parkIncome.yearIncome).unit })`}}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{ conversionUnitPrice(parkIncome.yearIncome).size }}
                        </div>
                    </li>

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">{{ t('parkIncome.latYearIncome') }} {{`(${ conversionUnitPrice(parkIncome.lastYearIncome).unit })`}}</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            {{ conversionUnitPrice(parkIncome.lastYearIncome).size }}
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

}
</style>