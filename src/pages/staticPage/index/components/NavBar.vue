<script setup lang="ts">
import { ref } from "vue";
import { stationList } from '../useStationList'

const value = ref('')



</script>

<template>
    <div class="h-[62px] bg-[var(--theme-white-bg)] flex items-center px-[12px] mb-[16px]">

        <el-select v-model="value" class="m-2" placeholder="Select" style="width: 260px;" filterable>
            <el-option v-for="item in stationList" :key="item.code" :label="item.label" :value="item.code" />
        </el-select>
        
        <el-select v-model="value" class="m-2" placeholder="Select" style="width: 260px;" filterable>
            <el-option v-for="item in stationList" :key="item.code" :label="item.label" :value="item.code" />
        </el-select>

    </div>
</template>