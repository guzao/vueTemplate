<script lang="ts" setup>
import { ref } from 'vue'
import { paserTime } from '@/utils'
import { useAppData, useDicts } from '@/store'

import DeviceType from './subPage/DeviceType.vue'
import WarningLevel from './subPage/WarningLevel.vue'
import SubTitle from '@/components/common/SubTitle.vue'
import LastTime from '@/components/common/LastTime.vue'
import SubNavBar from '@/components/common/SubNavBar.vue'

type ActiveTab = 'deviceUnit' | 'deviceType' | 'warning'

const dicts = useDicts()
const appdate = useAppData()
// 提前获取字典数据
dicts.deviceTypeDict
dicts.warningLevelDict

const activeTab = ref<ActiveTab>('deviceUnit')

</script>

<template>
    <div class="w-full overflow-hidden" >

        <SubTitle />

        <SubNavBar :show-view-model-select="false" :show-device-state-desc="false">
            <div class="flex justify-end">
                <LastTime> {{ paserTime(appdate.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }} </LastTime>
            </div>
        </SubNavBar>


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