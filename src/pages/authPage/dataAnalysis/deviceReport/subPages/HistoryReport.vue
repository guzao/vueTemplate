<script lang="ts" setup>
import { useAppData } from '@/store'
import { getUnitList, getHistoryReport } from '@/API'
import { ref, reactive, computed, watch, nextTick } from 'vue'
import { dateFormatterType, processTableRowData, renderLine } from '../../parkReport/tools'
import { useEcharts, useReactiveHttp, useLocalPagnation, useHasShowMoreData } from '@/hooks'
import { getPrevMonth, getDateCycles, paserTime, getArrayLength, generateDnamicTableData, conversionUnitKWh, getEfficiency, } from '@/utils'

import TitleBox from '@/components/common/TitleBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'

const appdate = useAppData()

const { result: unitList, getResult: _getUnitList, loading: unitListLoading } = useReactiveHttp(
    { initData: [] as UnitListData[], request: () => getUnitList({ stationSerial: appdate.currentParkSerial, pageSize: 1000 }), requestCallback: (res) => res.rows }
)

const { toggleShowMore, showMore, limitDataList } = useHasShowMoreData(unitList, 6)

const form = reactive({
    dataCycle: 'D',
    date: [getPrevMonth(new Date(), 1), new Date()],
    assetSerials: [] as string[],
})

const createParams = () => {
    const { date, dataCycle, assetSerials } = form
    const [startTime, endTime] = date
    let formatterTag = dateFormatterType[dataCycle as any] || 'YYYY-MM-DD'
    return {
        startTime: paserTime(startTime, formatterTag as any),
        endTime: paserTime(endTime, formatterTag as any),
        stationSerial: appdate.currentParkSerial,
        dataCycle: form.dataCycle as any,
        assetSerials
    }
}

const timeType = computed(() => {
    if (form.dataCycle == 'D') return 'daterange'
    if (form.dataCycle == 'M') return 'monthrange'
    if (form.dataCycle == 'D') return 'year'
})

const { chartRef, renderChart } = useEcharts()

const tableHeader = ref<DnamicTableDataHeaderData[]>([])

const { result, getResult, loading } = useReactiveHttp({
    initData: [] as HistoryReportData[],
    request: () => getHistoryReport(createParams()),
    requestCallback: ({ data }) => {
        nextTick(() => renderLine(data, renderChart))
        const res = generateDnamicTableData(data, { key: 'time', splitSymbol: '$', processTableRowData: processTableRowData })
        tableHeader.value = res.headerData
        return res.tableData
    },
    Immediately: false
})

const { currentPageData, pageParams } = useLocalPagnation(result, { page: 1, pageSize: 10 })

const currentChange = (page: number) => pageParams.page = page

const reset = () => {
    pageParams.page = 1
    result.value = []
}

watch(() => form.dataCycle, (type) => {
    form.date[0] = getDateCycles(type, new Date())
    reset()
    getResult()
})

watch(() => appdate.currentParkSerial, () => {
    reset()
    form.assetSerials = []
    _getUnitList()
})

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
