<script lang="ts" setup>
import { PropType } from 'vue';
import { getArrayLength, isTrue } from '@/utils'

import MoreDeviceList from './MoreDeviceList.vue';
import LessDeviceList from './LessDeviceList.vue';
import SubParkTitle from '../components/SubParkTitle.vue'


defineProps({
    deivceGroupList: {
        type: Array as PropType<DeviceGroup[]>,
        default: []
    }
})

</script>

<template>
    <ul class="device_list">

        <li class="px-[16px] py-[20px] mb-[16px] last:mb-0 bg-[var(--theme-white-bg)]" v-for="item in deivceGroupList"
            :key="item.id">

            <SubParkTitle :data="item" :device-state-count="item.stateCount" />

            <LessDeviceList v-if="isTrue(getArrayLength(item.list) <= 3)" :deive-list="item.list" />

            <MoreDeviceList v-else :deive-list="item.list" />
   
        </li>

    </ul>
</template>


