<script lang="ts" setup>
import { t } from '@/langs'
import { Search } from '@element-plus/icons-vue'
import { useSelectmeasurement } from './useSelectmeasurement'

import TitleBox from '@/components/common/TitleBox.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'

const {
    searchKey, 
    tableData, 
    rowClick,
    tableDataLoading, 
    forceUpdate, 
    clearSelectList,
    tableRef, 
    handleSelectionChange, 
    selectedList, 
    deletMetricModel,
    filteredTableData,
    groupData, 
    ugroupId, 
    groupDataLoading,
    assetSerial, 
    assetSerialData, 
    assetSerialLoading,
    unit, 
    unitData, 
    unitDataLoading,
    stack, 
    stackData, 
    stackDataLoading,
    cluster, 
    clusterData, 
    clusterDataLoading,
    pack, 
    packData, 
    packDataLoading,
    cell, 
    cellData, 
    cellDataLoading
} = useSelectmeasurement()

const rowClassName = () => 'cursor-pointer'

defineExpose({
    /** 选中的测点 */
    selectedList,
    /** 更新选中的测点 */
    forceUpdate
})

</script>

<template>
    <div class="flex border-t border-b border-[var(--theme-white-f4-bg)] p-[10px]">

        <div class="flex-1 border-r border-[var(--theme-white-f4-bg)]">

            <el-scrollbar height="600px">

                <TitleBox class="mb-[16px]"> {{ t('common.subPark') }} </TitleBox>
                <el-checkbox-group class="mb-[16px] ml-2" v-loading="groupDataLoading" v-model="ugroupId">
                    <div class="grid grid-cols-5 gap-y-3 gap-x-1">
                        <el-checkbox style="margin-right: 8px;" class="mr-0" v-for="item in groupData" :key="item.id"
                            :label="item.id" size="default" border>
                            {{ item.name }}
                        </el-checkbox>
                    </div>
                </el-checkbox-group>

                <TitleBox class="mb-[16px]"> {{ t('common.device') }}  </TitleBox>
                <el-checkbox-group class="mb-[16px] ml-2" v-loading="assetSerialLoading" v-model="assetSerial">
                    <div class="grid grid-cols-4 gap-y-3 gap-x-1">
                        <el-checkbox style="margin-right: 8px;" v-for="item in assetSerialData" :key="item.id"
                            :label="item.assetSerial" size="default" border>
                            {{ item.name }}
                        </el-checkbox>
                    </div>
                </el-checkbox-group>

                <TitleBox class="mb-[16px]"> {{ t('common.unit') }}  </TitleBox>
                <el-checkbox-group class="mb-[16px] ml-2" v-loading="unitDataLoading" v-model="unit">
                    <div class="grid grid-cols-4 gap-y-3 gap-x-1">
                        <el-checkbox style="margin-right: 8px;" v-for="item in unitData" :key="item.id" :label="item.id"
                            size="default" border>
                            {{ item.name }}
                        </el-checkbox>
                    </div>
                </el-checkbox-group>

                <TitleBox class="mb-[16px]"> {{ t('common.stack') }}  </TitleBox>
                <el-checkbox-group class="mb-[16px] ml-2" v-loading="stackDataLoading" v-model="stack">
                    <div class="grid grid-cols-4 gap-y-3 gap-x-1">
                        <el-checkbox style="margin-right: 8px;" v-for="item in stackData" :key="item.id" :label="item.id"
                            size="default" border>
                            {{ item.name }}
                        </el-checkbox>
                    </div>
                </el-checkbox-group>

                <TitleBox class="mb-[16px]"> {{ t('common.cluster') }}  </TitleBox>
                <el-checkbox-group class="mb-[16px] ml-2" v-loading="clusterDataLoading" v-model="cluster">
                    <div class="grid grid-cols-4 gap-y-3 gap-x-1">
                        <el-checkbox style="margin-right: 8px;" v-for="item in clusterData" :key="item.id" :label="item.id"
                            size="default" border>
                            {{ item.name }}
                        </el-checkbox>
                    </div>
                </el-checkbox-group>

                <TitleBox class="mb-[16px]"> {{ t('common.pack') }}  </TitleBox>
                <el-checkbox-group class="mb-[16px] ml-2" v-loading="packDataLoading" v-model="pack">
                    <div class="grid grid-cols-4 gap-y-3 gap-x-1">
                        <el-checkbox style="margin-right: 8px;" v-for="item in packData" :key="item.id" :label="item.id"
                            size="default" border>
                            {{ item.name }}
                        </el-checkbox>
                    </div>
                </el-checkbox-group>

                <TitleBox class="mb-[16px]"> {{ t('common.cell') }}  </TitleBox>
                <el-checkbox-group class="mb-[16px] ml-2" v-loading="cellDataLoading" v-model="cell">
                    <div class="grid grid-cols-4 gap-y-3 gap-x-1">
                        <el-checkbox style="margin-right: 8px;" v-for="item in cellData" :key="item.id" :label="item.id"
                            size="default" border>
                            {{ item.name }}
                        </el-checkbox>
                    </div>
                </el-checkbox-group>

            </el-scrollbar>

        </div>

        <div class="flex-1 px-2 box-border ">

            <el-input v-model="searchKey" clearable class="mb-[8px]">
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>

            <el-table ref="tableRef" :row-class-name="rowClassName" :data="tableData" @row-click="rowClick" v-loading="tableDataLoading" @selection-change="handleSelectionChange"
                height="350px" :row-key="(row: MetricModel) => row.id" style="width: 100%">
                <el-table-column :reserve-selection="true" type="selection" width="55" />
                <el-table-column prop="gruopName" label="Name" />
            </el-table>

            <div class="flex h-[45px] items-center w-full mb-[8px]">

                <LabelValueUnit class="flex-1" :font-size="16">
                    {{ t('common.selected') }} <template #value> {{ selectedList.length }} </template>
                </LabelValueUnit>

                <el-button size="default" type="danger" @click="clearSelectList">{{ t('common.clearable') }} </el-button>

            </div>

            <el-scrollbar style="height: 150px;">
                <div class="grid grid-cols-2 gap-1">
                    <el-tag v-for="tag in selectedList" @close="deletMetricModel(tag)" class="mr-[10px]" :key="tag.id"
                        closable type="info"> {{ tag.gruopName }} </el-tag>
                </div>
            </el-scrollbar>

        </div>

    </div>
</template>