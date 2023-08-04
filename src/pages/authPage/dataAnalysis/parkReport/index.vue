<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAppData } from '@/store'
import { paserTime } from '@/utils'

import ParkChart from './ParkChart.vue'
import Statistical from './Statistical.vue'
import NavBar from '@/components/common/SubNavBar.vue';
import SubTitle from '@/components/common/SubTitle.vue';
import LastTime from '@/components/common/LastTime.vue';

const appdate = useAppData()
const router = useRouter()

</script>


<template>


    <SubTitle />

    <NavBar class="mb-[16px]" :show-view-model-select="false" :show-device-state-desc="false">
        <div class="flex justify-end">
            <LastTime> {{ paserTime(appdate.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }} </LastTime>
        </div>
    </NavBar>

    <!-- 运行指标统计 -->
    <Statistical />

    <!-- 图表 -->
    <ParkChart />

</template>