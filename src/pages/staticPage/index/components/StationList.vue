<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAppData, useDicts } from '@/store'
import { useStationList } from '../useStationList'
import { getRunningDay, conversionUnitKW, conversionUnitKWh } from '@/utils'
import { Type } from '@/enum'



import TitleBox from '@/components/common/TitleBox.vue';
import StationBaseInfoCard from '@/components/common/StationBaseInfoCard.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';

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
        v-watermark=" { markSatate: item.releaseStatus, text: dicts.parkReleaseStatusDict.dictLabel[item.releaseStatus], height: 150, } "
        :key="item.code" :class="item.type == Type.NUMBER_CONTAINER ? ' ' : 'cng'"
        class="bg-[var(--theme-white-bg)] mb-[16px] last:mb-0 px-[24px] py-[23px] pt-[20px] station_item">

        <TitleBox>

            {{ item.label }}

            <template #left>
                <div class="flex w-full items-center">

                    <div class="h-[7px] w-[7px] bg-[var(--theme-green-bg)] rounded-full mr-[6px] ml-[28px]"></div>
                    <LabelValueUnit>
                        投运时长
                        <template #value> {{ getRunningDay(item.titleInfo.runTime) }} </template>
                        <template #unit> 天 </template>
                    </LabelValueUnit>

                    <div class="h-[7px] w-[7px] bg-[var(--theme-green-bg)] rounded-full mr-[6px] ml-[28px]"></div>
                    <LabelValueUnit>
                        总功率
                        <template #value> {{ conversionUnitKWh(+item.titleInfo.totalPower).size }} </template>
                        <template #unit> {{ conversionUnitKWh(+item.titleInfo.totalPower).unit }} </template>
                    </LabelValueUnit>

                    <div class="h-[7px] w-[7px] bg-[var(--theme-green-bg)] rounded-full mr-[6px] ml-[28px]"></div>
                    <LabelValueUnit>
                        总容量
                        <template #value> {{ conversionUnitKW(+item.titleInfo.energy).size }} </template>
                        <template #unit> {{ conversionUnitKW(+item.titleInfo.energy).unit }} </template>
                    </LabelValueUnit>

                </div>
            </template>

            <template #right>
                <div class="justify-end flex cursor-pointer text-[var(--theme-blue0)]" @click="goToOverview(item)"
                    v-hasPermission=" 'ess:park:group' ">
                    <div>进入电站 ></div>
                </div>
            </template>

        </TitleBox>

        <StationBaseInfoCard :data=" item " class="mt-[16px]" />

        <div class="flex pl-[296px] box-border flex-col ">

            <div class="h-[1px] bg-[var(--theme-gray235-bg)] my-[18px]"></div>

            <div class="flex items-center">

                <LabelValueUnit :font-size=" 16 ">
                    月充
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M17).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M17).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit :font-size=" 16 ">
                    月放
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M18).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M18).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit :font-size=" 16 ">
                    年充
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M19).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M19).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit :font-size=" 16 ">
                    年放
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M20).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M20).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit :font-size=" 16 ">
                    累充
                    <template #value> {{ conversionUnitKWh(+item.detailList.A_M5).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.detailList.A_M5).unit }} </template>
                </LabelValueUnit>
                <div class="h-[14px] w-[2px] bg-[var(--theme-gray235-bg)] mx-[12px]"></div>

                <LabelValueUnit :font-size=" 16 ">
                    累放
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