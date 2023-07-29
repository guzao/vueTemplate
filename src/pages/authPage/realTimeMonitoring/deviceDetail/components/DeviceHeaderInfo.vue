<script lang="ts" setup>
import { ref } from 'vue'
import { useAppData } from '@/store'
import { getDeviceStateInfo, paserTime } from '@/utils'

import Icon from '@/components/common/Icon.vue';
import LastTimeVue from '@/components/common/LastTime.vue';

const appData = useAppData()

</script>

<template>
    <div class="h-[62px] bg-[var(--theme-white-bg)] mb-[16px] flex justify-between items-center">

        <div class="flex items-center px-[16px] box-border">
            <span> 当前状态: </span>
            <Icon :icon="getDeviceStateInfo(1).icon" />
            <span :class="getDeviceStateInfo(1).color">{{ getDeviceStateInfo(1).text }}</span>
        </div>
        <LastTimeVue>{{ paserTime(appData.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }}</LastTimeVue>

    </div>
</template>