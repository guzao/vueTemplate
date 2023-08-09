<script lang="ts" setup>
import { inject, computed } from 'vue'
import { useAppData } from '@/store'
import { deviceDetailContextKey } from '../useDevice'
import { getDeviceStateInfo, paserTime } from '@/utils'

import Icon from '@/components/common/Icon.vue';
import LastTimeVue from '@/components/common/LastTime.vue';

const appData = useAppData()

const deviceDetialContext = inject(deviceDetailContextKey)

const parkName = computed(() => appData.parkAuthList.find(item => item.serial == appData.currentParkSerial)?.name)


</script>

<template>
    <div class="h-[62px] bg-[var(--theme-white-bg)] mb-[16px] flex justify-between items-center">

        <div class="flex items-center px-[16px] box-border">
            <span> {{ parkName  + ' '}}  </span>
            <span> {{ deviceDetialContext?.deviceName }}  </span>
            <span> 运行状态: </span>
            <Icon :icon="getDeviceStateInfo(deviceDetialContext?.deviceState!).icon" />
            <span :class="getDeviceStateInfo(deviceDetialContext?.deviceState!).color">{{ getDeviceStateInfo(deviceDetialContext?.deviceState!).text }}</span>
        </div>
        <LastTimeVue>{{ paserTime(appData.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }}</LastTimeVue>

    </div>
</template>