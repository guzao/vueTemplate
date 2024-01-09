<script lang="ts" setup>
import { t } from '@/langs'
import { useHistory } from './useHistory'
import { isFalse, arrayIsNotEmpty } from '@/utils'

import CradBox from '@/components/common/CradBox.vue'
import TitleBox from '@/components/common/TitleBox.vue'
import { Plus, Download } from '@element-plus/icons-vue'
import HistoryChart from './components/HistoryChart.vue'
import Selectmeasurement from './components/Selectmeasurement.vue'
import TitleAndStationNavBar from '@/components/business/TitleAndStationNavBar.vue'

const {
    formInstance,
    rules,
    form,
    validateForm,
    openState,
    SelectmeasurementRef,
    forceUpdate,
    saveMetricModelList,
    deletMetricModel,
    loading,
    HistoryChartRef,
    isEmpty,
    reloadChart,
    downloadFile, 
    fileLoading
} = useHistory()

</script>

<template>
    <TitleAndStationNavBar />

    <CradBox>

        <TitleBox :size="20" class="mb-[36px]"> 历史趋势 </TitleBox>

        <el-button @click="forceUpdate" :icon="Plus"> 添加测点 </el-button>

        <el-form :model="form" ref="formInstance" class="mt-[16px]" :rules="rules">

            <el-form-item label="测点" prop="selectedMeasurement">
                <el-tag v-for="tag in form.selectedMeasurement" class="mr-[10px] mb-1" :key="tag.id" closable type="info"
                    @close="deletMetricModel(tag)">
                    {{ tag.gruopName }}
                </el-tag>
                <el-button size="default" type="danger" v-if="arrayIsNotEmpty(form.selectedMeasurement)"
                    @click="reloadChart">{{ t('common.clearable') }}</el-button>
            </el-form-item>

            <el-form-item :label="t('common.date')" prop="date">
                <div class="flex ">
                    <el-date-picker v-model="form.date" type="datetimerange" range-separator="-" start-placeholder="开始"
                        end-placeholder="结束" :clearable="false" />
                    <el-button type="primary" class="ml-[20px]" @click="validateForm" :loading="loading"> {{
                        t('common.search') }} </el-button>
                </div>
            </el-form-item>

        </el-form>

        <HistoryChart ref="HistoryChartRef" v-loading="loading" v-show="isEmpty">
            <el-button :title="t('tipsInfo.downloadFile')" @click="downloadFile" :loading="fileLoading" :icon="Download" text size="default">
                {{ t('tipsInfo.downloadFile') }}
            </el-button>
        </HistoryChart>
        <el-empty v-if="isFalse(isEmpty)" v-loading="loading" />

    </CradBox>

    <el-dialog v-model="openState" :close-on-click-modal="false" :show-close="false" width="1500px" top="3%">

        <template #header="{ close }">
            <div class="flex justify-between">

                <TitleBox :size="20"> 测点选择 </TitleBox>

                <div>
                    <el-button size="default" type="primary" @click="saveMetricModelList">{{ t('common.save') }}</el-button>
                    <!-- <el-button size="default" @click="close">{{ t('common.close') }}</el-button> -->
                </div>

            </div>
        </template>

        <Selectmeasurement ref="SelectmeasurementRef" />

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="openState = false">{{ t('common.close') }}</el-button>
                <el-button type="primary" @click="saveMetricModelList">{{ t('common.save') }}</el-button>
            </div>
        </template>

    </el-dialog>
</template>