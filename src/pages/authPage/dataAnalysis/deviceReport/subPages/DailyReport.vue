<script lang="ts" setup>
import { t } from "@/langs"
import { Common } from '@/enum'
import { objectSpanMethod } from './tools'
import { useDailyReport } from './useDailyReport'
import { conversionUnitKWh, getEfficiency, getArrayLength, arrayIsNotEmpty } from '@/utils'

import TitleBox from '@/components/common/TitleBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'
import TitleBoxAndDwonload from "@/components/business/TitleBoxAndDwonload.vue"


const { form, loading, result, chartRef, downloadFile, fileLoading } = useDailyReport()

</script>


<template>
    <div class="mt-[8px] p-[24px] bg-[var(--theme-white-bg)]" v-loading="loading">

        <TitleBox :size="20"> {{ t('common.runningTrend') }} </TitleBox>

        <el-form :model="form" class="demo-ruleForm mt-[36px] mb-[36px]" status-icon>
            <el-form-item :label="t('common.dataTime')" prop="date">
                <el-date-picker v-model="form.date" label="Pick a time" :clearable="false" placeholder="Pick a time" />
            </el-form-item>
        </el-form>

        <TitleBox class="mb-[16px]"> {{ t('common.trendChart') }} </TitleBox>

        <div ref="chartRef" class="h-[280px] mb-[32px]"></div>

        <TitleBoxAndDwonload @download-file="downloadFile" :loading="fileLoading"
            :disabled-download="arrayIsNotEmpty(result.data)" class="mb-[32px]">
            {{ t('common.dataList') }}
        </TitleBoxAndDwonload>

        <el-table :data="result.data" stripe border
            :span-method="(data: any) => objectSpanMethod(getArrayLength(result.data), data)" style="width: 100%">

            <el-table-column prop="subName" :label="t('common.subPark')" width="120" />

            <el-table-column prop="dev" :label="t('common.device')" width="140" />

            <el-table-column prop="dev" align="center" :label="t('common.cocurrent')">

                <el-table-column prop="charge" :label="t('common.charge')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ conversionUnitKWh(row.charge).size }}</template>
                            <template #unit>{{ conversionUnitKWh(row.charge).unit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>

                <el-table-column prop="charge" :label="t('common.discharge')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ conversionUnitKWh(row.discharge).size }}</template>
                            <template #unit>{{ conversionUnitKWh(row.discharge).unit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>

                <el-table-column prop="charge" :label="t('common.efficiency')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ getEfficiency(row.charge, row.discharge) || Common.DEFAULT_SYMBOL
                            }}</template>
                            <template #unit>%</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>

                <el-table-column prop="charge" label="合计">
                    <template #default="{ row }">

                        <LabelValueUnit :font-size="16">
                            {{ t('common.charge') }}
                            <template #value>{{ conversionUnitKWh(row.sumCharge).size }}</template>
                            <template #unit>{{ conversionUnitKWh(row.sumCharge).unit }}</template>
                        </LabelValueUnit>

                        <LabelValueUnit :font-size="16">
                            {{ t('common.discharge') }}
                            <template #value>{{ conversionUnitKWh(row.sumDischarge).size }}</template>
                            <template #unit>{{ conversionUnitKWh(row.sumDischarge).unit }}</template>
                        </LabelValueUnit>

                        <LabelValueUnit :font-size="16">
                            {{ t('common.efficiency') }}
                            <template #value>{{ getEfficiency(row.sumCharge, row.sumDischarge) || Common.DEFAULT_SYMBOL
                            }}</template>
                            <template #unit>%</template>
                        </LabelValueUnit>

                    </template>
                </el-table-column>

                <el-table-column prop="charge" label="总计">
                    <template #default="{ row }">

                        <LabelValueUnit :font-size="16">
                            {{ t('common.charge') }}
                            <template #value>{{ conversionUnitKWh(result.charge).size }}</template>
                            <template #unit>{{ conversionUnitKWh(result.charge).unit }}</template>
                        </LabelValueUnit>

                        <LabelValueUnit :font-size="16">
                            {{ t('common.discharge') }}
                            <template #value>{{ conversionUnitKWh(result.discharge).size }}</template>
                            <template #unit>{{ conversionUnitKWh(result.discharge).unit }}</template>
                        </LabelValueUnit>

                        <LabelValueUnit :font-size="16">
                            {{ t('common.efficiency') }}
                            <template #value>{{ getEfficiency(result.charge, result.discharge) || Common.DEFAULT_SYMBOL
                            }}</template>
                            <template #unit>%</template>
                        </LabelValueUnit>

                    </template>
                </el-table-column>

            </el-table-column>

            <el-table-column prop="dev" align="center" v-hasPermission="[]" :label="t('common.exchange')">

                <el-table-column prop="charge" :label="t('common.charge')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ conversionUnitKWh(row.pcsCharge).size }}</template>
                            <template #unit>{{ conversionUnitKWh(row.pcsCharge).unit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>

                <el-table-column prop="charge" :label="t('common.discharge')">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ conversionUnitKWh(row.pcsDischarge).size }}</template>
                            <template #unit>{{ conversionUnitKWh(row.pcsDischarge).unit }}</template>
                        </LabelValueUnit>
                    </template>
                </el-table-column>

                <el-table-column prop="charge" :label="t('common.efficiency')" width="100">
                    <template #default="{ row }">
                        <LabelValueUnit :font-size="16">
                            <template #value>{{ getEfficiency(row.pcsCharge, row.pcsDischarge) || Common.DEFAULT_SYMBOL
                            }}</template>
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
                            <template #value>{{ getEfficiency(row.sumPCSCharge, row.sumPCSDischarge) ||
                                Common.DEFAULT_SYMBOL }}</template>
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
                            <template #value>{{ getEfficiency(result.pcsCharge, result.pcsDischarge) ||
                                Common.DEFAULT_SYMBOL }}</template>
                            <template #unit>%</template>
                        </LabelValueUnit>

                    </template>
                </el-table-column>

            </el-table-column>

        </el-table>

    </div>
</template>