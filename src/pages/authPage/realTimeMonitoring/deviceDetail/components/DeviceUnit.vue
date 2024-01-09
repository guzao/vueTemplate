<script lang="ts" setup>
import { t } from '@/langs'
import { toFixed } from '@/utils'
import { useAppData } from '@/store'
import { IntervalTime } from '@/enum'
import { getDeviceInfo } from '@/API'
import { PropType, watch, inject } from 'vue'
import { deviceDetailContextKey } from '../useDevice'
import { useReactiveHttp, useInterval } from '@/hooks'

import PCSInfo from './PCSInfo.vue'
import DeviceState from './DeviceState.vue'
import Icon from '@/components/common/Icon.vue'
import { Refresh } from '@element-plus/icons-vue'
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

const { result, getResult, loading } = useData('S')

const { result: PcsInfo, getResult: getPcsInfo } = useData('P')

const { result: deviceState, getResult: getDeviceState } = useData('F')

function useData(type: string) {
    return useReactiveHttp({
        initData: {} as any,
        request: () => getDeviceInfo({ stationSerial: appData.currentParkSerial, type, groupId: deviceDetailContext?.storageUnitId, unitId: deviceDetailContext?.unitId! }),
        requestCallback: ({ data }) => data[type],
        Immediately: false
    })
}

const getData = () => {
    getResult()
    getPcsInfo()
    getDeviceState()
}

const stop = watch(() => deviceDetailContext?.storageUnitId, () => {
    getData()
    stop()
})

watch(() => deviceDetailContext?.unitId, getData)

useInterval(IntervalTime.FIVE_MINIUTE, getData)

</script>

<template>
    <DeviceState :device-state="deviceState" />

    <div class="bg-[var(--theme-white-bg)] mb-[16px] p-[20px] pt-[10px] relative" v-loading="loading">

        <el-button class="absolute right-[20px] z-[2]" type="primary" size="default" text :icon="Refresh"
            @click="getData">{{ t('common.refresh') }}</el-button>

        <el-tabs v-model="deviceDetailContext!.storageUnitId" class="demo-tabs" @tab-click="getData">

            <el-tab-pane :label="unit.name" :name="unit.id" v-for="unit in storageUnit" :key="unit.id">

                <div class="h-[96px] bg-[var(--theme-gray251-bg)] mt-[6px] mb-[16px] flex items-center">

                    <div class="stack_bg flex items-center justify-end pr-2 box-border mr-[13px]">
                        <div> {{ t("common.batteryStack") }} </div>
                    </div>

                    <ul class="flex h-[64px]">

                        <li
                            class="border-l-[1px] border-[var(--theme-gray235-bg)] px-[45px]  box-border flex flex-col justify-evenly">

                            <LabelValueUnit :font-size="16">
                                {{ t('common.voltage') }}
                                <template #value> {{ toFixed(result['S01.C2'], 3) }} </template>
                                <template #unit> V </template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                {{ t('common.current') }}
                                <template #value> {{ toFixed(result['S01.C3'], 3) }} </template>
                                <template #unit> A </template>
                            </LabelValueUnit>

                        </li>

                        <li
                            class="border-l-[1px] border-[var(--theme-gray235-bg)] px-[45px]  box-border flex flex-col justify-evenly">

                            <LabelValueUnit :font-size="16">
                                {{ t("common.batteryStack") }}SOC
                                <template #value> {{ toFixed(result['S01.C27']) }} </template>
                                <template #unit> % </template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                {{ t("common.batteryStack") }}SOH
                                <template #value> {{ toFixed(result['S01.C28']) }} </template>
                                <template #unit> % </template>
                            </LabelValueUnit>

                        </li>

                        <li
                            class="border-l-[1px] border-[var(--theme-gray235-bg)] px-[45px]  box-border flex flex-col justify-evenly">

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

                        <li
                            class="border-l-[1px] border-[var(--theme-gray235-bg)] px-[45px]  box-border flex flex-col justify-evenly">

                            <LabelValueUnit :font-size="16">
                                最高电池温度
                                <template #value> {{ toFixed(result['S01.C16']) }} </template>
                                <template #unit> % </template>
                            </LabelValueUnit>

                            <LabelValueUnit :font-size="16">
                                最低电池温度
                                <template #value> {{ toFixed(result['S01.C20']) }} </template>
                                <template #unit> % </template>
                            </LabelValueUnit>

                        </li>

                        <li
                            class="border-l-[1px] border-[var(--theme-gray235-bg)] px-[45px]  box-border flex flex-col justify-evenly">

                            <LabelValueUnit :font-size="16">
                                堆运行状态
                                <template #value> 100 </template>
                            </LabelValueUnit>

                        </li>

                    </ul>

                </div>
                <ul class="grid grid-cols-4 gap-[18px]">
                    <li class=" bg-[var(--theme-gray251-bg)]" v-for="(item, index) in result.B" :key="index">

                        <div class="h-[36px] flex justify-between items-center px-[15px] box-border"
                            style="background: linear-gradient(270deg, rgba(14,169,68,0) 0%, rgba(14,169,68,0.05) 100%);">
                            <div class="text-[var(--theme-black51)]"> {{ t('common.cluster') }}{{ index }} </div>
                        </div>

                        <ul class="h-[47px] flex items-center">

                            <li class="flex pl-[16px] box-border flex-1 items-center">
                                <Icon :size="24" icon="icon_dinaya_green" class="mr-[8px]" />
                                <div class="mr-[4px]"> {{ t('common.voltage') }}/ U </div>
                                <div> {{ toFixed(item.C2) }} V </div>
                            </li>

                            <li class="flex  pl-[16px] box-border flex-1 items-center">
                                <Icon :size="24" icon="icon_dinaliu_green" class="mr-[8px]" />
                                <div class="mr-[4px]"> {{ t('common.current') }}/ I </div>
                                <div> {{ toFixed(item.C3) }} A </div>
                            </li>

                        </ul>

                        <div class="h-[1px] bg-[var(--theme-gray235-bg)] mx-[16px]"></div>

                        <ul class="flex my-[15px]">

                            <li class="flex-1 ml-[41px]">
                                <ul>

                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> SOC </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium"> {{
                                            toFixed(item.C21) }} % </div>
                                    </li>
                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> Umax </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium"> {{
                                            toFixed(item.C6, 3) }} % </div>
                                    </li>
                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> Tmax </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium"> {{
                                            toFixed(item.C12) }} ℃ </div>
                                    </li>

                                </ul>
                            </li>


                            <li class="w-[1px] bg-[var(--theme-gray235-bg)]"></li>


                            <li class="flex-1 ml-[41px]">
                                <ul>

                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> SOH </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium"> {{
                                            toFixed(item.C22) }} % </div>
                                    </li>
                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> Umin </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium"> {{
                                            toFixed(item.C9, 3) }} % </div>
                                    </li>
                                    <li class="flex items-center mb-[8px]">
                                        <div class="mr-[15px] text-[12px] text-[var(--theme-gray153)]"> Tmin </div>
                                        <div class="text-[14px] text-[var(--theme-gray107)] f-dinb font-medium"> {{
                                            toFixed(item.C19) }} ℃ </div>
                                    </li>

                                </ul>
                            </li>


                        </ul>


                    </li>
                </ul>

            </el-tab-pane>

        </el-tabs>

    </div>

    <PCSInfo :pcs-info="PcsInfo" />
</template>


<style lang="scss" scoped>
.stack_bg {
    width: 167px;
    height: 96px;
    background-size: cover;
    background-image: url(../../../../../assets/image/overview/statck_bg.png);
}
</style>