<script lang="ts" setup>
import { t } from '@/langs'
import TitleBox from '@/components/common/TitleBox.vue'
import { useIncomeParkChart } from './useIncomeParkChart'
import { getArrayLength, conversionUnitPrice, arrayIsEmpty, arrayIsNotEmpty } from '@/utils'

import CradBox from '@/components/common/CradBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'
import TitleBoxAndDwonload from '@/components/business/TitleBoxAndDwonload.vue'

const {
    form, timeType, result, getResult, loading, currentPageData, pageParams, chartRef, currentChange, unitListLoading,
    isIndeterminate, checkAll, limitDataList, toggleShowMore, unitList, showMore, allChange, tableTitle, assetSerialsChange,
    downloadFile, fileLoading
} = useIncomeParkChart()


</script>


<template>
    <CradBox v-loading="loading">

        <TitleBox :size="20"> 运行趋势 </TitleBox>

        <el-form :model="form" class="demo-ruleForm mt-[36px] mb-[56px]" status-icon>

            <el-form-item label="数据周期" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio-button label="D"> {{ t('common.day') }} </el-radio-button>
                    <el-radio-button label="M"> {{ t('common.month') }} </el-radio-button>
                    <el-radio-button label="Y"> {{ t('common.yaer') }} </el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="数据时间" prop="date" style="width: 450px;">
                <el-date-picker v-model="form.date" @change="getResult" :type="timeType" range-separator="-"
                    start-placeholder="Start date" :clearable="false" end-placeholder="End date" />
            </el-form-item>

            <el-form-item label="设备单元" prop="type" v-loading="unitListLoading">

                <el-checkbox v-model="checkAll" @change="allChange" :indeterminate="isIndeterminate" class="pr-4">{{
                    t("common.all") }}</el-checkbox>

                <el-checkbox-group v-model="form.assetSerials" @change="assetSerialsChange">

                    <el-checkbox v-for="item in limitDataList" :label="item.assetSerial" :key="item.id"> {{ item.name
                    }}</el-checkbox>

                    <div v-if="getArrayLength(unitList) > 6"
                        class="inline-block ml-3 cursor-pointer text-[var(--theme-blue0)]" @click="toggleShowMore"> {{
                            showMore ? '收起<<' : '更多>>' }} </div>

                </el-checkbox-group>

            </el-form-item>

        </el-form>

        <TitleBox class="mb-[16px]"> {{ t("common.dataChart") }} </TitleBox>

        <div ref="chartRef" v-show="arrayIsNotEmpty(result)" class="mb-[32px]"></div>
        <el-empty v-if="arrayIsEmpty(result)" />

        <TitleBoxAndDwonload @download-file="downloadFile" :loading="fileLoading"
            :disabled-download="arrayIsNotEmpty(currentPageData)" class="mb-[32px]">
            {{ t('common.dataList') }}
        </TitleBoxAndDwonload>

        <el-table :data="currentPageData" stripe style="width: 100%">

            <el-table-column prop="times" label="日期" />

            <el-table-column v-for="item in tableTitle" :key="item.id" prop="charge" :label="item.name">
                <template #default="{ row }">
                    <LabelValueUnit :font-size="16">
                        <template #value>{{ conversionUnitPrice(row[`income_${item.id}`]).size }}</template>
                        <template #unit>{{ conversionUnitPrice(row[`income_${item.id}`]).unit }}</template>
                    </LabelValueUnit>
                </template>
            </el-table-column>

        </el-table>

        <div class="flex justify-end mt-[26px]">
            <el-pagination background layout="prev, pager, next, total" @currentChange="currentChange"
                :pageSize="pageParams.pageSize" :total="getArrayLength(result)" />
        </div>

    </CradBox>
</template>