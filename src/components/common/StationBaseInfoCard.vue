<script lang="ts" setup>
import { t } from '@/langs'
import { PropType } from 'vue'
import { useAppData, useDicts } from '@/store'
import Icon from '@/components/common/Icon.vue'
import { conversionUnitKWh, toFixed, conversionUnitKW, conversionUnitKVar, parserTime, getRuningStateInfo, getEfficiency } from '@/utils'

const appData = useAppData()
const dicts = useDicts()

defineProps({
    /** 电站运行信息 */
    data: {
        type: Object as PropType<ParkMonitorInfo | ParkRuningInfo>,
        default: () => { },
        require: true,
    },
    /** 左侧点的电站信息margin-top 属性 */
    subInfoTop: {
        type: Number,
        default: () => 15,
    },
    /** 是否显示左侧点的电站信息 */
    showSubIno: {
        type: Boolean,
        default: () => true,
    },
    /** 卡片的背景色 并抹去卡片的border */
    infoCardBg: {
        type: String,
        default: () => '',
    },

})
</script>

<template>
    <div class="flex">

        <div class="w-[296px]" v-if="showSubIno">
            <ul class="w-full" :style="`margin-top: ${subInfoTop}px;`">

                <li class="flex items-center mb-2">
                    <div class="h-[7px] w-[7px] bg-[var(--theme-green-bg)] rounded-full mr-[6px]"></div>
                    <div class="text-[var(--theme-gray107)] mr-[6px]"> {{ t('common.efficiency') }} </div>
                    <div class="text-[var(--theme-black51)] mr-[4px]"> {{ getEfficiency(data?.A_M5, data?.A_M6) }} % </div>
                </li>

                <li class="flex items-center mb-2">
                    <div class="h-[7px] w-[7px] bg-[var(--theme-green-bg)] rounded-full mr-[6px]"></div>
                    <div class="text-[var(--theme-gray107)] mr-[6px]"> {{ t('common.parkType') }} </div>
                    <div class="text-[var(--theme-black51)] mr-[4px]"> {{ dicts.parkTypeDict.dictLabel[data.type] }}
                    </div>
                </li>

                <li class="flex items-center mb-2">
                    <div class="h-[7px] w-[7px] bg-[var(--theme-green-bg)] rounded-full mr-[6px]"></div>
                    <div class="text-[var(--theme-gray107)] mr-[6px]"> {{ t('common.dataLastTime') }} </div>
                    <div class="text-[var(--theme-gray107)] mr-[4px] font-medium f-dinb"> {{
                        parserTime(appData.parkLastTimes[data?.code], 'YYYY-MM-DD HH:mm:ss') }} </div>
                </li>

            </ul>
        </div>

        <div class="flex-1">
            <ul :class="$attrs.gapx ? `gap-x-[${$attrs.gapx}px]` : ''" class="grid grid-cols-6 gap-x-[16px]">

                <li :style="`${infoCardBg ? `background-color: ${infoCardBg}; border: none;` : ''}`"
                    class="bg-[var(--theme-gray-bg)] h-[100px] border-[1px] border-cool-[rgba(206,248,221,0.42)] pl-[12px] pt-[10px] relative">

                    <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> {{ t('common.operationState') }} </div>

                    <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                    <div class="flex mt-[10px] items-center">
                        <Icon :icon="getRuningStateInfo(data.A_M2).icon" :size="48" class="mr-[4px]" />
                        <div class="text-[14px] text-[var(--theme-black51)] mr-[4px] f-dinb font-semibold"
                            :class="getRuningStateInfo(data.A_M2).color"> {{ getRuningStateInfo(data?.A_M2).text }} </div>
                    </div>

                </li>

                <li :style="`${infoCardBg ? `background-color: ${infoCardBg}; border: none;` : ''}`"
                    class="bg-[var(--theme-gray-bg)] h-[100px] border-[1px] border-cool-[rgba(206,248,221,0.42)] pl-[12px] pt-[10px] relative">

                    <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> {{ t('common.soc') }} </div>

                    <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                    <div class="flex mt-[10px] items-center">
                        <Icon icon="ionc_cos" :size="48" class="mr-[4px]" />
                        <div class="text-[16px] text-[var(--theme-black51)] mr-[4px] f-dinb"> {{ toFixed(data?.A_M3) }}
                        </div>
                        <div class="text-[12px] text-[var(--theme-gray107)]"> % </div>
                    </div>

                </li>

                <li :style="`${infoCardBg ? `background-color: ${infoCardBg}; border: none;` : ''}`"
                    class="bg-[var(--theme-gray-bg)] h-[100px] border-[1px] border-cool-[rgba(206,248,221,0.42)] pl-[12px] pt-[10px] relative">

                    <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> {{ t('common.dayCharge') }} </div>

                    <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                    <div class="flex mt-[10px] items-center">
                        <Icon icon="icon_charge_grenn" :size="48" class="mr-[4px]" />
                        <div class="text-[16px] text-[var(--theme-black51)] mr-[4px] f-dinb"> {{
                            conversionUnitKWh(data?.A_M15).size }} </div>
                        <div class="text-[12px] text-[var(--theme-gray107)]"> {{ conversionUnitKWh(data.A_M15).unit }}
                        </div>
                    </div>

                </li>

                <li :style="`${infoCardBg ? `background-color: ${infoCardBg}; border: none;` : ''}`"
                    class="bg-[var(--theme-gray-bg)] h-[100px] border-[1px] border-cool-[rgba(206,248,221,0.42)] pl-[12px] pt-[10px] relative">

                    <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> {{ t('common.dayDischarge') }} </div>

                    <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                    <div class="flex mt-[10px] items-center">
                        <Icon icon="icon_discharge_grenn" :size="48" class="mr-[4px]" />
                        <div class="text-[16px] text-[var(--theme-black51)] mr-[4px] f-dinb"> {{
                            conversionUnitKWh(data?.A_M16).size }} </div>
                        <div class="text-[12px] text-[var(--theme-gray107)]"> {{ conversionUnitKWh(data?.A_M16).unit }}
                        </div>
                    </div>

                </li>

                <li :style="`${infoCardBg ? `background-color: ${infoCardBg}; border: none;` : ''}`"
                    class="bg-[var(--theme-gray-bg)] h-[100px] border-[1px] border-cool-[rgba(206,248,221,0.42)] pl-[12px] pt-[10px] relative">

                    <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> {{ t('common.activePower') }} </div>

                    <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                    <div class="flex mt-[10px] items-center">
                        <Icon icon="icon_active_power_grenn" :size="48" class="mr-[4px]" />
                        <div class="text-[16px] text-[var(--theme-black51)] mr-[4px] f-dinb"> {{
                            conversionUnitKW(data?.A_M7).size }} </div>
                        <div class="text-[12px] text-[var(--theme-gray107)]"> {{ conversionUnitKW(data?.A_M7).unit }} </div>
                    </div>

                </li>

                <li :style="`${infoCardBg ? `background-color: ${infoCardBg}; border: none;` : ''}`"
                    class="bg-[var(--theme-gray-bg)] h-[100px] border-[1px] border-cool-[rgba(206,248,221,0.42)] pl-[12px] pt-[10px] relative">

                    <div class="text-[var(--theme-gray107)] text-[12px] pl-[16px]"> {{ t('common.reactivePower') }} </div>

                    <div class="absolute top-[23px] left-[19px] h-[12px] right-0 slit_bg"> </div>

                    <div class="flex mt-[10px] items-center">
                        <Icon icon="icon_reactive_power_grenn" :size="48" class="mr-[4px]" />
                        <div class="text-[16px] text-[var(--theme-black51)] mr-[4px] f-dinb"> {{
                            conversionUnitKVar(data?.A_M8).size }} </div>
                        <div class="text-[12px] text-[var(--theme-gray107)]"> {{ conversionUnitKVar(data?.A_M8).unit }}
                        </div>
                    </div>

                </li>

            </ul>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.slit_bg {
    background-image: url(../../assets/icons/common/card_split_bg.svg);
    background-size: contain;
    background-repeat: no-repeat;
}

.ionc_cos {
    background-size: contain;
}
</style>