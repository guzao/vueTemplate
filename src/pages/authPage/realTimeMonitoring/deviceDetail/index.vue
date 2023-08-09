<script lang="ts" setup>

import { useDeviceDetialContext } from './useDevice'

import PCSInfo from './components/PCSInfo.vue'
import UnitList from './components/UnitList.vue'
import DeviceUnit from './components/DeviceUnit.vue'
import SubLayout from "@/layout/SubLayout/index.vue"
import DeviceBaseInfo from './components/DeviceBaseInfo.vue'
import DeviceHeaderInfo from './components/DeviceHeaderInfo.vue'

const { deviceBaseInfo, loading, deviceDetialContext }  = useDeviceDetialContext()

</script>

<template>
    <SubLayout>

        <template #left>
            <!-- 设备列表 -->
            <UnitList />
        </template>

        <div class="device_detail">

            <!-- 头部信息 -->
            <DeviceHeaderInfo />

            <!-- 基本信息 功率曲线 -->
            <DeviceBaseInfo :device-base-info="deviceBaseInfo.deviceMap" v-loading="loading" />

            <!-- 储能单元 -->
            <DeviceUnit :storage-unit="deviceBaseInfo.E" />

            <!-- 电网信息 -->
            <!-- <PowerGrid /> -->

            <!-- PCS 信息 -->
            <PCSInfo />

        </div>

    </SubLayout>
</template>
