<script lang="ts" setup>
import { ref } from 'vue'
import { paserTime } from '@/utils'
import { useAppData } from '@/store'

import NavBar from '@/components/common/SubNavBar.vue';
import SubTitle from '@/components/common/SubTitle.vue';
import LastTime from '@/components/common/LastTime.vue';
import DailyReport from './subPages/DailyReport.vue'
import Historyeport from './subPages/HistoryReport.vue'

const appdate = useAppData()

const activeTab = ref('day')

const handleClick = () => {}
</script>


<template>
    <div class="w-full overflow-hidden ">

        <SubTitle />
    
        <NavBar class="mb-[16px]" :show-view-model-select="false" :show-device-state-desc="false">
            <div class="flex justify-end">
                <LastTime> {{ paserTime(appdate.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }} </LastTime>
            </div>
        </NavBar>
    
        <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="日报表" name="day">
                <DailyReport />
            </el-tab-pane>
            <el-tab-pane label="历史报表" name="history">
                <Historyeport v-if="activeTab == 'history'" />
            </el-tab-pane>
        </el-tabs>

    </div>
</template>