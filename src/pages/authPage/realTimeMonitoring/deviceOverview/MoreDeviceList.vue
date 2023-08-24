<script lang="ts" setup>
import { t } from '@/langs'
import { Type } from '@/enum'
import { PropType } from 'vue';
import { useDeviceDetail } from '../hooks/useDeviceDetail'
import { conversionUnitKWh, toFixed, getDeviceStateInfo } from '@/utils';

import Icon from '@/components/common/Icon.vue';
import CNXDevice from './components/CNXDevice.vue';
import CNGDevice from './components/CNGDevice.vue';

const { checkDeviceDetail } = useDeviceDetail()

defineProps({
    deiveList: {
        type: Array as PropType<DeviceItem[]>,
        default: []
    }
})

</script>

<template>
    <ul class=" grid grid-cols-8  gap-[8px] more_device_list">

        <li @click="checkDeviceDetail(deivce)"
            class="h-[131px] bg-[var(--theme-gray251-bg)] pl-[12px] box-border cursor-pointer" v-for="deivce in deiveList"
            :key="deivce.id">

            <div class="flex items-center h-[46px] items-center">
                <Icon :icon="deivce.unitType == Type.CONTAINER ? 'icon_cnx' : 'icon_cng'" :size="16" class="mr-[4px]" />
                <span class="text-[var(--theme-black51)]"> {{ deivce.name }} </span>
            </div>

            <div class="h-[1px] bg-[var(--theme-gray235-bg)] mr-[12px]"></div>

            <div class="flex h-[83px]">

                <div class="flex-1 h-full flex flex-col justify-evenly">

                    <div class="flex items-center">
                        <div class="text-[var(--theme-gray107)] text-[12px] mr-[2px]"> {{ t('common.dayCharge') }} </div>
                        <div class="text-[var(--theme-black51)] mr-[2px] f-dinp">
                            {{ conversionUnitKWh(deivce.deviceData.M15, 1).size }}
                        </div>
                        <div class="text-[var(--theme-gray153)] text-[12px]">
                            {{ conversionUnitKWh(deivce.deviceData.M15).unit }}
                        </div>
                    </div>

                    <div class="flex items-center">
                        <div class="text-[var(--theme-gray107)] text-[12px] mr-[2px]">{{ t('common.dayDischarge') }} </div>
                        <div class="text-[var(--theme-black51)] mr-[2px] f-dinp">
                            {{ conversionUnitKWh(deivce.deviceData.M16, 1).size }}
                        </div>
                        <div class="text-[var(--theme-gray153)] text-[12px]">
                            {{ conversionUnitKWh(deivce.deviceData.M16).unit }}
                        </div>
                    </div>

                </div>

                <div class="w-[80px]  device_taizi_bg">

                    <CNXDevice v-if="deivce.unitType == Type.CONTAINER" :deivce="deivce" />

                    <CNGDevice v-else :deivce="deivce" />

                    <div class="flex items-center">
                        <Icon :icon="getDeviceStateInfo(deivce.deviceData.M2).icon" :size="18" class="mr-[1px]" />
                        <span class="font-[600] f-dinb text-[15px]" :class="getDeviceStateInfo(deivce.deviceData.M2).color">
                            {{ toFixed(deivce.deviceData.M3, 1) }}%
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
        background-image: url(../../../../assets/image/overview/deivce_taizi_bg.png);
    }
}
</style>

