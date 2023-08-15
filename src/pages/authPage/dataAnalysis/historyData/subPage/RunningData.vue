<script lang="ts" setup>

import { useRunningData } from '../hooks/useRunningData'

import TitleBox from '@/components/common/TitleBox.vue'

const {
    appData
} = useRunningData()


</script>

<template>
    <div class="w-full overflow-hidden  p-[24px] bg-[var(--theme-white-bg)]">

        <TitleBox :size="18"> 设备运行数据 </TitleBox>

    </div>
</template>