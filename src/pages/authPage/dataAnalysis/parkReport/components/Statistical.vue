<script lang="ts" setup>
import { useStatical } from './useStatical'

import InfoItem from './InfoItem.vue'
import TitleBox from '@/components/common/TitleBox.vue'

const { parkOverview, loading, PCSData, PCSLoading } = useStatical()

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