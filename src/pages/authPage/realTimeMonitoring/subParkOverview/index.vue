<script lang="ts" setup>
import { useData } from './useData'
import { isTrue, getArrayLength } from '@/utils'

import SubParkCardList from './SubParkCardList.vue'
import LessSubParkCard from './LessSubParkCard.vue';
import SubNavBar from '@/components/common/SubNavBar.vue';
import ParkOverviewNavBar from '../components/ParkOverviewNavBar.vue';


const { appData, loading, getSubParkInfo, deivceGroupList, parkRuningInfo, dicts } = useData()


getSubParkInfo()

</script>

<template>

    <!-- <div v-watermark="{ markSatate: appData.currentRelease, text: dicts.parkReleaseStatusDict.dictLabel[ appData.currentRelease ] }" class="sub_park_overview" v-loading="loading">

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <ParkOverviewNavBar :park-runing-info="parkRuningInfo" />

        <LessSubParkCard v-if="isTrue( getArrayLength(deivceGroupList) == 1 )" :deivce-group-list="deivceGroupList" />

        <SubParkCardList v-else :deivce-group-list="deivceGroupList" />

    </div> -->

    
    <div v-watermark="{ markSatate: appData.currentRelease, text: dicts.parkReleaseStatusDict.dictLabel[ appData.currentRelease ] }" class="sub_park_overview" >

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <ParkOverviewNavBar :park-runing-info="parkRuningInfo" />

        <el-skeleton :rows="6"  :loading="loading" animated>

            <LessSubParkCard v-if="isTrue( getArrayLength(deivceGroupList) == 1 )" :deivce-group-list="deivceGroupList" />

            <SubParkCardList v-else :deivce-group-list="deivceGroupList" />

        </el-skeleton>

    </div>

</template>