<script lang="ts" setup>
import { t } from '@/langs'
import { getArrayLength } from '@/utils'
import { useParkChart } from './useParkChart'
import TitleBox from '@/components/common/TitleBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'

const { 
    form, loading, getResult, timeType, currentPageData, currentChange, pageParams, 
    tableData, chartRef, checkAll, handleCheckAllChange, handleCheckedIdsChange, 
    isIndeterminate, dictValue
} = useParkChart()

</script>


<template>
    <div class="bg-[var(--theme-white-bg)] p-[24px] overflow-hidden w-full" v-loading="loading">

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
                <el-date-picker @change="getResult" v-model="form.date" :type="timeType" range-separator="-"
                    start-placeholder="Start date" :clearable="false" end-placeholder="End date" />
            </el-form-item>


            <el-form-item label="设备单元" prop="type">

                <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
                    class="pr-4">全选</el-checkbox>

                <el-checkbox-group v-model="form.types" @change="handleCheckedIdsChange">

                    <el-checkbox v-for="item in dictValue" :label="item.dictValue" :key="item.dictValue"> {{ item.dictLabel
                    }}</el-checkbox>

                </el-checkbox-group>

            </el-form-item>

        </el-form>

        <TitleBox class="mb-[16px]"> 趋势图表 </TitleBox>

        <div ref="chartRef" class="h-[280px] mb-[32px]"></div>

        <TitleBox class="mb-[32px]"> 数据列表 </TitleBox>

        <el-table :data="currentPageData" stripe style="width: 100%">

            <el-table-column prop="time" label="日期" />


            <el-table-column label="直流侧(BMS)" align="center">
                <el-table-column prop="state" label="充">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.charge }}</template>
                            <template #unit>{{ row.chargeUnit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
                <el-table-column prop="city" label="放">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.discharge }}</template>
                            <template #unit>{{ row.dischargeUnit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="效率">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.efficiency }}</template>
                            <template #unit>%</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
            </el-table-column>

            <el-table-column label="交流侧(PCS)" align="center">
                <el-table-column prop="state" label="充">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.PCSchargeSize }}</template>
                            <template #unit>{{ row.PCSchargeUnit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
                <el-table-column prop="city" label="放">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.PCSdischargeSize }}</template>
                            <template #unit>{{ row.PCSdischargeUnit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="效率">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ row.PCSefficiency }}</template>
                            <template #unit>%</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>
            </el-table-column>

            <!-- 
            <el-table-column prop="charge" label="充电">
                <template #default="{ row }">
                    <LabelValueUnit :font-size="16">
                        <template #value>{{ row.charge }}</template>
                        <template #unit>{{ row.chargeUnit }}</template>
                    </LabelValueUnit>
                </template>
            </el-table-column>

            <el-table-column prop="discharge" label="放电">
                <template #default="{ row }">
                    <LabelValueUnit :font-size="16">
                        <template #value>{{ row.discharge }}</template>
                        <template #unit>{{ row.dischargeUnit }}</template>
                    </LabelValueUnit>
                </template>
            </el-table-column>

            <el-table-column prop="discharge" label="效率">
                <template #default="{ row }">
                    <LabelValueUnit :font-size="16">
                        <template #value>{{ row.efficiency }}</template>
                        <template #unit>%</template>
                    </LabelValueUnit>
                </template>
            </el-table-column> -->

        </el-table>

        <div class="flex justify-end mt-[26px]">
            <el-pagination background layout="prev, pager, next, total" :page-sizes="[100, 200, 300, 400]"
                @currentChange="currentChange" :pageSize="pageParams.pageSize" :total="getArrayLength(tableData)" />
        </div>

    </div>
</template>