<script lang="ts" setup>
import { PropType } from 'vue';
import { Type } from '@/enum'
import { getDeviceStateInfo, toFixed } from "@/utils"
import { useDeviceDetail } from '../hooks/useDeviceDetail'

import Icon from '@/components/common/Icon.vue';
import StationBaseInfoCard from '@/components/common/StationBaseInfoCard.vue';
import CNXDevice from '../components/CNXDevice.vue';
import CNGDevice from '../components/CNGDevice.vue';

const { checkDeviceDetail } = useDeviceDetail()

defineProps({
    deiveList: {
        type: Array as PropType<DeviceItem[]>,
        default: []
    }
})

</script>

<template>
    <ul class="grid grid-cols-1 gap-[8px] more_device_list">

        <li @click="checkDeviceDetail(deivce)"
            class="h-[158px] bg-[var(--theme-gray251-bg)] pl-[12px] box-border cursor-pointer flex items-center"
            v-for="deivce in deiveList" :key="deivce.id">

            <div class="flex items-center h-[46px] items-center w-[140px]">
                <Icon :icon="deivce.unitType == Type.CONTAINER ? 'icon_cnx' : 'icon_cng'" :size="16" class="mr-[4px]" />
                <span class="text-[var(--theme-black51)]"> {{ deivce.name }} </span>
            </div>

            <StationBaseInfoCard class="flex-1" gapx="8"
            :info-card-bg="'#fff'"
            :show-sub-ino="false" 
            :data="{
                A_M2: deivce.deviceData.M2,
                A_M3: deivce.deviceData.M3,
                A_M5: deivce.deviceData.M5,
                A_M6: 1,
                A_M7: 1,
                A_M8: 1,
                A_M15: deivce.deviceData.M15,
                A_M16: deivce.deviceData.M16,
                A_M17: deivce.deviceData.M17,
                A_M18: deivce.deviceData.M18,
                A_M19: 1,
                A_M20: 1,
                type: '1',
                code: '1',
                typeLabel: '1',
            }"/>


            <div class="w-[300px] h-[148px] device_taizi_bg">

                <div class="relative h-[148px]"  v-if="deivce.unitType == Type.CONTAINER">

                    <CNXDevice class="absolute top-[55px] right-[80px]" style="transform: scale(2.5);" :deivce="deivce" />

                    <div class="flex items-center absolute bottom-[6px] left-[40%]">
                        <Icon :icon="getDeviceStateInfo(deivce.deviceData.M2).icon" :size="24" class="mr-[1px]" />
                        <span class="font-[600] f-dinb text-[24px]" :class="getDeviceStateInfo(deivce.deviceData.M2).color">
                            {{  toFixed(deivce.deviceData.M3, 1) }}% 
                        </span>
                    </div>

                </div>

                <div class="relative h-[148px]"  v-else>

                    <CNGDevice class="absolute top-[36px] right-[-136px] m-0"  style="transform: scale(2.1);" :deivce="deivce" />

                    <div class="flex items-center absolute bottom-[12px] left-[40%]">
                        <Icon :icon="getDeviceStateInfo(deivce.deviceData.M2).icon" :size="24" class="mr-[1px]" />
                        <span class="font-[600] f-dinb text-[24px]" :class="getDeviceStateInfo(deivce.deviceData.M2).color">
                            {{  toFixed(deivce.deviceData.M3, 1) }}% 
                        </span>
                    </div>

                </div>

            </div>

        </li>

    </ul>
</template>

<style lang="scss" scoped>
.more_device_list {
    .device_taizi_bg {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right bottom;
        background-image: url(../../../../assets/image/overview/less_device.bg.png);
    }
}
</style>

