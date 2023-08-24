<script setup lang="ts">
import { getDeviceStateInfo } from '@/utils'
import Icon from '@/components/common/Icon.vue'
</script>

<template>
    <ul class="flex h-[24px]">
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_charge" />
            <div class="text-[var(--theme-black51)]">  {{ getDeviceStateInfo(1).text }} </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_discharge" />
            <div class="text-[var(--theme-black51)]"> {{ getDeviceStateInfo(2).text }}  </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_standby" />
            <div class="text-[var(--theme-black51)]"> {{ getDeviceStateInfo(3).text }} </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_alarm" />
            <div class="text-[var(--theme-black51)]">{{ getDeviceStateInfo(4).text }} </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_weihu" />
            <div class="text-[var(--theme-black51)]"> {{ getDeviceStateInfo(5).text }} </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_offline" />
            <div class="text-[var(--theme-black51)]"> {{ getDeviceStateInfo(6).text }} </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
    </ul>
</template>