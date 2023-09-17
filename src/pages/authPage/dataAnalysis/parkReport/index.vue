<script lang="ts" setup>
import ParkChart from './components/ParkChart.vue'
import Statistical from './components/Statistical.vue'
import TitleAndStationNavBar from '@/components/business/TitleAndStationNavBar.vue'

</script>


<template>


    <TitleAndStationNavBar />

    <!-- 运行指标统计 -->
    <Statistical />

    <!-- 图表 -->
    <ParkChart />

</template>