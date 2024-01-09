<script lang="ts" setup>
import { t } from '@/langs'
import { conversionUnitPrice } from '@/utils'
import { useIncomeStatistical } from './useIncomeStatistical'

import CradBox from '@/components/common/CradBox.vue'
import TitleBox from '@/components/common/TitleBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'

const { result, loading } = useIncomeStatistical()


</script>

<template>
    <CradBox class="mb-[16px]" v-loading="loading">

        <TitleBox :size="20"> 电站收益指标统计 </TitleBox>

        <ul class="grid grid-cols-5  mt-[36px]">

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> {{ t('parkIncome.dayIncome') }} </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.C') }}
                        <template #value> {{ conversionUnitPrice(result.dayCharge).size }} </template>
                        <template #unit> {{ conversionUnitPrice(result.dayCharge).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.D') }}
                        <template #value> {{ conversionUnitPrice(result.dayDischarge).size }} </template>
                        <template #unit> {{ conversionUnitPrice(result.dayDischarge).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        {{ t('common.income') }}
                        <template #value>
                            <div class="day_income text-[var(--el-color-primary)] f-din text-[20px]">--</div>
                        </template>
                        <template #unit> {{ conversionUnitPrice(result.dayIncome).unit }} </template>
                    </LabelValueUnit>

                </div>

            </li>

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> {{ t('parkIncome.weekIncome') }} </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.C') }}
                        <template #value> {{ conversionUnitPrice(result.weekCharge).size }} </template>
                        <template #unit> {{ conversionUnitPrice(result.weekCharge).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.D') }}
                        <template #value> {{ conversionUnitPrice(result.weekDischarge).size }} </template>
                        <template #unit> {{ conversionUnitPrice(result.weekDischarge).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        {{ t('common.income') }}
                        <template #value>
                            <div class="week_income text-[var(--el-color-primary)] f-din text-[20px]">--</div>
                        </template>
                        <template #unit> {{ conversionUnitPrice(result.weekIncome).unit }} </template>
                    </LabelValueUnit>

                </div>

            </li>

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> {{ t('parkIncome.monthIncome') }} </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.C') }}
                        <template #value> {{ conversionUnitPrice(result.monthCharge).size }} </template>
                        <template #unit> {{ conversionUnitPrice(result.monthCharge).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.D') }}
                        <template #value> {{ conversionUnitPrice(result.monthDischarge).size }} </template>
                        <template #unit> {{ conversionUnitPrice(result.monthDischarge).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        {{ t('common.income') }}
                        <template #value>
                            <div class="month_income text-[var(--el-color-primary)] f-din text-[20px]">--</div>
                        </template>
                        <template #unit> {{ conversionUnitPrice(result.monthIncome).unit }} </template>
                    </LabelValueUnit>

                </div>

            </li>

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> {{ t('parkIncome.yearIncome') }} </div>

                <div style="border-right: 1px solid #ebf2f0;"
                    class="flex flex-col items-center border-1 border-solid border-[var(--theme-gray153)]">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.C') }}
                        <template #value> {{ conversionUnitPrice(result.yearCharge).size }} </template>
                        <template #unit> {{ conversionUnitPrice(result.yearCharge).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.D') }}
                        <template #value> {{ conversionUnitPrice(result.yearDischarge).size }} </template>
                        <template #unit> {{ conversionUnitPrice(result.yearDischarge).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        {{ t('common.income') }}
                        <template #value>
                            <div class="year_income text-[var(--el-color-primary)] f-din text-[20px]">--</div>
                        </template>
                        <template #unit>{{ conversionUnitPrice(result.yearIncome).unit }} </template>
                    </LabelValueUnit>

                </div>

            </li>

            <li>
                <div class="text-center text-[var(--theme-gray153)] mb-[6px]"> {{ t('parkIncome.totalIncome') }} </div>

                <div class="flex flex-col items-center ">

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.C') }}
                        <template #value> {{ conversionUnitPrice(result.accumulateCharge).size }} </template>
                        <template #unit> {{ conversionUnitPrice(result.accumulateCharge).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="mb-[6px]" :font-size="18">
                        {{ t('common.D') }}
                        <template #value> {{ conversionUnitPrice(result.accumulateDischarge).size }} </template>
                        <template #unit> {{ conversionUnitPrice(result.accumulateDischarge).unit }} </template>
                    </LabelValueUnit>

                    <LabelValueUnit :font-size="18">
                        {{ t('common.income') }}
                        <template #value>
                            <div class="total_income text-[var(--el-color-primary)] f-din text-[20px]"> -- </div>
                        </template>
                        <template #unit> {{ conversionUnitPrice(result.accumulateIncome).unit }} </template>
                    </LabelValueUnit>

                </div>

            </li>

        </ul>

    </CradBox>
</template>