<script lang="ts" setup>
import { inject } from 'vue'
import { useAppData } from '@/store'
import { deviceDetailContextKey } from '../useDeviceDetail'
import { getDeviceStateInfo, paserTime } from '@/utils'

import Icon from '@/components/common/Icon.vue'
import SubNavBar from '@/components/common/SubNavBar.vue'
import LastTimeVue from '@/components/common/LastTime.vue'

const appData = useAppData()
const deviceDetialContext = inject(deviceDetailContextKey)!
</script>

<template>
    <!-- 头部信息 -->
    <SubNavBar :show-device-state-desc="false" :show-view-model-select="false" class="mb-[16px]">
        <div class="bg-[var(--theme-white-bg)] flex justify-between items-center">

            <div class="flex items-center box-border">
                <span> {{ deviceDetialContext.deviceName }} </span>
                <span> 运行状态: </span>
                <Icon :icon="getDeviceStateInfo(deviceDetialContext?.deviceState!).icon" />
                <span :class="getDeviceStateInfo(deviceDetialContext?.deviceState!).color">{{
                    getDeviceStateInfo(deviceDetialContext?.deviceState!).text }}</span>
            </div>
            <LastTimeVue>{{ paserTime(appData.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }}</LastTimeVue>

        </div>
    </SubNavBar>
</template>
