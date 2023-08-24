<script lang="ts" setup>
import { ref } from 'vue'

import RunningData from './subPage/RunningData.vue'
import TitleAndStationNavBar from '@/components/business/TitleAndStationNavBar.vue';

type ActiveTab = 'runningData' | 'deviceType' | 'warning'
const activeTab = ref<ActiveTab>('runningData')

</script>

<template>
    <div class="w-full overflow-hidden" >

        <TitleAndStationNavBar />

        <el-tabs v-model="activeTab" class="mt-[16px]" >

            <el-tab-pane label="运行数据" name="runningData">
                <RunningData />
            </el-tab-pane>

        </el-tabs>
        
    </div>
</template>