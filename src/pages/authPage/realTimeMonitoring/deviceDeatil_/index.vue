<script lang="ts" setup>
import { useDeviceDetail } from './useDeviceDetail'

import GroupList from './components/GroupList.vue'
import SubLayout from "@/layout/SubLayout/index.vue"
import DeviceHeade from './components/DeviceHeader.vue'
import DeviceBaseInfo from './components/DeviceBaseInfo.vue'


const { groupClick, groupUnitList, loading, deviceBaseInfo, deviceBaseInfoLoading } = useDeviceDetail()

</script>

<template>
    <SubLayout>

        <template #left>

            <!-- 设备列表 -->
            <GroupList :group-click="groupClick" :group-unit-list="groupUnitList" v-loading="loading" />

        </template>

        <div class="device_detail">

            <!-- 头部信息 -->
            <DeviceHeade />

            <!-- 基本信息 -->
            <DeviceBaseInfo :device-base-info="deviceBaseInfo.deviceMap" :loading="deviceBaseInfoLoading" />

        </div>

    </SubLayout>
</template>
