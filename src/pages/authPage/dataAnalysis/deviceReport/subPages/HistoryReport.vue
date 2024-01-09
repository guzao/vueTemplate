<script lang="ts" setup>
import { t } from '@/langs'
import { Common } from '@/enum'
import { useHistoryReport } from './useHistoryReport'
import { getArrayLength, conversionUnitKWh, getEfficiency, arrayIsNotEmpty, arrayIsEmpty } from '@/utils'

import TitleBox from '@/components/common/TitleBox.vue'
import TitleBoxAndDwonload from '@/components/business/TitleBoxAndDwonload.vue'

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
    chartRef,
    checkAll,
    isIndeterminate,
    allChange,
    assetSerialsChange,
    fileLoading,
    downloadFile
} = useHistoryReport()


</script>


<template>
    <div class="mt-[8px] w-full overflow-hidden p-[24px] bg-[var(--theme-white-bg)]">

        <TitleBox> {{ t('common.runningTrend') }} </TitleBox>

        <el-form :model="form" class="demo-ruleForm mt-[36px] mb-[36px]" status-icon>

            <el-form-item :label="t('common.dataCycle')" prop="type">
                <el-radio-group v-model="form.dataCycle" @input="getResult">
                    <el-radio-button label="D"> {{ t('common.day') }} </el-radio-button>
                    <el-radio-button label="M"> {{ t('common.month') }} </el-radio-button>
                    <el-radio-button label="Y"> {{ t('common.yaer') }} </el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('common.dataTime')" prop="date" style="width: 450px;">
                <el-date-picker v-model="form.date" @change="getResult" :type="timeType" range-separator="-"
                    start-placeholder="Start date" :clearable="false" end-placeholder="End date" />
            </el-form-item>

            <el-form-item :label="t('common.deviceUnit')" prop="type" v-loading="unitListLoading">

                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="allChange" class="pr-4">{{
                    t('common.all') }}</el-checkbox>

                <el-checkbox-group v-model="form.assetSerials" @change="assetSerialsChange">

                    <el-checkbox v-for="item in limitDataList" :label="item.assetSerial" :key="item.id"> {{ item.name
                    }}</el-checkbox>

                    <div v-if="getArrayLength(unitList) > 6"
                        class="inline-block ml-3 cursor-pointer text-[var(--theme-blue0)]" @click="toggleShowMore"> {{
                            showMore ? '收起<<' : '更多>>' }} </div>

                </el-checkbox-group>

            </el-form-item>

        </el-form>

        <TitleBox class="mb-[16px]"> {{ t('common.trendChart') }} </TitleBox>

        <div ref="chartRef" v-show="arrayIsNotEmpty(result)" v-loading="loading" class="mb-[32px]"></div>
        <el-empty v-if="arrayIsEmpty(result)" />

        <TitleBoxAndDwonload @download-file="downloadFile" :loading="fileLoading"
            :disabled-download="arrayIsNotEmpty(currentPageData)" class="mb-[32px]">
            {{ t('common.dataList') }}
        </TitleBoxAndDwonload>

        <el-table :data="currentPageData" stripe style="width: 100%" v-loading="loading">

            <el-table-column prop="time" fixed :label="t('common.date')"
                :width="`${getArrayLength(tableHeader) > 1 ? '120' : ''}`" />

            <el-table-column align="center" v-for="item in tableHeader" :key="item.id" prop="time" :label="item.name">

                <el-table-column :label="t('common.cocurrent')" align="center">
                    <el-table-column prop="state" :label="t('common.charge')"
                        :width="`${getArrayLength(tableHeader) > 1 ? '180' : ''}`">
                        <template #default="{ row }">
                            {{ conversionUnitKWh(row[`charge_${item.id}`]).size }}
                            {{ conversionUnitKWh(row[`charge_${item.id}`]).unit }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="city" :label="t('common.discharge')"
                        :width="`${getArrayLength(tableHeader) > 1 ? '180' : ''}`">
                        <template #default="{ row }">
                            {{ conversionUnitKWh(row[`discharge_${item.id}`]).size }}
                            {{ conversionUnitKWh(row[`discharge_${item.id}`]).unit }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" :label="t('common.efficiency')"
                        :width="`${getArrayLength(tableHeader) > 1 ? '180' : ''}`">
                        <template #default="{ row }">
                            {{ getEfficiency(row[`charge_${item.id}`], row[`discharge_${item.id}`]) || Common.DEFAULT_SYMBOL
                            }}%
                        </template>
                    </el-table-column>
                </el-table-column>

                <el-table-column v-if="0" :label="t('common.exchange')" align="center">
                    <el-table-column prop="state" :label="t('common.charge')"
                        :width="`${getArrayLength(tableHeader) > 1 ? '180' : ''}`">
                        <template #default="{ row }">
                            {{ conversionUnitKWh(row[`PCScharge_${item.id}`]).size }}
                            {{ conversionUnitKWh(row[`PCScharge_${item.id}`]).unit }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="city" :label="t('common.discharge')"
                        :width="`${getArrayLength(tableHeader) > 1 ? '180' : ''}`">
                        <template #default="{ row }">
                            {{ conversionUnitKWh(row[`PCSdisCharge_${item.id}`]).size }}
                            {{ conversionUnitKWh(row[`PCSdisCharge_${item.id}`]).unit }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" :label="t('common.efficiency')"
                        :width="`${getArrayLength(tableHeader) > 1 ? '180' : ''}`">
                        <template #default="{ row }">
                            {{ getEfficiency(row[`PCScharge_${item.id}`], row[`PCSdisCharge_${item.id}`]) ||
                                Common.DEFAULT_SYMBOL }}%
                        </template>
                    </el-table-column>
                </el-table-column>

            </el-table-column>


        </el-table>

        <div class="flex justify-end mt-[26px]">
            <el-pagination background layout="prev, pager, next" v-model:current-page="pageParams.page"
                @currentChange="currentChange" :pageSize="pageParams.pageSize" :total="getArrayLength(result)" />
        </div>

    </div>
</template>
