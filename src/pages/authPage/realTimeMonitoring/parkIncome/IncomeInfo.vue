<script lang="ts" setup>
import IconVue from '@/components/common/Icon.vue';
import TitleBox from '@/components/common/TitleBox.vue';
</script>

<template>
    <ul class="flex px-[60px] box-border flex-1 items-center justify-center">

        <li class="flex-1">

            <ul class="grid grid-cols-2 gap-y-[40px]">

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">剩余电量</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> 10000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> % </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">剩余电量</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> 10000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> % </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">剩余电量</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> 10000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> % </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">剩余电量</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> 10000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> % </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">剩余电量</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> 10000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> % </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">剩余电量</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> 10000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> % </span>
                        </div>
                    </div>
                </li>

            </ul>

        </li>

        <li class="flex-1 text-center">
            <div class="text-[28px] f-dinb text-[var(--charge)] mb-[2px]"> 1000 </div>
            <div class="text-[var(--theme-gray153)] text-[16px]"> 累计收益(万) </div>
        </li>

        <li class="flex-1 flex justify-end ">


            <ul class="grid grid-cols-2 gap-[20px] gap-y-[40px] w-[350px]">

                <li>
                    <div class="text-[14px] text-[var(--theme-gray107)]">上月收益</div>
                    <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                    <div
                        class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                        100 $
                    </div>
                </li>

                <li>
                    <div class="text-[14px] text-[var(--theme-gray107)]">去年收益</div>
                    <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                    <div
                        class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                        100 $
                    </div>
                </li>

                <li>
                    <div class="text-[14px] text-[var(--theme-gray107)]">本月收益</div>
                    <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                    <div
                        class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                        100 $
                    </div>
                </li>

                <li>
                    <div class="text-[14px] text-[var(--theme-gray107)]">本年收益</div>
                    <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                    <div
                        class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                        100 $
                    </div>
                </li>

                <li>
                    <div class="text-[14px] text-[var(--theme-gray107)]">本月收益</div>
                    <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                    <div
                        class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                        100 $
                    </div>
                </li>

                <li>
                    <div class="text-[14px] text-[var(--theme-gray107)]">本年收益</div>
                    <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                    <div
                        class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                        100 $
                    </div>
                </li>


            </ul>

        </li>

    </ul>
</template>

<style lang="scss" scoped>
.park_income {

    .split_bg {
        background-image: url(../../../../assets/icons/common/split_green.svg);
    }

    .text_bg_img {
        background: linear-gradient(270deg, rgba(14, 169, 68, 0) 0%, rgba(14, 169, 68, 0.19) 100%);
    }

}
</style>