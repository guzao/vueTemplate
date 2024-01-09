<script lang="ts" setup>
import IncomeParkChart from './components/IncomeParkChart.vue'
import IncomeStatistical from './components/IncomeStatistical.vue'
import TitleAndStationNavBar from '@/components/business/TitleAndStationNavBar.vue'
</script>


<template>
    <div class="w-full overflow-hidden ">

        <TitleAndStationNavBar />

        <IncomeStatistical />

        <IncomeParkChart />

    </div>
</template>