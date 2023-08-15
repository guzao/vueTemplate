<script lang="ts" setup>
import { ref } from 'vue'
import { paserTime } from '@/utils'
import { useAppData } from '@/store'

import RunningData from './subPage/RunningData.vue'
import SubTitle from '@/components/common/SubTitle.vue'
import LastTime from '@/components/common/LastTime.vue'
import SubNavBar from '@/components/common/SubNavBar.vue'

const appdate = useAppData()

type ActiveTab = 'runningData' | 'deviceType' | 'warning'
const activeTab = ref<ActiveTab>('runningData')

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

            <el-tab-pane label="运行数据" name="runningData">
                <RunningData />
            </el-tab-pane>

        </el-tabs>
        
    </div>
</template>