<script lang="ts" setup>
import { t } from '@/langs'
import { paserTime } from '@/utils'
import { useIncomeChart } from './useIncomeChart'
import TitleBox from '@/components/common/TitleBox.vue';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const { chartRef, type, currentTime, nextTime, prevTime, disabled, formatType, loading } = useIncomeChart()

</script>

<template>
    <div class="bottom_bg income_chart h-[27vh] px-[21px] min-h-[250px] " v-loading="loading">

        <TitleBox class="my-[10px]">
            {{ t('parkIncome.incomeChart') }}

            <template #right>
                <div class="flex flex-1">

                    <el-select v-model="type" class="w-[80px]  mr-[30px]" size="small">
                        <el-option :label="t('common.day')" value="D" />
                        <el-option :label="t('common.week')" value="W" />
                        <el-option :label="t('common.month')" value="M" />
                        <el-option :label="t('common.yaer')" value="Y" />
                    </el-select>

                    <div class="flex">
                        <div @click="prevTime"
                            class="bg-[var(--theme-white-bg)] w-[20px] flex justify-center items-center rounded-[4px] cursor-pointer">
                            <el-icon>
                                <ArrowLeft />
                            </el-icon>
                        </div>
                        <div class="tex-[12px] text-[var(--theme-gray153)] mx-[20px] select-none"> 
                            {{ t('common.currentTime') }}：{{ paserTime(currentTime, formatType) }}
                        </div>
                        <div @click="nextTime"
                            :class="[ disabled ? 'cursor-not-allowed' : 'cursor-pointer' ]"
                            class="bg-[var(--theme-white-bg)] w-[20px] flex justify-center items-center  rounded-[4px]  ">
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </div>
                    </div>
                </div>
            </template>

        </TitleBox>


        <div ref="chartRef"></div>

    </div>
</template>

<style lang="scss" scoped>
.bottom_bg.income_chart {
    background-image: url(../../../.././assets/image/overview/parklOverview_bottom_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>