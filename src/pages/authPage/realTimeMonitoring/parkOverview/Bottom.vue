<script lang="ts" setup>
import { onMounted } from 'vue'
import { useEcharts } from './useParkOverview'
import TitleBox from '@/components/common/TitleBox.vue';

const { renderChart, chartRef } = useEcharts({})

</script>

<template>

    <TitleBox class="my-[10px] ">
        全站实时充放电功率曲线
    </TitleBox>

    <div ref="chartRef" class="h-[206px]"> </div>

</template>

<style lang="scss" scoped>
</style>