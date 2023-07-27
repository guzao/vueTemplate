<script setup lang="ts">
import Icon from '@/components/common/Icon.vue'
</script>

<template>
    <ul class="flex h-[24px]">
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_charge" />
            <div class="text-[var(--theme-black51)]"> 充电 </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_discharge" />
            <div class="text-[var(--theme-black51)]"> 放电 </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_standby" />
            <div class="text-[var(--theme-black51)]"> 待机 </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_alarm" />
            <div class="text-[var(--theme-black51)]">告警 </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_weihu" />
            <div class="text-[var(--theme-black51)]"> 维护 </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
        <li class="flex items-center">
            <Icon class="mr-[8px]" icon="icon_state_offline" />
            <div class="text-[var(--theme-black51)]"> 离线 </div>
            <div class="mx-[20px] h-[14px] w-[2px] bg-[var(--theme-gray235-bg)]">  </div>
        </li>
    </ul>
</template>