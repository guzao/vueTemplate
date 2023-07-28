<script lang="ts" setup>
import { useDeviceOverview } from '../hooks/useDeviceOverview'

import SubNavBar from '@/components/common/SubNavBar.vue';
import ParkOverviewNavBar from '../components/ParkOverviewNavBar.vue';
import DeviceList from './DeviceList.vue';

const { appData, getSubParkInfo, parkRuningInfo, deivceGroupList, loading } = useDeviceOverview()

</script>

<template>

    <div v-watermark="{ markSatate: appData.currentRelease, text: 'xxxxx' }" class="sub_park_overview" v-loading="loading">

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <ParkOverviewNavBar :park-runing-info="parkRuningInfo" class="mb-[16px]" />

        <DeviceList :deivce-group-list="deivceGroupList" />

    </div>
    
</template>
