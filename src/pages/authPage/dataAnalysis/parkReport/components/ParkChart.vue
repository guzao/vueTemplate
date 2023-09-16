<script lang="ts" setup>
import { t } from '@/langs'
import { useAppData } from '@/store'
import { getParkRunReport } from '@/API'
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { useEcharts, useReactiveHttp, useLocalPagnation } from '@/hooks'
import { TableData, processData, render, dateFormatterType } from '../tools'
import { paserTime, getArrayLength, getPrevMonth, getDateCycles } from '@/utils'

import TitleBox from '@/components/common/TitleBox.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'

const appdate = useAppData()

const form = reactive({
    type: 'D',
    startTime: new Date(),
    endTime: new Date(),
    date: [ getPrevMonth(new Date(), 1), new Date() ]
})

const timeType = computed(() => {
    if (form.type == 'D') return 'daterange'
    if (form.type == 'M') return 'monthrange'
    if (form.type == 'D') return 'year'
})

const { chartRef, renderChart } = useEcharts()

const createParams = () => {
    const { date, type } = form
    const [startTime, endTime] = date
    let formatterTag = dateFormatterType[ type as any ]  || 'YYYY-MM-DD'
    return {
        startTime: paserTime(startTime, formatterTag as any),
        endTime: paserTime(endTime, formatterTag as any),
        stationSerial: appdate.currentParkSerial,
        type: form.type as any
    }
    
}

const tableData = ref<TableData[]>([])

const { currentPageData, pageParams } = useLocalPagnation(tableData, { page: 1, pageSize: 10 })

const { getResult, loading } = useReactiveHttp({
    initData: {} as ParkRunReportData,
    request: () => getParkRunReport(createParams()),
    requestCallback: async ({ data }) => {
        tableData.value = processData(data) as any
        await nextTick()
        render(tableData.value, renderChart)
        return data
    }
})

const currentChange = (page: number) => pageParams.page = page

watch(() => appdate.currentParkSerial, getResult)

watch(() => form.type, (type) =>  {
    const currentDate = new Date()
    form.date[0] = getDateCycles(type, currentDate)
    getResult()
})

</script>


<template>
    <div class="bg-[var(--theme-white-bg)] p-[24px] overflow-hidden w-full" v-loading="loading">

        <TitleBox :size="20"> 运行趋势 </TitleBox>

        <el-form :model="form"  class="demo-ruleForm mt-[36px] mb-[56px]" status-icon>

            <el-form-item label="数据周期" prop="type">
                <el-radio-group v-model="form.type">
                    <el-radio-button label="D"> {{  t('common.day') }} </el-radio-button>
                    <el-radio-button label="M"> {{ t('common.month') }} </el-radio-button>
                    <el-radio-button label="Y"> {{ t('common.yaer') }} </el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="数据时间" prop="date" style="width: 450px;">
                <el-date-picker @change="getResult" v-model="form.date" :type="timeType" range-separator="-"
                    start-placeholder="Start date" :clearable="false" end-placeholder="End date" />
            </el-form-item>

        </el-form>

        <TitleBox class="mb-[16px]"> 趋势图表 </TitleBox>

        <div ref="chartRef" class="h-[280px] mb-[32px]"></div>

        <TitleBox class="mb-[32px]"> 数据列表 </TitleBox>

        <el-table :data="currentPageData" stripe  style="width: 100%">

            <el-table-column prop="time" label="日期" />

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
            </el-table-column>

        </el-table>

        <div class="flex justify-end mt-[26px]">
            <el-pagination background layout="prev, pager, next, total" @currentChange="currentChange" :pageSize="pageParams.pageSize" :total="getArrayLength(tableData)" />
        </div>

    </div>
</template>