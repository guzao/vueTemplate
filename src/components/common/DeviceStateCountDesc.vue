<script setup lang="ts">
import { PropType } from 'vue';
import LabelValueUnitVue from './LabelValueUnit.vue';
import Icon from '@/components/common/Icon.vue'
import { getRuningStateInfo } from '@/utils';
defineProps({
    total: {
        type: Number,
        default: () => 0
    },
    states: {
        type: Object as PropType<Record<string, number>>,
        default: () => {
            return {}
        }
    }
})
</script>

<template>
    <ul class="flex h-[24px]">
        <LabelValueUnitVue>
            总电站数
            <template #value>
                {{ total }}
            </template>

            <template #unit>
                个
            </template>
        </LabelValueUnitVue>

        <li class="flex items-center ml-[18px]">
            <Icon icon="icon_state_charge" class=mr-[8px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(1).color"> {{ states['1'] || 0 }} </div>
        </li>
        <li class="flex items-center ml-[18px]">
            <Icon icon="icon_state_discharge" class=mr-[8px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(2).color"> {{ states['2'] || 0 }} </div>
        </li>
        <li class="flex items-center ml-[18px]">
            <Icon icon="icon_state_standby" class=mr-[8px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(3).color"> {{ states['3'] || 0 }} </div>
        </li>
        <li class="flex items-center ml-[18px]">
            <Icon icon="icon_state_alarm" class=mr-[8px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(4).color">  {{ states['4'] || 0 }} </div>
        </li>
        <li class="flex items-center ml-[18px]">
            <Icon icon="icon_state_weihu" class=mr-[8px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(5).color">  {{ states['5'] || 0 }} </div>
        </li>
        <li class="flex items-center ml-[18px]">
            <Icon icon="icon_state_offline" class=mr-[8px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(6).color"> {{ states['6'] ||  states['null'] }} </div>
        </li>
        
    </ul>
</template>

<style scoped lang="scss">
.device_state_icon {
    background-image: url(../../assets/icons/common/charge_state.svg);
}
</style>