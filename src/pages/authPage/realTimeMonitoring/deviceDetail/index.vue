<script lang="ts" setup>

import PCSInfo from './components/PCSInfo.vue'
import PowerGrid from './components/PowerGrid.vue'
import DeviceUnit from './components/DeviceUnit.vue'
import SubLayout from "@/layout/SubLayout/index.vue"
import DeviceBaseInfo from './components/DeviceBaseInfo.vue'
import DeviceHeaderInfo from './components/DeviceHeaderInfo.vue'

</script>

<template>
    <SubLayout>

        <template #left>

            <div class="w-[190px] h-full"> 设备详情 </div>

        </template>

        <div class="device_detail">

            <!-- 头部信息 -->
            <DeviceHeaderInfo />

            <!-- 基本信息 功率曲线 -->
            <DeviceBaseInfo />

            <!-- 储能单元 -->
            <DeviceUnit />

            <!-- 电网信息 -->
            <PowerGrid />

            <!-- PCS 信息 -->
            <PCSInfo />

        </div>

    </SubLayout>
</template>
