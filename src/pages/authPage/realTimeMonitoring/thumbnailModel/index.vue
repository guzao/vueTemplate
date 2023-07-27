<script lang="ts" setup>
import { useDeviceOverview } from '../hooks/useDeviceOverview'
import SubNavBar from '@/components/common/SubNavBar.vue';
import SubParkTitle from '../components/SubParkTitle.vue'
import ParkOverviewNavBar from '../components/ParkOverviewNavBar.vue';


const { appData, getSubParkInfo, parkRuningInfo, deivceGroupList, loading } = useDeviceOverview()

</script>

<template>
    <div v-watermark="{ markSatate: appData.currentRelease, text: 'xxxxx' }" class="sub_park_overview" v-loading="loading">

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <ParkOverviewNavBar :park-runing-info="parkRuningInfo" class="mb-[16px]" />

        <ul>

            <li class="px-[16px] py-[20px] mb-[16px] last:mb-0 bg-[var(--theme-white-bg)]" v-for="item in deivceGroupList"
                :key="item.id">

                <SubParkTitle :data="item" />

                <ul class="grid grid-cols-8 gap-[8px]">

                    <li class="h-[131px] bg-[var(--theme-gray251-bg)]" v-for="deivce in item.list" :key="item.id">

                    </li>

                </ul>


            </li>

        </ul>

    </div>
</template>