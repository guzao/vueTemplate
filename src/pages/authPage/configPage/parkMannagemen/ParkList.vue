<script lang="ts" setup>
import { t } from '@/langs'
import { useParkList } from './useParkList'
import { PropType, computed, ref } from 'vue';
import { More } from '@element-plus/icons-vue'
import { conversionUnitKWh, conversionUnitKW, getArrayLength, isTrue } from '@/utils'

import ParkForm from './ParkForm.vue'
import { Search } from '@element-plus/icons-vue'
import TitleBox from '@/components/common/TitleBox.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';


const emits = defineEmits<{
    /** 电站修改添加事件 */
    (event: 'update'): void
}>()

const {
    result,
    loading,
    drawerState,
    dicts,
    title,
    isEdit,
    addPark,
    editPark,
    checkPark,
    confirm,
    formInstance,
    editUnitGroup,
} = useParkList(emits)

const props = defineProps({
    parkList: {
        type: Array as PropType<ParkListData[]>,
        default: []
    }
})


const searchKey = ref('')

const activeKey = ref('')

const filteredParkList = computed(() => {
    const search = searchKey.value
    const firstFilter = isTrue(search) ? props.parkList.filter(item => item.name.includes(search)) : props.parkList
    const active = activeKey.value
    const filtered = isTrue(active) ? firstFilter.filter(item => item.type == active) : firstFilter
    return filtered
})



</script>

<template>
    <TitleBox class="mb-[16px]" :size="18">

        {{ t('common.park') }}{{ t('common.list') }}

        <template #left>
            <div class="flex-1">

                <el-select v-model="activeKey" placeholder="查询电站" class="mx-[20px]" clearable>
                    <el-option v-for="item in dicts.parkTypeDict.dictValue" :key="item.dictCode" :label="item.dictLabel"
                        :value="item.dictValue" />
                </el-select>

                <el-input v-model="searchKey" style="width: 300px;" clearable class="ml-[20px]]"
                    placeholder="查询电站">
                    <template #append>
                        <el-button :icon="Search" />
                    </template>
                </el-input>

            </div>
        </template>

        <template #right>
            <el-button size="default" type="primary" @click="addPark"> {{ t('common.add') }}{{ t('common.park') }}
            </el-button>
        </template>

    </TitleBox>


    <ul v-if="getArrayLength(filteredParkList)" class="grid grid-cols-4 gap-[16px]">
        <li class="bg-[var(--theme-white-bg)] rounded-[4px] overflow-hidden" v-for="item in filteredParkList"
            :key="item.id">
            <div class="h-[48px] flex justify-between items-center px-[15px] box-border "
                style="background: linear-gradient(270deg, rgba(14,169,68,0) 0%, rgba(14,169,68,0.05) 100%);">
                <TitleBox class="flex-1" :size="14">
                    {{ item.name }}
                    <template #right>
                        <el-dropdown trigger="click">
                            <el-button text :icon="More"> </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="checkPark(item)"> {{ t('common.check') }}{{ t('common.park')
                                    }} </el-dropdown-item>
                                    <el-dropdown-item @click="editPark(item)"> {{ t('common.edit') }}{{ t('common.park') }}
                                    </el-dropdown-item>
                                    <el-dropdown-item @click="editUnitGroup(item)"> 单元组管理 </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>

                    </template>
                </TitleBox>
            </div>

            <div class="px-[15px] py-[6px]">

                <LabelValueUnit class="my-[5px]" :font-size="15">
                    场站类型 <div class="inline-block w-[10px]"></div>
                    <template #value> {{ dicts.parkTypeDict.dictLabel[item.type] }} </template>
                </LabelValueUnit>

                <LabelValueUnit class="my-[5px]" :font-size="15">
                    场站状态 <div class="inline-block w-[10px]"></div>
                    <template #value> {{ dicts.parkStatusDict.dictLabel[item.status] }} </template>
                </LabelValueUnit>

                <LabelValueUnit class="my-[5px]" :font-size="15">
                    运行状态 <div class="inline-block w-[10px]"></div>
                    <template #value> {{ dicts.parkRunStatusDict.dictLabel[item.runStatus] }} </template>
                </LabelValueUnit>

                <LabelValueUnit class="my-[5px]" :font-size="15">
                    发布状态 <div class="inline-block w-[10px]"></div>
                    <template #value> {{ dicts.parkReleaseStatusDict.dictLabel[item.releaseStatus] }} </template>
                </LabelValueUnit>

                <LabelValueUnit class="my-[5px]" :font-size="15">
                    电站功率 <div class="inline-block w-[10px]"></div>
                    <template #value> {{ conversionUnitKW(+item.totalPower).size }} </template>
                    <template #unit> {{ conversionUnitKW(+item.totalPower).unit }} </template>
                </LabelValueUnit>

                <LabelValueUnit class="my-[5px]" :font-size="15">
                    电站容量 <div class="inline-block w-[10px]"></div>
                    <template #value> {{ conversionUnitKWh(+item.energy).size }} </template>
                    <template #unit> {{ conversionUnitKWh(+item.energy).unit }} </template>
                </LabelValueUnit>

            </div>

        </li>
    </ul>

    <div v-else class="bg-[var(--theme-white-bg)]"> <el-empty /> </div>


    <el-drawer v-model="drawerState" size="840px">

        <template #header>
            <TitleBox> {{ title }} </TitleBox>
        </template>

        <template #default>

            <div v-loading="loading">
                <ParkForm ref="formInstance" :parkForm="result" :isEdit="isEdit" />
            </div>

        </template>

        <template #footer>
            <div class="flex justify-start items-center" v-if="!isEdit">
                <el-button type="success" size="default" @click="confirm">提交</el-button>
                <el-button type="danger" size="default">删除</el-button>
            </div>
        </template>

    </el-drawer></template>