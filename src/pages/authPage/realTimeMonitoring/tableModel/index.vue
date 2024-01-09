<script lang="ts" setup>
import { useTableModel } from './useTableModel'

import DeviceList from './DeviceList.vue';
import Skeleton from '@/components/common/Skeleton.vue'
import SubNavBar from '@/components/common/SubNavBar.vue';
import ParkOverviewNavBar from '../components/ParkOverviewNavBar.vue';

const {  appData, getSubParkInfo, parkRuningInfo, deivceGroupList, loading  } = useTableModel()

</script>

<template>
    <div v-watermark="appData.currentParkWatermarkOptions(parkRuningInfo.A_M2)" 
    class="sub_park_overview w-full overflow-hidden" >

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <ParkOverviewNavBar :park-runing-info="parkRuningInfo" class="mb-[16px]" v-loading="loading" />

        <Skeleton :rows="4" :loading="loading">
            <DeviceList :deivce-group-list="deivceGroupList" />
        </Skeleton>

    </div>
</template>