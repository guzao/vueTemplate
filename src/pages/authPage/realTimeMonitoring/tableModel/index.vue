<script lang="ts" setup>
import { getMaxElement, getArrayLength } from '@/utils'
import { useDeviceOverview } from '../hooks/useDeviceOverview'

import DeviceList from './DeviceList.vue';
import Skeleton from '@/components/common/Skeleton.vue'
import SubNavBar from '@/components/common/SubNavBar.vue';
import ParkOverviewNavBar from '../components/ParkOverviewNavBar.vue';

const { appData, getSubParkInfo, parkRuningInfo, deivceGroupList, loading, dicts } = useDeviceOverview(markDevice)

const deviceMarkInfo = (list: DeviceItem[], key: keyof DeviceItem['deviceData']) => getMaxElement(list, (maxEl, cur) => maxEl.deviceData[key] < cur.deviceData[key])

function markDevice ({ list }: DeviceGroup) {
    if (getArrayLength(list) <= 1) return
    deviceMarkInfo(list, 'M15').maxDayCharge = true
    deviceMarkInfo(list, 'M16').maxDayDisCharge = true
    deviceMarkInfo(list, 'M19').maxYearCharge = true
    deviceMarkInfo(list, 'M20').maxYearDisCharge = true
    deviceMarkInfo(list, 'M5').maxAccCharge = true
    deviceMarkInfo(list, 'M6').maxAccDisCharge = true
}

</script>

<template>
    <div v-watermark="{ markSatate: appData.currentRelease, text: dicts.parkReleaseStatusDict.dictLabel[ appData.currentRelease ] }" 
    class="sub_park_overview w-full overflow-hidden" >

        <SubNavBar class="mb-[16px]" @park-change="getSubParkInfo" />

        <ParkOverviewNavBar :park-runing-info="parkRuningInfo" class="mb-[16px]" v-loading="loading" />

        <Skeleton :rows="4" :loading="loading">
            <DeviceList :deivce-group-list="deivceGroupList" />
        </Skeleton>

    </div>
</template>