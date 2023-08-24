<script lang="ts" setup>
import { ref } from 'vue'

import DailyReport from './subPages/DailyReport.vue'
import Historyeport from './subPages/HistoryReport.vue'
import TitleAndStationNavBar from '@/components/business/TitleAndStationNavBar.vue';

const activeTab = ref('day')

const handleClick = () => {}
</script>


<template>
    <div class="w-full overflow-hidden ">

        <TitleAndStationNavBar />
    
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