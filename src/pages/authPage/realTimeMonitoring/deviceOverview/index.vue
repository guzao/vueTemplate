<script lang="ts" setup>
import { useDeviceOverview } from '../hooks/useDeviceOverview'

import DeviceList from './DeviceList.vue'
import Skeleton from '@/components/common/Skeleton.vue'
import SubNavBar from '@/components/common/SubNavBar.vue';
import ParkOverviewNavBar from '../components/ParkOverviewNavBar.vue';


const { appData, loading, getSubParkInfo, parkRuningInfo, deivceGroupList } = useDeviceOverview()

</script>

<template>

    <div v-watermark="appData.currentParkWatermarkOptions(parkRuningInfo.A_M2)" class="sub_park_overview" >

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <ParkOverviewNavBar  :park-runing-info="parkRuningInfo" v-loading="loading" class="mb-[16px]" />

        <Skeleton :rows="4" :loading="loading">
            <DeviceList :deivceGroupList="deivceGroupList" />
        </Skeleton>
        
    </div>

</template>