<script lang="ts" setup>

import TitleBoxVue from '@/components/common/TitleBox.vue'

</script>

<template>
    <div class="bg-[var(--theme-white-bg)] p-[20px]">

        <TitleBoxVue class="mb-[16px]"> PCS </TitleBoxVue>

        <ul class="grid grid-cols-5 order-1">
            <li :class="index % 2 == 0 ? 'bg-[var(--theme-white-bg)]' : 'bg-[var(--theme-gray251-bg)]'"
                class="h-[104px] bg-[var(--theme-gray251-bg)] px-[17px] pt-[17px] box-border" v-for="(item, index) in 10"
                :key="item">
                <div class="text-[--theme-gray107] mb-[10px]"> 运行状态 </div>
                <div class="text-[--theme-black51]"> 待机 </div>
            </li>
        </ul>
    </div>
</template>