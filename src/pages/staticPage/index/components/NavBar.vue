<script setup lang="ts">
import { getArrayLength } from '@/utils'
import { useStationList } from '../useStationList'
import DeviceStateCountDescVue from '@/components/common/DeviceStateCountDesc.vue';
const { searchCode, stationList, deviceStateCount, parkType, type, filteredList } = useStationList()
</script>

<template>
    <div class="h-[62px] bg-[var(--theme-white-bg)] flex items-center px-[12px] mb-[16px] justify-between">

        <div>
            <el-select v-model="type" class="m-2" placeholder="Select" style="width: 260px;" clearable filterable @change="searchCode = ''">
                <el-option v-for="item in parkType" :key="item.dictValue" :label="item.accLabel" :value="item.dictValue" />
            </el-select>

            <el-select v-model="searchCode" class="m-2" placeholder="Select" style="width: 220px;" clearable filterable >
                <el-option v-for="item in filteredList" :key="item.code" :label="item.label" :value="item.code" />
            </el-select>
        </div>

        <DeviceStateCountDescVue :states="deviceStateCount" :total="getArrayLength(stationList)"/>

    </div>
</template>