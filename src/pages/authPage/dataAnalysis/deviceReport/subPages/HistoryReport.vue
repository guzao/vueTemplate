<script lang="ts" setup>
import { useHistoryReport } from './useHistoryReport'
import {  getArrayLength, conversionUnitKWh, getEfficiency } from '@/utils'

import TitleBox from '@/components/common/TitleBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'


const {
    form,
    timeType,
    limitDataList,
    showMore,
    toggleShowMore,
    currentPageData,
    tableHeader,
    currentChange,
    pageParams,
    result,
    unitListLoading,
    getResult,
    unitList,
    loading,
    chartRef
} = useHistoryReport()

</script>


<template>
    <div class="mt-[8px] w-full overflow-hidden p-[24px] bg-[var(--theme-white-bg)]">

        <TitleBox> 运行趋势 </TitleBox>

        <el-form :model="form" class="demo-ruleForm mt-[36px] mb-[36px]" status-icon>

            <el-form-item label="数据周期" prop="type">
                <el-radio-group v-model="form.dataCycle" @input="getResult">
                    <el-radio-button label="D"> 日趋势 </el-radio-button>
                    <el-radio-button label="M"> 月趋势 </el-radio-button>
                    <el-radio-button label="Y"> 年趋势 </el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="数据时间" prop="date" style="width: 450px;">
                <el-date-picker v-model="form.date" @change="getResult" :type="timeType" range-separator="-"
                    start-placeholder="Start date" :clearable="false" end-placeholder="End date" />
            </el-form-item>

            <el-form-item label="设备单元" prop="type" v-loading="unitListLoading">

                <el-checkbox-group v-model="form.assetSerials" @change="getResult">

                    <el-checkbox v-for="item in limitDataList" :label="item.assetSerial" :key="item.id"> {{ item.name
                    }}</el-checkbox>

                    <div v-if="getArrayLength(unitList) > 6"
                        class="inline-block ml-3 cursor-pointer text-[var(--theme-blue0)]" @click="toggleShowMore"> {{
                            showMore ? '收起<<' : '更多>>' }} </div>

                </el-checkbox-group>

            </el-form-item>

        </el-form>

        <TitleBox class="mb-[16px]"> 趋势图表 </TitleBox>

        <div ref="chartRef" class="h-[300px] mb-[32px]"></div>

        <el-table :data="currentPageData" stripe style="width: 100%" v-loading="loading">

            <el-table-column prop="time" label="日期" />

            <el-table-column v-for="item in tableHeader" :key="item.id" prop="time" :label="item.name">
                <template #default="{ row }">
                    <LabelValueUnit :font-size="16">
                        充
                        <template #value>{{ conversionUnitKWh(row[`charge_${item.id}`]).size }}</template>
                        <template #unit>{{ conversionUnitKWh(row[`charge_${item.id}`]).unit }}</template>
                    </LabelValueUnit>
                    <LabelValueUnit :font-size="16">
                        放
                        <template #value>{{ conversionUnitKWh(row[`discharge_${item.id}`]).size }}</template>
                        <template #unit>{{ conversionUnitKWh(row[`discharge_${item.id}`]).unit }}</template>
                    </LabelValueUnit>
                    <LabelValueUnit :font-size="16">
                        效率
                        <template #value>{{ getEfficiency(row[`discharge_${item.id}`], row[`discharge_${item.id}`])
                        }}</template>
                        <template #unit>%</template>
                    </LabelValueUnit>
                </template>
            </el-table-column>

        </el-table>

        <div class="flex justify-end mt-[26px]">
            <el-pagination background layout="prev, pager, next" @currentChange="currentChange"
                :pageSize="pageParams.pageSize" :total="getArrayLength(result)" />
        </div>

    </div>
</template>
