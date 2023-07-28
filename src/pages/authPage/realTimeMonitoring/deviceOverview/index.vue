<script lang="ts" setup>
import { useDeviceOverview } from '../hooks/useDeviceOverview'

import DeviceList from './DeviceList.vue'
import SubNavBar from '@/components/common/SubNavBar.vue';
import ParkOverviewNavBar from '../components/ParkOverviewNavBar.vue';


const { appData, loading, getSubParkInfo, parkRuningInfo, deivceGroupList } = useDeviceOverview()

</script>

<template>
    <div v-watermark="{ markSatate: appData.currentRelease, text: 'xxxxx' }" class="sub_park_overview" v-loading="loading">

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <ParkOverviewNavBar :park-runing-info="parkRuningInfo" class="mb-[16px]" />

        <DeviceList :deivceGroupList="deivceGroupList" />
        
    </div>
</template>