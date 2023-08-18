<script lang="ts" setup>
import { useAppData } from '@/store'


import TitleBox from '@/components/common/TitleBox.vue';
import SubNavBar from '@/components/common/SubNavBar.vue';

</script>

<template>
    <div class="w-full overflow-hidden park_income  flex flex-col flex-1">

        <div class="top_bg flex-1 min-h-[570px] box-border flex flex-col ">

            <SubNavBar height="46" class="mb-[16px] bg-transparent" :showDeviceStateDesc="false" />

            <ul class="flex px-[60px] box-border mt-[5%] items-center">

                <li class="flex-1">

                    <ul class="grid grid-cols-2 gap-[20px] w-[350px]">

                        <li>
                            <div class="text-[14px] text-[var(--theme-gray107)]">昨日收益</div>
                            <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                            <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                                100 $
                            </div>
                        </li>

                        <li>
                            <div class="text-[14px] text-[var(--theme-gray107)]">上周收益</div>
                            <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                            <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                                100 $
                            </div>
                        </li>

                        <li>
                            <div class="text-[14px] text-[var(--theme-gray107)]">今日收益</div>
                            <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                            <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                                100 $
                            </div>
                        </li>

                        <li>
                            <div class="text-[14px] text-[var(--theme-gray107)]">本周收益</div>
                            <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                            <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                                100 $
                            </div>
                        </li>

                    </ul>

                </li>

                <li class="flex-1 text-center">累计收益</li>

                <li class="flex-1 flex justify-end">

                    <ul class="grid grid-cols-2 gap-[20px] w-[350px]">

                        <li>
                            <div class="text-[14px] text-[var(--theme-gray107)]">上月收益</div>
                            <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                            <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                                100 $
                            </div>
                        </li>

                        <li>
                            <div class="text-[14px] text-[var(--theme-gray107)]">去年收益</div>
                            <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                            <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                                100 $
                            </div>
                        </li>

                        <li>
                            <div class="text-[14px] text-[var(--theme-gray107)]">本月收益</div>
                            <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                            <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                                100 $
                            </div>
                        </li>

                        <li>
                            <div class="text-[14px] text-[var(--theme-gray107)]">本年收益</div>
                            <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                            <div class="h-[32px] text-[18xp] f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                                100 $
                            </div>
                        </li>


                    </ul>

                </li>
            </ul>

        </div>

        <div class="bottom_bg h-[27vh] px-[21px] min-h-[250px] ">

            <TitleBox class="my-[10px]"> 经济收益趋势图 </TitleBox>

        </div>

    </div>
</template>

<style lang="scss" scoped>
.park_income {
    .top_bg {
        background-image: url(../../../.././assets/image/overview/parklOverview_top_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .bottom_bg {
        background-image: url(../../../.././assets/image/overview/parklOverview_bottom_bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }

    .split_bg {
        background-image: url(../../../../assets/icons/common/split_green.svg);
    }

    .text_bg_img {
        background: linear-gradient(270deg, rgba(14, 169, 68, 0) 0%, rgba(14, 169, 68, 0.19) 100%);
    }


}</style>