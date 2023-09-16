<script lang="ts" setup>
import { watch } from 'vue'
import { useAppData } from '@/store'
import { getStationInfo } from '@/API'
import { useReactiveHttp, useReactiveHttp_ } from '@/hooks'

import InfoItem from './InfoItem.vue'

import TitleBox from '@/components/common/TitleBox.vue'

const appData = useAppData()

const { result: parkOverview, getResult: getParkOverview, loading } = useReactiveHttp({
    initData: {} as ParkRuningInfo,
    request: () => getStationInfo({ stationSerial: appData.parkSerial, type: 'DC' }),
    requestCallback: (res) => {
        parkOverview.value = res.data
        return res.data
    },
})

const [PCSData, getPcsData, PCSLoading] = useReactiveHttp_({
    initData: {} as ParkRuningInfo,
    request: () => getStationInfo({ stationSerial: appData.parkSerial, type: 'AC' }),
    requestCallback: (res) => {
        parkOverview.value = res.data
        return res.data
    },
})

watch(() => appData.currentParkSerial, () => {
    getPcsData()
    getParkOverview()
    console.log(PCSData);
})

</script>


<template>
    <div class="bg-[var(--theme-white-bg)] p-[24px] mb-[16px]" >

        <TitleBox :size="20"> 电站运行指标统计 </TitleBox>

        <InfoItem :data="parkOverview" v-loading="loading"> 直流侧 </InfoItem>

        <div class="flex justify-end">
            <div class="mt-[36px] border-b border-[#ebf2f0] border-solid w-[92%]"></div>
        </div>
        
        <InfoItem :data="PCSData" v-loading="PCSLoading"> 交流侧 </InfoItem>
        
    </div>
</template>