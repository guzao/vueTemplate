<script lang="ts" setup>
import { getDeviceCNXBatteryMarkInfo, getCNXBatteryCellBg } from '@/utils';
import { PropType } from 'vue';

defineProps({
    deivce: {
        type: Object as PropType<DeviceItem>,
        default: []
    }
})

</script>

<template>
    <div class="h-[38px] w-[58px] ml-[16px] mt-[4px] " :class="getDeviceCNXBatteryMarkInfo(deivce.deviceData.M2)">

        <ul class="relative absolute top-[8px] left-[2px]">
            <li class="h-[17px] w-[11px] absolute" :style="`top:${index * 1}px;left: ${index * 4}px`"
                :class="item" v-for="(item, index) in getCNXBatteryCellBg(deivce.deviceData.M3, deivce.deviceData.M2)"
                :key="index">
            </li>
        </ul>

    </div>
</template>