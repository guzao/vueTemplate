<script lang="ts" setup>
import { PropType, ref } from 'vue';
import { usePowerLine } from '../../hooks/usePowerLine'
import { conversionUnitKWh, toFixed, conversionUnitKVar, conversionUnitKW } from '@/utils'

import TitleBoxVue from '@/components/common/TitleBox.vue';

defineProps({
    /** 设备基本信息 */
    deviceBaseInfo: {
        type: Object as PropType<DeviceMap>,
        default: () => {
            return {}
        }
    }
})

const activeName = ref('powerLine')

const { chartRef } = usePowerLine({ height: 180, device: 'device' })

</script>

<template>
    <div class="flex mb-[16px] base_info">

        <div class="h-[516px] w-[700px] bg-[var(--theme-white-bg)] mr-[16px]"></div>

        <div class="flex-1">

            <div class="h-[250px] bg-[var(--theme-white-bg)] mb-[16px] p-[20px] pb-[0] box-border">

                <TitleBoxVue> 常用信息 </TitleBoxVue>

                <ul class="grid grid-cols-3 gap-y-[20px] mt-[10px]">

                    <li class="h-[40px]">
                        <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] w-[168px] flex justify-between items-center text_bg_img px-[4px] box-border">
                            <span class="text-[var(--theme-gray107)]"> 日充 </span>
                            <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> {{
                                conversionUnitKWh(deviceBaseInfo.M15).size }} {{ conversionUnitKWh(deviceBaseInfo.M15).unit
    }} </span>
                        </div>
                    </li>

                    <li class="h-[40px]">
                        <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] w-[168px] flex justify-between items-center text_bg_img px-[4px] box-border">
                            <span class="text-[var(--theme-gray107)]"> 月充 </span>
                            <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> {{
                                conversionUnitKWh(deviceBaseInfo.M17).size }} {{ conversionUnitKWh(deviceBaseInfo.M17).unit
    }} </span>
                        </div>
                    </li>

                    <li class="h-[40px]">
                        <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] w-[168px] flex justify-between items-center text_bg_img px-[4px] box-border">
                            <span class="text-[var(--theme-gray107)]"> 年充 </span>
                            <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> {{
                                conversionUnitKWh(deviceBaseInfo.M19).size }} {{ conversionUnitKWh(deviceBaseInfo.M19).unit
    }} </span>
                        </div>
                    </li>

                    <li class="h-[40px]">
                        <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] w-[168px] flex justify-between items-center text_bg_img px-[4px] box-border">
                            <span class="text-[var(--theme-gray107)]"> 日充 </span>
                            <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> {{
                                conversionUnitKWh(deviceBaseInfo.M16).size }} {{ conversionUnitKWh(deviceBaseInfo.M16).unit
    }} </span>
                        </div>
                    </li>

                    <li class="h-[40px]">
                        <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] w-[168px] flex justify-between items-center text_bg_img px-[4px] box-border">
                            <span class="text-[var(--theme-gray107)]"> 月充 </span>
                            <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> {{
                                conversionUnitKWh(deviceBaseInfo.M18).size }} {{ conversionUnitKWh(deviceBaseInfo.M18).unit
    }} </span>
                        </div>
                    </li>

                    <li class="h-[40px]">
                        <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] w-[168px] flex justify-between items-center text_bg_img px-[4px] box-border">
                            <span class="text-[var(--theme-gray107)]"> 年充 </span>
                            <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> {{
                                conversionUnitKWh(deviceBaseInfo.M20).size }} {{ conversionUnitKWh(deviceBaseInfo.M20).unit
    }} </span>
                        </div>
                    </li>

                    <li class="h-[40px]">
                        <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] w-[168px] flex justify-between items-center text_bg_img px-[4px] box-border">
                            <span class="text-[var(--theme-gray107)]"> SOC </span>
                            <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> {{
                                toFixed(deviceBaseInfo.M3) }} %</span>
                        </div>
                    </li>

                    <li class="h-[40px]">
                        <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] w-[168px] flex justify-between items-center text_bg_img px-[4px] box-border">
                            <span class="text-[var(--theme-gray107)]"> 有功 </span>
                            <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> {{
                                conversionUnitKW(deviceBaseInfo.M7).size }} {{ conversionUnitKW(deviceBaseInfo.M7).unit }}
                            </span>
                        </div>
                    </li>

                    <li class="h-[40px]">
                        <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] w-[168px] flex justify-between items-center text_bg_img px-[4px] box-border">
                            <span class="text-[var(--theme-gray107)]"> 无功 </span>
                            <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> {{
                                conversionUnitKVar(deviceBaseInfo.M8).size }}
                                {{ conversionUnitKVar(deviceBaseInfo.M8).unit }} </span>
                        </div>
                    </li>


                </ul>

            </div>

            <div class="h-[250px] bg-[var(--theme-white-bg)] p-[20px] py-[5px] box-border">

                <el-tabs v-model="activeName" class="demo-tabs" @tab-click="() => { }">

                    <el-tab-pane label="实时功率" name="powerLine">
                        <!-- 功率曲线 -->
                        <div ref="chartRef"></div>
                    </el-tab-pane>

                    <el-tab-pane label="实时告警" name="alarms">
                    </el-tab-pane>

                </el-tabs>

            </div>


        </div>

    </div>
</template>


<style lang="scss" scoped>
.base_info {
    .split_bg {
        background-image: url(../../../../../assets/icons/common/split_green.svg);
    }

    .text_bg_img {
        background: linear-gradient(270deg, rgba(14, 169, 68, 0) 0%, rgba(14, 169, 68, 0.19) 100%);
    }

}
</style>