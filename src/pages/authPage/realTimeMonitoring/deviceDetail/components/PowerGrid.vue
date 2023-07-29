<script lang="ts" setup>

import TitleBoxVue from '@/components/common/TitleBox.vue'

</script>

<template>
    <div class="h-[200px] bg-[var(--theme-white-bg)] mb-[16px] p-[20px] bg-no-repeat bg-contain power_grid">

        <TitleBoxVue class="mb-[16px]"> 电网信息 </TitleBoxVue>

        <ul class="grid grid-cols-5 gap-y-[26px]">
            <li class="h-[40px]" v-for="item in 9" :key="item">
                <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                <div style="background: linear-gradient(270deg, rgba(14, 169, 68, 0) 0%, rgba(14, 169, 68, 0.19) 100%);"
                    class="h-[32px] w-[168px] flex justify-between items-center px-[4px] box-border">
                    <span class="text-[var(--theme-gray107)]"> 日充 </span>
                    <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> 1000 %</span>
                </div>
            </li>

        </ul>

    </div>
</template>

<style lang="scss" scoped>
.power_grid {
    background-position: right;
    background-image: url(../../../../../assets/image/overview/power_grid.png);
    .split_bg {
        background-image: url(../../../../../assets/icons/common/split_green.svg);
    }

}
</style>