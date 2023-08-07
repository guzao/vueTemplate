<script setup lang="ts">
import { useInterval } from '@/hooks'
import { getArrayLength } from '@/utils'
import { useStationList, initData } from './useStationList'
import NavBar from './components/NavBar.vue'
import StationList from './components/StationList.vue'
const { loading, stationList, getResult } = useStationList()

initData()

useInterval(1000 * 60 * 5, getResult)

</script>

<template>
    
    <div v-loading="loading">

        <NavBar />

        <StationList v-if="getArrayLength(stationList)" />

        <el-empty v-else description="暂无数据" />

    </div>

</template>