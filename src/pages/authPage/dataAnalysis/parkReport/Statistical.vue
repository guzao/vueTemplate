<script lang="ts" setup>
import { watch } from 'vue'
import { useAppData } from '@/store'
import { getStationInfo } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { conversionUnitKWh, getEfficiency } from '@/utils'

import TitleBox from '@/components/common/TitleBox.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';

const appData = useAppData()

const { result: parkOverview, getResult: getParkOverview, loading } = useReactiveHttp({
    initData: {} as ParkRuningInfo,
    request: () => getStationInfo(appData.parkSerial),
    requestCallback: (res) => {
        parkOverview.value = res.data
        return res.data
    },
})

watch(() => appData.currentParkSerial, getParkOverview)

</script>


<template>
    <div class="bg-[var(--theme-white-bg)] p-[24px] mb-[16px]" v-loading="loading">

        <TitleBox :size="20"> 电站运行指标统计 </TitleBox>

        <ul class="mt-[26px] grid grid-cols-4">

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> 日/充放 </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        充电
                        <template #value> {{ conversionUnitKWh(parkOverview.A_M15).size }} </template>
                        <template #unit> {{ conversionUnitKWh(parkOverview.A_M15).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        放电
                        <template #value>  {{ conversionUnitKWh(parkOverview.A_M16).size }} </template>
                        <template #unit>  {{ conversionUnitKWh(parkOverview.A_M16).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        效率
                        <template #value> {{ getEfficiency(parkOverview.A_M15, parkOverview.A_M16) }} </template>
                        <template #unit> % </template>
                    </LabelValueUnit>

                </div>

            </li>

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> 月/充放 </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        充电
                        <template #value> {{ conversionUnitKWh(parkOverview.A_M17).size }} </template>
                        <template #unit>  {{ conversionUnitKWh(parkOverview.A_M17).unit }}  </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        放电
                        <template #value> {{ conversionUnitKWh(parkOverview.A_M18).size }} </template>
                        <template #unit> {{ conversionUnitKWh(parkOverview.A_M18).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        效率
                        <template #value> {{ getEfficiency(parkOverview.A_M18, parkOverview.A_M17) }} </template>
                        <template #unit>  % </template>
                    </LabelValueUnit>

                </div>

            </li>

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> 年/充放 </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        充电
                        <template #value> {{ conversionUnitKWh(parkOverview.A_M19).size }} </template>
                        <template #unit> {{ conversionUnitKWh(parkOverview.A_M19).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        放电
                        <template #value>  {{ conversionUnitKWh(parkOverview.A_M20).size }} </template>
                        <template #unit>  {{ conversionUnitKWh(parkOverview.A_M20).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        效率
                        <template #value> {{ getEfficiency(parkOverview.A_M19, parkOverview.A_M20) }} </template>
                        <template #unit>  % </template>
                    </LabelValueUnit>

                </div>

            </li>

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> 累计/充放 </div>

                <div class="flex flex-col items-center ">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        充电
                        <template #value>  {{ conversionUnitKWh(parkOverview.A_M5).size }} </template>
                        <template #unit>  {{ conversionUnitKWh(parkOverview.A_M5).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        放电
                        <template #value>  {{ conversionUnitKWh(parkOverview.A_M6).size }} </template>
                        <template #unit>  {{ conversionUnitKWh(parkOverview.A_M6).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        效率
                        <template #value> {{ getEfficiency(parkOverview.A_M6, parkOverview.A_M5)  }} </template>
                        <template #unit> % </template>
                    </LabelValueUnit>

                </div>

            </li>

        </ul>

    </div>
</template>