<script lang="ts" setup>

import TitleBoxVue from '@/components/common/TitleBox.vue';

</script>

<template>
    <!--  -->
    <div class="flex mb-[16px] base_info">

        <div class="h-[516px] w-[700px] bg-[var(--theme-white-bg)] mr-[16px]"></div>

        <div class="flex-1">

            <div class="h-[250px] bg-[var(--theme-white-bg)] mb-[16px] p-[20px] pb-[0] box-border">

                <TitleBoxVue> 常用信息 </TitleBoxVue>

                <ul class="grid grid-cols-3 gap-x-[100px] gap-y-[20px] mt-[10px]">

                    <li class="h-[40px]" v-for="item in 9" :key="item">
                        <div class="h-[12px] w-[168px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div class="h-[32px] w-[168px] flex justify-between items-center text_bg_img px-[4px] box-border">
                            <span class="text-[var(--theme-gray107)]"> 日充 </span>
                            <span class="text-[var(--theme-black51)] text-[16px] f-dinb font-medium"> 1000 %</span>
                        </div>
                    </li>

                </ul>

            </div>

            <div class="h-[250px] bg-[var(--theme-white-bg)] p-[20px] box-border">
                <TitleBoxVue>
                    实时功率
                </TitleBoxVue>
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