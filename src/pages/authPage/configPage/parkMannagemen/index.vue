<script lang="ts" setup>
import { useAppData, useUser, useDicts } from '@/store'
import { useRouter, useRoute } from 'vue-router'

const dicts = useDicts()
const route = useRoute()
const router = useRouter()
const userData = useUser()
const appData = useAppData()

const routerPush = (path: string) => {
    const query = route.query
    router.push({ path, query: { ...query, stationCode: appData.currentParkSerial } })
}

import SubTitle from '@/components/common/SubTitle.vue'
import TitleBox from '@/components/common/TitleBox.vue';
import LabelValueUnit from '@/components/common/LabelValueUnit.vue';
</script>

<template>
    <SubTitle />

    <div class="bg-[var(--theme-white-bg)] px-[20px] py-[30px] box-border mb-[16px]">

        <TitleBox class="mb-[26px]" :size="18"> 场站信息统计 </TitleBox>

        <ul class="grid grid-cols-6">
            <li class="flex flex-col items-center " 
            style="border-right: 1px solid #ebf2f0;" 
            v-for="item in 6" :key="item">
                <div class="text-[15px] mb-[8px]"> 电站总数 </div>
                <div class="text-[28px] font-medium f-dinb"> 10 </div>
            </li>
        </ul>

    </div>

    <div class="bg-[var(--theme-white-bg)] px-[20px] py-[30px]">

        <TitleBox class="mb-[26px]" :size="18"> 
            电站列表 
            <template #right>
                <el-button  size="default" type="success"> 添加电站 </el-button>
            </template>
        </TitleBox>

        <ul class="grid grid-cols-4 gap-[32px]">
            <li class="bg-[var(--theme-gray251-bg)] "
             v-for="item in 10" :key="item">

                <div class="h-[36px] flex justify-between items-center px-[15px] box-border"
                    style="background: linear-gradient(270deg, rgba(14,169,68,0) 0%, rgba(14,169,68,0.05) 100%);">
                    <div class="text-[var(--theme-black51)]"> {{  item  }}电站 </div>
                </div>

                <div class="px-[15px] py-[6px]">

                    <LabelValueUnit class="my-[5px]" :font-size="15">
                        场站状态
                        <template #value> 待机 </template>
                    </LabelValueUnit>
                    
                    <LabelValueUnit class="my-[5px]" :font-size="15">
                        场站状态
                        <template #value> 待机 </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="my-[5px]" :font-size="15">
                        运行状态
                        <template #value> 待机 </template>
                    </LabelValueUnit>
                    
                    <LabelValueUnit class="my-[5px]" :font-size="15">
                        发布状态
                        <template #value> 待机 </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="my-[5px]" :font-size="15">
                        电站功率
                        <template #value> 待机 </template>
                    </LabelValueUnit>

                    <LabelValueUnit class="my-[5px]" :font-size="15">
                        电站容量
                        <template #value> 待机 </template>
                    </LabelValueUnit>
                    
                </div>

            </li>
        </ul>
   
    </div>

</template>