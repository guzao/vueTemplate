<script setup lang="ts">
import { t } from '@/langs'
import { Type } from '@/enum'
import { useRouter } from 'vue-router'
import { useAppData, useDicts } from '@/store'
import { useStationList } from '../useStationList'
import { getRunningDay, conversionUnitKW, conversionUnitKWh } from '@/utils'

import TitleBox from '@/components/common/TitleBox.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';
import StationBaseInfoCard from '@/components/common/StationBaseInfoCard.vue';

const { filteredList } = useStationList()

const router = useRouter()
const appData = useAppData()
const dicts = useDicts()
const goToOverview = ({ code: stationCode }: ParkMonitorInfo) => {
    appData.parkCodeChnage(stationCode)
    router.push({ path: '/monitor/parkOverview', query: { stationCode: appData.parkSerial } })
}

</script>

<template>
    <div v-for="item in  filteredList "
        v-watermark="{ markSatate: item.releaseStatus, text: dicts.parkReleaseStatusDict.dictLabel[item.releaseStatus], height: 150, }"
        :key="item.code" :class="item.type == Type.NUMBER_CONTAINER ? ' ' : 'cng'"
        class="bg-[var(--theme-white-bg)] mb-[16px] last:mb-0 px-[24px] py-[23px] pt-[20px] station_item ">

        <TitleBox>

            {{ item.label }}

            <template #left>
                <div class="flex w-full items-center">

                    <div class="h-[7px] w-[7px] bg-[var(--theme-green-bg)] rounded-full mr-[6px] ml-[28px]"></div>
                    <LabelValueUnit>
                        {{ t('common.operationTime') }}
                        <template #value> {{ getRunningDay(item.titleInfo.runTime) }} </template>
                        <template #unit> {{ t('common.day') }} </template>
                    </LabelValueUnit>

                    <div class="h-[7px] w-[7px] bg-[var(--theme-green-bg)] rounded-full mr-[6px] ml-[28px]"></div>
                    <LabelValueUnit>
                        {{ t('common.totalPower') }}
                        <template #value> {{ conversionUnitKWh(+item.titleInfo.totalPower).size }} </template>
                        <template #unit> {{ conversionUnitKWh(+item.titleInfo.totalPower).unit }} </template>
                    </LabelValueUnit>

                    <div class="h-[7px] w-[7px] bg-[var(--theme-green-bg)] rounded-full mr-[6px] ml-[28px]"></div>
                    <LabelValueUnit>
                        {{ t('common.totalEnergy') }}
                        <template #value> {{ conversionUnitKW(+item.titleInfo.energy).size }} </template>
                        <template #unit> {{ conversionUnitKW(+item.titleInfo.energy).unit }} </template>
                    </LabelValueUnit>

                </div>
            </template>

            <template #right>
                <div class="justify-end flex cursor-pointer text-[var(--theme-blue0)]" @click="goToOverview(item)">
                    <div>{{ t('common.enter') }} ></div>
                </div>
            </template>

        </TitleBox>

        <StationBaseInfoCard :data="item" class="mt-[16px]" />

        <div class="flex pl-[296px] box-border flex-col ">

            <div class="h-[1px] bg-[var(--theme-gray235-bg)] my-[18px]"></div>

            <div class="flex items-center">

                <LabelValueUnit :font-size="16">
                    {{ t('common.monthCharge') }}
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M17).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M17).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit :font-size="16">
                    {{ t('common.moonthDischarge') }}
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M18).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M18).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit :font-size="16">
                    {{ t('common.yaerDischarge') }}
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M19).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M19).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit :font-size="16">
                    {{ t('common.yaerDischarge') }}
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M20).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M20).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit :font-size="16">
                    {{ t('common.totalCharge') }}
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M5).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M5).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit :font-size="16">
                    {{ t('common.totalDischarge') }}
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M6).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M6).unit }} </template>
                </LabelValueUnit>

            </div>

        </div>


    </div>
</template>

<style lang="scss" scoped>
.station_item {
    background-image: url(../../../../assets/image/common/list_item-bg.png);
    background-size: 314px 100%;
    background-repeat: no-repeat;

    &.cng {
        background-image: url(../../../../assets/image/common/list_item-bg_cng.png);
    }
}
</style>