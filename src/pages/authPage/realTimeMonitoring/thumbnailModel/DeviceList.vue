<script lang="ts" setup>
import { PropType } from 'vue';
import { useDeviceDetail } from '../hooks/useDeviceDetail'
import { getDeviceStateInfo, toFixed } from '@/utils'

import Icon from '@/components/common/Icon.vue';
import SubParkTitle from '../components/SubParkTitle.vue'
import CNXDevice from '../deviceOverview/components/CNXDevice.vue';
import CNGDevice from '../deviceOverview/components/CNGDevice.vue';

const { checkDeviceDetail } = useDeviceDetail()

defineProps({
    deivceGroupList: {
        type: Array as PropType<DeviceGroup[]>,
        default: []
    }
})

</script>

<template>
    <ul class="_device_list">

        <li class="px-[16px] py-[20px] mb-[16px] last:mb-0 bg-[var(--theme-white-bg)]" v-for="item in deivceGroupList"
            :key="item.id">

            <SubParkTitle :data="item" :device-state-count="item.stateCount" />

            <ul class="grid gap-[4px] " style=" grid-template-columns: repeat(18, minmax(0, 1fr));">

                <li class="h-[86px] bg-[var(--theme-gray251-bg)] cursor-pointer" @click="checkDeviceDetail(deivce)"
                    v-for="deivce in item.list" :key="item.id">
                    <div class="device_taizi_bg h-[86px]">

                        <div class="text-[var(--theme-black51)] text-[10px] text-center"> {{ deivce.name }} </div>

                        <CNXDevice class="mt-0" v-if="deivce.unitType == 'container'" :deivce="deivce" />

                        <CNGDevice class="mt-0 ml-[30px]" v-else :deivce="deivce" />

                        <div class="flex items-center justify-center">
                            <Icon :icon="getDeviceStateInfo(deivce.deviceData.M2).icon" :size="18" class="mr-[1px]" />
                            <span class="font-[600] f-dinb text-[15px]"
                                :class="getDeviceStateInfo(deivce.deviceData.M2).color"> {{
                                    toFixed(deivce.deviceData.M3, 1) }}% </span>
                        </div>


                    </div>
                </li>

            </ul>


        </li>

    </ul>
</template>

<style lang="scss" scoped>
._device_list {
    .device_taizi_bg {
        background-size: cover;
        background-position: bottom;
        background-image: url(../../../../assets/image/overview/small_device_taizi.png);
    }

}
</style>

