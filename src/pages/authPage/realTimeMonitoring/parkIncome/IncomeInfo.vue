<script lang="ts" setup>
import { paserTime, conversionUnitPrice } from '@/utils'
import { useAppData } from '@/store'

import IconVue from '@/components/common/Icon.vue';
import TitleBox from '@/components/common/TitleBox.vue';
import LastTime from '@/components/common/LastTime.vue';


const appData = useAppData()


</script>

<template>
    <div class="flex justify-between px-[60px] runing_info">


        <div class="w-[390px] mt-[4%]">

            <TitleBox>
                电站近期收益
                <template #right>
                    <LastTime> {{ paserTime(appData.currentLastTime, 'YYYY-MM-DD HH:mm:ss') }} </LastTime>
                </template>
            </TitleBox>

            <div class="h-[2px] bg-[var(--theme-gray235-bg)] my-[12px]"></div>

            <ul class="grid grid-cols-2 gap-y-[35px]">

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">今日充电金额</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> {{ conversionUnitPrice(10000000).size }}
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal">  {{ conversionUnitPrice(10000000).unit }} </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">昨日充电金额</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> 1000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> 元 </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">今日放电金额</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--discharge)]"> 1000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> 元 </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">昨日放电金额</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--discharge)]"> 1000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> 元 </span>
                        </div>
                    </div>
                </li>


                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">今日收益</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> 1000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> 元 </span>
                        </div>
                    </div>
                </li>

                <li class="h-[68px] flex">
                    <IconVue icon="ionc_cos" :size="68" />
                    <div class="flex flex-col justify-center ml-[8px]">
                        <div class="text-[var(--theme-gray107)]  mt-[16px]">昨日收益</div>
                        <div class="font-semibold text-[24px] f-dinb text-[var(--charge)]"> 1000
                            <span class="text-[12px] text-[var(--theme-gray107)] font-normal"> 元 </span>
                        </div>
                    </div>
                </li>

            </ul>


        </div>

        <div class="h-[392px] mt-[3%] flex justify-center  flex-col items-center bg-contain bg-no-repeat">

            <div>
                <div class="text-center  font-semibold text-[24px] f-dinb text-[var(--charge)]"> 1000 </div>
                <div class="text-center  text-[var(--theme-gray107)]"> 累计收益 </div>
            </div>

            <ul class="flex mt-[20px]">

                <li class="mx-[20px]">
                    <div class="text-center font-semibold text-[24px] f-dinb text-[var(--charge)]"> 1000 </div>
                    <div class="text-center text-[var(--theme-gray107)]"> 充电收益金额 </div>
                </li>

                <li class="mx-[20px]">
                    <div class="text-center font-semibold text-[24px] f-dinb text-[var(--discharge)]"> 1000 </div>
                    <div class="text-center text-[var(--theme-gray107)]"> 放电收益金额 </div>
                </li>

            </ul>

        </div>

        <div class="w-[380px] mt-[4%]">

            <TitleBox> 电站累计收益</TitleBox>

            <div class="h-[2px] bg-[var(--theme-gray235-bg)] my-[12px]"></div>

            <div class="flex justify-end">

                <ul class="grid grid-cols-2 gap-[20px] w-[350px]">

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">本周收益</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            10000
                        </div>
                    </li>

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">上周收益</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            10000
                        </div>
                    </li>

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">本月收益</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            10000
                        </div>
                    </li>

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">上月收益</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            10000
                        </div>
                    </li>

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">本年收益</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            10000
                        </div>
                    </li>

                    <li>
                        <div class="text-[14px] text-[var(--theme-gray107)]">去年收益</div>
                        <div class="h-[12px] my-[4px] bg-cover bg-no-repeat split_bg"></div>
                        <div
                            class="h-[32px]  f-dinb text-[var-(--theme-black51)] text_bg_img pl-[8px] box-border leading-[32px]">
                            10000
                        </div>
                    </li>


                </ul>

            </div>



        </div>


    </div>
</template>

<style lang="scss" scoped>
.runing_info {

    .split_bg {
        background-image: url(../../../../assets/icons/common/split_green.svg);
    }

    .text_bg_img {
        background: linear-gradient(270deg, rgba(14, 169, 68, 0) 0%, rgba(14, 169, 68, 0.19) 100%);
    }

}
</style>