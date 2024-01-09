<script lang="ts" setup>
import { useData } from './useData'
import { isTrue, getArrayLength } from '@/utils'

import SubParkCardList from './SubParkCardList.vue'
import LessSubParkCard from './LessSubParkCard.vue';
import Skeleton from '@/components/common/Skeleton.vue'
import SubNavBar from '@/components/common/SubNavBar.vue';
import ParkOverviewNavBar from '../components/ParkOverviewNavBar.vue';


const { appData, loading, getSubParkInfo, deivceGroupList, parkRuningInfo } = useData()


getSubParkInfo()

</script>

<template>
    
    <div v-watermark="appData.currentParkWatermarkOptions(parkRuningInfo.A_M2)" class="sub_park_overview flex flex-col flex-1" >

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <ParkOverviewNavBar :park-runing-info="parkRuningInfo" />

        <Skeleton :rows="4" :loading="loading" >

            <LessSubParkCard v-if="isTrue( getArrayLength(deivceGroupList) == 1 )" :deivce-group-list="deivceGroupList" />

            <SubParkCardList v-else :deivce-group-list="deivceGroupList" />

        </Skeleton>

    </div>

</template>