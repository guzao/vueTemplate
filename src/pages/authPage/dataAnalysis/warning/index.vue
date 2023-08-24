<script lang="ts" setup>
import { ref } from 'vue'
import { useDicts } from '@/store'

import DeviceType from './subPage/DeviceType.vue'
import WarningLevel from './subPage/WarningLevel.vue'
import TitleAndStationNavBar from '@/components/business/TitleAndStationNavBar.vue';

type ActiveTab = 'deviceUnit' | 'deviceType' | 'warning'

const dicts = useDicts()
// 提前获取字典数据
dicts.deviceTypeDict
dicts.warningLevelDict

const activeTab = ref<ActiveTab>('deviceUnit')

</script>

<template>
    <div class="w-full overflow-hidden" >

        <TitleAndStationNavBar />

        <el-tabs v-model="activeTab" class="mt-[16px]" >

            <el-tab-pane label="设备单元" name="deviceUnit">
                
            </el-tab-pane>

            <el-tab-pane label="设备类型" name="deviceType">
                <DeviceType v-if="activeTab == 'deviceType'" />
            </el-tab-pane>

            <el-tab-pane label="告警等级" name="warning">
                <WarningLevel v-if="activeTab == 'warning'" />
            </el-tab-pane>

        </el-tabs>
        
    </div>
</template>