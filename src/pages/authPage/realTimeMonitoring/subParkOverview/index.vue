<script lang="ts" setup>
import { useData } from './useData'
import SubNavBar from '@/components/common/SubNavBar.vue';
import SubParkCardList from './SubParkCardList.vue'
import ParkOverviewNavBar from '../components/ParkOverviewNavBar.vue';

const { appData, loading, getSubParkInfo, deivceGroupList, parkRuningInfo } = useData()

</script>

<template>

    <div v-watermark="{ markSatate: appData.currentRelease, text: 'xxxxx' }" class="sub_park_overview" v-loading="loading">

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <ParkOverviewNavBar :park-runing-info="parkRuningInfo" />

        <SubParkCardList :deivce-group-list="deivceGroupList" />

    </div>

</template>