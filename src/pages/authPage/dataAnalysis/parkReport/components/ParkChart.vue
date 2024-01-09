<script lang="ts" setup>
import { t } from '@/langs'
import { Common } from '@/enum'
import { useParkChart } from './useParkChart'
import { getArrayLength, arrayIsNotEmpty } from '@/utils'
import TitleBox from '@/components/common/TitleBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'
import TitleBoxAndDwonload from '@/components/business/TitleBoxAndDwonload.vue'

const {
    form, loading, getResult, timeType, currentPageData, currentChange, pageParams,
    tableData, chartRef, checkAll, handleCheckAllChange, handleCheckedIdsChange,
    isIndeterminate, dictValue, downloadFile, fileLoading
} = useParkChart()

</script>


<template>
    <div class="bg-[var(--theme-white-bg)] p-[24px] overflow-hidden w-full" v-loading="loading">

        <TitleBox :size="20"> {{ t('common.runningTrend') }} </TitleBox>

        <el-form :model="form" class="demo-ruleForm mt-[36px] mb-[56px]" status-icon>

            <el-form-item :label="t('common.dataCycle')" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio-button label="D"> {{ t('common.day') }} </el-radio-button>
                    <el-radio-button label="M"> {{ t('common.month') }} </el-radio-button>
                    <el-radio-button label="Y"> {{ t('common.yaer') }} </el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('common.dataTime')" prop="date" style="width: 450px;">
                <el-date-picker @change="getResult" v-model="form.date" :type="timeType" range-separator="-"
                    start-placeholder="Start date" :clearable="false" end-placeholder="End date" />
            </el-form-item>


            <el-form-item :label="t('common.deviceUnit')" prop="type">

                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
                    class="pr-4">{{ t('common.all') }}</el-checkbox>

                <el-checkbox-group v-model="form.types" @change="handleCheckedIdsChange">

                    <el-checkbox v-for="item in dictValue" :label="item.dictValue" :key="item.dictValue"> {{ item.dictLabel
                    }}</el-checkbox>

                </el-checkbox-group>

            </el-form-item>

        </el-form>

        <TitleBox class="mb-[16px]"> {{ t('common.trendChart') }} </TitleBox>

        <div ref="chartRef" class="h-[280px] mb-[32px]"></div>


        <TitleBoxAndDwonload @download-file="downloadFile" :loading="fileLoading"
            :disabled-download="arrayIsNotEmpty(currentPageData)" class="mb-[32px]">
            {{ t('common.dataList') }}
        </TitleBoxAndDwonload>

        <el-table :data="currentPageData" stripe style="width: 100%">

            <el-table-column prop="time" :label="t('common.date')" />


            <el-table-column label="直流侧(BMS)" align="center">
                <el-table-column prop="state" :label="t('common.charge')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.charge }}</template>
                            <template #unit>{{ row.chargeUnit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
                <el-table-column prop="city" :label="t('common.discharge')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.discharge }}</template>
                            <template #unit>{{ row.dischargeUnit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
                <el-table-column prop="address" :label="t('common.efficiency')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.efficiency || Common.DEFAULT_SYMBOL }}</template>
                            <template #unit>%</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
            </el-table-column>

            <el-table-column label="交流侧(PCS)" v-hasPermission="[]" align="center">
                <el-table-column prop="state" :label="t('common.charge')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.PCSchargeSize }}</template>
                            <template #unit>{{ row.PCSchargeUnit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
                <el-table-column prop="city" :label="t('common.discharge')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.PCSdischargeSize }}</template>
                            <template #unit>{{ row.PCSdischargeUnit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
                <el-table-column prop="address" :label="t('common.efficiency')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.PCSefficiency || Common.DEFAULT_SYMBOL }}</template>
                            <template #unit>%</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
            </el-table-column>

        </el-table>

        <div class="flex justify-end mt-[26px]">
            <el-pagination background layout="prev, pager, next, total" @currentChange="currentChange"
                :pageSize="pageParams.pageSize" :total="getArrayLength(tableData)" />
        </div>

    </div>
</template>