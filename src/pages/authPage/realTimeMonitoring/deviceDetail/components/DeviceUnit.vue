<script lang="ts" setup>
import { toFixed } from '@/utils'
import { useAppData } from '@/store'
import { getDeviceInfo } from '@/API'
import { useReactiveHttp } from '@/hooks'
import { PropType, watch, inject } from 'vue'
import { deviceDetailContextKey } from '../useDevice'

import Icon from '@/components/common/Icon.vue'
import LabelValueUnit from '@/components/common/LabelValueUnit.vue'

defineProps({
    storageUnit: {
        type: Array as PropType<StoreageUnit[]>,
        required: true,
        default: []
    }
})

const appData = useAppData()

const deviceDetailContext = inject(deviceDetailContextKey)

const { result, getResult, loading } = useReactiveHttp({
    initData: {} as any,
    request: () => getDeviceInfo({ stationSerial: appData.currentParkSerial, type: 'S', groupId: deviceDetailContext?.storageUnitId, unitId: deviceDetailContext?.unitId! }),
    requestCallback: ({ data }) => {
        return data.S
    },
    Immediately: false
})

const stop = watch(() => deviceDetailContext?.storageUnitId, () => {
    getResult()
    stop()
})


watch(() => deviceDetailContext?.unitId, getResult)

</script>

<template>
    <div class="bg-[var(--theme-white-bg)] mb-[16px] p-[20px] pt-[10px]" v-loading="loading">

        <el-tabs v-model="deviceDetailContext!.storageUnitId" class="demo-tabs" @tab-click="getResult">

            <el-tab-pane :label="unit.name" :name="unit.id" v-for="unit in storageUnit" :key="unit.id">

                <div class="h-[96px] bg-[var(--theme-gray251-bg)] mt-[6px] mb-[16px] flex items-center">

                    <div class="stack_bg flex items-center justify-end pr-2 box-border mr-[13px]">
                        <div> 电池堆 </div>
                    </div>

                    <ul class="flex h-[64px]">

                        <li class="border-l-[1px] border-[var(--theme-gray235-bg)] px-[45px]  box-border flex flex-col justify-evenly">

                            <LabelValueUnit :font-size="16">
                                电压
                                <template #value> {{ toFixed(result['S01.C2'], 3) }} </template>
                                <template #unit> V </template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                电压
                                <template #value> {{ toFixed(result['S01.C3'], 3) }} </template>
                                <template #unit> A </template>
                            </LabelValueUnit>

                        </li>

                        <li class="border-l-[1px] border-[var(--theme-gray235-bg)] px-[45px]  box-border flex flex-col justify-evenly">

                            <LabelValueUnit :font-size="16">
                                电池堆SOC
                                <template #value> {{ toFixed(result['S01.C27']) }} </template>
                                <template #unit> % </template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                电池堆SOC
                                <template #value> {{ toFixed(result['S01.C28']) }} </template>
                                <template #unit> % </template>
                            </LabelValueUnit>

                        </li>

                        <li class="border-l-[1px] border-[var(--theme-gray235-bg)] px-[45px]  box-border flex flex-col justify-evenly">

                            <LabelValueUnit :font-size="16">
                                最高单体电压
                                <template #value> {{ toFixed(result['S01.C6'], 3) }} </template>
                                <template #unit> % </template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                最低单体电压
                                <template #value> {{ toFixed(result['S01.C10'], 3) }} </template>
                                <template #unit> % </template>
                            </LabelValueUnit>

                        </li>

                        <li class="border-l-[1px] border-[var(--theme-gray235-bg)] px-[45px]  box-border flex flex-col justify-evenly">

                            <LabelValueUnit :font-size="16">
                                最高电池温度
                                <template #value> {{ toFixed(result['S01.C16'], 3) }} </template>
                                <template #unit> % </template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                最低电池温度
                                <template #value>  {{ toFixed(result['S01.C20'], 3) }} </template>
                                <template #unit> % </template>
                            </LabelValueUnit>

                        </li>

                        <li class="border-l-[1px] border-[var(--theme-gray235-bg)] px-[45px]  box-border flex flex-col justify-evenly">

                            <LabelValueUnit :font-size="16">
                                堆运行状态
                                <template #value> 100 </template>
                            </LabelValueUnit>

                        </li>

                    </ul>

                </div>
                <ul class="grid grid-cols-4 gap-[32px]">
                    <li class=" bg-[var(--theme-gray251-bg)]" v-for="(item, index) in result.B" :key="index">

                        <div class="h-[36px] flex justify-between items-center px-[15px] box-border"
                            style="background: linear-gradient(270deg, rgba(14,169,68,0) 0%, rgba(14,169,68,0.05) 100%);">
                            <div class="text-[var(--theme-black51)]"> 1#簇{{ index }} </div>
                        </div>

                        <ul class="h-[47px] flex items-center">

                            <li class="flex pl-[16px] box-border flex-1 items-center">
                                <Icon :size="24" icon="icon_dinaya_green" class="mr-[8px]" />
                                <div class="mr-[8px]"> 电压/ U </div>
                                <div> {{ toFixed(item.C2) }} V </div>
                            </li> 

                            <li class="flex  pl-[16px] box-border flex-1 items-center">
                                <Icon :size="24" icon="icon_dinaliu_green" class="mr-[8px]" />
                                <div class="mr-[8px]"> 电流/ I </div>
                                <div> {{ toFixed(item.C3) }} A </div>
                            </li>

                        </ul>

                        <div class="h-[1px] bg-[var(--theme-gray235-bg)] mx-[16px]"></div>

                        <ul class="flex my-[15px]">

                            <li class="flex-1 ml-[41px]">
                                <ul>

                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> SOC  </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium"> {{ toFixed(item.C21) }} % </div>
                                    </li>
                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> Umax </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium">  {{ toFixed(item.C6, 3) }} % </div>
                                    </li>
                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> Tmax </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium">  {{ toFixed(item.C12 ) }}  ℃  </div>
                                    </li>

                                </ul>
                            </li>


                            <li class="w-[1px] bg-[var(--theme-gray235-bg)]"></li>


                            <li class="flex-1 ml-[41px]">
                                <ul>

                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> SOH  </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium"> {{ toFixed(item.C22) }} % </div>
                                    </li>
                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> Umin </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium"> {{ toFixed(item.C9, 3) }} % </div>
                                    </li>
                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> Tmin </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium"> {{ toFixed(item.C19 ) }} ℃ </div>
                                    </li>

                                </ul>
                            </li>


                        </ul>


                    </li>
                </ul>

            </el-tab-pane>

        </el-tabs>

    </div>
</template>


<style lang="scss" scoped>
.stack_bg {
    width: 167px;
    height: 96px;
    background-size: cover;
    background-image: url(../../../../../assets/image/overview/statck_bg.png);
}
</style>