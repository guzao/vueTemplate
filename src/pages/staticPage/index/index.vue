<script setup lang="ts">
import { t } from '@/langs'
import { IntervalTime } from '@/enum'
import { useInterval } from '@/hooks'
import { getArrayLength } from '@/utils'
import { useStationList, initData } from './useStationList'
import NavBar from './components/NavBar.vue'
import StationList from './components/StationList.vue'
import Skeleton from '@/components/common/Skeleton.vue'

const { loading, stationList, getResult } = useStationList()

initData()

useInterval(IntervalTime.FIVE_MINIUTE, getResult)

</script>

<template>
    <NavBar />

    <Skeleton :rows="5" :loading="loading">

        <StationList v-if="getArrayLength(stationList)" />

        <el-empty v-else :description="t('common.empty')" />

    </Skeleton>
</template>