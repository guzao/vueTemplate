<script lang="ts" setup>
import { t } from "@/langs"
import { useConsistentScatter } from './useConsistentScatter'
import { arrayIsNotEmpty, arrayIsEmpty, parserTime } from "@/utils"

import CradBox from '@/components/common/CradBox.vue'
import TitleBox from "@/components/common/TitleBox.vue"
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import LabelValueUnit from "@/components/common/LabelValueUnit.vue"
import TitleAndStationNavBar from '@/components/business/TitleAndStationNavBar.vue'


const {
    cardTipLinePosition,
    lineFrom,
    formInstance,
    lineFromRules,
    lineChartRef,
    unitGroupList,
    unitGroupListLoading,
    unitData,
    position,
    getTrendData,
    unitDataLoading,
    unitGroupChange,

    lineData,
    pointForm,
    lineLoaing,
    getScatterChart,
    scatterFromRules,
    clusterData,
    clusterLoading,
    uniChange,
    scatterData,
    scatterLoading,
    scatterChartRef,
    prevTime,
    nextTime,
    prevDisabled,
    nextDisabled
} = useConsistentScatter()


</script>

<template>
    <TitleAndStationNavBar />


    <CradBox>


        <el-form ref="formInstance" :model="lineFrom" class="demo-ruleForm" :rules="lineFromRules" label-width="110px"
            label-position="left">

            <el-form-item :label="t('common.device')" prop="deviceNode" v-loading="unitGroupListLoading">
                <el-cascader v-model="lineFrom.deviceNode" :options="unitGroupList" style="width: 300px;"
                    :props="{ label: 'name', value: 'assetSerial', children: 'eosUnitList' }" @change="unitGroupChange" />
            </el-form-item>

            <el-form-item v-show="arrayIsNotEmpty(lineFrom.deviceNode)" :label="t('common.deviceUnit')" prop="unit"
                v-loading="unitDataLoading">
                <el-radio-group v-model="lineFrom.unit" @change="getTrendData">
                    <el-radio-button :label="item.serial" v-for="item in unitData" :key="item.id"> {{ item.name }}
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('common.dataType')" prop="pointType">
                <el-radio-group v-model="lineFrom.pointType" @change="getTrendData">
                    <el-radio-button :label="1">{{ t('common.voltage') }}</el-radio-button>
                    <el-radio-button :label="2">{{ t('common.temp') }}</el-radio-button>
                </el-radio-group>
            </el-form-item>

            <el-form-item :label="t('common.dateRange')" style="width: 500px;" prop="duration">
                <el-date-picker v-model="lineFrom.duration" @change="getTrendData" type="datetimerange" range-separator="-"
                    start-placeholder="Start date" :clearable="false" end-placeholder="End date" />
            </el-form-item>

        </el-form>

        <TitleBox class="mb-[16px]"> 运行曲线 </TitleBox>

        <div class="relative mb-[16px]">

            <div ref="lineChartRef" class="bg-[var(--theme-white-bg)]" v-show="arrayIsNotEmpty(lineData)"
                v-loading="lineLoaing"></div>
            <el-empty v-show="arrayIsEmpty(lineData)" v-loading="lineLoaing" />

            <div v-show="(arrayIsNotEmpty(lineData) && position.x)"
                class="absolute p-[10px] w-[220px] bg-[var(--theme-gray251-bg)] transition-all duration-200 tips_card"
                :class="cardTipLinePosition" :style="`left: ${position.x}px;top: ${position.y}px;`">
                <LabelValueUnit>
                    <template #value> {{ position.info }} </template>
                    {{ position.time }}:
                </LabelValueUnit>
            </div>

        </div>





        <el-form ref="pointFormIntance" :model="pointForm" class="demo-ruleForm" :rules="scatterFromRules"
            label-position="left" inline>

            <el-form-item :label="t('common.date')" prop="time">
                <el-button @click="prevTime" :icon="ArrowLeft" circle :disabled="prevDisabled" />
                <span class="text-[var(--theme-gray153)] px-[16px]"> {{ parserTime(pointForm.time, 'YYYY-MM-DD HH:mm:ss') }}
                </span>
                <el-button @click="nextTime" :icon="ArrowRight" circle :disabled="nextDisabled" />
            </el-form-item>

            <el-form-item :label="t('common.unit')" prop="devCode">
                <el-select v-model="pointForm.devCode" class="m-2" placeholder="Select" @change="uniChange">
                    <el-option v-for="item in unitData" :key="item.id" :label="item.name" :value="item.serial" />
                </el-select>
            </el-form-item>

            <el-form-item :label="t('common.cluster')" prop="cluster" v-loading="clusterLoading">
                <el-select v-model="pointForm.cluster" class="m-2" placeholder="Select" clearable @change="getScatterChart">
                    <el-option v-for="item in clusterData" :key="item.id" :label="item.name" :value="item.serial" />
                </el-select>
            </el-form-item>

            <el-form-item :label="t('common.dataType')" prop="type" v-loading="unitDataLoading">
                <el-radio-group v-model="pointForm.type" @change="getScatterChart">
                    <el-radio-button :label="1">{{ t('common.voltage') }}</el-radio-button>
                    <el-radio-button :label="2">{{ t('common.temp') }}</el-radio-button>
                </el-radio-group>
            </el-form-item>

        </el-form>

        <TitleBox class="mb-[16px]"> 散点图 </TitleBox>

        <div class="bg-[var(--theme-white-bg)] h-[360px]" ref="scatterChartRef" v-loading="scatterLoading"
            v-show="arrayIsNotEmpty(scatterData.scatterData)"></div>
        <el-empty v-show="arrayIsEmpty(scatterData.scatterData)" v-loading="scatterLoading" />

    </CradBox>
</template>



<style lang="scss" scoped>
.tips_card {
    &.left::before {
        display: block;
        content: ' ';
        height: 200px;
        width: 1px;
        background-color: var(--theme-green-bg);
        position: absolute;
        left: 2px;
    }

    &.right::after {
        display: block;
        content: ' ';
        height: 200px;
        width: 1px;
        background-color: var(--theme-green-bg);
        position: absolute;
        right: 2px;
    }
}
</style>