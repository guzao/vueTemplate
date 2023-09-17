<script lang="ts" setup>
import { objectSpanMethod } from './tools'
import { useDailyReport } from './useDailyReport'
import { conversionUnitKWh, getEfficiency, getArrayLength } from '@/utils'

import TitleBox from '@/components/common/TitleBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'


const { form, loading, result, chartRef } = useDailyReport()

</script>


<template>
    <div class="mt-[8px] p-[24px] bg-[var(--theme-white-bg)]" v-loading="loading">

        <TitleBox :size="20"> 运行趋势 </TitleBox>

        <el-form :model="form" class="demo-ruleForm mt-[36px] mb-[36px]" status-icon>
            <el-form-item label="数据时间" prop="date">
                <el-date-picker v-model="form.date" label="Pick a time" :clearable="false" placeholder="Pick a time" />
            </el-form-item>
        </el-form>

        <TitleBox class="mb-[16px]"> 趋势图表 </TitleBox>

        <div ref="chartRef" class="h-[280px] mb-[32px]"></div>


        <el-table :data="result.data" stripe border
            :span-method="(data: any) => objectSpanMethod(getArrayLength(result.data), data)" style="width: 100%">

                <el-table-column prop="subName" label="子站" width="100" />

                <el-table-column prop="dev" label="设备" width="140" />

                <el-table-column prop="dev" align="center" label="直流侧" >

                    <el-table-column prop="charge" label="充电">
                        <template #default="{ row }">
                            <LabelValueUnit :font-size="16">
                                <template #value>{{ conversionUnitKWh(row.charge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(row.charge).unit }}</template>
                            </LabelValueUnit>
                        </template>
                    </el-table-column>

                    <el-table-column prop="charge" label="放电">
                        <template #default="{ row }">
                            <LabelValueUnit :font-size="16">
                                <template #value>{{ conversionUnitKWh(row.discharge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(row.discharge).unit }}</template>
                            </LabelValueUnit>
                        </template>
                    </el-table-column>

                    <el-table-column prop="charge" label="效率" width="100">
                        <template #default="{ row }">
                            <LabelValueUnit :font-size="16">
                                <template #value>{{ getEfficiency(row.charge, row.discharge) }}</template>
                                <template #unit>%</template>
                            </LabelValueUnit>
                        </template>
                    </el-table-column>

                    <el-table-column prop="charge" label="合计">
                        <template #default="{ row }">

                            <LabelValueUnit :font-size="16">
                                充
                                <template #value>{{ conversionUnitKWh(row.sumCharge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(row.sumCharge).unit }}</template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                放
                                <template #value>{{ conversionUnitKWh(row.sumDischarge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(row.sumDischarge).unit }}</template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                效率
                                <template #value>{{ getEfficiency(row.sumCharge, row.sumDischarge) }}</template>
                                <template #unit>%</template>
                            </LabelValueUnit>

                        </template>
                    </el-table-column>

                    <el-table-column prop="charge" label="总计">
                        <template #default="{ row }">

                            <LabelValueUnit :font-size="16">
                                充
                                <template #value>{{ conversionUnitKWh(result.charge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(result.charge).unit }}</template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                放
                                <template #value>{{ conversionUnitKWh(result.discharge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(result.discharge).unit }}</template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                效率
                                <template #value>{{ getEfficiency(result.charge, result.discharge) }}</template>
                                <template #unit>%</template>
                            </LabelValueUnit>

                        </template>
                    </el-table-column>

                </el-table-column>

                <el-table-column prop="dev" align="center" label="交流侧" >

                    <el-table-column prop="charge" label="充电">
                        <template #default="{ row }">
                            <LabelValueUnit :font-size="16">
                                <template #value>{{ conversionUnitKWh(row.pcsCharge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(row.pcsCharge).unit }}</template>
                            </LabelValueUnit>
                        </template>
                    </el-table-column>

                    <el-table-column prop="charge" label="放电">
                        <template #default="{ row }">
                            <LabelValueUnit :font-size="16">
                                <template #value>{{ conversionUnitKWh(row.pcsDischarge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(row.pcsDischarge).unit }}</template>
                            </LabelValueUnit>
                        </template>
                    </el-table-column>

                    <el-table-column prop="charge" label="效率" width="100">
                        <template #default="{ row }">
                            <LabelValueUnit :font-size="16">
                                <template #value>{{ getEfficiency(row.pcsCharge, row.pcsDischarge) }}</template>
                                <template #unit>%</template>
                            </LabelValueUnit>
                        </template>
                    </el-table-column>

                    <el-table-column prop="charge" label="合计">
                        <template #default="{ row }">

                            <LabelValueUnit :font-size="16">
                                充
                                <template #value>{{ conversionUnitKWh(row.sumPCSCharge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(row.sumPCSCharge).unit }}</template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                放
                                <template #value>{{ conversionUnitKWh(row.sumPCSDischarge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(row.sumPCSDischarge).unit }}</template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                效率
                                <template #value>{{ getEfficiency(row.sumPCSCharge, row.sumPCSDischarge) }}</template>
                                <template #unit>%</template>
                            </LabelValueUnit>

                        </template>
                    </el-table-column>

                    <el-table-column prop="charge" label="总计">
                        <template #default="{ row }">

                            <LabelValueUnit :font-size="16">
                                充
                                <template #value>{{ conversionUnitKWh(result.pcsCharge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(result.pcsCharge).unit }}</template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                放
                                <template #value>{{ conversionUnitKWh(result.pcsDischarge).size }}</template>
                                <template #unit>{{ conversionUnitKWh(result.pcsDischarge).unit }}</template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                效率
                                <template #value>{{ getEfficiency(result.pcsCharge, result.pcsDischarge) }}</template>
                                <template #unit>%</template>
                            </LabelValueUnit>

                        </template>
                    </el-table-column>

                </el-table-column>


        </el-table>

    </div>
</template>