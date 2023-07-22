<script setup lang="ts">
import { stationList } from '../useStationList'
</script>

<template>

    <div v-for="item in stationList" 
    v-watermark="{ markSatate: item.releaseStatus == '0', text: 'xxxxxxx', height: 150, }"
    :key="item.code" class="h-[280px] bg-[var(--theme-white-bg)] mb-[16px]">
        <div>{{ item.label }}</div>
    </div>

</template>