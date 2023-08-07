<script setup lang="ts">
import { PropType, ref } from 'vue';
import LabelValueUnitVue from './LabelValueUnit.vue';
import Icon from '@/components/common/Icon.vue'
import { getRuningStateInfo, isFalse, isTrue } from '@/utils';

const props = defineProps({
    /** 总数 */
    total: {
        type: Number,
        default: () => 0
    },
    /** 状态类型字典 */
    states: {
        type: Object as PropType<Record<string, number>>,
        default: () => {
            return {}
        }
    },
    /** 是否开启状态类型点击事件 */
    openStateClick: {
        type: Boolean,
        default: false
    },
 
})


const emits = defineEmits<{ 
    (event: 'stateClick', id: number): void,
}>()

const activeState = ref(-1)

const stateClick = (state: number) => {

    if (isFalse(props.openStateClick)) return
    isTrue(activeState.value == state) ? activeState.value = -1 : activeState.value = state
    emits('stateClick', activeState.value)

}


</script>

<template>
    <ul class="flex h-[24px]">

        <LabelValueUnitVue>
            总电站数
            <template #value> {{ total }} </template>

            <template #unit> 个</template>
        </LabelValueUnitVue>

        <li class="flex items-center ml-[18px] cursor-pointer box-border"
            :class="activeState == 1 ? 'active_state_border' : ''" @click="stateClick(1)">
            <Icon icon="icon_state_charge" class=mr-[4px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(1).color"> {{ states['1'] || 0 }} </div>
        </li>

        <li class="flex items-center ml-[18px] cursor-pointer  box-border"
            :class="activeState == 2 ? 'active_state_border' : ''" @click="stateClick(2)">
            <Icon icon="icon_state_discharge" class=mr-[4px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(2).color"> {{ states['2'] || 0 }} </div>
        </li>

        <li class="flex items-center ml-[18px] cursor-pointer  box-border"
            :class="activeState == 3 ? 'active_state_border' : ''" @click="stateClick(3)">
            <Icon icon="icon_state_standby" class=mr-[4px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(3).color"> {{ states['3'] || 0 }} </div>
        </li>

        <li class="flex items-center ml-[18px] cursor-pointer  box-border"
            :class="activeState == 4 ? 'active_state_border' : ''" @click="stateClick(4)">
            <Icon icon="icon_state_alarm" class=mr-[4px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(4).color"> {{ states['4'] || 0 }} </div>
        </li>

        <li class="flex items-center ml-[18px] cursor-pointer  box-border"
            :class="activeState == 5 ? 'active_state_border' : ''" @click="stateClick(5)">
            <Icon icon="icon_state_weihu" class=mr-[4px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(5).color"> {{ states['5'] || 0 }} </div>
        </li>

        <li class="flex items-center ml-[18px] cursor-pointer  box-border"
            :class="activeState == 6 ? 'active_state_border' : ''" @click="stateClick(6)">
            <Icon icon="icon_state_offline" class=mr-[4px] />
            <div class="text-[var(--theme-black51)]" :class="getRuningStateInfo(6).color"> {{ states['6'] || states['null']
            }} </div>
        </li>

    </ul>
</template>

<style scoped lang="scss">
.device_state_icon {
    background-image: url(../../assets/icons/common/charge_state.svg);
}

.active_state_border {
    border-radius: 16px;
    border: 1px solid rgba(6, 212, 75, 0.884);
    padding: 0 5px;
}</style>