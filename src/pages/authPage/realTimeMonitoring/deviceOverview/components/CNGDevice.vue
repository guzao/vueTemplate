<script lang="ts" setup>
import { getDeviceCNGBatteryMarkInfo, getCNGBatteryCellBg } from '@/utils';
import { PropType } from 'vue';

defineProps({
    deivce: {
        type: Object as PropType<DeviceItem>,
        default: []
    }
})

</script>

<template>
    <div class="h-[45px] w-[34px] ml-[22px] mt-[3px] relative" :class="getDeviceCNGBatteryMarkInfo(deivce.deviceData.M2)">

        <ul class=" absolute bottom-[14px] left-[2px]">
            <li class="h-[12px] w-[28px] absolute" :style="`top:-${index * 3}px;`"
                :class="item" v-for="(item, index) in getCNGBatteryCellBg(deivce.deviceData.M3, deivce.deviceData.M2)"
                :key="index">
            </li>
        </ul>

    </div>
</template>