<script lang="ts" setup>
import { getArrayLength, arrayIsEmpty, arrayIsNotEmpty } from '@/utils'
import { useDeviceType } from '../hooks/useDeviceType'

import TitleBox from '@/components/common/TitleBox.vue';

const {
    dicts,
    currentPageData,
    pageParams,
    form,
    rules,
    chartRef,
    pieChartRef,
    handleCheckAllChange,
    handleCheckedIdsChange,
    checkAll,
    warning,
    isIndeterminate,
    loading,
    tableHeader,
    currentChange,
    formInstance,
    validateForm
} = useDeviceType()

</script>

<template>
    <div class="mt-[8px] w-full overflow-hidden p-[24px] bg-[var(--theme-white-bg)]" v-loading="loading">

        <TitleBox :size="18"> 设备类型分析 </TitleBox>

        <el-form :model="form" :rules="rules" class="demo-ruleForm mt-[36px] mb-[36px]" ref="formInstance" status-icon>

            <el-form-item  label="数据类型">
                <el-radio-group v-model="form.warnStatus">
                    <el-radio-button label="1"> 未消除 </el-radio-button>
                    <el-radio-button label="2"> 已消除 </el-radio-button>
                    <el-radio-button label="0"> 全　选 </el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="数据周期" >
                <el-radio-group v-model="form.dataCycle" @input="validateForm">
                    <el-radio-button label="D"> 日趋势 </el-radio-button>
                    <el-radio-button label="M"> 月趋势 </el-radio-button>
                    <el-radio-button label="Y"> 年趋势 </el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="数据时间"  style="width: 450px;">
                <el-date-picker v-model="form.date" type="daterange" range-separator="-" start-placeholder="Start date"
                    :clearable="false" end-placeholder="End date" />
            </el-form-item>


            <el-form-item label="设备单元" prop="deviceTypes" >

                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
                    class="pr-4">全选</el-checkbox>

                <el-checkbox-group v-model="form.deviceTypes" @change="handleCheckedIdsChange">
                    <el-checkbox v-for="item in dicts.deviceTypeDict.dictValue" :label="item.dictValue"
                        :key="item.dictValue">
                        {{ item.dictLabel }}
                    </el-checkbox>
                </el-checkbox-group>

            </el-form-item>
        </el-form>

        <TitleBox> 趋势图表 </TitleBox>

        <div ref="chartRef" v-show="arrayIsNotEmpty(warning)" class="mb-[32px]"> </div>
        <el-empty v-if="arrayIsEmpty(warning)"  />

        <TitleBox class="mb-[32px]"> 设备构类型成图 </TitleBox>
        
        <div ref="pieChartRef" v-show="arrayIsNotEmpty(warning)"  class="mb-[32px]"> </div>
        <el-empty v-if="arrayIsEmpty(warning)"  />

        <TitleBox class="mb-[32px]"> 数据列表 </TitleBox>

        <el-table :data="currentPageData" stripe v-loading="loading">

            <el-table-column prop="time" label="日期" />

            <el-table-column v-for="item in tableHeader" :key="item.id" :label="item.name">
                <template #default="{ row }">
                    {{ row[`count_${item.id}`] || 0 }}
                </template>
            </el-table-column>

        </el-table>

        <div class="flex justify-end mt-[26px]">
            <el-pagination background layout="prev, pager, next" v-model:current-page="pageParams.page"
                @currentChange="currentChange" :pageSize="pageParams.pageSize" :total="getArrayLength(warning)" />
        </div>

    </div>
</template>